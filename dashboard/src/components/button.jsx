export function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition ${className}`}
    >
      {children}
    </button>
  );
}
