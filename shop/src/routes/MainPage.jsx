import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductLists from '../components/ProductLists.jsx';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';

function MainPage(props) {
    // state 변경은 asynchronous하다 -> 바로 반영 X
    let [clickCnt, setClickCnt] = useState(0);
    let [isLoading, setIsLoading] = useState(false);
    let [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const isFirstRender = useRef(true);
    const maxCount = 3;

    // 클릭 후에 '로딩 중' 띄우기
    useEffect(() => {
        // mount시에 실행 X
        if (isFirstRender.current == true) {
            isFirstRender.current = false;

            return;
        }
        
        // button즉시 disabled
        if (clickCnt >= maxCount) {
            setIsButtonDisabled(true);
            return;
        }
        setIsLoading(true);
    }, [clickCnt])

    return (
        <>
            <div className='main-bg'>

            </div>

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
                        <div className="mb-2 p-2"style={{ backgroundColor: 'ivory', fontAize: "30px", fontWeight: "bold" }}>로딩 중</div>}
                        
                        <button onClick={() => {
                            // cf) setClickCnt(clickCnt+1) 시에 state변경이 비동기적 -> axios의 ${}에 바로 반영 X
                            const nextCnt = clickCnt + 1;
                            setClickCnt(nextCnt);

                            if (nextCnt >= maxCount) {
                                alert("더이상 상품이 없습니다");
                                return;
                            }

                            axios.get(`https://codingapple1.github.io/shop/data${nextCnt+1}.json`)
                            // 요청 성공시
                            .then((result) => {
                                console.log(result.data);
                                // ...(spread) : 배열을 펼치는 연산자
                                props.setShoes([...props.shoes, ...result.data]);
                                setIsLoading(false);

                            })
                            // 요청 실패시
                            .catch(() => {
                                console.log('요청 실패');
                                setIsLoading(false);
                            })
                            }} disabled={isButtonDisabled}>더보기</button>
                    </Col>
                </Row>
            </Container>

            
        </>
    )
}

export default MainPage;