import { forwardRef } from 'react';
import { ButtonProps as ButtonUIProps, Button as ButtonUI } from './ui/button';

interface CustomButtonProps extends ButtonUIProps { }

export const Button = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <ButtonUI ref={ref} {...props} className='bg-primary text-white py-2 px-4 rounded-sm shadow-xl/10 cursor-pointer font-semibold text-sm w-full hover:bg-primary-600/90'>
        {children}
      </ButtonUI>
    );
  }
);

Button.displayName = 'Button';

export type { ButtonUIProps };