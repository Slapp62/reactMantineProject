import axios from 'axios';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
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
import { INDUSTRIES } from '@/data/industries';
import { allRegionArr, ISRAELI_CITIES_BY_REGION } from '@/data/israelCities';
import { WORK_ARRANGEMENTS } from '@/data/workArr';
import { editListing } from '@/store/listingSlice';
import { TJobListing } from '@/Types';

export function EditListing() {
  const { id } = useParams();
  const isMobile = useMediaQuery('(max-width: 700px)');
  //const [isDisabled, setDisabled] = useState(true);
  const dispatch = useDispatch();

  //const allListings = useSelector((state: RootState) => state.listingSlice.listings);
  //const listingsData = allListings?.find((listings) => listings._id === id);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<TJobListing>({
    mode: 'all',
    // defaultValues: ListingsData ? cleanedListingsData(ListingsData) : {},
  });

  // useEffect(() => {
  //   const defaultUserValues = ListingsData ? cleanedListingsData(ListingsData) : {};
  //   reset(defaultUserValues);
  // }, [reset, ListingsData]);

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/listings/edit/${id}`, data);
      if (response.status === 200) {
        dispatch(editListing({ listings: response.data as TJobListing }));
        toast.success('Listings Updated Successfully!', { position: `bottom-right` });
        //setDisabled(true);
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
                  data={allRegionArr.map((region) => ({
                    value: region,
                    label: region,
                  }))}
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

export default EditListing;
