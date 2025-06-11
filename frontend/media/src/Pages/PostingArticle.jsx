import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import InputArea from '../Components/InputArea'
export default function PostingArticle() {
    const [form, setForm] = useState({title: '', description: '', content: '', type: ''});
    
    function handleChange(e) {
        const {name, value} = e.target
        setForm((prev) => ({
            ...prev, [name]: value
        }))
    }

    async function handleSubmit(){
        console.log(form);
        const compiledObject = compileObjectFromUserData(form)
        const res = await postFormData(compiledObject)
        console.log('res:', res);
        if(res.message === 'success'){
          setForm({title: '', description: '', content: ''})
        }
    }
  return (
    <>
      <InputArea form={form} handleChange={handleChange} handleSubmit={() => handleSubmit()}/>
    </>
  );
}

async function postFormData(data){
    const response = await fetch('http://localhost:3000/article',{
        method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const result = await response.json()
    return result
}

function compileObjectFromUserData(data) {
  const compiledObject = {};
  compiledObject.title = data.title;
  compiledObject.description = data.description;
  compiledObject.content = data.content;
  compiledObject.date_created = new Date()
  compiledObject.type = data.type // add!
  compiledObject.reading_time = Math.max(1, Math.round(data.content.length / 1000));
  compiledObject.views = 0;
  compiledObject.author_id = 'fcc25105-d212-4aa7-a527-1ae8845b855b'
  return compiledObject
}