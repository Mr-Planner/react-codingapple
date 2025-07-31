import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

function RecentlyWatched() {
    
    let [recentlyWatchedCnt, setRecentlyWatchedCnt] = useState(0);

    useEffect(() => {
        let recentlyWatchedId = JSON.parse(localStorage.getItem("watched")).map(Number);
        let reverseRecentlyWatchedId = recentlyWatchedId.slice().reverse();
        

    }, [recentlyWatchedCnt])
    
    
    // 최근 본 상품 기능
    // local storage에서 가져온다
    // 내림차순 정렬 (최근 본 순서대로)
    // 개수를 센다
    // id에 해당하는 shoe.img를 특정 사이즈로 가져온다 -> img 클릭 시 detail로 이동
    // 스크롤 기능
    // 5개까지 자른다
    // top버튼 누르면 제일 위쪽으로
    
    return (
        <div>
            <div>
                <p>CART</p>
                <p className="recentlyCnt">{recentlyWatchedCnt}</p>
            </div>
        </div>
    )
}



export default RecentlyWatched;