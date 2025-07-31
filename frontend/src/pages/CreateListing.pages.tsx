import axios from 'axios';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Autocomplete,
  Button,
  Fieldset,
  Flex,
  Paper,
  Select,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { API_BASE_URL } from '@/config/api';
import { INDUSTRIES } from '@/data/industries';
import { ISRAELI_CITIES_BY_REGION } from '@/data/israelCities';
import { WORK_ARRANGEMENTS } from '@/data/workArr';
import { addListing } from '@/store/listingSlice';
import { TJobListing } from '@/Types';
import { useCurrentUser } from '@/utils/reduxHelperHooks';

export function CreateCard() {
  const jumpTo = useNavigate();
  const isMobile = useMediaQuery('(max-width: 700px)');
  const dispatch = useDispatch();
  const user = useCurrentUser();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<TJobListing>({
    mode: 'all',
  });

  const onSubmit = async (data: FieldValues) => {
    const url = `${API_BASE_URL}/api/listings/create`;

    try {
      const response = await axios.post(url, {
        businessId: user?._id,
        ...data,
      });

      if (response.status === 201) {
        dispatch(addListing(response.data.listing));
        toast.success('Card Submitted!', { position: 'bottom-right' });
        jumpTo('/');
      }
    } catch (error: any) {
      toast.error(`Card creation failed! ${error.response.data}`, {
        position: 'bottom-right',
      });
    }
  };

  return (
    <Paper>
      <Title ta="center" my={10}>
        Create A Listing
      </Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          direction="column"
          gap={10}
          py={10}
          mx="auto"
          style={{ width: isMobile ? '90%' : '50%' }}
        >
          <Fieldset legend="Job Info">
            <TextInput
              label="Job Title"
              required
              {...register('jobTitle')}
              error={errors.jobTitle?.message}
            />
            <Textarea
              label="Description"
              required
              {...register('jobDescription')}
              error={errors.jobDescription?.message}
            />

            <TextInput
              label="Requirements"
              required
              {...register('requirements')}
              error={errors.requirements?.message}
            />
            <TextInput
              label="Advantages"
              required
              {...register('advantages')}
              error={errors.advantages?.message}
            />

            <Controller
              control={control}
              name="industry"
              render={({ field }) => (
                <Autocomplete
                  label="Industry"
                  data={INDUSTRIES}
                  {...field}
                  error={errors.industry?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="workArrangement"
              render={({ field }) => (
                <Select
                  label="Work Arrangement"
                  data={WORK_ARRANGEMENTS.map((workArr) => ({
                    value: workArr,
                    label: workArr,
                  }))}
                  {...field}
                  error={errors.industry?.message}
                />
              )}
            />
          </Fieldset>

          <Fieldset legend="Location">
            <Controller
              control={control}
              name="location.region"
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
                  error={errors.location?.region?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="location.city"
              render={({ field }) => (
                <Autocomplete
                  label="City"
                  data={
                    watch('location.region') === 'north'
                      ? ISRAELI_CITIES_BY_REGION.NORTH
                        : watch('location.region') === 'center'
                          ? ISRAELI_CITIES_BY_REGION.CENTER
                          : watch('location.region') === 'jerusalem-district'
                            ? ISRAELI_CITIES_BY_REGION.JERUSALEM_DISTRICT
                            : watch('location.region') === 'south'
                              ? ISRAELI_CITIES_BY_REGION.SOUTH
                              : []
                  }
                  {...field}
                  error={errors.location?.city?.message}
                />
              )}
            />
          </Fieldset>

          <Fieldset legend="Apply">
            <Controller
              control={control}
              name="apply.method"
              render={({ field }) => (
                <Select
                  label="Method"
                  data={[
                    { value: 'email', label: 'Email' },
                    { value: 'link', label: 'Link' },
                  ]}
                  {...field}
                  error={errors.apply?.method?.message}
                />
              )}
            />

            <TextInput
              label="Apply To"
              {...register('apply.contact')}
              error={errors.apply?.contact?.message}
            />
          </Fieldset>
        </Flex>

        <Flex justify="center" my={10}>
          <Button type="submit" size="lg" disabled={!isValid}>
            Create
          </Button>
        </Flex>
      </form>
    </Paper>
  );
}
