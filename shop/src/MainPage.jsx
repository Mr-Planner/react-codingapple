import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductLists from './ProductLists.jsx';
import { Container, Row } from 'react-bootstrap';

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
                        props.shoes.map((shoe) => (
                            <ProductLists shoe={shoe}></ProductLists>
                        ))
                    }
                </Row>
            </Container>
        </>
    )
}

export default MainPage;