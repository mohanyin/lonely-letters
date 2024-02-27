import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import AppBar from "@/components/AppBar";
import { Colors, Type } from "@/styles/core";

const Container = css`
  height: 100svh;
  background: ${Colors.GREEN};
`;

const AppStyles = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  /* stylelint-disable-next-line font-family-name-quotes */
  font-family: ${Type.FONT_FAMILY};
`;

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div vaul-drawer-wrapper="true" className={Container}>
      <AppStyles>
        <AppBar />
        <Outlet />
        {import.meta.env.DEV && <TanStackRouterDevtools />}
      </AppStyles>
    </div>
  );
}
