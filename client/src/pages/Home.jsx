import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        setPosts(res.data);
      } catch (err) {
        // ignore error
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="home-bg">
      <header className="home-header">
        <div className="home-header-left">
          <h1 className="home-title">🌴 Sri Lanka Beautiful Places Blog</h1>
          <p className="home-subtitle">Discover and share the most stunning places in Sri Lanka!</p>
        </div>
        <div className="home-header-right">
          <button onClick={() => navigate('/login')} className="home-btn">Login</button>
          <video
            className="home-header-video"
            src="/sri-lanka-nature.mp4"
            autoPlay
            loop
            muted
            playsInline
            width={60}
            height={40}
          />
          <button onClick={() => navigate('/register')} className="home-btn home-btn-register">Register</button>
        </div>
      </header>
      {/* Local/hosted video section */}
      <section className="flex justify-center mb-10 relative">
        <div className="w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-lg border-4 border-white relative">
          <video
            className="w-full h-full object-cover"
            src="/sri-lanka-nature.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
            <h2 className="text-white text-xl md:text-2xl font-bold drop-shadow">Experience the Beauty of Sri Lanka 🌊🌾</h2>
            <p className="text-white/90 text-sm md:text-base">From golden beaches to lush paddy fields, let the sights inspire your next adventure!</p>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4">
        <div className="posts-list creative-posts-list">
          <h3 className="creative-posts-title">All Blog Posts</h3>
          {posts.length === 0 && <p className="text-center text-gray-500">No posts yet. Be the first to share a beautiful place!</p>}
          <div className="creative-posts-grid">
            {posts.map(post => (
              <div key={post._id} className="creative-post-card fade-in">
                <div className="creative-card-accent" />
                {/* Show all images if available, or fallback to single image */}
                {Array.isArray(post.images) && post.images.length > 0 ? (
                  <div className={`blog-gallery-grid blog-gallery-count-${post.images.length}`} style={{ marginBottom: 10 }}>
                    {post.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="Post"
                        className="blog-gallery-img"
                      />
                    ))}
                  </div>
                ) : post.image ? (
                  <div className="blog-gallery-grid blog-gallery-count-1" style={{ marginBottom: 10 }}>
                    <img src={post.image} alt="Post" className="blog-gallery-img" />
                  </div>
                ) : null}
                <h4 className="creative-post-title">{post.title}</h4>
                <p className="creative-post-content">{post.content.length > 100 ? post.content.slice(0, 100) + '...' : post.content}</p>
                <div className="creative-post-meta">
                  <span><b>By:</b> {post.user?.username || 'Unknown'}</span>
                  <span className="creative-post-date">{new Date(post.createdAt).toLocaleString()}</span>
                </div>
                <button
                  className="creative-more-btn"
                  onClick={() => navigate(`/post/${post._id}`)}
                >
                  Read More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .home-bg {
          min-height: 100vh;
          background: linear-gradient(135deg, #e0f7fa 0%, #fff 60%, #c8e6c9 100%);
        }
        .home-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.2rem;
          background: rgba(255,255,255,0.85);
          box-shadow: 0 4px 24px 0 rgba(33,150,243,0.10);
          backdrop-filter: blur(12px);
          border-radius: 0 0 24px 24px;
          z-index: 10;
          max-height: 120px;
          box-sizing: border-box;
        }
        .home-header-left {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
          margin-right: 1rem;
        }
        .home-title {
          font-size: 2rem;
          font-weight: 800;
          color: #2196f3;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 8px #b2ebf2;
        }
        .home-subtitle {
          color: #388e3c;
          font-size: 1rem;
          font-weight: 500;
          margin: 0.3rem 0 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-shadow: 0 1px 4px #c8e6c9;
        }
        .home-header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-shrink: 0;
          min-width: 0;
        }
        .home-header-video {
          margin: 0 0.5rem;
        }
        .home-btn, .home-btn-register {
          min-width: 120px;
          max-width: 160px;
          padding: 0.7rem 1.5rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .home-btn {
          padding: 0.7rem 2.2rem;
          border-radius: 24px;
          border: none;
          font-weight: 700;
          font-size: 1.1rem;
          background: linear-gradient(90deg, #2196f3 0%, #4caf50 100%);
          color: #fff;
          box-shadow: 0 2px 8px #0002;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          text-align: center;
          display: inline-block;
        }
        .home-btn:hover {
          background: linear-gradient(90deg, #4caf50 0%, #2196f3 100%);
          transform: scale(1.08);
        }
        .home-btn-register {
          background: linear-gradient(90deg, #ffb300 0%, #ff7043 100%);
          color: #fff;
        }
        .home-btn-register:hover {
          background: linear-gradient(90deg, #ff7043 0%, #ffb300 100%);
        }
        @media (max-width: 1024px) {
          .home-header {
            padding: 1rem 0.5rem;
          }
          .home-header-right {
            gap: 0.7rem;
          }
        }
        @media (max-width: 768px) {
          .home-header {
            padding: 1rem;
          }
          .home-title {
            font-size: 1.6rem;
          }
          .home-subtitle {
            font-size: 0.9rem;
          }
          .home-header-right {
            gap: 1rem;
          }
        }
        @media (max-width: 640px) {
          .home-header {
            flex-direction: column;
            padding: 1rem 0.5rem;
            max-height: none;
          }
          .home-header-left {
            margin-right: 0;
            margin-bottom: 1rem;
            text-align: center;
            width: 100%;
          }
          .home-header-right {
            width: 100%;
            justify-content: center;
            gap: 0.5rem;
          }
          .home-title {
            font-size: 1.4rem;
            text-align: center;
          }
          .home-subtitle {
            font-size: 0.85rem;
            text-align: center;
          }
          .home-btn {
            min-width: 110px;
            padding: 0.5rem 1rem;
          }
          .home-header-video {
            width: 50px;
            height: 35px;
          }
        }
        @media (max-width: 480px) {
          .home-header {
            padding: 0.8rem 0.5rem;
          }
          .home-title {
            font-size: 1.2rem;
          }
          .home-subtitle {
            font-size: 0.8rem;
          }
          .home-btn {
            min-width: 100px;
            padding: 0.5rem 0.8rem;
            font-size: 0.9rem;
          }
          .home-header-video {
            width: 40px;
            height: 30px;
          }
        }
        /* Blog gallery styles */
        .blog-gallery-grid {
          display: grid;
          grid-gap: 12px;
          margin-bottom: 18px;
          width: 100%;
        }
        .blog-gallery-count-1 {
          grid-template-columns: 1fr;
        }
        .blog-gallery-count-2 {
          grid-template-columns: 1fr 1fr;
        }
        .blog-gallery-count-3 {
          grid-template-columns: 1fr 1fr 1fr;
        }
        .blog-gallery-count-4, .blog-gallery-count-5, .blog-gallery-count-6 {
          grid-template-columns: repeat(3, 1fr);
        }
        .blog-gallery-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 16px;
          border: 2px solid #e3e3e3;
          box-shadow: 0 2px 8px #0001;
          transition: transform 0.18s, box-shadow 0.18s;
          background: #fafafa;
        }
        .blog-gallery-img:hover {
          transform: scale(1.04);
          box-shadow: 0 4px 16px #0002;
          border-color: #90caf9;
        }
        @media (max-width: 700px) {
          .blog-gallery-img {
            height: 120px;
          }
        }
        .creative-posts-list {
          margin-top: 40px;
        }
        .creative-posts-title {
          font-size: 2.2rem;
          font-weight: 900;
          text-align: center;
          color: #1976d2;
          margin-bottom: 2.2rem;
          letter-spacing: 1px;
          text-shadow: 0 2px 8px #b2ebf2;
        }
        .creative-posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 32px;
        }
        .creative-post-card {
          background: rgba(255,255,255,0.97);
          border-radius: 22px;
          box-shadow: 0 8px 32px 0 rgba(31,38,135,0.13);
          padding: 2.2rem 1.5rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.2s, transform 0.2s;
          min-height: 340px;
          animation: fadeInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .creative-post-card:hover {
          box-shadow: 0 16px 48px 0 rgba(33,150,243,0.18);
          transform: translateY(-6px) scale(1.025);
        }
        .creative-card-accent {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 7px;
          background: linear-gradient(90deg, #2196f3 0%, #4caf50 100%);
          border-radius: 22px 22px 0 0;
        }
        .creative-post-title {
          font-size: 1.7rem;
          font-weight: 900;
          color: #1976d2;
          margin-bottom: 0.7rem;
          text-align: center;
          letter-spacing: 0.5px;
          background: linear-gradient(90deg, #2196f3 0%, #4caf50 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .creative-post-content {
          color: #444;
          margin-bottom: 0.7rem;
          text-align: center;
          font-size: 1.08rem;
        }
        .creative-post-meta {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #888;
          font-size: 0.98rem;
          margin-bottom: 0.7rem;
        }
        .creative-post-date {
          font-size: 0.93rem;
          color: #aaa;
        }
        .creative-more-btn {
          margin-top: 0.7rem;
          padding: 10px 32px;
          border-radius: 18px;
          border: none;
          font-weight: 700;
          font-size: 1.08rem;
          background: linear-gradient(90deg, #2196f3 0%, #4caf50 100%);
          color: #fff;
          box-shadow: 0 2px 8px #0002;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .creative-more-btn:hover {
          background: linear-gradient(90deg, #4caf50 0%, #2196f3 100%);
          transform: scale(1.08);
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Home; 