import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store.js'
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// React Query의 중앙 상태 관리자
// queryClient내부 : 캐시된 데이터, 쿼리 상태(isLoading, isError, data), 쿼리 invalidation 로직
const queryClient = new QueryClient();

// id = "root"인 div찾고 App그리기 (render)
createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <BrowserRouter>
  //     <App></App>
  //   </BrowserRouter>
  // </React.StrictMode>

  <StrictMode>
    {/* React context 기반 모든 하위 컴포넌트에서 useQuery, useMutation등을 사용  */}
    <QueryClientProvider client={queryClient}>

      {/* /Redux store를 앱 전체에 연결 -> 전역상태에서 관리 */}
      <Provider store = {store}>
        {/* URL에 따라 화면이 바뀌도록 */}
        <BrowserRouter>
          <App></App>
        </BrowserRouter>
    </Provider>
    </QueryClientProvider>
  </StrictMode>

)
