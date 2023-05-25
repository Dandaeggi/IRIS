// Loading.tsx
import React, { useState, useEffect } from "react";
import "./Loading.scss";
import SwingCircle from "./SwingCircle";
import { useNavigate } from "react-router-dom";

const Loading: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 40000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        navigate("/setting?tab=0");
      }, 1000); // 애니메이션 지속 시간과 일치하게 설정

      return () => clearTimeout(timer);
    }
  }, [loading, navigate]);

  return (
    <div>
      <div className={`loadingbody${loading ? "" : " fade-out"}`}>
        <div className="copy">
          <div className="Lodinglogo" />
          <h1>iris</h1>
        </div>
        <SwingCircle />
      </div>
      <span className="loader-111">Loading... </span>
    </div>
  );
};

export default Loading;
