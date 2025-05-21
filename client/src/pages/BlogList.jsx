import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error('Failed to fetch posts!', err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">📰 Blog Posts</h1>

      {posts.length === 0 && (
        <p className="text-gray-600">No blogs posted yet.</p>
      )}

      {posts.map(post => (
        <div key={post._id} className="mb-6 p-4 border rounded shadow-sm bg-white">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-700 mt-2"> {/* ✅ typo fixed from text-ray-700 */}
            {post.content.substring(0, 100)}...
          </p>
          <Link
            to={`/post/${post._id}`} // ✅ this assumes you will make a PostDetail component
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
}
