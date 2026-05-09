export const Button = ({ children, onClick, variant = "primary" }: { children: React.ReactNode; onClick?: () => void; variant?: "primary" | "secondary" }) => {
  const baseClass = "px-4 py-2 rounded-md font-medium transition-colors";
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-blue-700",
    secondary: "bg-border text-text-primary hover:bg-gray-300"
  };
  return (
    <button className={`${baseClass} ${variants[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
};
