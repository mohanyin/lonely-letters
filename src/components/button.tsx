import { css, cx } from "@linaria/core";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { border, borderRadius, colors, type } from "@/styles/core";

const buttonClass = css`
  ${type.overline}
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  overflow: hidden;
  color: ${colors.black};
  white-space: nowrap;
  text-overflow: ellipsis;
  background: ${colors.gold500};
  border: ${border.thin};
  border-bottom-width: 4px;
  border-radius: ${borderRadius.medium};
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

const smallClass = css`
  height: 36px;
  padding: 4px;
  border-bottom-width: 2px;
`;

const iconClass = css`
  ${type.body}
  width: 36px;
  padding: 0;
`;

const fullWidthClass = css`
  width: 100%;
`;

export default function Button({
  children,
  fullWidth,
  small,
  icon,
  className,
  to,
  onClick,
}: {
  children: React.ReactNode;
  fullWidth?: boolean;
  small?: boolean;
  icon?: boolean;
  className?: string;
  to?: string;
  onClick?: () => void;
}) {
  const [hasTapped, setHasTapped] = useState(false);
  const Tag = to ? Link : onClick ? "button" : "div";
  const _onClick = () => {
    onClick?.();
    setHasTapped(true);
  };
  return (
    <Tag
      className={cx(
        small && smallClass,
        icon && iconClass,
        fullWidth && fullWidthClass,
        hasTapped && tapAnimation,
        buttonClass,
        className,
      )}
      to={to}
      onClick={_onClick}
      onAnimationEnd={() => setHasTapped(false)}
    >
      {children}
    </Tag>
  );
}
