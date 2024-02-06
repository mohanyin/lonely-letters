import { styled } from "@linaria/react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import AppBar from "@/components/AppBar";
import { Colors, Type } from "@/styles/core";

const AppStyles = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  font-family: "${Type.FONT_FAMILY}";
  background: ${Colors.GREEN};
`;

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div vaul-drawer-wrapper="true">
      <AppStyles>
        <AppBar />
        <Outlet />
        {import.meta.env.DEV && <TanStackRouterDevtools />}
      </AppStyles>
    </div>
  );
}
