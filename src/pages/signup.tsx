import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/pages/signup.module.scss';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

export default function SignUp() {
  const { signUp } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp({ name, email, password, username, passwordConfirmation });
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

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            id="email"
            name="email"
            type="email"
            label="Número do celular ou email"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <Input
            id="name"
            name="name"
            type="text"
            label="Nome completo"
            placeholder=" "
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />

          <Input
            id="username"
            name="username"
            type="text"
            label="Nome de usuário"
            placeholder=" "
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />

          <Input
            id="password"
            name="password"
            type="password"
            label="Senha"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />

          <Input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            label="Confirme sua senha"
            placeholder=" "
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.currentTarget.value)}
          />

          <Button type="submit">Fazer cadastro</Button>
        </form>
        <div style={{ marginTop: '2.8rem' }}>
          <span>Ou</span>
        </div>

        <Link href="/login">
          <a href="/" style={{ marginTop: '2rem', color: '#43A2FA' }}>
            Fazer login
          </a>
        </Link>
      </div>
    </div>
  );
}
