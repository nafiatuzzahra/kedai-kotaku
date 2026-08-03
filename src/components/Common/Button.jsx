function Button({ children, onClick, variant = "primary" }) {
  const styles = {
    primary: "bg-[#e7007d] hover:bg-[#c9006b] text-white shadow-lg shadow-pink-500/20",

    secondary: "border border-white/40 bg-white/10 hover:bg-white/20 text-white",

    outline:
      "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`${styles[variant]} inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold transition duration-300`}
    >
      {children}
    </button>
  );
}

export default Button;
