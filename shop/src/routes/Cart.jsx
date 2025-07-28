/* eslint-disable*/
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {  addAge } from '../redux/userSlice.js';
import {  addCount, reduceItem, deleteItem } from '../redux/store.js';
import { useEffect, useState } from 'react';

function Cart() {

    // Redux store가져오기 
    let reduxState = useSelector((state) => {
        return state.user;
    });

    let cartData = useSelector((state) => state.cartData);
    let dispatch = useDispatch();

    return (
        <div>
            <div className="d-flex flex-column align-items-center">
                <h5>{reduxState.name} ({reduxState.age})의 장바구니</h5>
                <button onClick={() => {dispatch(addAge(1))}}>버튼</button>
            </div>
           
            <Table className="text-start align-middle">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                        <th> </th>
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
    let [reduceDisabled, setReduceDisabled] = useState(false);

    useEffect(() => {
        if (cartData.count <= 1) {
            setReduceDisabled(true);
        }
        else {
            setReduceDisabled(false);
        }
    }, [cartData.count])
    

    return (
        <tr>
            <td>{cartData.id}</td>
            <td>{cartData.name}</td>
            <td>{cartData.count}</td>
            <td>
                <button className="btn-circle me-1" onClick={() => {
                    dispatch(addCount(cartData.id));
                }}>+</button>
                <button className="btn-circle" disabled={reduceDisabled} onClick={() => {
                    dispatch(reduceItem(cartData.id));
                }}>-</button>
            </td>
            <td>
                 <button className="btn-circle btn-danger" onClick={() => {
                    dispatch(deleteItem(cartData.id));
                }}>🗑️</button>
                
            </td>
        </tr> 
    )
}

export default Cart;