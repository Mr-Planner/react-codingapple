/* eslint-disable*/
// 좋아요 customHook
import { useState } from "react";

export function useLike() {
    let [like, setLike] = useState(0);

    function addLike() {
        setLike(like => like+1);
    }   

    return [like, addLike];
}