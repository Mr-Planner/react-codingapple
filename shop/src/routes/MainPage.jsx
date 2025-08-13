/* eslint-disable*/
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductLists from '../components/ProductLists.jsx';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import RecentlyWatched from '../components/RecentlyWatched.jsx';

// post 요청 
// axios.post('URL', {name : 'kim'}) 
// 동시에 ajax 요청
// Promise.all( [axios.get('URL1'), axios.get('URL2')] ).then() 

function MainPage(props) {
    // state 변경은 asynchronous하다 -> 바로 반영 X
    let [clickCnt, setClickCnt] = useState(0);
    let [isLoading, setIsLoading] = useState(false);
    let [isButtonDisabled, setIsButtonDisabled] = useState(false);
    // useRef : 값을 기억, rerendering X (상태변경시에)
    const isFirstRender = useRef(true);

    let clickedCnt = Number(localStorage.getItem("clickedCnt") || "0");

    const maxCount = 3;

    // ajax 1번 성공 시 마다 shoes에 setItem 
    // 최대 더보기 클릭 횟수까지 저장하고 그 이후에는 setItem하면 안됨

    // 클릭 후에 '로딩 중' 띄우기
    useEffect(() => {
        // mount시에 실행 X
        if (isFirstRender.current == true) {
            isFirstRender.current = false;

            return;
        }


        // 처음 2번 클릭했을 때 까지만 localStorage("shoes")에 저장 
        if (clickedCnt <= maxCount && clickedCnt == clickCnt) {
            console.log("clickedCnt", clickedCnt)
            console.log("clickCnt", clickCnt)

            // 더보기 신발들 추가
            localStorage.setItem("shoes", JSON.stringify(props.shoes)); 

        }

        // button즉시 disabled
        if (clickCnt >= maxCount) {
            setIsButtonDisabled(true);
            setIsLoading(false);
            return;
        }
        
    }, [clickCnt])

    return (
        <>
            <div className='main-bg'>

            </div>

            <RecentlyWatched></RecentlyWatched>

            <Container>
                <Row>
                    {/* map 사용 state를 map으로 순회, 
                    각 배열 요소를 자식 컴포넌트에 props로
                    */}
                    {
                        props.shoes.map((shoe, index) => (
                            <ProductLists shoe={shoe} index = {index} key = {index}></ProductLists>
                        ))
                    }
                </Row>

                <Row className="justify-content-center my-3">
                    <Col xs={4} className="d-flex flex-column align-items-center">
                        {isLoading
                            &&
                        <div className="mb-2 p-2"style={{ backgroundColor: 'ivory', fontSize: "15px", fontWeight: "bold" }}>로딩 중</div>}
                        
                        <button onClick={() => {
                            // cf) setClickCnt(clickCnt+1) 시에 state변경이 비동기적 -> axios의 ${}에 바로 반영 X
                            const nextCnt = clickCnt + 1;
                            setClickCnt(nextCnt);
                            
                            setIsLoading(true);
                            
                            if (nextCnt >= maxCount) {
                                alert("더이상 상품이 없습니다");
                                return;
                            }

                            axios.get(`https://codingapple1.github.io/shop/data${nextCnt+1}.json`)
                            // 요청 성공시
                            .then((result) => {
                                //console.log(result.data);
                                // ...(spread) : 배열을 펼치는 연산자
                                props.setShoes([...props.shoes, ...result.data]);
                                setTimeout(() => setIsLoading(false), 500); // 0.5초 표시                                 
                            })
                            // 요청 실패시
                            .catch(() => {
                                console.log('요청 실패');
                                setTimeout(() => setIsLoading(false), 500); // 0.5초 표시 
                            })

                            if (clickedCnt < maxCount) {
                                localStorage.setItem("clickedCnt", clickedCnt+1); // 클릭 횟수 증가
                            }

                        }} disabled={isButtonDisabled}>더보기</button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default MainPage;