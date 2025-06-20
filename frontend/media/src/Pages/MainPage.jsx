import { useState, useEffect } from "react";
import ArticlePreview from "../Components/ArticlePreview";
import { useNavigate } from 'react-router-dom';
import './MainPage.css'
import Header from "../Components/Header";

export default function MainPage() {
  const navigate = useNavigate()
  const[articles, setArticles] = useState()
  const [latestArticle, setLatestArticle] = useState()
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/articles')
      const data = await response.json();
      console.log('dataaa: ',data);
      setArticles(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchLatestArticle = async () => {
      const response = await fetch('http://localhost:3000/latest-article')
      const data = await response.json();
      console.log(data[0]);
      setLatestArticle(data[0])
    }
    fetchLatestArticle()
  }, [])

  function handleClick(location) {
    navigate(location)
  }
  
  if(!articles) return


  return (
    <>
    <Header/>
    <h1>Статті</h1>
    <div id="main-article">
      {/* {latestArticle ? <ArticlePreview {...latestArticle} onClick={() => handleClick(`/article/${latestArticle.article_id}`)}/> : null} */}
      <ArticlePreview {...articles[0]} onClick={() => handleClick(`/article/${articles[0].article_id}`)}/>
    </div>
    {articles.slice(1).map(article => <ArticlePreview key={article.article_id} {...article} onClick={() => handleClick(`/article/${article.article_id}`)}/>)}
    </>
  );
}


