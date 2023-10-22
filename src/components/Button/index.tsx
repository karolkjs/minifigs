import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

interface ButtonProps {
  onClick?: any;
  url?: string;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  disabled?: boolean;
}

const styles =
  "bg-sky-blue rounded-3xl h-12 px-4 min-w-[200px] drop-shadow-lg active:opacity-50 transition-opacity duration-100 flex items-center justify-center uppercase font-medium w-full sm:w-auto";

const Button = ({ onClick, url, type, disabled, children }: ButtonProps) => {
  return url ? (
    <Link className={styles} to={url}>
      {children}
    </Link>
  ) : (
    <button
      className={classNames(styles, {
        "opacity-50": disabled,
      })}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
