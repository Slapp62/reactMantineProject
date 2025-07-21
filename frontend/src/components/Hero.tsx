import { IconCards, IconFilter2, IconSearch } from '@tabler/icons-react';
import heroImage from '/office-hero.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  BackgroundImage,
  Box,
  Button,
  Center,
  Flex,
  Overlay,
  Select,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { INDUSTRIES } from '@/data/industries';
import { getAllCities } from '@/data/israelCities';
import { WORK_ARRANGEMENTS } from '@/data/workArr';
import { setSortOption } from '@/store/listingSlice';
import { setSearchWord } from '@/store/searchSlice';
import { RootState } from '@/store/store';

export function Hero() {
  const isMobile = useMediaQuery('(max-width: 700px)');
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userSlice.user);

  const isBusiness = user?.userData.userType === 'business';
  //const isAdmin = user?.isAdmin;
  const allCitiesArr = getAllCities();
  const sortOption = useSelector((state: RootState) => state.listingSlice.sortOption);

  return (
    <Box mb={20}>
      <BackgroundImage
        src={heroImage}
        aria-label="office background image"
        mih={400}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Center pos="relative" style={{ borderRadius: '20px', width: isMobile ? '90%' : '60%' }}>
          <Overlay
            pos="absolute"
            color="#000"
            backgroundOpacity={0.8}
            blur={2}
            zIndex={1}
            radius="lg"
          />
          <Flex direction="column" gap={20} p={30} style={{ zIndex: 2 }} w="100%">
            {/* Conditional Welcome Message */}
            {!user && (
              <Title ta="center" c="white">
                Find your next career!
              </Title>
            )}
            {user && (
              <Text ta="center" c="blue" fw="bold" fz={30}>
                Welcome Back
              </Text>
            )}

            {/* Search & Sort */}
            <Flex gap={10} align="center" direction={isMobile ? 'column' : 'row'}>
              {/* Search */}
              <TextInput
                w={isMobile ? '100%' : '50%'}
                variant="default"
                rightSection={<IconSearch />}
                placeholder="Search for a listing..."
                onChange={(e) => {
                  dispatch(setSearchWord(e.target.value));
                }}
              />

              <Select
                w={isMobile ? '100%' : '50%'}
                placeholder="Filter"
                rightSection={<IconFilter2 />}
                data={[
                  { value: 'title-asc', label: 'Title (A-Z)' },
                  { value: 'title-desc', label: 'Title (Z-A)' },
                  {
                    value: 'date-created-old',
                    label: 'Date Created (Oldest First)',
                  },
                  {
                    value: 'date-created-new',
                    label: 'Date Created (Latest First)',
                  },
                ]}
                value={sortOption}
                onChange={(value) => {
                  dispatch(setSortOption(value || ''));
                }}
              />
            </Flex>
            <Flex gap={10} align="center" direction={isMobile ? 'column' : 'row'}>
              {/* Sort */}
              <Select
                w={isMobile ? '100%' : '50%'}
                placeholder="Region"
                rightSection={<IconFilter2 />}
                data={[
                  { value: 'galilee', label: 'Galilee' },
                  { value: 'golan', label: 'Golan' },
                  { value: 'center', label: 'Center' },
                  { value: 'jerusalem-district', label: 'Jerusalem District' },
                  { value: 'south', label: 'South' },
                ]}
                value={sortOption}
                //   onChange={(value) => {
                //     dispatch(setSortRegion(value || ''));
                //   }}
              />

              {/* Sort */}
              <Select
                w={isMobile ? '100%' : '50%'}
                placeholder="City"
                rightSection={<IconFilter2 />}
                data={allCitiesArr.map((city) => ({ value: city, label: city }))}
                value={sortOption}
                onChange={(value) => {
                  dispatch(setSortOption(value || ''));
                }}
              />

              <Select
                w={isMobile ? '100%' : '50%'}
                placeholder="Industry"
                rightSection={<IconFilter2 />}
                data={INDUSTRIES.map((industry) => ({
                  value: industry,
                  label: industry,
                }))}
                value={sortOption}
                onChange={(value) => {
                  dispatch(setSortOption(value || ''));
                }}
              />

              <Select
                w={isMobile ? '100%' : '50%'}
                placeholder="Work Type"
                rightSection={<IconFilter2 />}
                data={WORK_ARRANGEMENTS.map((type) => ({
                  value: type,
                  label: type,
                }))}
                value={sortOption}
                onChange={(value) => {
                  dispatch(setSortOption(value || ''));
                }}
              />
            </Flex>

            {/* Conditinally Register */}
            {!user && (
              <Title order={2} ta="center" style={{ color: 'lightgreen' }}>
                <Link to="register" style={{ textDecoration: '', color: 'lightgreen' }}>
                  Register
                </Link>{' '}
                now and start your journey
              </Title>
            )}

            {/* Conditinally Create Listing */}
            {isBusiness && (
              <Button
                component={Link}
                to="create-card"
                fullWidth
                mx="auto"
                variant="filled"
                color="blue"
                size="md"
                fz={20}
                rightSection={<IconCards />}
              >
                Create A Listing
              </Button>
            )}
          </Flex>
        </Center>
      </BackgroundImage>
    </Box>
  );
}
