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
    console.log("recentlyWathcedSet : ", reverseRecentlyWatchedIdSet);

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