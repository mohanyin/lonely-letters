import { css, cx } from "@linaria/core";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { BUTTON } from "@/styles/buttons";
import { colors } from "@/styles/core";

const buttonClass = css`
  ${BUTTON}
  display: block;
`;

const tapAnimation = css`
  @keyframes tap {
    50% {
      margin-top: 3px;
      background: ${colors.gold600};
      border-bottom-width: 1px;
    }

    100% {
      background: ${colors.gold500};
    }
  }

  animation: tap 0.3s ease-in-out;
`;

const fullWidthClass = css`
  width: 100%;
`;

export default function Button({
  children,
  fullWidth,
  className,
  to,
  onClick,
}: {
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  to?: string;
  onClick: () => void;
}) {
  const [hasTapped, setHasTapped] = useState(false);
  const Tag = to ? Link : "button";
  const _onClick = () => {
    onClick();
    setHasTapped(true);
  };
  return (
    <Tag
      className={cx(
        className,
        fullWidth && fullWidthClass,
        hasTapped && tapAnimation,
        buttonClass,
      )}
      onClick={_onClick}
      onAnimationEnd={() => setHasTapped(false)}
    >
      {children}
    </Tag>
  );
}
