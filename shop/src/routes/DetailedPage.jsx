/* eslint-disable*/
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

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
    let [isNum, setIsNum] = useState('');

    useEffect(() => {
        let timer = setTimeout(() => { // 2초 후 시행 할 로직
            setPopup(false);
        }, 2000);
        console.log(2);

        if (isNaN(isNum)) {
            alert('숫자만 입력하세요');
        }
        // clean up function : useEffect 실행 전에 실행 (unmount할때도 실행)
        // 주요 용도 : 타이머 제거, socket 연결 제거, ajax 요청 중단 
        return () => {
            console.log(1)
            clearTimeout(timer);
        }
    },[isNum]); // dependency를 []로 하면 mount될때만 실행

    let { id } = useParams(); // 구조분해 
    let shoe = props.shoes.find(shoe => shoe.id === Number(id)); // === : type비교 

    if (!shoe) {
        return (
            <p>일치하는 상품이 없습니다.</p>
        )
    }

    return (
        <>
            {
            popup ? <PopupDiv>2초이내 구매시 할인</PopupDiv> : ""
            }

            <div className="container">
                <div className="row">
                    
                    <div className="col-md-6">
                        <img src={shoe.img} width="100%" />
                    </div>
                    <div className="col-md-6">
                        <h4 className="pt-5">{shoe.title}</h4>
                        <p>{shoe.content}</p>
                        <p>{shoe.price}</p>

                        <div>
                            <input type="text" placeholder='숫자만 입력하세요' onChange={(e) => {
                                setIsNum(e.target.value);

                            }}></input>
                        </div>

                        <button className="btn btn-danger">주문하기</button>
                        
                    </div>
                </div>
            </div>
        </>
    )

}

export default DetailedPage;