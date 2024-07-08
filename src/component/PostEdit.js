import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const API_URL = 'http://192.168.0.28/api/posts';

const PostEdit = () => {
  const { pno } = useParams();
  const [updatedPost, setUpdatedPost] = useState({
    title: '',
    content: '',
    author: '',
  });

  useEffect(() => {
    fetchPost();
  }, [pno]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${API_URL}/${pno}`);
      const { title, content, author } = response.data;
      setUpdatedPost({ title, content, author });
    } catch (error) {
      console.error('게시글 정보를 가져오는 중 오류 발생:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedPost({ ...updatedPost, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${API_URL}/${pno}`, updatedPost);
      alert('게시글이 업데이트되었습니다.');
      window.location.href = '/list';
    } catch (error) {
      console.error('게시글 업데이트 중 오류 발생:', error);
      alert('게시글 업데이트 중 오류가 발생했습니다.');
    }
  };

  return (
    <div style={{ padding: 24, minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Form onSubmit={handleSubmit} style={{ width: '25rem' }}>
      
      <Form.Group className="mb-3" controlId="postTitle">
        <Form.Label>글 제목</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={updatedPost.title}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Form.Group className="mb-3" controlId="postContent">
        <Form.Label>글 내용</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          name="content"
          value={updatedPost.content}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Form.Group className="mb-3" controlId="postAuthor">
        <Form.Label>작성자</Form.Label>
        <Form.Control
          type="text"
           name="author"
          value={updatedPost.author}
          onChange={handleInputChange}
        />
      </Form.Group>
  
      <Button variant="primary" type="submit">
        글 수정
      </Button>
      <Link to="/list" style={{ marginLeft: '10px' }}>
        <Button variant="secondary">글 목록</Button>
      </Link>
    </Form>
  </div>
  );
};

export default PostEdit;
