export default function InputArea({handleSubmit, handleChange, form}) {
  return (
    <>
      <div id="div-posting-article">
        <h2>Title</h2>
        <input name="title" value={form.title} onChange={handleChange} type="text" />
        <h2>Description</h2>
        <input name="description" value={form.description} onChange={handleChange} type="text" />
        <h2>Content</h2>
        <textarea name="content" value={form.content} onChange={handleChange}></textarea>
        <h2>Type</h2>
        <input name="type" value={form.type} onChange={handleChange} type="text" />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
}