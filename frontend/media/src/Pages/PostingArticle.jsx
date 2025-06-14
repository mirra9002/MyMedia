import Header from "../Components/Header";
import ArticleEditor from '../Components/ArticleEditor';
import { useState } from 'react';
import { useEffect } from 'react';
import fetchWithAuth from '../utils/auth';

export default function PostingArticle() {
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      window.location.href = '/auth'; // redirect to login/signup
    }
  }, []);
  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetchWithAuth('http://localhost:3000/myprofile');
        const data = await res.json();
        console.log('USER', data);
        setUser(data);
      } catch (err) {
        console.error('Auth error:', err);
        window.location.href = '/auth'; // redirect if unauthorized
      }
    }

    getUser();
  }, []);

  async function handleSubmit(articleData) {
    console.log('IN OBJEEECT:', user.id);
    const obj = {
      ...articleData,
      description: thumbnailImage,
      date_created: new Date().toDateString(),
      reading_time: Math.round(articleData.content.length / 100),
      views: 0,
      author_id: (user?.id).toString()
    };

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
    }
  }

  return (
    <>
      <Header />
      <ArticleEditor
        onSubmit={handleSubmit}
        thumbnailImage={thumbnailImage}
        setThumbnailImage={setThumbnailImage}
      />
    </>
  );
}
