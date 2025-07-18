/* eslint-disable*/
// 주석 자체가 warning msg 지우는 것

import { useEffect, useState } from 'react';
import './App.css' // css파일 경로 

// Root 컴포넌트 
function App() {

  let logo = '강남 우동 맛집';
  // 자료를 보관하는 방법 -> 변수 / state 
  // todo 배열의 객체화 적용 해보기
  let [headline, setHeadline] = useState(['남자코트 추천', '강남 우동맛집', '파이썬 독학']);
  // headline[index]로 접근 
  // let의 두번째 인자 -> state 변경함수 
  // cf) state 변경함수는 약간 늦게 처리 -> async하게 처리
  let [like, setLike] = useState([0, 0, 0]);
  let [display, setDisplay] = useState(false);
  let [headlineIndex, setHeadlineIndex] = useState(null);
  let [inputValue, setInputValue] = useState('');
  let [todayDate, setTodayDate] = useState([]);

  let today = new Date();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let dateString = `${month}월 ${date}일 발행`;

  // 랜더링 이후 한번만 실행
  useEffect(() => {
    setTodayDate(Array(headline.length).fill(dateString));
  }, [])



  // return 내부에는 하나의 tag만 존재 
  // return 내부 : JSX 영역 
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
      }>change article
      </button>

      <button onClick={
        () => {
          let copy = [...headline];
          copy.sort();
          setHeadline(copy);
        }
      }>sort
      </button>

      {/* 
        - onClick{함수} 형태
        - state 변경시에 변경함수 사용 
        */}

      {
        // title : headline 배열의 각 value, index : 현재 index (headline array)
        // map : 반복해서 작업 수행  (배열등에 사용)
        // -> JSX 반복 출력
        headline.map(function (title, index) {
          return (
            <div className='list' key={index}>
              <h4 onClick={
                () => {
                  // index를 전달
                  setHeadlineIndex(index);
                  setDisplay(!display);
                }
              }>{title}
                <span onClick={(e) => {
                  // e : event object
                  // 이벤트 버블링 방지 (onClick이 상위 태그로 전파 X)
                  e.stopPropagation();

                  let copyLike = [...like]; // state 배열은 내부 value가 아닌 reference가 달라져야 relendering
                  copyLike[index] = like[index] + 1;
                  setLike(copyLike);
                }}> 👍
                </span> {like[index]}
              </h4>

              <p>{todayDate[index]}</p>

              <button onClick={
                () => {
                  // 현재 인덱스만 아닌 제목으로 필터링
                  // or copy생성 후, splice()사용
                  setHeadline(headline.filter((_, i) => i != index));
                }
              }>삭제</button>
            </div>

          )
        })
      }

      {/*JSX 안에 JS 넣으려면 {} 사용*/}
      {
        // index를 전달 
        display == true ? <Modal index={headlineIndex} headline={headline} setHeadline={setHeadline} todayDate={todayDate}></Modal>
          : null
      }

      {/*value : {state} -> input 내부의 값을 state와 동기화*/}
      <input type="text" value={inputValue} onChange={(e) => {
        // 입력값을 상태로 저장 (전역변수 느낌))
        setInputValue(e.target.value);
      }}
      />
      <button onClick={() => {
        // or copy생성, copy.unshift(state); -> copy 배열 맨 앞에 state value 삽입
        // set함수 내부에 함수 등장 가능
        if (inputValue.trim()) {
          setHeadline(prev => [inputValue, ...prev]);
          setLike(prev => [0, ...prev]); // like 개수도 재설정
          setTodayDate(prev => [dateString, ...prev]);

          setInputValue('');
        }
        else {
          alert("글 제목을 입력해주세요");
        }
      }}>글 발행
      </button>



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
// 자식 컴포넌트는 props read만 가능 
function Modal(props) {
  return (
    <div className='modal'>
      <h4>{props.headline[props.index]} </h4>
      <p>날짜 : {props.todayDate[props.index]}</p>
      <p>상세내용</p>
      <button onClick={() => {
        // todo 선택된 Index 수정으로 변경
        let copyHeadline = [...props.headline];
        copyHeadline[props.index] = '여자코트 추천';
        props.setHeadline(copyHeadline);
      }}>글 수정</button>
    </div>
  )
}

// class 문법
// class Modal2 extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: 'kim',
//       age : 20
//     }
//   }
//   render() {
//     <div>안녕 {this.state.age}
//     <button onClick={() => {
//       this.setState({age : 21})
//       }}>버튼</button>
//     </div>
//   }
// }

export default App
