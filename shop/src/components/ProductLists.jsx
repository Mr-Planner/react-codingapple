import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// index에 따른 데이터를 보여야
// component 형식 : function( return(<div/>)) 
function ProductLists(props) {

    return (
        <Col xs={4} md ={4}>
            <Link className='link-to-detail' to={`/detail/${props.shoe.id}`}>
                <img className="shoe-image" src={props.shoe.img}></img>
                <h4>{props.shoe.title}</h4>
                <p>{props.shoe.price}</p>
            </Link>
        </Col >
    )
}

export default ProductLists;