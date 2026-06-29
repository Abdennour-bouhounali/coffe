import { MotionConfig } from "motion/react";
import { ErrorBoundary } from "../../components/common/ErrorBoundary";
import { BrunchSelectionProvider } from "./BrunchSelectionProvider";

export function AppProviders({ children }) {
  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <BrunchSelectionProvider>{children}</BrunchSelectionProvider>
      </MotionConfig>
    </ErrorBoundary>
  );
}

