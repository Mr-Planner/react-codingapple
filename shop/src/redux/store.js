// Redux store
// 전역 state 보관 장소
import { configureStore, createSlice } from '@reduxjs/toolkit'

// useState()와 동일
// state만드는 함수
// state == slice
let user = createSlice({
  // name : state name 
  // initialState : state value
  // {user : 'kim'}
  name: 'user',
  initialState: 'kim',
  // 상태 변경함수 영역 
  reducers: {
    changeName(state) {
      return 'john' + state;
    }
  }
})

let cartData = createSlice({
  name: 'cartData',
  initialState : [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ]
})

// redux store export
export default configureStore({
  reducer: { 
    // state 등록
    user: user.reducer,
    cartData: cartData.reducer
  }
}) 

// .actions : user의 상태 변경함수만 추출
// state 변경함수 export
export let {changeName} = user.actions