import { useState, useEffect } from "react";
import Article from "../Components/Article";
import { useNavigate } from 'react-router-dom';



export default function MainPage() {
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

  

  return (
    <>
    <h1>Articles</h1>
      {articles ? articles.map(article => <Article {...article}/>) : <p>Loading...</p>}
    </>
  );
}