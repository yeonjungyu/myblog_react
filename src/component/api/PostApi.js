// api/postsApi.js

import axios from 'axios';


const API_URL = 'http://192.168.0.28/api/posts';

export const getOnePost = async (pno) => {
  const response = await axios.get(`${API_URL}/${pno}`);
  return response.data;
};

export const putOnePost = async (pno, formData) => {
  const response = await axios.put(`${API_URL}/${pno}`, formData);
  return response.data;
};

export const deletePost = async (pno) => {
  const response = await axios.delete(`${API_URL}/${pno}`);
  return response.data;
};

export const getAllPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updatePost = async (pno, updatedPostData) => {
    try {
      const response = await axios.put(`${API_URL}/${pno}`, updatedPostData);
      return response.data; // 업데이트된 게시글 데이터를 반환
    } catch (error) {
      console.error('Error updating post:', error);
      throw error; // 오류 발생 시 에러를 throw하여 처리
    }
  };
