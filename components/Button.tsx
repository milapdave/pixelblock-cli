import React from 'react';

type ButtonStyle =
  | 'basic'
  | 'slideBottom'
  | 'slideLeft'
  | 'slideRight'
  | 'slideUp'
  | 'circleGrowth'
  | 'rotate';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle?: ButtonStyle;
  variant?: ButtonVariant;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  buttonStyle = 'basic',
  variant = 'primary',
  children,
  onClick,
  ...props
}) => {
  let buttonClassName =
    'inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium  transition-all relative overflow-hidden duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';

  switch (buttonStyle) {
    case 'basic':
      buttonClassName += '  ';
      break;
    case 'slideBottom':
      buttonClassName +=
        ' hover:text-white after:absolute after:top-0 after:z-0 after:h-0 after:w-full after:translate-y-0 after:transform after:bg-blue-700 after:transition-all after:duration-200 after:ease-out after:contain-none hover:bg-blue-600/90 hover:after:h-full hover:after:opacity-90 focus-visible:ring-blue-700';
      break;
    case 'slideLeft':
      buttonClassName +=
        ' hover:text-white after:absolute after:left-0 after:top-0 after:z-0 after:h-full after:w-0 after:translate-x-0 after:transform after:bg-blue-700 after:transition-all after:duration-200 after:ease-out after:contain-none hover:bg-blue-600/90 hover:after:w-full hover:after:opacity-90 focus-visible:ring-blue-700';
      break;
    case 'slideRight':
      buttonClassName +=
        ' hover:text-white after:absolute after:top-0 after:z-0 after:h-full after:w-0 after:translate-x-0 after:transform after:bg-blue-700 after:transition-all after:duration-200 after:ease-out after:contain-none hover:bg-blue-600/90 hover:after:w-full hover:after:opacity-90 focus-visible:ring-blue-700';
      break;
    case 'slideUp':
      buttonClassName +=
        ' hover:text-white after:absolute after:z-0 after:h-0 after:w-full after:translate-y-0 after:transform after:bg-blue-700 after:transition-all after:duration-200 after:ease-out after:contain-none hover:bg-blue-600/90 hover:after:h-full hover:after:opacity-90 focus-visible:ring-blue-700';
      break;
    case 'circleGrowth':
      buttonClassName +=
        ' hover:text-white after:absolute after:z-0 after:h-0 after:w-0 after:translate-y-0 after:transform after:rounded-full after:bg-white after:transition-all after:duration-300 after:ease-out after:contain-none hover:after:h-60 hover:after:w-60 hover:after:opacity-5 focus-visible:ring-blue-700';
      break;
    case 'rotate':
      buttonClassName +=
        ' hover:text-white after:ease relative after:absolute after:right-0 after:z-0 after:h-32 after:w-8 after:translate-x-12 after:rotate-12 after:transform after:rounded-full after:bg-white after:opacity-10 after:transition-all after:duration-1000 after:contain-none hover:bg-blue-700 hover:after:-translate-x-40 focus-visible:ring-blue-700';
      break;
    default:
      break;
  }

  switch (variant) {
    case 'primary':
      buttonClassName += ' bg-blue-600 text-white hover:bg-blue-700';
      break;
    case 'secondary':
      buttonClassName += ' bg-blue-600 text-white hover:bg-blue-700';
      break;
    case 'outline':
      buttonClassName +=
        ' bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 hover:border-blue-700';
      break;
    case 'ghost':
      buttonClassName += ' bg-transparent text-blue-600 hover:bg-blue-50';
      break;
    case 'link':
      buttonClassName += ' bg-transparent text-blue-600 hover:underline';
      break;
    default:
      break;
  }

  return (
    <button className={buttonClassName} onClick={onClick} {...props}>
      <span className='relative z-10'>{children}</span>
    </button>
  );
};

export default Button;