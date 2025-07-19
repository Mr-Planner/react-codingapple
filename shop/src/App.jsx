import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Navbar, Container, Nav, Row, Col } from 'react-bootstrap';

import data from './data.js'; // 긴 코드는 export / import
import ProductLists from './ProductLists.jsx';

function App() {

  // 서버에서 가져온 데이터 가정
  // import된 데이터 사용
  let [shoes, setShoes] = useState(data);

  return (
    <div className='App'>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeMarker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Categories</Nav.Link>
            <Nav.Link href="#pricing">Settings</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className='main-bg'>

      </div>

      <Container>
        <Row>
          {/* map 사용 
          state를 map으로 순회, 각 배열 요소를 자식 컴포넌트에 props로
          */}
          {
            shoes.map((shoe) => (
              <ProductLists shoe={shoe}></ProductLists>
            ))
          }
        </Row>
      </Container>
    </div>

  )
}

export default App
