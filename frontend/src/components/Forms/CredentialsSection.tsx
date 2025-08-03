import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { Fieldset, PasswordInput, TextInput } from '@mantine/core';

type CredentialsSectionProps = {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch?: UseFormWatch<any>;
  showConfirmPassword?: boolean;
};

export function CredentialsSection({ 
  register, 
  errors, 
  watch, 
  showConfirmPassword = false 
}: CredentialsSectionProps) {
  return (
    <Fieldset legend="Credentials">
      <TextInput
        label="Email"
        {...register('email')}
        required
        error={errors.email?.message as string}
      />
      <PasswordInput
        label="Password"
        {...register('password')}
        required
        error={errors.password?.message as string}
      />
      {showConfirmPassword && (
        <PasswordInput
          label="Confirm Password"
          {...register('confirmPassword', {
            validate: (value) => value === watch?.('password') || 'Passwords do not match',
            required: 'Confirmation is required',
          })}
          required
          error={errors.confirmPassword?.message as string}
        />
      )}
    </Fieldset>
  );
}