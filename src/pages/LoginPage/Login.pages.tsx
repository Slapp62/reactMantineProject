import {
 Anchor,Button,Checkbox,Container,Group,Paper,PasswordInput,Text,TextInput,Title } from '@mantine/core';
import classes from './Login.module.css';
import  { FieldValues, useForm } from 'react-hook-form';
import axios from 'axios';
import { loginSchema } from '@/validationRules/login.joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { TdecodedToken } from '@/Types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { setUser } from '@/store/userSlice';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function LoginPage() {
  const jumpTo = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  const dispatch = useDispatch<AppDispatch>();
  const [rememberMe, setRemember] = useState(false);

  
  const storedAttempts = Number(localStorage.getItem('loginAttempts')) || 0
  const [loginAttempts, setLoginAttempts] = useState(storedAttempts);
  const attemptsLeft = 3 - loginAttempts;
  const [momentBlocked, setMomentBlocked] = useState(Number(localStorage.getItem('momentBlocked')));
  const [isBlocked, setIsBlocked] = useState(false);
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    if (!momentBlocked && loginAttempts > 2) {
      const timestamp = Date.now();
      localStorage.setItem('momentBlocked', timestamp.toString());
      setMomentBlocked(timestamp);
      setIsBlocked(true)
    }

    if (momentBlocked) {
      // eslint-disable-next-line prefer-const
      let timeRemainingID: ReturnType<typeof setInterval>;
      const timeRemaining = () => {
        const timeElapsed = Date.now() - momentBlocked;
        const blockDuration = 1000 * 60; // 1 minute
        const timeLeft = blockDuration - timeElapsed;
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        setSeconds(Math.max(seconds, 0));

        if (timeElapsed < blockDuration) {
          setIsBlocked(true);
        }

        if (timeElapsed > blockDuration) {
          setIsBlocked(false)
          setLoginAttempts(0)
          localStorage.removeItem('loginAttempts')
          localStorage.removeItem('momentBlocked')
          clearInterval(timeRemainingID)
        }
      }
      timeRemaining();
      timeRemainingID = setInterval(timeRemaining, 1000);

      return () => clearInterval(timeRemainingID)
    }
  }, [momentBlocked, loginAttempts]);


  const {register, handleSubmit, formState: {errors, isValid} } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    criteriaMode: 'firstError',
    resolver: joiResolver(loginSchema)
  });
  
  const onSubmit = async (data: FieldValues) => {
    try {
      const {data: token} = await axios.post("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
        {
          email: data.email, 
          password: data.password,
        });

      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }

      axios.defaults.headers.common['x-auth-token'] = token;

      const { _id } = jwtDecode<TdecodedToken>(token);
      const userResponse = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${_id}`)
    
      dispatch(setUser(userResponse.data))
      toast.success('Logged In!', {position: 'bottom-right'});
      setLoginAttempts(0);
      localStorage.removeItem('loginAttempts');

      if (momentBlocked){
        localStorage.removeItem('momentBlocked')
      }

      jumpTo('/');
    
    } catch (error : any) {
      if (error.response?.status === 400) {
        toast.error('Login Failed. Error 400', {position: 'bottom-right'});

        setLoginAttempts(prev => {
          const next = prev + 1;
          localStorage.setItem('loginAttempts', JSON.stringify(next));
          return next
          });
    }
  }
}

  return (
    <Container size={420} mt={100}>
      {message && <Title order={3} ta="center" c="red" mb={10}>{message}</Title>}
      {!message && <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>}
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Don't have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder p={30} mt={30} radius="md" shadow='lg'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput 
            label="Email" 
            placeholder="you@email.com" 
            {...register('email')}
            error= {errors.email?.message}
            />
          <PasswordInput 
            mt={10}
            label="Password" 
            placeholder="Your password" 
            {...register('password')}
            error={errors.password?.message}
            />

          {!isBlocked && loginAttempts > 0 && 
          <Text c="red" ta='center' mt='sm'>You have {attemptsLeft} attempt(s) remaining.</Text>}

          {isBlocked && 
          <Text c="red" ta='center' mt='sm'>You must wait {seconds}s before you can login in again.</Text>}

          <Group justify="space-between" mt="lg">
            <Checkbox 
              label="Remember me" 
              checked={rememberMe}
              onChange={(event) => setRemember(event.currentTarget.checked)}/>
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>

          <Button type='submit' fullWidth mt="xl" disabled={!isValid || isBlocked}>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}