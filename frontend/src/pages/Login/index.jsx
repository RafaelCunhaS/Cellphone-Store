import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { FiLock, FiSend, FiUser } from 'react-icons/fi';
import styles from './styles.module.scss';
import CustomInput from '../../components/Input';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { Button } from '../../components/Button';

const schema = object({
  email: string().required('Email required').email(),
  password: string().required('Password required').min(6),
}).required();

export function Login() {
  const { signIn } = useAuth();
  const [isShowingPassword, setIsShowingPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function showPassword() {
    setIsShowingPassword(!isShowingPassword);
  }

  async function onSubmit(dataForm) {
    signIn(dataForm);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} autoComplete="off" autoCapitalize="off">
        <h1>Cellphone Store</h1>
        <h2>Login</h2>
        <CustomInput label="Email" Icon={FiUser} {...register('email')} error={errors.email} />

        <CustomInput
          type={isShowingPassword ? 'text' : 'password'}
          label="Password"
          Icon={FiLock}
          {...register('password')}
          error={errors.password}
          isPassword={true}
          showPassword={showPassword}
          isShowingPassword={isShowingPassword}
        />

        <Button title="Login" icon={<FiSend />} type="submit" />

        <Link className={styles.link} to="/register">
          Register
        </Link>
      </form>
    </div>
  );
}
