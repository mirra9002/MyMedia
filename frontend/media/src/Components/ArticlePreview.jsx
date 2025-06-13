
import './ArticlePreview.css'
export default function ArticlePreview({title, description, content, authorFirstName, authorLastName, onClick}) {

  return (
    <>
    <div id="div-article" onClick={onClick}>
        <h1>{title}</h1>
        {/* <h2>{description}</h2> */}
        {/* <p>{content}</p> */}
        <p>{authorFirstName && authorLastName ? `${authorFirstName} ${authorLastName}` : 'народна творчість'}</p>
    </div>
      
    </>
  );
}
