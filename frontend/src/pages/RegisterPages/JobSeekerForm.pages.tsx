import { useRef } from 'react';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Anchor,
  Autocomplete,
  Box,
  Button,
  Fieldset,
  Flex,
  PasswordInput,
  Select,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { INDUSTRIES } from '@/data/industries';
import { ISRAELI_CITIES_BY_REGION } from '@/data/israelCities';
import { WORK_ARRANGEMENTS } from '@/data/workArr';
import { API_BASE_URL } from '@/config/api';
import { transformAxiosError, ApiError, NetworkError } from '@/types/errors';

type JobseekerFormProps = {
  email: string;
  password: string;
  confirmPassword: string;
  userType: string;
  industry: string;
  region: string;
  city: string;
  preferredWorkArr: string;
  description: string;
  linkedIn: string;
};

export function JobSeekerForm() {
  const jumpTo = useNavigate();
  const registerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 700px)');

  const {
    reset,
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<JobseekerFormProps>({
    mode: 'all',
  });

  const onSubmit = async (data: JobseekerFormProps) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register/jobseeker`, {
        email: data.email,
        password: data.password,
        userType: 'jobseeker',
        region: data.region,
        city: data.city,
        industry: data.industry,
        preferredWorkArr: data.preferredWorkArr,
        description: data.description,
        linkedIn: data.linkedIn,
      });
      if (response.status === 201) {
        jumpTo('/login');
        toast.success('Registered!');
        console.log(response.data);
      }
    } catch (error: unknown) {
      const transformedError = transformAxiosError(error);
      
      if ('status' in transformedError) {
        const apiError = transformedError as ApiError;
        if (apiError.status === 400) {
          toast.error(`Registration failed: ${apiError.message}`);
        } else if (apiError.status === 409) {
          toast.error('An account with this email already exists');
        } else {
          toast.error(`Registration failed: ${apiError.message}`);
        }
      } else {
        const networkError = transformedError as NetworkError;
        toast.error('Network error - please check your connection');
      }
      
      console.error('Job seeker registration error:', transformedError);
    }
  };

  return (
    <Flex style={{ width: isMobile ? '95%' : '70%' }} mx="auto" direction="column">
      <Box ref={registerRef} ta="center">
        <h1>Registration Form</h1>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          mx="auto"
          direction="column"
          w={isMobile ? '95%' : '60%'}
          justify="space-between"
          gap={5}
        >
          <Fieldset legend="Credentials">
            <TextInput
              label="Email"
              {...register('email')}
              required
              error={errors.email?.message}
            />
            <PasswordInput
              label="Password"
              {...register('password')}
              required
              error={errors.password?.message}
            />
            <PasswordInput
              label="Confirm Password"
              {...register('confirmPassword', {
                validate: (value) => value === watch('password') || 'Passwords do not match',
                required: 'Confirmation is required',
              })}
              required
              error={errors.confirmPassword?.message}
            />
          </Fieldset>

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
                    {
                      value: 'jerusalem-district',
                      label: 'Jerusalem District',
                    },
                    { value: 'south', label: 'South' },
                  ]}
                  {...field}
                  error={errors.region?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="city"
              render={({ field }) => (
                <Autocomplete
                  label="City"
                  data={
                    watch('region') === 'north'
                      ? ISRAELI_CITIES_BY_REGION.NORTH
                        : watch('region') === 'center'
                          ? ISRAELI_CITIES_BY_REGION.CENTER
                          : watch('region') === 'jerusalem-district'
                            ? ISRAELI_CITIES_BY_REGION.JERUSALEM_DISTRICT
                            : watch('region') === 'south'
                              ? ISRAELI_CITIES_BY_REGION.SOUTH
                              : []
                  }
                  {...field}
                  error={errors.city?.message}
                />
              )}
            />
          </Fieldset>

          <Fieldset legend="Work Details">
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
              name="preferredWorkArr"
              render={({ field }) => (
                <Select
                  label="Preferred Work Arrangement"
                  data={WORK_ARRANGEMENTS.map((workArr) => ({
                    value: workArr,
                    label: workArr,
                  }))}
                  {...field}
                  error={errors.industry?.message}
                />
              )}
            />

            <Textarea
              label="About Me"
              {...register('description')}
              error={errors.description?.message}
            />

            <TextInput
              label="LinkedIn"
              {...register('linkedIn')}
              error={errors.linkedIn?.message}
            />
          </Fieldset>
        </Flex>

        <Flex
          gap={10}
          align="center"
          w="95%"
          mx="auto"
          my={20}
          style={{ flexDirection: isMobile ? 'row' : 'column' }}
        >
          <Button
            variant="outline"
            type="reset"
            w={200}
            disabled={!isDirty}
            onClick={() => {
              reset();
              registerRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Reset Form
          </Button>

          <Button type="submit" mx="auto" w={200} disabled={!isValid}>
            Submit
          </Button>

          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Already have an account?{' '}
            <Anchor size="sm" component="button" onClick={() => jumpTo('/login')} underline="hover">
              Login
            </Anchor>
          </Text>
        </Flex>
      </form>
    </Flex>
  );
}
