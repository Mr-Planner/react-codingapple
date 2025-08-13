/* eslint-disable*/
import '../App.css'
import { Context1 } from './../App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useContext, useRef } from 'react';
import { Col, Nav } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {addItem} from '../redux/store.js'
import { useDispatch, useSelector } from 'react-redux';

// todo 1초 경과마다 남은 시간 변경 보여주기
let PopupDiv = styled.div`
    width: 100vw;              
    height: 10px;            
    padding: 20px;             
    background: papayawhip;     

    display: flex;             
    align-items: center;        
    justify-content: center;    
`

function DetailedPage(props) {
    // userParams : url 파라미터를 가져오는 것 (object 형태)

    // useEffect()
    // 컴포넌트가 mount / update할때 수행 (dependency 없을 때)
    // html '렌더링 이후'에 수행
    // 1. 어려운 연산 / 2. 서버에서 데이터 가져오기 / 3. 타이머 장착
    // 목적 : 핵심기능이 아닌 다른 기능들을 넣는다

    let [popup, setPopup] = useState(true);
    let [tabIndex, setTabIndex] = useState(0);
    let [quantity, setQuantity] = useState('');
    let [detailPageAni, setDetailPageAni] = useState("");

    let { stock } = useContext(Context1); // Context해체 함수

    useEffect(() => {
        // ----------------- 최근 본 상품 등록 로직 -----------------
        // localStorage에 id 추가 하기
        let recentlyWatched = JSON.parse(localStorage.getItem("watched"));
        let recentlyWatchedSet = new Set(recentlyWatched);

        // 중복제거 추가
        recentlyWatchedSet.add(id);
        recentlyWatched = Array.from(recentlyWatchedSet); // or [...recentlyWatchedSet] (Set -> Array)

        // console.log("recentlyWatched", recentlyWatched);
        // console.log(recentlyWatchedSet);

        localStorage.setItem('watched', JSON.stringify(recentlyWatched));
        
        // ----------------- 2초 동안 팝업 -----------------
        let timer = setTimeout(() => { // 2초 후 시행 할 로직
            setPopup(false);
        }, 2000);
        
        let aniTimer = setTimeout(() => {
            setDetailPageAni("detail-page-ani-end")
        }, 100);

        // ----------------- 주문하기 버튼 누른 후  -----------------
        
        // clean up function : useEffect 실행 전에 실행 (unmount할때도 실행)
        // 주요 용도 : 타이머 제거, socket 연결 제거, ajax 요청 중단 
        return () => {
            setDetailPageAni("");
            clearTimeout(timer, aniTimer);
        }
    },[]); // dependency를 []로 하면 mount될때만 실행

    let { id } = useParams(); // 구조분해 
    let shoe = props.shoes.find(shoe => shoe.id === Number(id)); // === : type비교 
    
    // shoe를 찾을 수가 없다 -> shoe가 없다면 localStorage에서 가져올 것
    if (shoe == null) {
        let shoes = JSON.parse(localStorage.getItem("shoes"));
        shoe = shoes.find(shoe => shoe.id === Number(id));
        // console.log("shoe : ", shoe);
    }

    let imgIndex = Number(id) + 1;

    // redux
    let dispatch = useDispatch();
    let cartData = useSelector((state) => state.cartData);
    let item = cartData.find((item) => item.id == shoe.id);

    let navigate = useNavigate();

    if (!shoe) {
        return (
            <p>일치하는 상품이 없습니다.</p>
        )
    }

    return (
        <div className = {`detail-page-ani-start ${detailPageAni}`}>
            {
            popup ? <PopupDiv>2초이내 구매시 할인</PopupDiv> : ""
            }

            <div className="container">
                <div className="row">

                    <div className="col-md-6">
                        <img src={`https://codingapple1.github.io/shop/shoes${imgIndex}.jpg`} width="100%" />
                    </div>

                    <div className="col-md-6">
                        <h4 className="pt-5">{shoe.title} {`(${stock[0]})`}</h4>
                        <p>{shoe.content} </p>
                        <p>{shoe.price}</p>
                        <p>🛒 : {item?.count}</p>

                        <div className="mb-2">
    
                            <input type="text" placeholder='숫자만 입력하세요' value = {quantity} onChange={(e) => {
                                let userInput = e.target.value.replace(/[^0-9]/g, "");
                                if (e.target.value != userInput) {
                                    alert('숫자만 입력하세요');
                                }
                                 setQuantity(userInput);
                            }}></input>
                        </div>

                        <button onClick={() => {
                            dispatch(addItem({ id: shoe.id, name: shoe.title, count: Number(quantity) })); 
                            navigate("/cart");
                        }
                        } className="btn btn-danger">주문하기</button>
                        
                    </div>
                </div>
            </div>


            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick = {() => {
                        setTabIndex(0)
                    }} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick = {() => {
                            setTabIndex(1)
                        }} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick = {() => {
                            setTabIndex(2)
                        }} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>

            <TabConponent tabIndex={tabIndex}></TabConponent>
             
        </div>
    )
}

// {tabIndex} :  props 대신 사용 
function TabConponent({ tabIndex }) {
    let [fadeAni, setFadeAni] = useState("");

    useEffect(() => {

        // automatic batch무시, setFadeAni 즉시 적용
        let timer = setTimeout(() => {
            setFadeAni("tab-ani-end")
        }, 100);
        
        return (() => {
            clearTimeout(timer);
            setFadeAni("");
        })
    }, [tabIndex])

    return (
        <div className= {`tab-ani-start ${fadeAni}`}>
            {[<div>내용1</div>, <div>내용2</div>, <div>내용3</div>][tabIndex]}
        </div>
    )
}

export default DetailedPage;