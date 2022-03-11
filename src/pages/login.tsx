import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/pages/login.module.scss';

export default function Login() {
  const { signIn } = useAuth();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await signIn({
      email: data.emailorusername,
      username: data.emailorusername,
      password: data.password,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {/* <h1>Instagram</h1> */}
        <Image
          className={styles.instagramLogo}
          src="/instagramlogo.png"
          width={246}
          height={146}
        />

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="emailorusername"
            name="emailorusername"
            type="text"
            label="Email or username"
            placeholder=" "
            register={register}
          />
          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder=" "
            register={register}
          />

          <Button type="submit">Fazer login</Button>
        </form>
        <div style={{ marginTop: '2.8rem' }}>
          <span>Ou</span>
        </div>

        <Link href="/signup">
          <a href="/" style={{ marginTop: '2rem', color: '#43A2FA' }}>
            Fazer cadastro
          </a>
        </Link>
      </div>
    </div>
  );
}
