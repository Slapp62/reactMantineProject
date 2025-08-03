import { Controller, Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { Autocomplete, Fieldset, Textarea, TextInput } from '@mantine/core';
import { allSortedCities } from '@/data/israelCities';
import { sortedIndustries } from '@/data/industries';

type CompanyInfoSectionProps = {
  register: UseFormRegister<any>;
  control: Control<any>;
  errors: FieldErrors<any>;
};

export function CompanyInfoSection({ register, control, errors }: CompanyInfoSectionProps) {
  return (
    <>
      <Fieldset legend="Company Information">
        <TextInput
          label="Company Name"
          {...register('companyName')}
          required
          error={errors.companyName?.message as string}
        />

        <Controller
          control={control}
          name="industry"
          render={({ field }) => (
            <Autocomplete
              label="Industry"
              required
              data={sortedIndustries}
              {...field}
              error={errors.industry?.message as string}
            />
          )}
        />

        <Controller
          control={control}
          name="city"
          render={({ field }) => (
            <Autocomplete
              label="City"
              required
              data={allSortedCities}
              {...field}
              error={errors.city?.message as string}
            />
          )}
        />
      </Fieldset>

      <Fieldset legend="About">
        <Textarea
          label="Description"
          required
          {...register('description')}
          error={errors.description?.message as string}
        />
      </Fieldset>
    </>
  );
}