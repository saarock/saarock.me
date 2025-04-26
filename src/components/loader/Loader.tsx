import "./Loader.css";

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p className="loader-text">Loading...</p>
    </div>
  );
};

export default Loader;