import React from 'react';
import {Button} from "@mui/material";
import {AdminActionType, useApi} from "../Services/UseApi";

const Home = () => {
    const {...test} = useApi();
    const submit = () => {
        console.log('Submit');
        test.apiService(AdminActionType.GET_ME, ).then(r => console.log(r));
    }
    return (
        <div>
            <h1>Home</h1>
            <Button variant="contained" onClick={submit} color="primary">
                Primary
            </Button>
        </div>
    );
};

export default Home;
