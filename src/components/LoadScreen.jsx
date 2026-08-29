import './LoadScreen.css';
import zweiLogo from '../assets/ZWEI_logo.png';

const LoadScreen = () => {
  return (
    <div className="load-screen">
      <div className="logo-container">
        <img src={zweiLogo} alt="zwei" className="app-logo" />
      </div>
    </div>
  );
};

export default LoadScreen;
