import { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import ArticleRead from '../Components/ArticleRead';
import Header from "../Components/Header";
export default function Article() {
    const [article, setArticle] = useState(null)
    const params = useParams()
    const articleId = params.id
    
    useEffect(() => {
        async function fetchArticle() {
            const article = await getArticle(articleId)
            const jsonArticle = await article.json()
            setArticle(jsonArticle)   
            console.log('ARTICLE:', jsonArticle);
        }
        fetchArticle()
    }, []) 

  if(!article) return 

  console.log(article);
  return (
    <>
    <Header/>
      <ArticleRead article={article}/>
    </>
  );
}

async function getArticle(articleId) {
    const result = await fetch(`http://localhost:3000/article/${articleId}`)
    return result
}
