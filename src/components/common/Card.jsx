function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`rounded-2xl glass-card p-6 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
