import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = ({ user }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editImages, setEditImages] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:5000/api/posts');
    setPosts(res.data);
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  const handleImageChange = (e, setImageFunc, currentImages = []) => {
    const files = Array.from(e.target.files);
    const readers = files.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then(imagesArr => {
      setImageFunc([...currentImages, ...imagesArr]);
    });
  };

  const removeImage = (idx, imagesArr, setImageFunc) => {
    const newArr = imagesArr.filter((_, i) => i !== idx);
    setImageFunc(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('http://localhost:5000/api/posts', {
        title,
        content,
        images,
        user: user.id,
      });
      setSuccess('Post published!');
      setTitle('');
      setContent('');
      setImages([]);
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to publish post');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      fetchPosts();
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  const startEdit = (post) => {
    setEditingId(post._id);
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditImages(post.images || []);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/posts/${editingId}`, {
        title: editTitle,
        content: editContent,
        images: editImages,
      });
      setEditingId(null);
      fetchPosts();
    } catch (err) {
      alert('Failed to update post');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="cp-bg">
      <div className="cp-header">
        <div className="cp-icon">📝</div>
        <h2 className="cp-title">Create Blog Post</h2>
        <p className="cp-sub">Share your favorite place in Sri Lanka!</p>
      </div>
      <div className="cp-form-card">
        <div className="cp-logout-wrap">
          <button onClick={handleLogout} className="cp-logout-btn">Logout</button>
        </div>
        <form onSubmit={handleSubmit} className="cp-form">
          <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required className="cp-input" />
          <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required className="cp-textarea" />
          <input type="file" accept="image/*" multiple onChange={e => handleImageChange(e, setImages, images)} className="cp-input-file" />
          {images.length > 0 && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', margin: '10px 0' }}>
              {images.map((img, idx) => (
                <div key={idx} style={{ position: 'relative', display: 'inline-block' }}>
                  <img src={img} alt="Preview" style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 8, boxShadow: '0 2px 8px #0001' }} />
                  <button
                    type="button"
                    onClick={() => removeImage(idx, images, setImages)}
                    style={{ position: 'absolute', top: -8, right: -8, background: '#f44336', color: '#fff', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', fontSize: 12, lineHeight: '20px', padding: 0 }}
                    title="Remove"
                  >×</button>
                </div>
              ))}
            </div>
          )}
          <button type="submit" className="cp-publish-btn">Publish</button>
          {error && <p className="cp-error">{error}</p>}
          {success && <p className="cp-success">{success}</p>}
        </form>
      </div>
      <div className="cp-posts-wrap">
        <h3 className="cp-posts-title">All Blog Posts</h3>
        <div className="cp-posts-grid">
          {posts.map(post => (
            <div key={post._id} className="cp-post-card">
              {editingId === post._id ? (
                <form onSubmit={handleEdit} className="cp-form cp-edit-form">
                  <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} required className="cp-input" />
                  <textarea value={editContent} onChange={e => setEditContent(e.target.value)} required className="cp-textarea" />
                  <input type="file" accept="image/*" multiple onChange={e => handleImageChange(e, setEditImages, editImages)} className="cp-input-file" />
                  {editImages.length > 0 && (
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', margin: '10px 0' }}>
                      {editImages.map((img, idx) => (
                        <div key={idx} style={{ position: 'relative', display: 'inline-block' }}>
                          <img src={img} alt="Edit Preview" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, boxShadow: '0 2px 8px #0001' }} />
                          <button
                            type="button"
                            onClick={() => removeImage(idx, editImages, setEditImages)}
                            style={{ position: 'absolute', top: -8, right: -8, background: '#f44336', color: '#fff', border: 'none', borderRadius: '50%', width: 18, height: 18, cursor: 'pointer', fontSize: 11, lineHeight: '18px', padding: 0 }}
                            title="Remove"
                          >×</button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="cp-btn-group">
                    <button type="submit" className="cp-btn cp-save">Save</button>
                    <button type="button" onClick={() => setEditingId(null)} className="cp-btn cp-cancel">Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <h4 className="cp-post-title">{post.title}</h4>
                  <p className="cp-post-content">{post.content.length > 100 ? post.content.slice(0, 100) + '...' : post.content}</p>
                  {Array.isArray(post.images) && post.images.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: 8 }}>
                      {post.images.map((img, idx) => (
                        <img key={idx} src={img} alt="Post" className="cp-post-img" style={{ width: 70, height: 70 }} />
                      ))}
                    </div>
                  )}
                  <p className="cp-post-meta"><b>By:</b> {post.user?.username || 'Unknown'}</p>
                  <p className="cp-post-meta"><i>{new Date(post.createdAt).toLocaleString()}</i></p>
                  {user && post.user && user.id === post.user._id && (
                    <div className="cp-btn-group">
                      <button onClick={() => startEdit(post)} className="cp-btn cp-edit">Edit</button>
                      <button onClick={() => handleDelete(post._id)} className="cp-btn cp-delete">Delete</button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .cp-bg {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #e0f7fa 0%, #fff 60%, #c8e6c9 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 10px 40px 10px;
        }
        .cp-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 30px;
          margin-bottom: 18px;
        }
        .cp-icon {
          background: rgba(255,255,255,0.7);
          border-radius: 50%;
          box-shadow: 0 2px 12px #0002;
          font-size: 2.5rem;
          padding: 18px;
          margin-bottom: 8px;
        }
        .cp-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: #2196f3;
          margin-bottom: 4px;
          text-align: center;
        }
        .cp-sub {
          color: #388e3c;
          font-size: 1.1rem;
          font-weight: 500;
          text-align: center;
        }
        .cp-form-card {
          background: rgba(255,255,255,0.7);
          border-radius: 24px;
          box-shadow: 0 8px 32px 0 rgba(31,38,135,0.18);
          padding: 2.5rem 2rem 2rem 2rem;
          max-width: 480px;
          width: 100%;
          margin-bottom: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          backdrop-filter: blur(8px);
        }
        .cp-logout-wrap {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          margin-bottom: 10px;
        }
        .cp-logout-btn {
          background: linear-gradient(90deg, #ff7043 0%, #ffb300 100%);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 8px 20px;
          font-weight: bold;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 2px 8px #0002;
          transition: background 0.2s, transform 0.2s;
        }
        .cp-logout-btn:hover {
          background: linear-gradient(90deg, #ffb300 0%, #ff7043 100%);
          transform: scale(1.06);
        }
        .cp-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 18px;
          align-items: center;
        }
        .cp-input, .cp-textarea {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: none;
          font-size: 1rem;
          background: rgba(255,255,255,0.85);
          color: #222;
          box-shadow: 0 2px 8px #0001;
          outline: none;
          font-weight: 500;
          letter-spacing: 0.5px;
          display: block;
        }
        .cp-input:focus, .cp-textarea:focus {
          box-shadow: 0 0 0 2px #2196f3;
        }
        .cp-textarea {
          min-height: 100px;
          resize: vertical;
        }
        .cp-input-file {
          width: 100%;
          margin-top: 2px;
        }
        .cp-publish-btn {
          width: 100%;
          background: linear-gradient(90deg, #2196f3 0%, #4caf50 100%);
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 14px;
          font-weight: 800;
          font-size: 1.1rem;
          box-shadow: 0 4px 16px #0003;
          cursor: pointer;
          margin-top: 8px;
          letter-spacing: 1px;
          transition: background 0.2s, transform 0.2s;
        }
        .cp-publish-btn:hover {
          background: linear-gradient(90deg, #4caf50 0%, #2196f3 100%);
          transform: scale(1.04);
        }
        .cp-error {
          color: #f44336;
          text-align: center;
          font-weight: 600;
          font-size: 1rem;
        }
        .cp-success {
          color: #388e3c;
          text-align: center;
          font-weight: 600;
          font-size: 1rem;
        }
        .cp-posts-wrap {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
        }
        .cp-posts-title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          text-align: center;
          color: #333;
        }
        .cp-posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
          gap: 24px;
        }
        .cp-post-card {
          background: rgba(255,255,255,0.95);
          border-radius: 18px;
          box-shadow: 0 4px 16px #0001;
          padding: 1.5rem 1.2rem 1.2rem 1.2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 1px solid #e3e3e3;
          min-height: 220px;
          position: relative;
        }
        .cp-post-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #2196f3;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .cp-post-content {
          color: #444;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .cp-post-img {
          border-radius: 10px;
          max-width: 100%;
          max-height: 140px;
          object-fit: cover;
          margin-bottom: 0.5rem;
          box-shadow: 0 2px 8px #0001;
        }
        .cp-post-meta {
          color: #888;
          font-size: 0.95rem;
          margin-bottom: 0.2rem;
          text-align: center;
        }
        .cp-btn-group {
          display: flex;
          gap: 0.7rem;
          margin-top: 0.5rem;
        }
        .cp-btn {
          padding: 7px 18px;
          border-radius: 8px;
          border: none;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 2px 8px #0002;
          transition: background 0.2s, transform 0.2s;
        }
        .cp-edit {
          background: linear-gradient(90deg, #2196f3 0%, #4caf50 100%);
          color: #fff;
        }
        .cp-edit:hover {
          background: linear-gradient(90deg, #4caf50 0%, #2196f3 100%);
          transform: scale(1.08);
        }
        .cp-delete {
          background: linear-gradient(90deg, #ff7043 0%, #ffb300 100%);
          color: #fff;
        }
        .cp-delete:hover {
          background: linear-gradient(90deg, #ffb300 0%, #ff7043 100%);
          transform: scale(1.08);
        }
        .cp-save {
          background: linear-gradient(90deg, #2196f3 0%, #4caf50 100%);
          color: #fff;
        }
        .cp-save:hover {
          background: linear-gradient(90deg, #4caf50 0%, #2196f3 100%);
          transform: scale(1.08);
        }
        .cp-cancel {
          background: #eee;
          color: #333;
        }
        .cp-cancel:hover {
          background: #ccc;
          color: #111;
          transform: scale(1.08);
        }
        @media (max-width: 700px) {
          .cp-form-card {
            padding: 1.2rem 0.5rem 1.5rem 0.5rem;
            max-width: 98vw;
          }
          .cp-header {
            margin-top: 18px;
          }
          .cp-title {
            font-size: 1.3rem;
          }
          .cp-posts-title {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CreatePost; 