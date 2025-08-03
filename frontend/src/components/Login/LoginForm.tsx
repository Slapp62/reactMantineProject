import { FieldValues, UseFormRegister, UseFormHandleSubmit, FieldErrors } from 'react-hook-form';
import { Button, PasswordInput, TextInput } from '@mantine/core';

type LoginFormProps = {
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: (data: FieldValues) => void;
  errors: FieldErrors<any>;
  isLoading: boolean;
  isValid: boolean;
  isBlocked: boolean;
};

export function LoginForm({
  register,
  handleSubmit,
  onSubmit,
  errors,
  isLoading,
  isValid,
  isBlocked,
}: LoginFormProps) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Email"
        disabled={isBlocked}
        placeholder="you@email.com"
        {...register('email')}
        error={errors.email?.message as string}
      />
      <PasswordInput
        mt={10}
        label="Password"
        disabled={isBlocked}
        placeholder="Your password"
        {...register('password')}
        error={errors.password?.message as string}
      />

      <Button type="submit" fullWidth loading={isLoading} disabled={!isValid || isBlocked}>
        Sign in
      </Button>
    </form>
  );
}