/* eslint-disable*/
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { changeName, plusAge } from '../redux/userSlice.js';

function Cart() {

    // Redux store가져오기 
    let reduxState = useSelector((state) => {
        return state.user;
    });

    let cartData = useSelector((state) => state.cartData);
    let dispatch = useDispatch();

    // console.log(reduxState); // changeName Test

    return (
        <div>
            <div className="d-flex flex-column align-items-center">
                <h5>{reduxState.name} ({reduxState.age})의 장바구니</h5>
                <button onClick={() => {dispatch(plusAge())}}>버튼</button>
            </div>
           
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartData.map((data, index) => {
                            return (
                                <TableCol cartData={data} key={index}></TableCol>
                            )
                        })
                    }
                </tbody>
                
            </Table> 
        </div>
    )
}

function TableCol({cartData}) {
    let dispatch = useDispatch();

    return (
        <tr>
            <td>{cartData.id}</td>
            <td>{cartData.name}</td>
            <td>{cartData.count}</td>
            <td><button onClick={() => {
                dispatch(changeName())
            }}>+</button></td>
        </tr> 
    )
}

export default Cart;