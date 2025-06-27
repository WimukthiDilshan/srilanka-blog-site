import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleEdit = () => alert('Edit functionality coming soon!');
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      alert('Delete functionality coming soon!');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', fontSize: '18px', marginTop: '50px' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', fontSize: '18px', marginTop: '50px', color: 'red' }}>{error}</div>;
  if (!post) return <div style={{ textAlign: 'center', fontSize: '18px', marginTop: '50px' }}>Post not found.</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '10px' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#eee',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '10px'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#ddd'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#eee'}
      >
        &larr; Back
      </button>

      <div style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        padding: '20px'
      }}>
        <h2 style={{ fontSize: '28px', color: '#4a148c', marginBottom: '15px' }}>{post.title}</h2>

        {/* Show all images if available, or fallback to single image */}
        {Array.isArray(post.images) && post.images.length > 0 ? (
          <div className={`blog-details-gallery-grid blog-details-gallery-count-${post.images.length}`}>
            {post.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="Post"
                className="blog-details-gallery-img"
              />
            ))}
          </div>
        ) : post.image ? (
          <div className="blog-details-gallery-grid blog-details-gallery-count-1">
            <img src={post.image} alt="Post" className="blog-details-gallery-img" />
          </div>
        ) : null}

        <p style={{ fontSize: '16px', color: '#333', marginBottom: '15px' }}>{post.content}</p>

        <div style={{ fontSize: '14px', color: '#666' }}>
          <p><b>By:</b> {post.user?.username || 'Unknown'}</p>
          <p><i>{new Date(post.createdAt).toLocaleString()}</i></p>
        </div>

        {user && post.user && user.id === post.user._id && (
          <div style={{ marginTop: '15px' }}>
            <button
              onClick={handleEdit}
              style={{
                padding: '8px 16px',
                backgroundColor: '#2196f3',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1976d2'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#2196f3'}
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f44336',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#d32f2f'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#f44336'}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <style>{`
        .blog-details-gallery-grid {
          display: grid;
          grid-gap: 14px;
          margin-bottom: 18px;
          width: 100%;
        }
        .blog-details-gallery-count-1 {
          grid-template-columns: 1fr;
        }
        .blog-details-gallery-count-2 {
          grid-template-columns: 1fr 1fr;
        }
        .blog-details-gallery-count-3 {
          grid-template-columns: 1fr 1fr 1fr;
        }
        .blog-details-gallery-count-4, .blog-details-gallery-count-5, .blog-details-gallery-count-6 {
          grid-template-columns: repeat(3, 1fr);
        }
        .blog-details-gallery-img {
          width: 100%;
          height: 260px;
          object-fit: cover;
          border-radius: 16px;
          border: 2px solid #e3e3e3;
          box-shadow: 0 2px 8px #0001;
          transition: transform 0.18s, box-shadow 0.18s;
          background: #fafafa;
        }
        .blog-details-gallery-img:hover {
          transform: scale(1.04);
          box-shadow: 0 4px 16px #0002;
          border-color: #90caf9;
        }
        @media (max-width: 700px) {
          .blog-details-gallery-img {
            height: 110px;
          }
          .post-details-card {
            padding: 1.2rem 0.5rem 1.2rem 0.5rem;
            max-width: 98vw;
          }
          .post-details-title {
            font-size: 1.1rem;
          }
          .post-details-btn {
            font-size: 1rem;
            padding: 10px;
          }
        }
        @media (max-width: 480px) {
          .blog-details-gallery-img {
            height: 70px;
          }
          .post-details-card {
            padding: 0.7rem 0.1rem 0.7rem 0.1rem;
          }
          .post-details-title {
            font-size: 1rem;
          }
          .post-details-btn {
            font-size: 0.9rem;
            padding: 8px;
          }
        }
        html, body, #root {
          max-width: 100vw;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
};

export default PostDetails;
