import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Fieldset, TextInput } from '@mantine/core';

type SocialLinksSectionProps = {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
};

export function SocialLinksSection({ register, errors }: SocialLinksSectionProps) {
  return (
    <Fieldset legend="Links">
      <TextInput 
        label="Website" 
        {...register('website')} 
        error={errors.website?.message as string} 
      />
      <TextInput
        label="LinkedIn"
        {...register('socialLinks.linkedin')}
        error={(errors.socialLinks as any)?.linkedin?.message}
      />
      <TextInput
        label="Facebook"
        {...register('socialLinks.facebook')}
        error={(errors.socialLinks as any)?.facebook?.message}
      />
      <TextInput
        label="Twitter"
        {...register('socialLinks.twitter')}
        error={(errors.socialLinks as any)?.twitter?.message}
      />
    </Fieldset>
  );
}