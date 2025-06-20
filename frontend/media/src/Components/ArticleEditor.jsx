import ReactMarkdown from 'react-markdown';
import './ArticleEditor.css'
import { useRef, useState } from 'react';

export default function ArticleEditor({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [articleType, setArticleType] = useState('');
  const [textType, setTextType] = useState(null)
  const [thumbnailImage, setThumbnailImage] = useState(null);
  

  async function handleSubmit() {
    const articleData = {
      title,
      content: text,
      type: articleType,
      thumbnail_image: thumbnailImage || 'no_image'
    };

    const res = await onSubmit(articleData);  // now this is awaited properly

    if (res) {
      setTitle('');
      setText('');
      setThumbnailImage('');
    }

    console.log(res);
  }

  return (
    <>
      <TextTypeChooser handleClick={(type) => {
        setText(prev => prev + type);
        setTextType(type);
      }} textType={textType}/>
      <div id="div-writing-area">
        <div id="div-title">
          <h2>Title</h2>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <hr />
        <div id="div-content">
          <h2>Article</h2>
          <textarea value={text} onChange={e => setText(e.target.value)} />
        </div>
      </div>
      <div className="markdown-preview">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
      <div id="div-type">
        <h2>Choose article type</h2>
        <select value={articleType} onChange={e => setArticleType(e.target.value)}>
          <option value="">Choose type</option>
          <option value="news">News</option>
          <option value="blog">History</option>
          <option value="review">Research</option>
          <option value="interview">Story</option>
        </select>
      </div>
      <div id="div-upload-thumbnail">
        <button onClick={() => {
          const url = prompt("Enter image URL");
          if (url) setThumbnailImage(url);
        }}>Set thumbnail image</button>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}


function TextTypeChooser({ handleClick, textType }) {

  return (
    <div id="div-text-type-chooser">
      <ul>
      <li>
        <button onClick={() => {
          const url = prompt("Enter image URL");
          if (url) handleClick(`![alt text](${url})`);
        }}>
          Insert Image
        </button>
      </li>
      <li><button onClick={() => handleClick("# ")} className={textType === "# " ? "active" : ""}>Heading 1</button></li>
      <li><button onClick={() => handleClick("## ")} className={textType === "## " ? "active" : ""}>Heading 2</button></li>
      <li><button onClick={() => handleClick("### ")} className={textType === "### " ? "active" : ""}>Heading 3</button></li>
      <li><button onClick={() => handleClick("- ")} className={textType === "- " ? "active" : ""}>Bullet</button></li>
      <li><button onClick={() => handleClick("1. ")} className={textType === "1. " ? "active" : ""}>Numbered</button></li>
      <li><button onClick={() => handleClick("> ")} className={textType === "> " ? "active" : ""}>Quote</button></li>
      <li><button onClick={() => handleClick("")} className={textType === "" ? "active" : ""}>Text</button></li>
    </ul>
    </div>
  );
}


