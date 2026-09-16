import type { PropsWithChildren } from "react";
import { Container } from "./Container";

export function Section({
  children,
  id,
  className = "",
}: PropsWithChildren<{ id?: string; className?: string }>) {
  return (
    <section id={id} className={`section-shell ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
