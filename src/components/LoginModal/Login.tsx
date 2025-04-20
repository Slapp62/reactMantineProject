/* eslint-disable no-console */
  import {
    Anchor,Button,Checkbox,Container,Group,Paper,PasswordInput,Text,TextInput,Title } from '@mantine/core';
  import classes from './Login.module.css';
  import  { FieldValues, useForm } from 'react-hook-form';
import axios from 'axios';
  
  export function LoginForm() {
    const {register, handleSubmit, formState: {errors} } = useForm({
      mode: 'onChange',
      criteriaMode: 'firstError',
    });

    const onSubmit = async (data: FieldValues) => {
      const email = data.email;
      const password = data.password;
        try {
          const response = await axios.post("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
            {
              email, 
              password
            });
          localStorage.setItem("token", response.data);
          console.log("Login Success");
        } catch (error) {
          console.error("Wrong credentials", error)
         
        };
      };

    return (
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
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: 'Invalid email address'
                },
              })}
              error={typeof errors.email?.message === 'string' ? errors.email.message : undefined}
              />

            <PasswordInput 
              label="Password" 
              placeholder="Your password" 
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
                  message: 'Password must a minimum 8 characters, one uppercase letter, one number, and one special character.'
                },
              })}
              error={typeof errors.password?.message === 'string' ? errors.password.message : undefined}
              />

            <Group justify="space-between" mt="lg">
              <Checkbox label="Remember me" />
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Group>

            <Button type='submit' fullWidth mt="xl">
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
    );
  }