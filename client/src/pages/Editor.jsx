import React, { useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import axios from '../utils/axios'; 

const mdParser = new MarkdownIt();

export default function Editor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleEditorChange = ({ text }) => {
    setContent(text);
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      setMessage('Title and content are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/posts', {
        title,
        content,
        author: 'sherwin' // you can replace this with dynamic user later
      });

      setMessage('Blog post published successfully!');
      setTitle('');
      setContent('');
    } catch (error) {
      console.error(error);
      setMessage('Failed to publish post.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Create a Blog Post</h1>

      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <MdEditor
        value={content}
        style={{ height: '400px' }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />

      <button
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Publish
      </button>

      {message && (
        <p className="mt-4 text-center text-sm text-red-700">{message}</p>
      )}
    </div>
  );
}
