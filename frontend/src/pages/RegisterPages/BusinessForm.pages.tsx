import { useRef } from 'react';
import axios from 'axios';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Anchor, Box, Button, Flex, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { API_BASE_URL } from '@/config/api';
import { transformAxiosError, ApiError, NetworkError } from '@/types/errors';
import { businessRegistrationSchema, validateData } from '@/validation/schemas';
import { CredentialsSection } from '@/components/Forms/CredentialsSection';
import { CompanyInfoSection } from '@/components/Forms/CompanyInfoSection';
import { ImagePreviewSection } from '@/components/Forms/ImagePreviewSection';
import { SocialLinksSection } from '@/components/Forms/SocialLinksSection';

type TRegisterBusiness = {
  email: string;
  password: string;
  companyName: string;
  industry: string;
  city: string;
  description?: string;
  logo?: string | null;
  website?: string | null;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
};

export function BusinessForm() {
  const jumpTo = useNavigate();
  const registerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 700px)');

  const {
    reset,
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors, isValid, isDirty },
  } = useForm<TRegisterBusiness>({
    mode: 'onBlur',
  });

  const validateForm = (data: FieldValues) => {
    const validation = validateData(businessRegistrationSchema, data);
    
    clearErrors();
    
    if (!validation.isValid) {
      Object.entries(validation.errors).forEach(([field, message]) => {
        setError(field as keyof TRegisterBusiness, { type: 'validation', message });
      });
      return false;
    }
    
    return true;
  };

  const onSubmit = async (data: FieldValues) => {
    if (!validateForm(data)) {
      toast.error('Please fix the validation errors');
      return;
    }

    try {
      const businessResponse = await axios.post(
        `${API_BASE_URL}/api/auth/register/business`,
        {
          email: data.email,
          password: data.password,
          userType: 'business',
          companyName: data.companyName,
          industry: data.industry,
          city: data.city,
          description: data.description,
          logo: data.logo,
          website: data.website,
          socialLinks: data.socialLinks,
        }
      );
      if (businessResponse.status === 201) {
        toast.success('Registration successful');
        jumpTo('/login');
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
      
      console.error('Business registration error:', transformedError);
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
          />

          <CompanyInfoSection 
            register={register} 
            control={control} 
            errors={errors}
          />

          <ImagePreviewSection 
            register={register} 
            errors={errors}
          />
        </Flex>

        <Flex
          direction="column"
          style={{ width: isMobile ? '95%' : '60%' }}
          mx="auto"
          justify="space-between"
        >
          <SocialLinksSection 
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
