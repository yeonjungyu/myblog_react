import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Card, Input, Table, Modal, List } from 'antd';
import { Avatar } from "antd";

const { TextArea } = Input;

const API_URL = 'http://192.168.0.28/api/posts';

const PostDetail = () => {
  const { pno } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPostDetail();
    fetchComments();
  }, [pno]);

  // 상세글 가져오기
  const fetchPostDetail = async () => {
    try {
      const response = await axios.get(`${API_URL}/${pno}`);
      setPost(response.data);
    } catch (error) {
      console.error('게시물 세부 정보를 가져오는 중 오류 발생:', error);
      setError('게시글을 가져오는 중 오류가 발생했습니다.');
    }
  };

  // 댓글 가져오기
  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API_URL}/${pno}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('댓글을 가져오는 중 오류 발생:', error);
    }
  };

  // 댓글 추가하기
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/${pno}/comments`, {
        content: commentContent,
        author: commentAuthor,
      });
      console.log('댓글 추가 응답:', response.data);
      alert('댓글이 추가되었습니다.');
      fetchComments(); // 댓글 목록 다시 불러오기
      setCommentContent('');
      setCommentAuthor('');
    } catch (error) {
      console.error('댓글 추가 중 오류 발생:', error);
      alert('댓글 추가 중 오류가 발생했습니다.');
    }
  };

  // 글 수정
  const handleEdit = () => {
    navigate(`/edit/${pno}`);
  };

  // 글 삭제
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${pno}`);
      alert('게시글이 삭제되었습니다.');
      navigate('/postList');
    } catch (error) {
      console.error('게시글 삭제 중 오류 발생:', error);
      alert('게시글 삭제 중 오류가 발생했습니다.');
    }
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`${API_URL}/${pno}/comments/${commentId}`);
      alert('댓글이 삭제되었습니다.');
      fetchComments(); // 댓글 목록 다시 불러오기
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생:', error);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    }
  };

  if (error) return <div>{error}</div>;
  if (!post) return <div>Loading...</div>;

  const columns = [
    {
      title: '글 제목',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <strong>{text}</strong>, // 글 제목을 강조하여 출력
    },
    {
      title: '글 내용',
      key: 'content',
      render: (record) => <p>{record.content}</p>, // 글 내용을 <p> 태그로 렌더링
    },
    {
      title: '작성자',
      dataIndex: 'author',
      key: 'author',
    },
    
  ];

  const dataSource = [
    {
      key: '1',
      title: post.title,
      author: post.author,
      content: post.content,
    },
  ];

  return (
    <>
      <div style={{ marginBottom: '20px', fontSize: '20px' }}>
        <Button variant="primary" size="sm" style={{ marginLeft: '5px' }} onClick={handleEdit}>
          글 수정
        </Button>
        <Button variant="primary" size="sm" style={{ marginLeft: '5px' }} onClick={handleDelete}>
          글 삭제
        </Button>
      </div>
      <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>상세 게시글</h1>
      <Card style={{ marginBottom: '20px' }}>
        <Table
          columns={[
            {
              title: '글 제목',
              dataIndex: 'title',
              key: 'title',
              render: (text) => <strong>{text}</strong>,
            },
            {
              title: '글 내용',
              key: 'content',
              render: (record) => <p>{record.content}</p>,
            },
            {
              title: '작성자',
              dataIndex: 'author',
              key: 'author',
            },
          ]}
          dataSource={[
            {
              key: '1',
              title: post.title,
              author: post.author,
              content: post.content,
            },
          ]}
          pagination={false}
        />
      
      </Card>
      <div>
        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>댓글</h2>
        {comments.map((comment) => (
  <Card key={comment.id} style={{ marginBottom: '5px', marginTop: '2px', padding: '2px', fontSize: '15px' }}>
    <List.Item style={{ fontSize: '12px', marginBottom: '1px', marginTop: '1px' }}>
      <List.Item.Meta
        avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${comment.author}`} />}
        title={<p style={{ fontSize: '15px', marginBottom: '3px' }}>{comment.author}</p>}
        description={<p style={{ fontSize: '15px', marginBottom: '0px' }}>{comment.content}</p>}
      />
      <Button type="danger" size="small" onClick={() => handleDeleteComment(comment.id)}>
        삭제
      </Button>
    </List.Item>
  </Card>
))}


        <div style={{ marginTop: '50px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>댓글 작성</h3>
          <form onSubmit={handleCommentSubmit}>
            <TextArea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="댓글을 입력하세요..."
              autoSize={{ minRows: 3, maxRows: 6 }}
              required
            />
            <Input
              type="text"
              value={commentAuthor}
              onChange={(e) => setCommentAuthor(e.target.value)}
              placeholder="작성자 이름"
              style={{ marginTop: '10px' }}
              required
            />
            <Button type="primary" htmlType="submit" style={{ marginTop: '10px' }}>
              작성
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
export default PostDetail;
