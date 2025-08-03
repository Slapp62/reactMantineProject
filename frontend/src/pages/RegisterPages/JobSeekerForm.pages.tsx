import { useRef } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Anchor, Box, Button, Flex, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { API_BASE_URL } from '@/config/api';
import { transformAxiosError, ApiError, NetworkError } from '@/types/errors';
import { jobseekerRegistrationSchema, validateData } from '@/validation/schemas';
import { CredentialsSection } from '@/components/Forms/CredentialsSection';
import { LocationSection } from '@/components/Forms/LocationSection';
import { WorkDetailsSection } from '@/components/Forms/WorkDetailsSection';

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
    setError,
    clearErrors,
    formState: { errors, isValid, isDirty },
  } = useForm<JobseekerFormProps>({
    mode: 'onBlur',
  });

  const validateForm = (data: JobseekerFormProps) => {
    const validation = validateData(jobseekerRegistrationSchema, data);
    
    clearErrors();
    
    if (!validation.isValid) {
      Object.entries(validation.errors).forEach(([field, message]) => {
        setError(field as keyof JobseekerFormProps, { type: 'validation', message });
      });
      return false;
    }
    
    return true;
  };

  const onSubmit = async (data: JobseekerFormProps) => {
    if (!validateForm(data)) {
      toast.error('Please fix the validation errors');
      return;
    }

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
        toast.error(`Network error - please check your connection ${networkError.message}`);
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
          <CredentialsSection 
            register={register} 
            errors={errors} 
            watch={watch}
            showConfirmPassword
          />

          <LocationSection 
            control={control} 
            errors={errors} 
            watch={watch}
          />

          <WorkDetailsSection 
            control={control} 
            register={register} 
            errors={errors}
          />
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
