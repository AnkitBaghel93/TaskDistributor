import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BubbleBackground.css';

const Home = () => {
  const navigate = useNavigate();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // Only keep delays on first mount
    const timeout = setTimeout(() => {
      setInitialLoad(false);
    }, 100); 
    return () => clearTimeout(timeout);
  }, []);

  const bubbles = Array.from({ length: 20 }).map((_, index) => {
    const size = Math.random() * 60 + 20;
    const left = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const colorOptions = ['#3B82F6', '#60A5FA', '#93C5FD', '#2563EB'];
    const background = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    const drift = (Math.random() - 0.5) * 100;

    return (
      <span
        key={index}
        className="bubble"
        style={{
          width: size,
          height: size,
          left: `${left}%`,
          animationDuration: `${duration}s`,
          animationDelay: initialLoad ? `${Math.random() * 10}s` : '0s',
          backgroundColor: background,
          '--drift': `${drift}px`,
        }}
      />
    );
  });

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bubble-bg">{bubbles}</div>

      <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 py-20 sm:py-32">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-4">
          Welcome to Assignment of CSTech InfoSolutions
        </h1>
        <p className="text-gray-700 text-lg sm:text-xl max-w-xl mb-8">
          Accelerate your task distribution with smart automation and agent-driven productivity.
        </p>
        <button
          onClick={() => navigate('/add-agent')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
        >
          Add Agent
        </button>
      </div>
    </div>
  );
};

export default Home;
