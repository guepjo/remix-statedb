import React from "react";
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}], react/prop-types: 0 */
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AppProviders } from "~/context";

const customRender = (ui: JSX.Element, options?: Record<string, any>) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <AppProviders>{children}</AppProviders>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return render(ui, { wrapper: Wrapper as unknown as any, ...options });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
