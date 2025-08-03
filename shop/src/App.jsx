/* eslint-disable*/
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// react-router-dom 
import { Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Navbar, Container, Nav, Row, Col } from 'react-bootstrap';

import { useState, createContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import data from './data.js'; // 긴 코드는 export / import
import DetailedPage from './routes/DetailedPage.jsx';
import MainPage from './routes/MainPage.jsx';
import EventPage from './routes/EventPage.jsx';
import Cart from './routes/Cart.jsx';


// component라서 대문자 
// styled-components 
// 1. CSS파일 없이 JS에서 style적용
// 2. style이 다른 js파일로 전이 X
// 3. 로딩시간 단축
let YellowBtn = styled.button`
  background : ${props => props.bg};
  color : ${props => props.bg == 'blue' ? 'white' : 'black'};
  padding : 10px;
`

export let Context1 = createContext();

function App() {

  // localStorage에 배열 만들어두기
  // 중복 제거 및 화면에 보이는거 3개 이하 (이상은 더보기로)
  useEffect(() => {
    // todo 이미 watched에 있으면 초기화 X
    localStorage.setItem('watched', JSON.stringify([]));
    
  }, [])

  // 서버에서 가져온 데이터 가정
  // import된 데이터 사용
  let [shoes, setShoes] = useState(data);
  let [stock, setStock] = useState([10, 11, 12]); // contextAPI용 state
  
  // localStorage 
  let obj = { name: 'kim' }
  localStorage.setItem('data', JSON.stringify(obj)); // object -> json
  let temp = localStorage.getItem('data');
  
  // console.log(JSON.parse(temp).name); // json -> object

  // useQuery : 서버에서 데이터 가져오고, 결과 캐싱 -> 로딩 / 에러 상태 자동관리 
  let result = useQuery({
  // React Query 내부 캐시 시스템에서 데이터 구분 -> 같은 queryKey => 데이터 공유
  queryKey: ['name'], 
  // fetcher : 데이터 실제로 가져오는 함수 
  queryFn: async () => {
    const res = await axios.get('https://codingapple1.github.io/userdata.json');
    return res.data;
  }
});

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
          <div>
            { result.isLoading && 'loading...' }
            { result.error && 'error' }
            { result.data && `${result.data.name}님 환영합니다` }
          </div>
        </Container>
      </Navbar>

      {/* <YellowBtn bg = 'blue'>Button</YellowBtn> */}

      <Routes>
        {/* 
        path '*' : 정의 X인 모든 페이지 경로 
        ' /: ' : url 파라미터
        */}
        <Route path="/" element={<MainPage shoes={shoes} setShoes = {setShoes}></MainPage>}></Route>
        <Route path="/detail/:id" element={
          <Context1.Provider value={{stock}}>
            <DetailedPage shoes={shoes}></DetailedPage>
          </Context1.Provider>
        }></Route>
        <Route path="/about" element={<div>about page </div>}></Route>

        <Route path = "/cart" element = {<Cart></Cart>}></Route>

        <Route path="/event" element={<EventPage></EventPage>}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}></Route>
          <Route path="two" element={<div>생일기념 쿠폰받기</div>}></Route>
        </Route>

      </Routes>

    </div>

  )
}

export default App
