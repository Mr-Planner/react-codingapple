import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store.js'
import { Provider } from 'react-redux';

// id = "root"인 div찾고 App그리기 (render)
createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <BrowserRouter>
  //     <App></App>
  //   </BrowserRouter>
  // </React.StrictMode>

  // Redux store를 앱 전체에 연결 -> 전역상태에서 관리 
  <Provider store = {store}>
    {/* URL에 따라 화면이 바뀌도록 */}
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>

)
