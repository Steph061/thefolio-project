// frontend/src/pages/PostPage.js
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const getUploadUrl = (fileName) => {
  if (!fileName) return null;
  return `${API.defaults.baseURL.replace('/api', '')}/uploads/${fileName}`;
};

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPostAndComments = async () => {
      setLoading(true);
      try {
        const [postRes, commentsRes] = await Promise.all([
          API.get(`/posts/${id}`),
          API.get(`/comments/${id}`),
        ]);
        setPost(postRes.data);
        setComments(commentsRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load post.');
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const canManagePost = user && post && (user.role === 'admin' || user.id === post.author_id);

  const handleDeletePost = async () => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await API.delete(`/posts/${id}`);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete post.');
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const { data } = await API.post(`/comments/${id}`, { body: commentText });
      setComments((prev) => [...prev, data]);
      setCommentText('');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to add comment.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      await API.delete(`/comments/${commentId}`);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete comment.');
    }
  };

  if (loading) {
    return <main className="post-page"><p>Loading post...</p></main>;
  }

  if (error && !post) {
    return <main className="post-page"><p className="error-msg">{error}</p></main>;
  }

  return (
    <main className="post-page">
      <article className="post-detail">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span>By {post.author_name || 'Unknown'}</span>
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
        </div>
        {post.image && <img src={getUploadUrl(post.image)} alt={post.title} />}
        <p>{post.body}</p>

        <div className="post-actions">
          {canManagePost && (
            <>
              <Link to={`/post/${id}/edit`} className="btn btn-secondary">Edit Post</Link>
              <button className="btn btn-danger" onClick={handleDeletePost}>Delete Post</button>
            </>
          )}
        </div>
      </article>

      <section className="comments-section">
        <h2>Comments</h2>
        {user ? (
          <form onSubmit={handleAddComment} className="comment-form">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
            />
            <button type="submit" className="btn btn-primary">Post Comment</button>
          </form>
        ) : (
          <p>Please log in to add a comment.</p>
        )}

        <div className="comment-list">
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : comments.map((comment) => {
            const canDeleteComment = user && (user.role === 'admin' || comment.author_id === user.id);
            return (
              <div key={comment.id} className="comment-card">
                <div className="comment-header">
                  <strong>{comment.author_name || 'Guest'}</strong>
                  <span>{new Date(comment.created_at).toLocaleString()}</span>
                </div>
                <p>{comment.body}</p>
                {canDeleteComment && (
                  <button className="comment-delete" onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <style>{`
        .post-page {
          max-width: 900px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        .post-detail {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 15px 30px rgba(0,0,0,0.08);
          margin-bottom: 2rem;
        }
        .post-detail h1 {
          margin-bottom: 0.75rem;
          color: #4a148c;
        }
        .post-meta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          color: #6c6c6c;
          margin-bottom: 1.5rem;
        }
        .post-detail img {
          width: 100%;
          margin: 1.5rem 0;
          border-radius: 18px;
          object-fit: cover;
          max-height: 420px;
        }
        .post-detail p {
          line-height: 1.8;
          color: #333;
        }
        .post-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 1.5rem;
        }
        .comments-section {
          background: white;
          padding: 2rem;
          border-radius: 20px;
          box-shadow: 0 15px 30px rgba(0,0,0,0.08);
        }
        .comments-section h2 {
          margin-bottom: 1rem;
          color: #4a148c;
        }
        .comment-form textarea {
          width: 100%;
          min-height: 120px;
          padding: 1rem;
          border-radius: 16px;
          border: 1px solid #ddd;
          margin-bottom: 1rem;
          font-family: inherit;
          resize: vertical;
        }
        .comment-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .comment-card {
          background: #f9f4ff;
          border-radius: 16px;
          padding: 1rem 1.25rem;
          border: 1px solid #e8d9f8;
        }
        .comment-header {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          font-size: 0.95rem;
          color: #5f3b91;
          margin-bottom: 0.75rem;
        }
        .comment-delete {
          background: transparent;
          border: none;
          color: #c62828;
          cursor: pointer;
          font-weight: 700;
          margin-top: 0.5rem;
        }
        .error-msg {
          color: #c62828;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        .btn-danger {
          background: #d32f2f;
          color: white;
          border: none;
          padding: 0.9rem 1.25rem;
          border-radius: 999px;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .post-page {
            padding: 0 1rem;
          }
        }
      `}</style>
    </main>
  );
};

export default PostPage;
