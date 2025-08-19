import axios from 'axios';
import { useEffect, useState } from 'react';

export function useUserName() {
    let [userName, setUserName] = useState("");
    
    useEffect(() => {
        axios.get("/username.json")
        .then((result) => {
            console.log("name", result.data);
            setUserName(result.data);
        })
        .catch((error) => {
            console.error(error); // 에러 처리
        });
        
    }, [])

    return userName;
}