import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import './ArticleEditor.css'

export default function ArticleEditor() {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [articleType, setArticleType] = useState('');
  function handleChangeTitle(e) {
    setTitle(e.target.value)
  }
  function handleChangeText(e) {
    setText(e.target.value)
  }

  function handleTextFormattingChange(type) {
    const prevText = text;
    const currentText = `${prevText}${type}`
    setText(currentText)
  }
  function handleArticleTypeChange(e) {
    setArticleType(e.target.value)
  }
  
  async function handleSubmit() {
    const obj = {
      title: title,
      description: "no description",
      content: text,
      date_created: new Date().toString(),
      type: articleType,
      reading_time: Math.round(text.length / 100),
      views: 0,
      author_id: 'fcc25105-d212-4aa7-a527-1ae8845b855b'
    }
    const res = await postArticle(obj)
    if (res) {
    alert('Article submitted successfully!')
    // Optionally clear form:
    setTitle(''); setText(''); setArticleType('');
  } else {
    alert('Error submitting article.')
  }
  }

  return (<>
    <TextTypeChooser handleClick={handleTextFormattingChange}/>
    <div id="div-writing-area">
      <div id="div-title">
        <h2>Title</h2>
        <input type="text" name="title" onChange={handleChangeTitle} value={title}/>
      </div>
      <hr />
      <div id="div-content">
        <h2>Article</h2>
        <textarea type="text" name="content" onChange={handleChangeText}  value={text}/>
      </div>
    </div>
    <div className="markdown-preview">
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
    <div id="div-type">
      <h2>Choose article type</h2>
      <select value={articleType} onChange={handleArticleTypeChange}>
        <option value="">Choose type</option>
        <option value="news">News</option>
        <option value="blog">History</option>
        <option value="review">Research</option>
        <option value="interview">Story</option>
      </select>
    </div>
    <button onClick={handleSubmit}>Submit</button>

    </>
  )
}


function TextTypeChooser({ handleClick}) {
  
  return<>
  
    <div id="div-text-type-chooser">
      <ul>
        <li><button onClick={() => handleClick("# ")}>Heading 1</button></li>
        <li><button onClick={() => handleClick("## ")}>Heading 2</button></li>
        <li><button onClick={() => handleClick("### ")}>Heading 3</button></li>
        <li><button onClick={() => handleClick("")}>Text</button></li>
      </ul>
    </div>
    </>
}

async function postArticle(inputData) {
  try {
    const res = await fetch('http://localhost:3000/article', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputData)
    })

    if (!res.ok) {
      throw new Error('Failed to post article')
    }

    const data = await res.json()
    return data
  } catch (err) {
    console.error(err)
    return null
  }
}