import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductLists from '../components/ProductLists.jsx';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';

function MainPage(props) {
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
                            <ProductLists shoe={shoe} index = {index}></ProductLists>
                        ))
                    }
                </Row>
            </Container>

            <button onClick={() => {
                axios.get('https://codingapple1.github.io/shop/data2.json')
                // 요청 성공시
                .then((result) => {
                    console.log(result.data);
                    // ...(spread) : 배열을 펼치는 연산자
                    props.setShoes([...props.shoes, ...result.data]);
                })
                // 요청 실패시
                .catch(() => {
                    console.log('요청 실패');
                })
            }}>더보기</button>
        </>
    )
}

export default MainPage;