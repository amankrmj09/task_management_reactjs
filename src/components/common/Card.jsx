function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
