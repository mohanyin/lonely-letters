import { styled } from "@linaria/react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import AppBar from "@/components/AppBar";
import { Type } from "@/styles/core";

const AppStyles = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  font-family: "${Type.FONT_FAMILY}";
`;

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <AppStyles>
      <AppBar />
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </AppStyles>
  );
}
