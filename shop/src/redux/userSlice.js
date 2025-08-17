import {  createSlice } from '@reduxjs/toolkit'

// useState()와 동일
// state만드는 함수
// state == slice
let user = createSlice({
  // name : state name 
  // initialState : state value
  // {user : 'kim'}
  name: 'user',
  initialState: {name : 'kim', age : 20},
  // 상태 변경함수 영역 
  reducers: {
    changeName(state) {
      state.name = "park"; 
      // state가 object or array일때 return 없이, 직접 수정해도 state 변경 (by immer.js)
      // cf) 객체가 아닌 원시값은 return (변경값) 사용
    },
    addAge(state, action) {
      state.age += action.payload; // .payload : 파라미터 추출 
    }
  }
})

export default user;

// .actions : user의 상태 변경함수만 추출
// state 변경함수 export
export let { changeName, addAge } = user.actions;