export default function Input({
  label,
  placeholder,
  className,
  value,
  onChange,
  onEnter,
  ...rest
}: {
  label?: string;
  placeholder?: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "onKeyDown"
>) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="mb-0.5 font-bold text-card-foreground">{label}</label>
      )}
      <input
        type="text"
        placeholder={placeholder}
        className="bg-blue-50 p-2 border border-card-foreground focus:border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700 text-card-foreground"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onEnter) {
            onEnter();
          }
        }}
        {...rest}
      />
    </div>
  );
}
