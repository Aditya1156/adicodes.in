import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { keyboardNavigation, reducedMotionUtils } from '../lib/accessibility';

interface AccessibleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  motionProps?: MotionProps;
  announceOnClick?: string;
}

const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    loadingText = 'Loading...',
    leftIcon,
    rightIcon,
    fullWidth = false,
    disabled,
    onClick,
    motionProps,
    announceOnClick,
    className = '',
    type = 'button',
    ...props
  }, ref) => {
    // Base styles
    const baseStyles = `
      inline-flex items-center justify-center font-medium rounded-lg
      transition-all duration-200 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      ${fullWidth ? 'w-full' : ''}
    `;

    // Variant styles
    const variantStyles = {
      primary: `
        bg-blue-600 text-white hover:bg-blue-700
        focus:ring-blue-500 active:bg-blue-800
        border border-transparent
      `,
      secondary: `
        bg-gray-600 text-white hover:bg-gray-700
        focus:ring-gray-500 active:bg-gray-800
        border border-transparent
      `,
      outline: `
        bg-transparent text-blue-600 border border-blue-600
        hover:bg-blue-50 hover:text-blue-700 hover:border-blue-700
        focus:ring-blue-500 active:bg-blue-100
        dark:text-blue-400 dark:border-blue-400
        dark:hover:bg-blue-900/20 dark:hover:text-blue-300
      `,
      ghost: `
        bg-transparent text-gray-700 hover:bg-gray-100
        focus:ring-gray-500 active:bg-gray-200
        border border-transparent
        dark:text-gray-300 dark:hover:bg-gray-800
      `,
      danger: `
        bg-red-600 text-white hover:bg-red-700
        focus:ring-red-500 active:bg-red-800
        border border-transparent
      `
    };

    // Size styles
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm gap-1.5 min-h-[2rem]',
      md: 'px-4 py-2 text-base gap-2 min-h-[2.5rem]',
      lg: 'px-6 py-3 text-lg gap-2.5 min-h-[3rem]'
    };

    // Handle click with accessibility announcements
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) return;

      // Announce to screen readers if specified
      if (announceOnClick) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = announceOnClick;
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
      }

      onClick?.(event);
    };

    // Handle keyboard activation
    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      keyboardNavigation.handleActivation(event, () => {
        if (!loading && !disabled) {
          handleClick(event as any);
        }
      });
      props.onKeyDown?.(event);
    };

    // Loading spinner component
    const LoadingSpinner = () => (
      <svg
        className={`animate-spin ${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'}`}
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    const buttonContent = (
      <>
        {loading && <LoadingSpinner />}
        {!loading && leftIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <span className={loading ? 'sr-only' : ''}>
          {loading ? loadingText : children}
        </span>
        {loading && (
          <span aria-live="polite" className="sr-only">
            {loadingText}
          </span>
        )}
        {!loading && rightIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </>
    );

    const buttonProps = {
      ref,
      type,
      disabled: disabled || loading,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      className: `
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `.replace(/\s+/g, ' ').trim(),
      'aria-disabled': disabled || loading,
      'aria-busy': loading,
      ...props
    };

    // Return motion button if motionProps provided and animations are enabled
    if (motionProps && !reducedMotionUtils.prefersReducedMotion()) {
      return (
        <motion.button
          {...buttonProps}
          {...motionProps}
          whileHover={reducedMotionUtils.respectReducedMotion(
            motionProps.whileHover || { scale: 1.02 },
            {}
          )}
          whileTap={reducedMotionUtils.respectReducedMotion(
            motionProps.whileTap || { scale: 0.98 },
            {}
          )}
        >
          {buttonContent}
        </motion.button>
      );
    }

    return (
      <button {...buttonProps}>
        {buttonContent}
      </button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';

export default AccessibleButton;