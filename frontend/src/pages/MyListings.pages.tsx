import { useEffect, useState } from 'react';
import { IconCards, IconMoodSad } from '@tabler/icons-react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Button, Center, Flex, Loader, Title } from '@mantine/core';
import { Hero } from '@/components/Hero';
import MappedCards from '@/components/MappedListings';
import { RootState } from '@/store/store';
import { TJobListing } from '@/Types';
import { useCurrentUser } from '@/utils/reduxHelperHooks';
import { useListings } from '../utils/reduxHelperHooks';

export function MyCards() {
  const allListings = useListings();
  const isLoading = useSelector((state: RootState) => state.listingSlice.loading);
  const user = useCurrentUser();
  const [userCards, setUserCards] = useState<TJobListing[]>([]);
  const jumpTo = useNavigate();

  useEffect(() => {
    const loadUserCards = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const response = await axios.get(
          '',
          { headers: { 'x-auth-token': token } }
        );
        setUserCards(response.data);
      } catch (error: any) {
        toast.error(error);
      }
    };

    // check if cards are already available in Redux
    if (allListings && user) {
      setUserCards(allListings?.filter((listing: TJobListing) => listing._id === user?._id));
    }
    // if they aren't, fetch from API
    else {
      loadUserCards();
    }
  }, [allListings, user]);

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

  if (userCards.length === 0) {
    return (
      <Flex mt={20} direction="column" align="center" gap={20}>
        <Box mt={20}>
          <IconMoodSad color="gray" size={100} />
        </Box>
        <Title my={10} c="gray">
          No Listings Found
        </Title>

        <Button
          onClick={() => jumpTo('/create-card')}
          variant="filled"
          color="blue"
          size="lg"
          fz={20}
        >
          Create A Listing
        </Button>
      </Flex>
    );
  }

  return (
    <Flex mt={20} direction="column" align="center" gap={20}>
      <Title>My Listings</Title>

      <Button
        component={Link}
        to="/create-card"
        mx="auto"
        variant="outline"
        color="green"
        size="md"
        fz={20}
        rightSection={<IconCards />}
      >
        Create A New Listing
      </Button>

      <MappedCards listingsArr={userCards} />
    </Flex>
  );
}
