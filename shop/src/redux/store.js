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
  initialState : 'kim'
})

let stockData = createSlice({
  name: 'stockData',
  initialState : [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ]
})

export default configureStore({
  reducer: { 
    // state 등록
    user: user.reducer,
    stockData: stockData.reducer
  }
}) 