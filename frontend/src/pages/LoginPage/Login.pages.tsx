import {
 Button,Checkbox,Container,Group,Paper,PasswordInput,Text,TextInput,Title } from '@mantine/core';
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
import { useEffect, useReducer, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function LoginPage() {
  const jumpTo = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  const dispatch = useDispatch<AppDispatch>();
  const [rememberMe, setRemember] = useState(false);
  const [_ignored, forceUpdate] = useReducer(x => x + 1, 0);

  
  const storedAttempts = Number(localStorage.getItem('loginAttempts')) || 0
  const [loginAttempts, setLoginAttempts] = useState(storedAttempts);
  const attemptsLeft = 3 - loginAttempts;
  const [momentBlocked, setMomentBlocked] = useState(Number(localStorage.getItem('momentBlocked')));
  const [isBlocked, setIsBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('loginAttempts', loginAttempts.toString())

    if (!momentBlocked && loginAttempts > 2) {
      const timestamp = Date.now();
      localStorage.setItem('momentBlocked', timestamp.toString());
      setMomentBlocked(timestamp);
      setIsBlocked(true)
      reset();
    }
  }, [loginAttempts])

  useEffect(() => {
    if (momentBlocked) {
      const blockDuration = 1000 * 60; // 1 minute
      const timeElapsed = Date.now() - momentBlocked;
      const timeLeft = blockDuration - timeElapsed;

      if (timeLeft > 0) {
        setIsBlocked(true);

        const intervalID = setInterval(forceUpdate, 1000);

        const timeoutID = setTimeout(() => {
          setIsBlocked(false)
          setLoginAttempts(0)
          setMomentBlocked(0)
          localStorage.removeItem('loginAttempts')
          localStorage.removeItem('momentBlocked')
          clearInterval(intervalID)
        }, timeLeft)

        return () => {
          clearInterval(intervalID)
          clearTimeout(timeoutID)
        }
      }
    }
  }, [momentBlocked]);


  const {register, handleSubmit, reset, formState: {errors, isValid} } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    criteriaMode: 'firstError',
    resolver: joiResolver(loginSchema)
  });
  
  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      const {data: token} = await axios.post("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
        {
          email: data.email, 
          password: data.password,
        });

      
      localStorage.setItem('rememberMe', rememberMe ? 'true ': 'false');
      localStorage.setItem('token', token);

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
            setLoginAttempts(prev => prev + 1);
        } 
    } finally {
      setIsLoading(false);
  }
}

  return (
    <Container size={420} my={100}>
      {message && <Title order={3} ta="center" c="red" mb={10}>{message}</Title>}
      {!message && <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>}

        <Paper withBorder p={30} mt={30} radius="md" shadow='lg'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput 
                    label="Email" 
                    disabled={isBlocked}
                    placeholder="you@email.com" 
                    {...register('email')}
                    error= {errors.email?.message}
                />
                <PasswordInput 
                    mt={10}
                    label="Password" 
                    disabled={isBlocked}
                    placeholder="Your password" 
                    {...register('password')}
                    error={errors.password?.message}
                />
                {!isBlocked && loginAttempts > 0 && 
                <Text c="red" ta='center' mt='sm'>You have {attemptsLeft} attempt(s) remaining.</Text>}

                {isBlocked && 
                <Text c="red" ta='center' mt='sm'>
                    You must wait {Math.floor(Math.max(0, (60000 - (Date.now() - momentBlocked)) / 1000))} seconds before you can login in again.
                </Text>}

                <Group justify="space-between" mt="lg">
                    <Checkbox 
                    label="Remember me" 
                    checked={rememberMe}
                    onChange={(event) => setRemember(event.currentTarget.checked)}/>
                </Group>

                <Group justify='center'>
                    <Text c="dimmed" size="sm" ta="center" my='lg'>
                        Don't have an account yet? 
                    </Text>
                    <Button p={0} variant='transparent' component={Link} to='/register'>
                        Create account
                    </Button>
                </Group>

                <Button type='submit' fullWidth loading={isLoading} disabled={!isValid || isBlocked}>
                Sign in
                </Button>
            </form>
        </Paper>
    </Container>
  );
}