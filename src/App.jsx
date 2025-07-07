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
        <h4>{headline[2]}</h4>
        <p>2월 17일 발행</p>
      </div>

    </div >
  );
}

export default App
