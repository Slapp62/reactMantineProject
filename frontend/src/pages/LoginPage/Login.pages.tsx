import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Paper, Title } from '@mantine/core';
import { API_BASE_URL } from '@/config/api';
import { AppDispatch } from '@/store/store';
import { setUser } from '@/store/authSlice';
import classes from './Login.module.css';
import { setBusinessProfile } from '@/store/businessSlice';
import { setJobseekerProfile } from '@/store/jobseekerSlice';
import { transformAxiosError, ApiError, NetworkError } from '@/types/errors';
import { loginSchema, validateData } from '@/validation/schemas';
import { LoginForm } from '@/components/Login/LoginForm';
import { LoginStatus } from '@/components/Login/LoginStatus';
import { RememberMeSection } from '@/components/Login/RememberMeSection';

export function LoginPage() {
  const jumpTo = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  const dispatch = useDispatch<AppDispatch>();

  const [rememberMe, setRemember] = useState(false);
  const [_ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const storedAttempts = Number(localStorage.getItem('loginAttempts')) || 0;
  const [loginAttempts, setLoginAttempts] = useState(storedAttempts);
  const [momentBlocked, setMomentBlocked] = useState(Number(localStorage.getItem('momentBlocked')));
  const [isBlocked, setIsBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('loginAttempts', loginAttempts.toString());

    if (!momentBlocked && loginAttempts > 2) {
      const timestamp = Date.now();
      localStorage.setItem('momentBlocked', timestamp.toString());
      setMomentBlocked(timestamp);
      setIsBlocked(true);
      reset();
    }
  }, [loginAttempts]);

  useEffect(() => {
    if (momentBlocked) {
      const blockDuration = 1000 * 60; // 1 minute
      const timeElapsed = Date.now() - momentBlocked;
      const timeLeft = blockDuration - timeElapsed;

      if (timeLeft > 0) {
        setIsBlocked(true);

        const intervalID = setInterval(forceUpdate, 1000);

        const timeoutID = setTimeout(() => {
          setIsBlocked(false);
          setLoginAttempts(0);
          setMomentBlocked(0);
          localStorage.removeItem('loginAttempts');
          localStorage.removeItem('momentBlocked');
          clearInterval(intervalID);
        }, timeLeft);

        return () => {
          clearInterval(intervalID);
          clearTimeout(timeoutID);
        };
      }
    }
  }, [momentBlocked]);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    criteriaMode: 'firstError',
  });

  const validateForm = (data: FieldValues) => {
    const validation = validateData(loginSchema, data);
    
    clearErrors();
    
    if (!validation.isValid) {
      Object.entries(validation.errors).forEach(([field, message]) => {
        setError(field as 'email' | 'password', { type: 'validation', message });
      });
      return false;
    }
    
    return true;
  };

  const onSubmit = async (data: FieldValues) => {
    if (!validateForm(data)) {
      toast.error('Please fix the validation errors');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: data.email,
        password: data.password,
      });

      const { token } = response.data;
      const { user } = response.data;
      
      localStorage.setItem('rememberMe', rememberMe ? 'true ' : 'false');
      rememberMe ? localStorage.setItem('token', token) : sessionStorage.setItem('token', token);

      dispatch(setUser(user.userData));
      
      if (user.userData.userType === 'business') {
        dispatch(setBusinessProfile(user.profileData));
      } else {
        dispatch(setJobseekerProfile(user.profileData));
      }

      toast.success('Logged In!', { position: 'bottom-right' });
      setLoginAttempts(0);
      localStorage.removeItem('loginAttempts');

      if (momentBlocked) {
        localStorage.removeItem('momentBlocked');
      }

      jumpTo('/');
    } catch (error: unknown) {
      const transformedError = transformAxiosError(error);
      
      if ('status' in transformedError) {
        const apiError = transformedError as ApiError;
        if (apiError.status === 400 || apiError.status === 401) {
          toast.error('Invalid email or password', { position: 'bottom-right' });
          setLoginAttempts((prev) => prev + 1);
        } else if (apiError.status === 429) {
          toast.error('Too many login attempts. Please try again later.', { position: 'bottom-right' });
        } else {
          toast.error(`Login failed: ${apiError.message}`, { position: 'bottom-right' });
        }
      } else {
        const networkError = transformedError as NetworkError;
        toast.error('Network error - please check your connection', { position: 'bottom-right' });
      }
      
      console.error('Login error:', transformedError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size={420} my={100}>
      {message && (
        <Title order={3} ta="center" c="red" mb={10}>
          {message}
        </Title>
      )}
      {!message && (
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>
      )}

      <Paper withBorder p={30} mt={30} radius="md" shadow="lg">
        <LoginForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          isLoading={isLoading}
          isValid={isValid}
          isBlocked={isBlocked}
        />

        <LoginStatus
          isBlocked={isBlocked}
          loginAttempts={loginAttempts}
          momentBlocked={momentBlocked}
        />

        <RememberMeSection
          rememberMe={rememberMe}
          setRememberMe={setRemember}
        />
      </Paper>
    </Container>
  );
}
