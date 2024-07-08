import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const API_URL = 'http://192.168.0.28/api/posts'; // API 서버 주소에 맞게 수정

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!title.trim() || !content.trim() || !author.trim()) {
      setErrorMessage('내용을 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        title,
        content,
        author
      });
      console.log('Post created:', response.data);
      setSuccessMessage('글 작성이 성공적으로 완료되었습니다.');
      setErrorMessage(''); // 성공 시 에러 메시지 초기화
      setTitle('');
      setContent('');
      setAuthor('');
    } catch (error) {
      console.error('Error creating post:', error.response ? error.response.data : error.message);
      setErrorMessage('글 작성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div style={{ padding: 24, minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Form onSubmit={handleSubmit} style={{ width: '25rem' }}>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <Form.Group className="mb-3" controlId="postTitle">
          <Form.Label>글 제목</Form.Label>
          <Form.Control
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="postContent">
          <Form.Label>글 내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="postAuthor">
          <Form.Label>작성자</Form.Label>
          <Form.Control
            type="text"
            placeholder="작성자 이름을 입력하세요"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          작성하기
        </Button>
        <Link to="/list" style={{ marginLeft: '10px' }}>
          <Button variant="secondary">글 목록</Button>
        </Link>
      </Form>
    </div>
  );
};

export default CreatePost;
