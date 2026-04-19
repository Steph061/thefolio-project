// frontend/src/pages/WritePostPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const WritePostPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !body.trim()) {
      setError('Title and body are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    if (image) {
      formData.append('image', image);
    }

    setLoading(true);
    try {
      const { data } = await API.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate(`/post/${data.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="write-post-page">
      <section className="write-post-panel">
        <h2>Write a New Post</h2>
        <p>Share your BTS thoughts, favorite songs, and community stories.</p>

        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit} className="write-post-form">
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Body
            <textarea
              rows="8"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </label>

          <label>
            Cover Image (optional)
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Publishing...' : 'Publish Post'}
          </button>
        </form>
      </section>

      <style>{`
        .write-post-page {
          display: flex;
          justify-content: center;
          padding: 2rem;
        }
        .write-post-panel {
          width: 100%;
          max-width: 720px;
          background: white;
          border-radius: 18px;
          padding: 2.5rem;
          box-shadow: 0 15px 30px rgba(0,0,0,0.08);
        }
        body.dark-mode .write-post-panel {
          background: #1e1e1e;
          box-shadow: 0 15px 30px rgba(0,0,0,0.3);
        }
        .write-post-panel h2 {
          margin-bottom: 0.5rem;
          color: #4a148c;
          font-size: 2rem;
        }
        body.dark-mode .write-post-panel h2 {
          color: #FFB0B5;
        }
        .write-post-panel p {
          color: #555;
          margin-bottom: 1.75rem;
          line-height: 1.7;
        }
        body.dark-mode .write-post-panel p {
          color: #FFB0B5;
        }
        .write-post-form label {
          display: block;
          margin-bottom: 1.25rem;
          color: #333;
          font-weight: 600;
        }
        body.dark-mode .write-post-form label {
          color: #FFB0B5;
        }
        .write-post-form input[type="text"],
        .write-post-form textarea,
        .write-post-form input[type="file"] {
          width: 100%;
          margin-top: 0.5rem;
          padding: 0.9rem 1rem;
          border-radius: 12px;
          border: 1px solid #cecece;
          font-size: 1rem;
          font-family: inherit;
        }
        body.dark-mode .write-post-form input[type="text"],
        body.dark-mode .write-post-form textarea,
        body.dark-mode .write-post-form input[type="file"] {
          background: #1e1e1e;
          color: #FFB0B5;
          border-color: #FFB0B5;
        }
        .write-post-form textarea {
          min-height: 180px;
          resize: vertical;
        }
        .write-post-form button {
          margin-top: 1rem;
          background: linear-gradient(135deg, #6a1b9a 0%, #8e24aa 100%);
          color: white;
          padding: 1rem 1.5rem;
          border: none;
          border-radius: 999px;
          font-size: 1rem;
          cursor: pointer;
        }
        body.dark-mode .write-post-form button {
          background: #6a1b9a;
          color: #120101;
        }
        body.dark-mode .write-post-form button:hover {
          background: #4a148c;
        }
        .error-msg {
          color: #c62828;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        body.dark-mode .error-msg {
          color: #ff6b6b;
        }
      `}</style>
    </main>
  );
};

export default WritePostPage;
