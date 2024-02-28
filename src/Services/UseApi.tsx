import {useState} from 'react';

import api from './api';
import {v4 as uuidv4} from 'uuid';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

export enum ActionType {

}

export const enum AdminActionType {
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
    LOGOUT = 'LOGOUT',
    GET_ME = 'GET_ME',
    FETCH_USERS = 'FETCH_USERS',
    INVITE_USER = 'INVITE_USER',
    GUEST = 'GUEST',
    ACTIVE_USER = 'ACTIVE_USER',
}

export function useApi<T>() {
    const [data, setData] = useState<T | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [lastGetActionType, setLastGetActionType] = useState<{
        actionType: ActionType;
        payload?: any;
        id?: any;
    } | null>(null);
    const navigate = useNavigate();

    async function apiService(actionType: ActionType | AdminActionType, payload?: any, id?: any) {
        setIsLoading(true);
        setIsError(false);
        setIsSuccess(false);
        try {
            let response;
            switch (actionType) {
                case AdminActionType.LOGIN:
                    await api.get('/sanctum/csrf-cookie');

                    response = await api.post('api/auth/login', payload);
                    if (response.status === 200) {
                        if (response && response.data) {
                            Cookies.set('AUTH_USER', uuidv4());
                        }
                        setData(response.data);
                        setIsSuccess(true);
                        navigate('/');

                    }
                    break;
                case AdminActionType.GET_ME:
                    response = await api.get('api/auth/me');
                    if (response.status === 200) {
                        setData(response.data);
                        setIsSuccess(true);
                    }
                    break;
                case AdminActionType.REGISTER:
                    response = await api.post('api/auth/register', payload);
                    if (response.status === 201) {
                        setData(response.data);
                        setIsSuccess(true);
                        navigate('/');
                    }
                    break;
                default:
                    throw new Error('ActionType non pris en charge');
            }


        } catch (error) {
            console.log(error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    async function refresh() {
        if (lastGetActionType) {
            await apiService(lastGetActionType.actionType, lastGetActionType.payload, lastGetActionType.id);
        }
    }

    return {apiService, data, isSuccess, isLoading, isError, refresh};
}
