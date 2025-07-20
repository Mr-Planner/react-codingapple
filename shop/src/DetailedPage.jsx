import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function DetailedPage(props) {
    let { id } = useParams(); // 구조분해 
    let shoe = props.shoes.find(shoe => shoe.id === Number(id)); // === : type비교 

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={shoe.img} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{shoe.title}</h4>
                    <p>{shoe.content}</p>
                    <p>{shoe.price}</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    )

}

export default DetailedPage;