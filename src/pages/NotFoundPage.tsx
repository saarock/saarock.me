import { motion } from "framer-motion";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      {/* Background decorative elements */}
      <div className="background-texture"></div>
      <div className="glow-circle-top-left"></div>
      <div className="glow-circle-bottom-right"></div>

      <motion.h1
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="error-code"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        className="error-title"
      >
        Oops! Page Not Found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="error-message"
      >
        The page you're looking for has vanished or is temporarily unavailable. Let's get you back on track!
      </motion.p>

      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.9, duration: 0.6, type: "spring", stiffness: 120 }}
        whileHover={{ scale: 1.05, rotate: 2 }}
      >
        <Link to="/" className="home-button">
          <span>Go Home</span>
          <div className="button-overlay"></div>
        </Link>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Inter:wght@400;500&family=Roboto+Slab:wght@300&display=swap');

        .not-found-container {
          min-height: 100vh;
    background: linear-gradient(135deg, #1e3a8a, #6b21a8, #db2777);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #fff;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .background-texture {
          position: absolute;
          inset: 0;
          background: url('https://www.transparenttextures.com/patterns/stardust.png');
          opacity: 0.2;
        }

        .glow-circle-top-left {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(80px);
          top: -80px;
          left: -80px;
          animation: pulse 6s infinite ease-in-out;
        }

        .glow-circle-bottom-right {
          position: absolute;
          width: 400px;
          height: 400px;
          background: rgba(255, 105, 180, 0.2);
          border-radius: 50%;
          filter: blur(60px);
          bottom: -40px;
          right: -40px;
          animation: pulse 8s infinite ease-in-out 1s;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.3;
          }
        }

        .error-code {
          font-family: 'Poppins', sans-serif;
          font-size: 12rem;
          font-weight: 700;
          letter-spacing: -0.05em;
          background: linear-gradient(to right, #fff, #ff69b4);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          text-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          line-height: 1.1;
        }

        .error-title {
          font-family: 'Inter', sans-serif;
          font-size: 2.5rem;
          font-weight: 500;
          margin: 1.5rem 0 2.5rem;
          letter-spacing: 0.02em;
          text-align: center;
          line-height: 1.3;
        }

        .error-message {
          font-family: 'Roboto Slab', serif;
          font-size: 1.25rem;
          font-weight: 300;
          line-height: 1.8;
          text-align: center;
          max-width: 500px;
          margin-bottom: 3rem;
          opacity: 0.9;
        }

        .home-button {
          position: relative;
          display: inline-block;
          background: linear-gradient(to right, #fff, #f0f0f0);
          color: #4b0082;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 1.25rem;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          text-decoration: none;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .home-button span {
          position: relative;
          z-index: 10;
        }

        .button-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, #ff1493, #800080);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .home-button:hover .button-overlay {
          opacity: 1;
        }

        .home-button:hover {
          color: #fff;
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 768px) {
          .error-code {
            font-size: 8rem;
          }
          .error-title {
            font-size: 1.75rem;
          }
          .error-message {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;