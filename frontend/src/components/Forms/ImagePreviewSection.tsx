import { useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Fieldset, Image, TextInput } from '@mantine/core';

type ImagePreviewSectionProps = {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
};

export function ImagePreviewSection({ register, errors }: ImagePreviewSectionProps) {
  const defaultAvatar =
    'https://images.unsplash.com/vector-1748280445815-10a4bb2ba7e3?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const [imageURL, setImageURL] = useState(defaultAvatar);

  return (
    <Fieldset legend="Logo">
      <Image src={imageURL} h={150} w={150} mx="auto" />
      <TextInput
        label="URL"
        defaultValue={imageURL}
        {...register('logo', {
          onChange: (e) => {
            setImageURL(e.target.value);
          },
        })}
        error={errors.logo?.message as string}
      />
    </Fieldset>
  );
}