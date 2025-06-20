import Header from "../Components/Header";
import ArticleEditor from '../Components/ArticleEditor';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import fetchWithAuth from '../utils/auth';

export default function PostingArticle() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({})

  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
      window.location.href = '/auth'; // redirect to login/signup
      return
    }
  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetchWithAuth('http://localhost:3000/myprofile');
        const data = await res.json();
        console.log('USER', data);
        setUserData(data)
        
      } catch (err) {
        console.error('Auth error:', err);
        window.location.href = '/auth'; // redirect if unauthorized
      }
    }

    getUser();
  }, []);

  
  async function handleSubmit(articleData) {
    const obj = {
      ...articleData,
      date_created: toSQLDateString(new Date()),
      user_id: userData.id
    };
    console.log('obj:', obj);

    try {
      const res = await fetch('http://localhost:3000/article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
      });

      if (!res.ok) throw new Error('Failed to post article');
      alert('Article submitted successfully!');
    } catch (err) {
      console.error(err);
      alert('Error submitting article.');
      return false
    }
    return true
  }
  if(userData.role != 'admin') {
    return <><p>Вибач, але наразі ти не можеш публікувати статті...</p>
    <p>Але ти можеш попрохати <strong>mirra9002@gmail.com</strong> дати тобі дозвіл!</p>
    <button onClick={() => navigate('/')}>На головну</button> </>
    
  }
  return (
    <>
      <Header />
      <ArticleEditor
        onSubmit={handleSubmit}
      />
    </>
  );
}


function toSQLDateString(date) {
  return date.toISOString().slice(0, 19).replace('T', ' ');
}