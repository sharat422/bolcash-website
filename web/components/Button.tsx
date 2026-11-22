const styles = {
  primary: "bg-primary text-on-primary hover:bg-primary-strong",
  accent: "bg-accent text-on-accent hover:brightness-95",
  outline: "border border-primary text-primary hover:bg-surface-2",
};

/** Class names for anything that looks like a button (links and real <button>s). */
export const buttonClass = (variant: keyof typeof styles = "primary", className = "") =>
  `inline-flex min-h-11 items-center justify-center rounded-md px-4 text-base font-semibold ${styles[variant]} ${className}`;

export function Button({
  href,
  variant = "primary",
  external = false,
  className = "",
  children,
}: {
  href: string;
  variant?: keyof typeof styles;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={buttonClass(variant, className)}
    >
      {children}
    </a>
  );
}
