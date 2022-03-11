import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from '../styles/components/button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({ children, type, onSubmit, ...rest }: ButtonProps) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      onSubmit={onSubmit}
      className={styles.container}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
