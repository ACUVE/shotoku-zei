import * as React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, style, ...props }: ButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  const baseStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s ease-in-out',
    outline: 'none',
  };

  const hoverStyle: React.CSSProperties = isHovered
    ? { backgroundColor: '#0051cc' }
    : {};

  const focusStyle: React.CSSProperties = isFocused
    ? { boxShadow: '0 0 0 3px rgba(0, 112, 243, 0.3)' }
    : {};

  const activeStyle: React.CSSProperties = isActive
    ? { transform: 'scale(0.98)' }
    : {};

  return (
    <button
      {...props}
      style={{
        ...baseStyle,
        ...hoverStyle,
        ...focusStyle,
        ...activeStyle,
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
    >
      {children}
    </button>
  );
}
