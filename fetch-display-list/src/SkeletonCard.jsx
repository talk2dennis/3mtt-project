// components/SkeletonCard.jsx
const SkeletonCard = () => {
    return (
      <div className="card skeleton">
        <div className="skeleton-image" />
        <div className="skeleton-text title" />
        <div className="skeleton-text subtitle" />
      </div>
    );
  }
  
  export default SkeletonCard;
  