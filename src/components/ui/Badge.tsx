export const Badge = ({ children, className = "", variant = "default" }: { children: React.ReactNode; className?: string; variant?: "default" | "active" | "historical" }) => {
  const variants = {
    default: "bg-border-subtle text-text-secondary",
    active: "bg-statusBg-active text-status-active",
    historical: "bg-statusBg-historical text-status-historical"
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
