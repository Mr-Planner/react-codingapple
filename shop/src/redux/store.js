// Redux store
// 전역 state 보관 장소
import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './userSlice.js'; // export default는 import뒤에 {} 사용 X

let cartData = createSlice({
  name: 'cartData',
  initialState: [
    { id: 0, name: 'White and Black', count: 2 },
    { id: 2, name: 'Grey Yordan', count: 1 }
  ],
  reducers: {
    // 장바구니에서 + 버튼 
    addCount(state, action) {
      // state순서가 아니라 id를 기준으로 find (sort시에도 무결성유지)
      let item = state.find(data => data.id == action.payload);
      item.count ++;
      
    },

    // 주문하기에서 주문하기 버튼 
    addItem(state, action) {
      // id없으면 새로추가 / 있으면 수량추가 
      let item = state.find(data => data.id == action.payload.id);
      if (!item) {
        state.push(action.payload);
      }
      else {
        item.count += action.payload.count;
        console.log(item.count);
      }
    },

    // 수량 1까지 감소 (1부터는 disable)
    reduceItem(state, action) {
      let item = state.find(data => data.id == action.payload);
      if (item.count == 1) {
        return; 
      }
      item.count--;

    },

    // 특정 상품 id 삭제
    deleteItem(state, action) {
      let index = state.findIndex((data) => data.fd == action.payload);
      state.splice(index, 1);
    }
  }
}) 

// redux store export
export default configureStore({
  reducer: { 
    // state 등록
    user: user.reducer,
    cartData: cartData.reducer
  }
}) 

// cartDate의 상태 변경함수만 추출
export let { addCount, addItem, reduceItem, deleteItem } = cartData.actions;
