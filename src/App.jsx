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
  let [like, setLike] = useState([0, 0, 0]);
  let [display, setDisplay] = useState(false);
  let [index, setIndex] = useState(null);

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
          let copy = [...headline]; // headline 배열 복사 -> relendering
          copy[0] = '여자코트 추천';
          setHeadline(copy); // new array를 대입해야 주소가 변경되어 relendering 
        }
      }>change article</button>

      <button onClick={
        () => {
          let copy = [...headline];
          copy.sort();
          setHeadline(copy);
        }
      }>sort</button>

      {/* 
        - onClick{함수} 형태
        - state 변경시에 변경함수 사용 
        */}

      {
        // title : headline 배열의 각 value, i : 현재 index (headline array)
        headline.map(function (title, index) {
          return (
            <div className='list' key={index}>
              <h4 onClick={
                () => {
                  // index를 전달
                  setIndex(index);
                  setDisplay(!display);
                }
              }> {title} <span onClick={() => {
                let copyLike = [...like]; // state 배열은 내부 value가 아닌 reference가 달라져야 relendering
                copyLike[index] = like[index] + 1;
                setLike(copyLike);
              }}> 👍 {like[index]} </span>
              </h4>
              <p>2월 18일 발행</p>
            </div>

          )
        })

      }

      {
        // index를 전달 
        display == true ? <Modal index={index} headline={headline} setHeadline={setHeadline}></Modal> : null
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
function Modal(props) {
  return (
    <div className='modal'>
      <h4>{props.headline[props.index]} </h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={() => {
        let copyHeadline = [...props.headline];
        copyHeadline[0] = '여자코트 추천';
        props.setHeadline(copyHeadline);
      }}>글 수정</button>
    </div>
  )
}


export default App
