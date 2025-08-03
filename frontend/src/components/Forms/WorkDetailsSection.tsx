import { Controller, Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { Autocomplete, Fieldset, Select, Textarea, TextInput } from '@mantine/core';
import { INDUSTRIES } from '@/data/industries';
import { WORK_ARRANGEMENTS } from '@/data/workArr';

type WorkDetailsSectionProps = {
  control: Control<any>;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
};

export function WorkDetailsSection({ control, register, errors }: WorkDetailsSectionProps) {
  return (
    <Fieldset legend="Work Details">
      <Controller
        control={control}
        name="industry"
        render={({ field }) => (
          <Autocomplete
            label="Industry"
            data={INDUSTRIES}
            {...field}
            error={errors.industry?.message as string}
          />
        )}
      />

      <Controller
        control={control}
        name="preferredWorkArr"
        render={({ field }) => (
          <Select
            label="Preferred Work Arrangement"
            data={WORK_ARRANGEMENTS.map((workArr) => ({
              value: workArr,
              label: workArr,
            }))}
            {...field}
            error={errors.preferredWorkArr?.message as string}
          />
        )}
      />

      <Textarea
        label="About Me"
        {...register('description')}
        error={errors.description?.message as string}
      />

      <TextInput
        label="LinkedIn"
        {...register('linkedIn')}
        error={errors.linkedIn?.message as string}
      />
    </Fieldset>
  );
}