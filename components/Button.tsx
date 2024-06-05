import React from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function to combine class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link' | 'shadow' | 'slideBottom';

type ButtonSize = 'sm' | 'md' | 'lg';

type Radius = 'full' | 'lg' | 'md' | 'sm' | 'none';



interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  icon?: React.ReactNode;
  radius?: Radius;
  color?: Color; 
}

const Button: React.FC<ButtonProps> = ({
  color = 'default', 
  variant,
  size = 'md',
  radius = 'md',
  children,
  onClick,
  icon,
  ...props
}) => {
  let buttonClassName =
    'inline-flex  gap-2  whitespace-nowrap items-center justify-center rounded-md  transition-all relative overflow-hidden duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';

  // Handle color prop
  switch (color) {
    case 'primary':
      buttonClassName += ' bg-blue-600 text-white hover:bg-blue-700 border-blue-600';
      break;
    case 'secondary':
      buttonClassName += ' bg-green-600 text-white hover:bg-green-700  border-green-600';
      break;
    case 'success':
      buttonClassName += ' bg-green-500 text-white hover:bg-green-600 border-green-500';
      break;
    case 'warning':
      buttonClassName += ' bg-yellow-600 text-black hover:bg-yellow-700 border-yellow-600';
      break;
    case 'danger':
      buttonClassName += ' bg-red-600 text-white hover:bg-red-700 border-red-600';
      break;
    default:
      break;
  }

  // Size classes
  switch (size) {
    case 'sm':
      buttonClassName += ' h-10 px-4 text-sm font-medium';
      break;
    case 'md':
      buttonClassName += '  h-10 px-6 text-base font-medium';
      break;
    case 'lg':
      buttonClassName += ' h-12 px-8 text-base font-medium';
      break;
    default:
      break;
  }

  // Apply radius classes based on the radius prop
  switch (radius) {
    case 'full':
      buttonClassName += ' rounded-full';
      break;
    case 'lg':
      buttonClassName += ' rounded-lg';
      break;
    case 'md':
      buttonClassName += ' rounded-md';
      break;
    case 'sm':
      buttonClassName += ' rounded-sm';
      break;
    case 'none':
      buttonClassName += ' rounded-none';
      break;
    default:
      break;
  }

  // Updated switch statement for variant
  switch (variant) {
    case 'outline':
      let outlineColorClass = '';
      switch (color) {
        case 'primary':
          outlineColorClass = 'border-blue-700 text-blue-700 hover:text-white';
          break;
        case 'secondary':
          outlineColorClass = 'border-green-700 text-green-700 hover:bg-green-700/20 ';
          break;
        case 'success':
          outlineColorClass = 'border-green-600 text-green-600 hover:text-white';
          break;
        case 'warning':
          outlineColorClass = 'border-yellow-700 text-yellow-700 hover:text-white';
          break;
        case 'danger':
          outlineColorClass = 'border-red-700 text-red-700 hover:text-white';
          break;
        default:
          outlineColorClass = 'border-gray-400';
      }
      buttonClassName += ` ${outlineColorClass} bg-transparent  border-2`;
      break;
    case 'ghost':
      let ghostColorClass = '';
      switch (color) {
        case 'primary':
          ghostColorClass = ' text-blue-600 hover:bg-blue-50';
          break;
        case 'secondary':
          ghostColorClass = 'border-green-700 text-green-700 hover:bg-green-700/20 ';
          break;
        case 'success':
          ghostColorClass = 'border-green-600 text-green-600 hover:bg-green-600/20';
          break;
        case 'warning':
          ghostColorClass = 'border-yellow-700 text-yellow-700  hover:bg-yellow-700/20';
          break;
        case 'danger':
          ghostColorClass = 'border-red-700 text-red-700 hover:bg-red-700/20';
          break;
        default:
          ghostColorClass = 'border-gray-400';
      }
      buttonClassName += ` ${ghostColorClass} bg-transparent`;
      break;
    case 'link':
      let linkColorClass = '';
      switch (color) {
        case 'primary':
          linkColorClass = ' text-blue-600 ';
          break;
        case 'secondary':
          linkColorClass = 'text-green-700';
          break;
        case 'success':
          linkColorClass = 'text-green-600';
          break;
        case 'warning':
          linkColorClass = 'text-yellow-700';
          break;
        case 'danger':
          linkColorClass = 'text-red-700';
          break;
        default:
          linkColorClass = 'border-gray-400';
      }
      buttonClassName += ` ${linkColorClass} !px-0 !bg-transparent hover:underline`;
      break;
    case 'shadow':
      buttonClassName += ' shadow-lg hover:shadow-xl';
      break;
    default:
      break;
  }

  const combinedClasses = cn(buttonClassName);


  return (
    <button className={combinedClasses} onClick={onClick} {...props}>
      {icon && <span>{icon}</span>}
      {children &&
        <span className='relative z-10'>
          {children}
        </span>
      }
    </button>
  );
};

export default Button;