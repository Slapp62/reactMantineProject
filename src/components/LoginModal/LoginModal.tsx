/* eslint-disable no-console */
import {
 Modal, Anchor,Button,Checkbox,Container,Group,Paper,PasswordInput,Text,TextInput,Title } from '@mantine/core';
import classes from './Login.module.css';
import  { FieldValues, useForm } from 'react-hook-form';
import axios, { AxiosResponse } from 'axios';
import { loginSchema } from '@/validationRules/login.joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { TdecodedToken } from '@/Types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { setUser } from '@/store/userSlice';


export function LoginModal({ opened, onClose }: { opened: boolean, onClose: () => void }) {

  const dispatch = useDispatch<AppDispatch>();
  
  const tokenHandler = async (response: AxiosResponse<any, any> ) => {
    const token = response.data;
    sessionStorage.setItem('token', token);
    axios.defaults.headers.common['x-auth-token'] = token;

    const decodedToken = jwtDecode<TdecodedToken>(token);
    const id = decodedToken._id;
    
    const userData = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`)
    dispatch(setUser(userData.data))
  }
  
  const {register, handleSubmit, formState: {errors, isValid} } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange',
    criteriaMode: 'firstError',
    resolver: joiResolver(loginSchema)
  });
  
  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await axios.post("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
        {
          email: data.email, 
          password: data.password,
        });

      if (response.status === 200){

        try {
          tokenHandler(response);
        } catch (error) {
          console.error(`Problem with token! ${error}`)
        }
      
        toast.success('Logged In!', {position: 'bottom-right'});
      
        if (onClose) {onClose()}
        }
      
    } catch (error) {

      toast.error(`Login Failed! ${error}`, {position: 'bottom-right'})
    };
  };

  return (
      <Modal opened={opened} onClose={onClose} centered>
        <Container size={420}>
          <Title ta="center" className={classes.title}>
            Welcome back!
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Don't have an account yet?{' '}
            <Anchor size="sm" component="button">
              Create account
            </Anchor>
          </Text>

          <Paper withBorder p={30} mt={30} radius="md">
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

              <Group justify="space-between" mt="lg">
                <Checkbox label="Remember me" />
                <Anchor component="button" size="sm">
                  Forgot password?
                </Anchor>
              </Group>

              <Button type='submit' fullWidth mt="xl" disabled={!isValid}>
                Sign in
              </Button>
            </form>
          </Paper>
        </Container>
      </Modal>
  );
}