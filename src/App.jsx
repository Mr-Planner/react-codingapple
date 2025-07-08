/* eslint-disable*/
// 주석 자체가 warning msg 지우는 것

import { useState } from 'react';
import './App.css' // css파일 경로 

function App() {

  let logo = '강남 우동 맛집';
  // 자료를 보관하는 방법 -> 변수 / state 
  // headline[index]로 접근
  let [headline, setHeadline] = useState(['남자코트 추천', '강남 우동맛집', '파이썬 독학']);
  // headline[index]로 접근 
  // let의 두번째 인자 -> state 변경함수 
  let [like, changeLike] = useState(0);
  let [display, setDisplay] = useState(false);

  // return 내부에는 하나의 tag만 존재 
  // -> <></> (fragment 문법) or <div></div> 하나의 태그만 존재하도록 
  return (
    // JSX로 jsx파일에서 html작성 
    <div className="App">
      <div className='black-nav'>
        <h4>{logo}</h4>
      </div>

      <button onClick={
        () => {
          let copy = [...headline]; // headline 배열 복사 -> relandering
          copy[0] = '여자코트 추천';
          setHeadline(copy); // new array를 대입해야 주소가 변경되어 relandering 
        }
      }>change article</button>

      <button onClick={
        () => {
          let copy = [...headline];
          copy.sort();
          setHeadline(copy);
        }
      }>sort</button>

      <div className='list'>
        {/* 
        - onClick{함수} 형태
        - state 변경시에 변경함수 사용 
        */}

        <h4>{headline[0]} <span onClick={() => changeLike(like + 1)}>👍</span> {like} </h4>
        <p>2월 17일 발행</p>
      </div>

      <div className='list'>
        <h4>{headline[1]}</h4>
        <p>2월 17일 발행</p>
      </div>

      <div className='list'>
        <h4 onClick={() => setDisplay(!display)}>{headline[2]}</h4>
        <p>2월 17일 발행</p>
      </div>

      {
        display == true ? <Modal></Modal> : null
      }
    </div >
  );
}

// Component : 축약한 HTML 묶음 
/* 
1. 반복해서 출현하는 HTML 묶음
2. 내용이 자주 변경되는 부분
3. 다른 페이지에 등장
4. 팀원과 협업시에 작업 분배단위
*/
function Modal() {
  return (
    <div className='modal'>
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}


export default App
