// Redux store
// 전역 state 보관 장소
import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './userSlice.js'; // export default는 import뒤에 {} 사용 X

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

