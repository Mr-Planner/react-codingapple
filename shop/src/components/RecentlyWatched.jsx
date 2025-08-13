/* eslint-disable*/
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function RecentlyWatched() {
    
    let [recentlyWatchedCnt, setRecentlyWatchedCnt] = useState(0);
    const maxRecentlyCnt = 5;
    let navigate = useNavigate();

    let recentlyWatchedId = JSON.parse(localStorage.getItem("watched")).map(Number);
    let reverseRecentlyWatchedIdSet = recentlyWatchedId.slice().reverse(); // 역순 번호
    // console.log("recentlyWathcedSet : ", reverseRecentlyWatchedIdSet);

    useEffect(() => {
        
        setRecentlyWatchedCnt(reverseRecentlyWatchedIdSet.length);
        //console.log("recently watched count : ", reverseRecentlyWatchedIdSet.length);

    }, [recentlyWatchedCnt])
    
    const scrollRef = useRef(null);
    
    return (
        <div className='recently-watched'>
            <div className = "d-flex justify-content-center align-items-center"style={{backgroundColor : 'black', height : '30px'}}>
                <span style={{ color: 'white', marginRight: '10px' }}>CART</span>
                <span style={{ borderRadius: 3, background : 'white'}}>{recentlyWatchedCnt}</span>
            </div>

            <div style={{textAlign :'center'}}>
                <div className="d-flex justify-content-center align-items-center" style={{height: "40px"}}>
                    <p style={{ margin: "0"}}>최근 본 상품</p>
                </div>

                <div className='recently-watched-img-container' ref = {scrollRef}> 
                    {
                        // todo click시에 아직 안떴으면 ajax통신으로 불러 온 다음에 이동이 되야 함 
                        // 1안. ajax 통신으로 해당 img에 해당하는 id를 shoe에 임시 반영
                        // 2안. 처음 더보기 눌렀을때의 shoe 정보들을 shoe state에 영구반영 
                        // -> 더보기 누르고 shoe의 정보들을 localStorage에 반영하기 
                        reverseRecentlyWatchedIdSet.map((id, index) => (
                                <img className='recently-watched-img' key = {index} onClick={() => {
                                    navigate(`/detail/${id}`);
                                }} src = {`https://codingapple1.github.io/shop/shoes${id + 1}.jpg`} />
                            
                        ))
                    }
                </div>
            </div>
                
            <div className="d-flex justify-content-center align-items-center" style={{height : "30px", backgroundColor : "grey", cursor: 'pointer'}}>
                <div style={{color : "white"}} onClick={() => {
                    
                    scrollRef.current?.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }}> TOP ▲</div>
            </div>
        </div>
    )
}



export default RecentlyWatched;