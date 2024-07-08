import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// 라우터에서 사용할 컴포넌트들을 lazy loading 방식으로 import
const Loading = <div>Loading..</div>;
const PostList = lazy(() => import('./PostList'));
const PostDetail = lazy(() => import('./PostDetail'));
const PostEdit = lazy(() => import('./PostEdit'));

// PostRouter를 생성하는 함수
const PostRouter = () => {
  return (
    <Routes>
      <Route path="/list" element={<Suspense fallback={Loading}><PostList /></Suspense>} />
      <Route path="/list/:pno" element={<Suspense fallback={Loading}><PostDetail /></Suspense>} />
     
    </Routes>
  );
};

export default PostRouter;
