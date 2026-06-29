import { cn } from "../../lib/cn";
import { Container } from "./Container";

export function Section({
  as: Component = "section",
  children,
  className,
  containerClassName,
  contained = true,
  id,
}) {
  const content = contained ? (
    <Container className={containerClassName}>{children}</Container>
  ) : (
    children
  );

  return (
    <Component
      className={cn("section-space scroll-mt-24", className)}
      id={id}
    >
      {content}
    </Component>
  );
}
