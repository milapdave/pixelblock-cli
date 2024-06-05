import React from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function to combine class names
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type Radius = 'full' | 'lg' | 'md' | 'sm' | 'none';

interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'size'> {
    color?: Color;
    radius?: Radius;
    label?: string;
    type?: 'input' | 'textarea' | 'number' | 'password' | 'email'; 
}

const InputField: React.FC<InputFieldProps> = ({
    color = 'default',
    radius = 'md',
    label,
    type = 'input', // Default to 'input'
   ...props
}) => {
    let inputClassName =
        'w-full py-2 px-4 border rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 resize-none';

    // Handle color prop
    switch (color) {
        case 'primary':
            inputClassName += ' border-blue-600 focus:border-blue-700 focus:ring-blue-500';
            break;
        case 'secondary':
            inputClassName += ' border-green-600 focus:border-green-700 focus:ring-green-500';
            break;
        case 'success':
            inputClassName += ' border-green-500 bg-green-100/30 focus:border-green-600 focus:ring-green-400';
            break;
        case 'warning':
            inputClassName += ' border-yellow-600 text-black bg-yellow-100/30 focus:border-yellow-700 focus:ring-yellow-500';
            break;
        case 'danger':
            inputClassName += ' border-red-600 bg-red-100/30 focus:border-red-700 focus:ring-red-500';
            break;
        default:
            inputClassName += ' border-gray-300 bg-white focus:border-gray-400 focus:ring-gray-300';
            break;
    }

    // Apply radius classes based on the radius prop
    switch (radius) {
        case 'full':
            inputClassName += ' rounded-full';
            break;
        case 'lg':
            inputClassName += ' rounded-lg';
            break;
        case 'md':
            inputClassName += ' rounded-md';
            break;
        case 'sm':
            inputClassName += ' rounded-sm';
            break;
        case 'none':
            inputClassName += ' rounded-none';
            break;
        default:
            break;
    }

    const combinedClasses = cn(inputClassName);

    return (
        <div className="relative">
            {label && (
                <label
                    htmlFor={props.id}
                    className="text-gray-900 text-sm pointer-events-none transition-all duration-200 ease-in-out pb-1 inline-block"
                >
                    {label}
                </label>
            )}
            {/* Render the appropriate input type based on the 'type' prop */}
            {type === 'textarea'? (
                <textarea className={`${combinedClasses} resize-y`} {...props}></textarea>
            ) : (
                <input type={type} className={combinedClasses} {...props} />
            )}
        </div>
    );
};

export default InputField;
