import { IconMoodSad } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Center, Flex, Loader, Title } from '@mantine/core';
import { Hero } from '@/components/Hero';
import MappedListings from '@/components/MappedListings';
import { RootState } from '@/store/store';
import { useJobseekerProfile } from '@/utils/reduxHelperHooks';

export function FavoriteListings() {
  const jumpTo = useNavigate();
  const allListings = useSelector((state: RootState) => state.listingSlice.listings);
  const isLoading = useSelector((state: RootState) => state.listingSlice.loading);
  const jobseeker = useJobseekerProfile();
  
  const likedListings = allListings?.filter((listing) =>
    listing._id === jobseeker?.favorites?.find((id) => id === listing._id)
  );

  if (isLoading) {
    return (
      <>
        <Box pos="relative">
          <Hero />
        </Box>

        <Center>
          <Loader color="cyan" size="xl" mt={30} />
        </Center>
      </>
    );
  }

  if (likedListings?.length === 0) {
    return (
      <Flex mt={20} direction="column" align="center" gap={20}>
        <Box mt={20}>
          <IconMoodSad color="gray" size={100} />
        </Box>
        <Title my={10} c="gray">
          No Favorites Found
        </Title>

        <Button onClick={() => jumpTo('/')} variant="filled" color="blue" size="lg" fz={20}>
          Find Some Favorites
        </Button>
      </Flex>
    );
  }

  return (
    <Flex mt={20} direction="column" align="center" gap={20}>
      <Title>Favorites</Title>
      <MappedListings listingsArr={likedListings} />
    </Flex>
  );
}
