// frontend/src/pages/EditPostPage.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const getUploadUrl = (fileName) => {
  if (!fileName) return null;
  return `${API.defaults.baseURL.replace('/api', '')}/uploads/${fileName}`;
};

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPost = async () => {
      try {
        const { data } = await API.get(`/posts/${id}`);
        setPost(data);
        setTitle(data.title);
        setBody(data.body);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load post.');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

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
    if (imageFile) {
      formData.append('image', imageFile);
    }

    setSaving(true);
    try {
      await API.put(`/posts/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate(`/post/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save changes.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <main className="edit-post-page"><p>Loading post data...</p></main>;
  }

  return (
    <main className="edit-post-page">
      <section className="edit-post-panel">
        <h2>Edit Post</h2>
        <p>Update the title, content, or cover image for your BTS story.</p>

        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit} className="edit-post-form">
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

          {post?.image && (
            <div className="image-preview">
              <p>Current Image</p>
              <img src={getUploadUrl(post.image)} alt="Current post" />
            </div>
          )}

          <label>
            Replace Cover Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </label>

          <button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </section>

      <style>{`
        .edit-post-page {
          display: flex;
          justify-content: center;
          padding: 2rem;
        }
        .edit-post-panel {
          width: 100%;
          max-width: 720px;
          background: white;
          border-radius: 18px;
          padding: 2.5rem;
          box-shadow: 0 15px 30px rgba(0,0,0,0.08);
        }
        .edit-post-panel h2 {
          margin-bottom: 0.5rem;
          color: #4a148c;
          font-size: 2rem;
        }
        .edit-post-panel p {
          color: #555;
          margin-bottom: 1.75rem;
          line-height: 1.7;
        }
        .edit-post-form label {
          display: block;
          margin-bottom: 1.25rem;
          color: #333;
          font-weight: 600;
        }
        .edit-post-form input[type="text"],
        .edit-post-form textarea,
        .edit-post-form input[type="file"] {
          width: 100%;
          margin-top: 0.5rem;
          padding: 0.9rem 1rem;
          border-radius: 12px;
          border: 1px solid #ddd;
          font-size: 1rem;
          font-family: inherit;
        }
        .edit-post-form textarea {
          min-height: 180px;
          resize: vertical;
        }
        .image-preview {
          margin-bottom: 1.25rem;
        }
        .image-preview p {
          margin-bottom: 0.75rem;
          font-weight: 600;
          color: #333;
        }
        .image-preview img {
          width: 100%;
          border-radius: 16px;
          max-height: 360px;
          object-fit: cover;
          border: 1px solid #ddd;
        }
        .edit-post-form button {
          margin-top: 1rem;
          background: linear-gradient(135deg, #6a1b9a 0%, #8e24aa 100%);
          color: white;
          padding: 1rem 1.5rem;
          border: none;
          border-radius: 999px;
          font-size: 1rem;
          cursor: pointer;
        }
        .error-msg {
          color: #c62828;
          margin-bottom: 1rem;
          font-weight: 600;
        }
      `}</style>
    </main>
  );
};

export default EditPostPage;
