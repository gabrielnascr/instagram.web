import { InputHTMLAttributes } from 'react';
import styles from '../styles/components/input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: any;
}

function Input({
  id,
  name,
  label,
  placeholder,
  type,
  register,
  ...rest
}: InputProps) {
  return (
    <div className={styles.container}>
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        {...register(name)}
        {...rest}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

export default Input;
