import { useEffect, useState } from 'react';
import API from '../api/axios';

function AdminPage() {
  const [members, setMembers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({ totalMembers: 0, activeMembers: 0, totalPosts: 0, totalMessages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchMember, setSearchMember] = useState('');
  const [searchPost, setSearchPost] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [activeView, setActiveView] = useState('all');

  const loadAdminData = async () => {
    setError('');
    setLoading(true);

    try {
      console.log('Loading admin data...');
      const [usersRes, postsRes, messagesRes, statsRes] = await Promise.all([
        API.get('/admin/users'),
        API.get('/admin/posts'),
        API.get('/admin/messages'),
        API.get('/admin/stats'),
      ]);

      console.log('Users:', usersRes.data);
      console.log('Posts:', postsRes.data);
      console.log('Messages:', messagesRes.data);
      console.log('Stats:', statsRes.data);

      setMembers(usersRes.data);
      setPosts(postsRes.data);
      setMessages(messagesRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error('Admin API Error:', err);
      console.error('Response:', err?.response);
      setError(err?.response?.data?.message || 'Unable to load admin dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleRefresh = () => {
    loadAdminData();
  };

  const handleToggleStatus = async (memberId) => {
    try {
      const res = await API.put(`/admin/users/${memberId}/status`);
      setMembers((prev) => prev.map((member) => (member.id === memberId ? res.data.user : member)));
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to update member status.');
    }
  };

  const handleRemovePost = async (postId) => {
    try {
      await API.put(`/admin/posts/${postId}/remove`);
      setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, status: 'removed' } : post)));
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to remove post.');
    }
  };

  return (
    <main className="admin-page">
      <section className="admin-header">
        <h2>Admin Dashboard</h2>
        <p>Review all members, posts, and incoming contact messages from one place.</p>
      </section>

      {/* Statistics Cards - Clickable Filters */}
      <section className="admin-stats stat-filters">
        <div 
          className={`stat-card stat-button ${activeView === 'all' ? 'active' : ''}`}
          onClick={() => setActiveView('all')}
        >
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h4>Dashboard</h4>
            <p className="stat-number">All</p>
          </div>
        </div>
        <div 
          className={`stat-card stat-button ${activeView === 'members' ? 'active' : ''}`}
          onClick={() => setActiveView('members')}
        >
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h4>Total Members</h4>
            <p className="stat-number">{stats.totalMembers}</p>
            <span className="stat-label">Active: {stats.activeMembers}</span>
          </div>
        </div>
        <div 
          className={`stat-card stat-button ${activeView === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveView('posts')}
        >
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h4>Total Posts</h4>
            <p className="stat-number">{stats.totalPosts}</p>
            <span className="stat-label">Published: {posts.filter(p => p.status !== 'removed').length}</span>
          </div>
        </div>
        <div 
          className={`stat-card stat-button ${activeView === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveView('messages')}
        >
          <div className="stat-icon">💬</div>
          <div className="stat-content">
            <h4>Messages</h4>
            <p className="stat-number">{stats.totalMessages}</p>
            <span className="stat-label">Unreviewed</span>
          </div>
        </div>
      </section>

      {loading ? (
        <p className="loading-text">⏳ Loading admin data...</p>
      ) : error ? (
        <div className="error-block">
          <p className="error-text">❌ {error}</p>
          <button className="btn btn-secondary" onClick={handleRefresh}>
            Retry
          </button>
        </div>
      ) : (
        <>
          {/* Members Section */}
          {(activeView === 'all' || activeView === 'members') && (
          <section className="admin-section">
            <div className="section-header">
              <h3>👥 Members</h3>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchMember}
                onChange={(e) => setSearchMember(e.target.value)}
                className="search-input"
              />
            </div>
            {members.length === 0 ? (
              <div className="empty-state">
                <p>📭 No members found.</p>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members
                      .filter(
                        (member) =>
                          member.name.toLowerCase().includes(searchMember.toLowerCase()) ||
                          member.email.toLowerCase().includes(searchMember.toLowerCase())
                      )
                      .map((member) => (
                        <tr key={member.id}>
                          <td className="member-name-cell">
                            <span className="member-name">{member.name}</span>
                          </td>
                          <td className="member-email">{member.email}</td>
                          <td>
                            <span className={`status-badge status-${member.status}`}>
                              {member.status === 'active' ? '✓ Active' : '✕ Inactive'}
                            </span>
                          </td>
                          <td>
                            <button
                              className={`action-btn ${member.status === 'active' ? 'btn-danger' : 'btn-success'}`}
                              onClick={() => handleToggleStatus(member.id)}
                            >
                              {member.status === 'active' ? '🔒 Deactivate' : '🔓 Activate'}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
          )}

          {/* Posts Section */}
          {(activeView === 'all' || activeView === 'posts') && (
          <section className="admin-section">
            <div className="section-header">
              <h3>📝 Posts</h3>
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchPost}
                onChange={(e) => setSearchPost(e.target.value)}
                className="search-input"
              />
            </div>
            {posts.length === 0 ? (
              <div className="empty-state">
                <p>📭 No posts found.</p>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts
                      .filter(
                        (post) =>
                          post.title.toLowerCase().includes(searchPost.toLowerCase()) ||
                          (post.author_name || '').toLowerCase().includes(searchPost.toLowerCase())
                      )
                      .map((post) => (
                        <tr key={post.id} className={post.status === 'removed' ? 'removed-row' : ''}>
                          <td className="post-title">{post.title}</td>
                          <td>{post.author_name || 'Unknown'}</td>
                          <td>
                            <span className={`status-badge status-${post.status || 'published'}`}>
                              {post.status === 'removed' ? '🚫 Removed' : '✓ Published'}
                            </span>
                          </td>
                          <td className="date-cell">{new Date(post.created_at).toLocaleDateString()}</td>
                          <td>
                            <button
                              className={`action-btn ${post.status === 'removed' ? 'btn-disabled' : 'btn-danger'}`}
                              onClick={() => setConfirmDelete(post.id)}
                              disabled={post.status === 'removed'}
                            >
                              {post.status === 'removed' ? '✓ Removed' : '🗑 Remove'}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
          )}

          {/* Contact Messages Section */}
          {(activeView === 'all' || activeView === 'messages') && (
          <section className="admin-section">
            <h3>💬 Contact Messages</h3>
            {messages.length === 0 ? (
              <div className="empty-state">
                <p>📭 No contact messages yet.</p>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Message</th>
                      <th>Received</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((message) => (
                      <tr key={message.id}>
                        <td className="message-name">{message.name}</td>
                        <td>{message.email}</td>
                        <td className="message-text">{message.message}</td>
                        <td className="date-cell">{new Date(message.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
          )}

          {/* Confirmation Dialog */}
          {confirmDelete && (
            <div className="modal-overlay">
              <div className="confirmation-modal">
                <h3>⚠️ Confirm Action</h3>
                <p>Are you sure you want to remove this post? This action cannot be undone.</p>
                <div className="modal-actions">
                  <button className="btn-cancel" onClick={() => setConfirmDelete(null)}>
                    Cancel
                  </button>
                  <button
                    className="btn-confirm"
                    onClick={() => {
                      handleRemovePost(confirmDelete);
                      setConfirmDelete(null);
                    }}
                  >
                    Yes, Remove
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default AdminPage;
