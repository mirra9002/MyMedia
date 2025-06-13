import { useState, useEffect } from "react";
import ArticlePreview from "../Components/ArticlePreview";
import { useNavigate } from 'react-router-dom';

import Header from "../Components/Header";

export default function MainPage() {
  const navigate = useNavigate()
  const[articles, setArticles] = useState()
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/articles')
      const data = await response.json();
      console.log(data);
      setArticles(data)
    }
    fetchData()
  }, [])

  function handleClick(location) {
    navigate(location)
  }
  
  if(!articles) return

  return (
    <>
    <Header/>
    <h1>Articles</h1>
    {articles.map(article => <ArticlePreview key={article.article_id} {...article} onClick={() => handleClick(`/article/${article.article_id}`)}/>)}
    </>
  );
}