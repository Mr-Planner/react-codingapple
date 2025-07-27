/* eslint-disable*/
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Cart() {

    // Redux store가져오기 
    let reduxState = useSelector((state) => {
        return state;
    });

    let stockData = useSelector((state) => state.stockData);

    return (
        <div>
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
                        stockData.map((data, index) => {
                            return (
                                <TableCol stockData={data} key={index}></TableCol>
                            )
                        })
                    }
                </tbody>
                
            </Table> 
        </div>
    )
}

function TableCol({stockData}) {

    return (
        <tr>
            <td>{stockData.id}</td>
            <td>{stockData.name}</td>
            <td>{stockData.count}</td>
            <td>불가능</td>
        </tr> 
    )
}

export default Cart;