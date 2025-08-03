import { Controller, Control, FieldErrors, UseFormWatch } from 'react-hook-form';
import { Autocomplete, Fieldset, Select } from '@mantine/core';
import { ISRAELI_CITIES_BY_REGION } from '@/data/israelCities';

type LocationSectionProps = {
  control: Control<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
};

export function LocationSection({ control, errors, watch }: LocationSectionProps) {
  const selectedRegion = watch('region');
  
  // Get cities based on selected region
  const getCitiesForRegion = (region: string) => {
    switch (region) {
      case 'north':
        return ISRAELI_CITIES_BY_REGION.NORTH;
      case 'center':
        return ISRAELI_CITIES_BY_REGION.CENTER;
      case 'jerusalem-district':
        return ISRAELI_CITIES_BY_REGION.JERUSALEM_DISTRICT;
      case 'south':
        return ISRAELI_CITIES_BY_REGION.SOUTH;
      default:
        return [];
    }
  };

  return (
    <Fieldset legend="Location">
      <Controller
        control={control}
        name="region"
        render={({ field }) => (
          <Select
            label="Region"
            data={[
              { value: 'north', label: 'North' },
              { value: 'center', label: 'Center' },
              { value: 'jerusalem-district', label: 'Jerusalem District' },
              { value: 'south', label: 'South' },
            ]}
            {...field}
            error={errors.region?.message as string}
          />
        )}
      />

      <Controller
        control={control}
        name="city"
        render={({ field }) => (
          <Autocomplete
            label="City"
            data={getCitiesForRegion(selectedRegion)}
            {...field}
            error={errors.city?.message as string}
          />
        )}
      />
    </Fieldset>
  );
}