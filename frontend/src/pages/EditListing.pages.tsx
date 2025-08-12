import axios from 'axios';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { pick } from 'lodash';
import { cleanedListingData } from '../utils/getCleanedData';
import {
  Autocomplete,
  Button,
  Fieldset,
  Flex,
  Paper,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { INDUSTRIES } from '@/data/industries';
import { allRegionArr, ISRAELI_CITIES_BY_REGION } from '@/data/israelCities';
import { WORK_ARRANGEMENTS } from '@/data/workArr';
import { editListing } from '@/store/listingSlice';
import { TJobListing } from '@/Types';
import { reduxHelpers } from '@/utils/reduxHelperHooks';
import { useEffect, useState } from 'react';
import { getToken } from '@/utils/tokenManager';

export function EditListing() {
  const { id } = useParams();
  const isMobile = useMediaQuery('(max-width: 700px)');
  const [isDisabled, setDisabled] = useState(true);
  const dispatch = useDispatch();

  const currentListing = reduxHelpers.useListingById(id);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isValid, dirtyFields },
  } = useForm<TJobListing>({
    mode: 'all',
    defaultValues: currentListing ? cleanedListingData(currentListing) : {},
  });

  useEffect(() => {
    const defaultUserValues = currentListing ? cleanedListingData(currentListing) : {};
    reset(defaultUserValues);
  }, [reset, currentListing, dispatch]);
  
  
  const onSubmit = async (data: FieldValues) => {
    const changedData = pick(data, Object.keys(dirtyFields));
    const token = getToken();
    try {
      const response = await axios.patch(`http://localhost:5000/api/listings/edit/${id}`, changedData,
        {
          headers: { authorization: token },
        }
      );
      if (response.status === 200) {
        dispatch(editListing({ listings: response.data as TJobListing }));
        toast.success('Listings Updated Successfully!', { position: `bottom-right` });
        setDisabled(true);
        reset();
      }
    } catch (error: any) {
      toast.error(`Update Failed! ${error.response.data}`, { position: `bottom-right` });
    }
  };

  return (
    <Paper>
      <Title ta="center" my={10}>
        Edit Listing
      </Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          direction="column"
          gap={10}
          py={10}
          mx="auto"
          w= {isMobile ? '90%' : '50%' }
        >
          <Fieldset legend="Job Info">
            <TextInput
              label="Job Title"
              required
              {...register('jobTitle')}
              error={errors.jobTitle?.message}
              disabled={isDisabled}
            />
            <Textarea
              label="Description"
              required
              {...register('jobDescription')}
              error={errors.jobDescription?.message}
              disabled={isDisabled}
            />

            <TextInput
              label="Requirements"
              required
              {...register('requirements')}
              error={errors.requirements?.message}
              disabled={isDisabled}
            />
            <TextInput
              label="Advantages"
              required
              {...register('advantages')}
              error={errors.advantages?.message}
              disabled={isDisabled}
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
                  disabled={isDisabled}
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
                  disabled={isDisabled}
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
                  data={allRegionArr.map((region) => ({
                    value: region,
                    label: region,
                  }))}
                  {...field}
                  error={errors.location?.region?.message}
                  disabled={isDisabled}
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
                      ? ISRAELI_CITIES_BY_REGION.NORTH.sort()
                      : watch('location.region') === 'center'
                        ? ISRAELI_CITIES_BY_REGION.CENTER.sort()
                        : watch('location.region') === 'jerusalem-district'
                          ? ISRAELI_CITIES_BY_REGION.JERUSALEM_DISTRICT.sort()
                          : watch('location.region') === 'south'
                            ? ISRAELI_CITIES_BY_REGION.SOUTH.sort()
                            : []
                  }
                  {...field}
                  error={errors.location?.city?.message}
                  disabled={isDisabled}
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
                  disabled={isDisabled}
                />
              )}
            />

            <TextInput
              label="Apply To"
              {...register('apply.contact')}
              error={errors.apply?.contact?.message}
              disabled={isDisabled}
            />
          </Fieldset>
        </Flex>

        <Stack justify="center" my={10} mx='auto' w= {isMobile ? '90%' : '50%' }>
          <Button type="button" size="md" disabled={!isDisabled} onClick={() => setDisabled(!isDisabled)}>
            Edit
          </Button>
          <Button type="submit" size="md" disabled={!isValid || isDisabled}>
            Update
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default EditListing;
