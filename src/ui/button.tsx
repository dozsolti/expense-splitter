export default function Button({
  label,
  className,
  onClick,
  disabled,
  before,
  after,
  variant = "default",
  size = "md",
}: {
  label: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  before?: React.ReactNode;
  after?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
}) {
  return (
    <button
      className={`bg-card hover:bg-card-hover focus:ring-opacity-50 p-2 flex justify-center items-center border border-card-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-card-foreground text-card-foreground ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}
      ${
        variant === "primary"
          ? "bg-primary text-primary-foreground hover:bg-primary-hover focus:ring-primary border-0 "
          : variant === "secondary"
            ? "bg-secondary text-secondary-foreground hover:bg-secondary-hover focus:ring-secondary"
            : variant === "danger"
              ? "bg-destructive text-destructive-foreground hover:bg-destructive-hover focus:ring-destructive border-0"
              : variant === "outline"
                ? "bg-transparent border-card-foreground hover:bg-card-hover focus:ring-card-foreground border-0"
                : ""
      }
      ${
        size === "sm"
          ? "text-sm p-1"
          : size === "lg"
            ? "text-lg px-4 py-3"
            : "text-md px-3 py-2"
      }
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {before}
      {label}
      {after}
    </button>
  );
}
