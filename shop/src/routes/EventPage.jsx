import { Outlet } from 'react-router-dom';
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function EventPage() {
    return (
        <div>
            <h4>오늘의 이벤트</h4>
            {/* Outlet : 하위 컴포넌트의 element를 넣는 위치 */}
            <Outlet></Outlet>
        </div>
    )
}

export default EventPage;