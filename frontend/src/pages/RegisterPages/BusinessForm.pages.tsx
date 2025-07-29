import { useRef, useState } from 'react';
import axios from 'axios';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Anchor,
  Autocomplete,
  Box,
  Button,
  Fieldset,
  Flex,
  Image,
  PasswordInput,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { allSortedCities } from '@/data/israelCities.js';
import { sortedIndustries } from '../../data/industries.js';

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
  const defaultAvatar =
    'https://images.unsplash.com/vector-1748280445815-10a4bb2ba7e3?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const [imageURL, setURL] = useState(defaultAvatar);

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm<TRegisterBusiness>({
    mode: 'all',
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      const businessResponse = await axios.post(
        'http://localhost:5000/api/auth/register/business',
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
    } catch (error: any) {
      toast.error(`Business Registration Failed! ${error.message}`);
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
          </Fieldset>

          <Fieldset legend="Company Information">
            <TextInput
              label="Company Name"
              {...register('companyName')}
              required
              error={errors.companyName?.message}
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
                  error={errors.industry?.message}
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
                  error={errors.city?.message}
                />
              )}
            />
          </Fieldset>

          <Fieldset legend="About">
            <Textarea
              label="Description"
              required
              {...register('description')}
              error={errors.description?.message}
            />
          </Fieldset>

          <Fieldset legend="Logo">
            <Image src={imageURL} h={150} w={150} mx="auto" />
            <TextInput
              label="URL"
              defaultValue={imageURL}
              {...register('logo', {
                onChange: (e) => {
                  setURL(e.target.value);
                },
              })}
              error={errors.logo?.message}
            />
          </Fieldset>
        </Flex>

        <Flex
          direction="column"
          style={{ width: isMobile ? '95%' : '60%' }}
          mx="auto"
          justify="space-between"
        >
          <Fieldset legend="Links">
            <TextInput label="Website" {...register('website')} error={errors.website?.message} />
            <TextInput
              label="LinkedIn"
              {...register('socialLinks.linkedin')}
              error={errors.socialLinks?.linkedin?.message}
            />
            <TextInput
              label="Facebook"
              {...register('socialLinks.facebook')}
              error={errors.socialLinks?.facebook?.message}
            />
            <TextInput
              label="Twitter"
              {...register('socialLinks.twitter')}
              error={errors.socialLinks?.twitter?.message}
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
