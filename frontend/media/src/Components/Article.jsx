
import './Article.css'
export default function Article(props) {
  const title = props.title;
  const description = props.description;
  const content = props.content
  const authorFirstName = props.first_name
  const authorLastName = props.last_name
  return (
    <>
    <div id="div-article">
        <h1>{title}</h1>
        <h2>{description}</h2>
        <p>{content}</p>
        <p>{authorFirstName && authorLastName ? `${authorFirstName} ${authorLastName}` : 'народна творчість'}</p>
    </div>
      
    </>
  );
}
