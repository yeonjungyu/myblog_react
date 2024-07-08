import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPge from './component/MainPge';
import CreatePost from './component/CreatePost';
import PostList from './component/PostList';
import AppLayout from './component/AppLayout';
import 'antd/dist/antd.less';
import PostDetail from './component/PostDetail';
import PostEdit from './component/PostEdit';






const App = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<MainPge />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/list" element={<PostList />} />
          <Route path="/list/:pno" element={<PostDetail />} />
          <Route path="/edit/:pno" element={<PostEdit />} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
