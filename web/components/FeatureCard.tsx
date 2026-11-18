import { Card } from "./Card";

export function FeatureCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card>
      {icon && (
        <div aria-hidden="true" className="mb-2 text-2xl text-primary">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-muted">{children}</p>
    </Card>
  );
}
