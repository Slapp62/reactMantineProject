/* eslint-disable no-console */
import {
  Anchor,Button,Checkbox,Container,Group,Paper,PasswordInput,Text,TextInput,Title } from '@mantine/core';
import classes from './Login.module.css';
import  { FieldValues, useForm } from 'react-hook-form';
import axios from 'axios';
import { loginSchema } from '@/validationRules/login.joi';
import { joiResolver } from '@hookform/resolvers/joi';
  
  export function LoginForm() {
    const {register, handleSubmit, formState: {errors, isValid} } = useForm({
      defaultValues: {
        email: '',
        password: ''
      },
      mode: 'onChange',
      // criteriaMode: 'firstError',
      resolver: joiResolver(loginSchema)
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
    );
  }
