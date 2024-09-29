import { css } from "@linaria/core";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import AppBar from "@/components/AppBar";
import { colors, font } from "@/styles/core";
import { CENTER_COLUMN } from "@/styles/layout";

const AppContainerStyles = css`
  ${CENTER_COLUMN}
  height: 100svh;
  /* stylelint-disable-next-line font-family-name-quotes */
  font-family: ${font.default};
  background: ${colors.green500};
`;

function AppContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className={AppContainerStyles} vaul-drawer-wrapper="true">
      {children}
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <AppContainer>
      <AppBar />
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </AppContainer>
  );
}
