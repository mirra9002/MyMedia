import ReactMarkdown from 'react-markdown'
import './ArticleRead.css'
export default function ArticleRead({article}) {

  return (
    <>
      <h1>{article.title}</h1>
      <h3>Reading time: <strong>{calculateReadingTime(article.content)} min</strong></h3>
      <hr />
      <article>
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </article>
      <hr />
      <div className='meta'>
        <h3>Date published: <strong>{`${formatDate(article.date_created)}`}</strong></h3>
        <h3>Author: <strong>{`${article.first_name} ${article.last_name}`}</strong></h3>
      </div>
      
    </>
  );
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).replace(',', '').replace(',', ' -');
}

function calculateReadingTime(markdownText) {
  const plainText = markdownText
    .replace(/[#_*~`>+\-=|]/g, '')    // remove markdown symbols
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // convert [text](link) to text
    .replace(/!\[(.*?)\]\(.*?\)/g, '')  // remove images
    .replace(/<\/?[^>]+(>|$)/g, '')     // remove HTML tags

  const words = plainText.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes;
}
