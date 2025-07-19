import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'react-bootstrap';

// index에 따른 데이터를 보여야
// component 형식 : function( return(<div/>)) 
function ProductLists(props) {

    return (
        <Col>
            <img className="shoeImage" src={props.shoe.img}></img>
            <h4>{props.shoe.title}</h4>
            <p>{props.shoe.price}</p>
        </Col>
    )
}

export default ProductLists;