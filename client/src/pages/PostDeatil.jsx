import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../utils/axios'; 
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => {
        console.error('Error fetching post:', err);
        setError('Failed to load post');
      });
  }, [id]);

  const handleDelete = async () => {
    if(window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`http://localhost:5000/api/posts/${id}`);
        alert('Post deleted successfully');
        window.location.href = '/bloglist';
      } catch (error) {
        console.error('Error deleting post:', error);
        setError('Failed to delete post');
      }
    }
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (!post) {
    return <p className="text-center mt-10 text-gray-600">Loading post...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div
        className="prose prose-lg text-gray-800"
        dangerouslySetInnerHTML={{ __html: md.render(post.content) }}
      />

      <button
      onClick={handleDelete}
      className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
        Delete Post
      </button>

      <Link to="/bloglist" className="block mt-6 text-blue-600 hover:underline">
        ← Back to Blog List
      </Link>
    </div>
  );
}
