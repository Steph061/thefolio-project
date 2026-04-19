import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

function ProfilePage() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [error, setError] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState('');
  const [myPosts, setMyPosts] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const fileInputRef = useRef(null);

  const uploadBaseURL = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL.replace(/\/?api\/?$/, '')
    : process.env.NODE_ENV === 'production'
      ? 'https://thefolio-backend-81uo.onrender.com'
      : 'http://localhost:5000';

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setBio(user.bio || '');
    }
    // Initialize profile picture preview from user data or localStorage
    if (user?.profile_pic) {
      setProfilePicPreview(`${uploadBaseURL}/uploads/${user.profile_pic}`);
      localStorage.removeItem('profilePicPreview');
    } else {
      const saved = localStorage.getItem('profilePicPreview');
      if (saved) {
        setProfilePicPreview(saved);
      }
    }
  }, [user, uploadBaseURL]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicPreview(e.target.result);
        localStorage.setItem('profilePicPreview', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = async () => {
    if (user?.role === 'admin') return; // Admins don't have profile pictures

    if (profilePic) {
      // Just remove the selected file
      setProfilePic(null);
      setProfilePicPreview(null);
      localStorage.removeItem('profilePicPreview');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else if (user?.profile_pic) {
      // Remove from database
      try {
        setLoadingProfile(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('bio', bio);
        formData.append('removeProfilePic', 'true'); // Flag to remove profile pic

        const { data } = await API.put('/auth/profile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setUser(data);
        setProfileMessage('Profile picture removed successfully.');
        setProfilePicPreview(null);
        localStorage.removeItem('profilePicPreview');
      } catch (err) {
        setError(err?.response?.data?.message || 'Unable to remove profile picture.');
      } finally {
        setLoadingProfile(false);
      }
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setProfileMessage('');
    setLoadingProfile(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('bio', bio);
      if (profilePic && user?.role !== 'admin') {
        formData.append('profilePic', profilePic);
      }

      const { data } = await API.put('/auth/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUser(data);
      setProfileMessage('Profile updated successfully. Na-update ang profile mo.');
      // Keep the preview if a new picture was uploaded (only for non-admins)
      if (profilePic && user?.role !== 'admin') {
        setProfilePicPreview(`${uploadBaseURL}/uploads/${data.profile_pic}`);
        localStorage.removeItem('profilePicPreview');
      } else {
        setProfilePicPreview(null);
      }
      setProfilePic(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to update profile.');
    } finally {
      setLoadingProfile(false);
    }
  };

  const loadMyPosts = async () => {
    setPostsError('');
    setLoadingPosts(true);
    try {
      const { data } = await API.get('/posts/mine');
      setMyPosts(data);
    } catch (err) {
      setPostsError(err?.response?.data?.message || 'Unable to load your posts.');
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadMyPosts();
    }
  }, [user]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPasswordMessage('');
    setLoadingPassword(true);

    try {
      await API.put('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      setPasswordMessage('Password changed successfully. Bagong password na.');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to change password.');
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <main className="profile-page">
      <section className="profile-hero">
        <h2>Profile Page</h2>
        <p>
          I-update ang iyong profile at settings dito. This section gives you control over your name,
          bio, and account password.
        </p>
      </section>

      <section className="profile-summary">
        <h3>Account Overview</h3>
        {user?.role !== 'admin' && (
          <div className="profile-picture-section">
            <h4>Profile Picture</h4>
            <div className="profile-picture-display">
              <img
                src={
                  profilePicPreview ||
                  (user?.profile_pic ? `${uploadBaseURL}/uploads/${user.profile_pic}` : 'https://via.placeholder.com/150x150/cccccc/666666?text=No+Photo')
                }
                alt="Profile"
                className="profile-picture"
              />
              <div className="profile-picture-overlay">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="add-photo-btn"
                >
                  {user?.profile_pic || profilePic ? '📷 Change Picture' : '📷 Add Profile Picture'}
                </button>
                {(user?.profile_pic || profilePic) && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="remove-photo-btn"
                  >
                    🗑️ Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Role:</strong> {user?.role}
        </p>
        <p>
          <strong>Status:</strong> {user?.status || 'active'}
        </p>
      </section>

      <section className="profile-posts">
        <h3>My Posts</h3>
        {loadingPosts ? (
          <p>Loading your posts...</p>
        ) : postsError ? (
          <p className="error-text">{postsError}</p>
        ) : myPosts.length === 0 ? (
          <p>You don&apos;t have any posts yet. Start by writing one!</p>
        ) : (
          <div className="posts-list">
            {myPosts.map((post) => (
              <article key={post.id} className="post-card">
                <h4>{post.title}</h4>
                <p>{post.body.slice(0, 120)}{post.body.length > 120 ? '...' : ''}</p>
                <div className="post-meta">
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  <span className={`status-badge status-${post.status || 'published'}`}>
                    {post.status === 'removed' ? 'Removed' : 'Published'}
                  </span>
                </div>
                <a href={`/post/${post.id}`} className="btn btn-secondary">View Post</a>
              </article>
            ))}
          </div>
        )}
      </section>

      {error && <p className="error-text">{error}</p>}
      {profileMessage && <p className="success-text">{profileMessage}</p>}
      {passwordMessage && <p className="success-text">{passwordMessage}</p>}

      <section className="profile-edit">
        <h3>Edit Profile / I-update ang Profile</h3>
        <form onSubmit={handleProfileSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            rows="4"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Ilagay ang maikling bio mo dito"
          />

          {user?.role !== 'admin' && (
            <input
              ref={fileInputRef}
              type="file"
              id="profilePic"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          )}

          <button type="submit" disabled={loadingProfile}>
            {loadingProfile ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </section>

      <section className="profile-password">
        <h3>Change Password / Palitan ang Password</h3>
        <form onSubmit={handlePasswordSubmit}>
          <label htmlFor="currentPassword">Current Password</label>
          <input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />

          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loadingPassword}>
            {loadingPassword ? 'Saving...' : 'Change Password'}
          </button>
        </form>
      </section>
    </main>
  );
}

export default ProfilePage;
