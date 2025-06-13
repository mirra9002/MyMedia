
import './ArticlePreview.css'
export default function ArticlePreview({title, description, content, first_name, last_name, onClick}) {

  return (
    <>
    <div id="div-article" onClick={onClick}>
        <h1>{title}</h1>
        <p>{first_name && last_name ? `${first_name} ${last_name}` : 'народна творчість'}</p>
    </div>
      
    </>
  );
}
