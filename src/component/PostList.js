import React, { useState, useEffect } from 'react';
import { Table, Space, Modal, Input } from 'antd'; // Input 추가
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'antd/dist/antd.less';
import Button from 'react-bootstrap/Button';

const API_URL = 'http://192.168.0.28/api/posts';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState(''); // 검색어 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(API_URL);
      const postsWithCommentCounts = await Promise.all(response.data.map(async (post) => {
        const commentCountResponse = await axios.get(`${API_URL}/${post.pno}/comment-count`);
        return { ...post, commentCount: commentCountResponse.data };
      }));
      setPosts(postsWithCommentCounts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleCreatePost = () => {
    navigate('/createPost');
  };

  const handleDelete = async () => {
    if (selectedRowKeys.length === 0) {
      Modal.warning({
        title: '게시글 삭제',
        content: '삭제할 게시글을 선택해주세요.',
      });
      return;
    }
  
    try {
      await axios.delete(`${API_URL}/delete-many`, {
        data: selectedRowKeys, // 선택된 게시글 ID 목록을 요청 본문에 전달
      });
      alert('선택한 게시글들이 삭제되었습니다.');
      fetchPosts(); // 삭제 후 목록 새로고침
      setSelectedRowKeys([]); // 선택된 항목 초기화
    } catch (error) {
      console.error('게시글 삭제 중 오류 발생:', error);
      alert('게시글 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleEdit = () => {
    if (selectedRowKeys.length === 1) {
      navigate(`/edit/${selectedRowKeys[0]}`);
    } else {
      Modal.warning({
        title: '게시글 수정',
        content: '수정할 게시글을 하나만 선택해주세요.',
      });
    }
  };

  const handleSearch = () => {
    // 검색어를 이용하여 필터링된 결과를 보여주는 로직
    // 예를 들어, 제목과 작성자에서 검색할 경우를 가정
    const filteredPosts = posts.filter(post =>
      post.title.toLowerCase().includes(searchText.toLowerCase()) ||
      post.author.toLowerCase().includes(searchText.toLowerCase())
    );
    setPosts(filteredPosts);
  };

  const handleResetSearch = () => {
    // 검색어 초기화 후 전체 게시글 목록을 다시 불러오는 로직
    setSearchText('');
    fetchPosts();
  };

  const columns = [
    {
      title: '글 번호',
      dataIndex: 'pno',
      key: 'pno',
    },
    {
      title: '글 제목',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Link to={`/list/${record.pno}`}>{text}</Link>
      ),
    },
    {
      title: '댓글 수',
      dataIndex: 'commentCount',
      key: 'commentCount',
    },
    {
      title: '작성자',
      dataIndex: 'author',
      key: 'author',
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <h1>글 목록</h1>
        <Space>
          <Input.Search
            placeholder="검색어를 입력하세요"
            allowClear
            enterButton="검색"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={handleSearch}
          />
          <Button variant="primary" size="sm" onClick={handleDelete} disabled={selectedRowKeys.length === 0}>글 삭제</Button>
          <Button variant="secondary" size="sm" onClick={handleEdit} disabled={selectedRowKeys.length !== 1}>글 수정</Button>
          <Button variant="secondary" size="sm" onClick={handleCreatePost} >글 작성</Button>
          <Button variant="link" size="sm" onClick={handleResetSearch}>검색 초기화</Button>
        </Space>
      </div>
      <div style={{ padding: 24, minHeight: 280, background: '#fff' }}>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={posts}
          rowKey="pno"
          pagination={false}
        />
      </div>
    </>
  );
};

export default PostList;
