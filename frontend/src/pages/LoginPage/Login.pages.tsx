import { useState } from 'react';
import axios from 'axios';
import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { API_BASE_URL } from '@/config/api';
import { setUser } from '@/store/authSlice';
import { setBusinessProfile } from '@/store/businessSlice';
import { setJobseekerProfile } from '@/store/jobseekerSlice';
import { AppDispatch } from '@/store/store';
import { setToken } from '@/utils/tokenManager';
import classes from './Login.module.css';

export function LoginPage() {
  const jumpTo = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const message = location.state?.message;

  const [rememberMe, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    criteriaMode: 'firstError',
    // resolver: joiResolver(loginSchema)
  });

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: data.email,
        password: data.password,
      });

      const { token } = response.data;
      const { user } = response.data;

      setToken(token, rememberMe);

      dispatch(setUser(user.userData));

      if (user.userData.userType === 'business') {
        dispatch(setBusinessProfile(user.profileData));
      } else {
        dispatch(setJobseekerProfile(user.profileData));
      }

      toast.success('Logged In!', { position: 'bottom-right' });
      jumpTo('/');
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast.error('Login Failed. Error 400', { position: 'bottom-right' });
      }
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Email"
            placeholder="you@email.com"
            {...register('email')}
            error={errors.email?.message}
          />
          <PasswordInput
            mt={10}
            label="Password"
            placeholder="Your password"
            {...register('password')}
            error={errors.password?.message}
          />

          <Group justify="space-between" mt="lg">
            <Checkbox
              label="Remember me"
              checked={rememberMe}
              onChange={(event) => setRemember(event.currentTarget.checked)}
            />
          </Group>

          <Group justify="center">
            <Text c="dimmed" size="sm" ta="center" my="lg">
              Don't have an account yet?
            </Text>
            <Button p={0} variant="transparent" component={Link} to="/register">
              Create account
            </Button>
          </Group>

          <Button type="submit" fullWidth loading={isLoading} disabled={!isValid}>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
