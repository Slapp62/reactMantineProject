import { useEffect, useState } from 'react';
import { IconCards, IconMoodSad } from '@tabler/icons-react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Button, Center, Flex, Loader, Title } from '@mantine/core';
import { Hero } from '@/components/Hero';
import MappedCards from '@/components/MappedListings';
import { API_BASE_URL } from '@/config/api';
import { TJobListing } from '@/Types';
import { useCurrentUser, useListingLoading } from '@/utils/reduxHelperHooks';
import { getToken } from '@/utils/tokenManager';
import { useListings } from '../utils/reduxHelperHooks';

export function MyCards() {
  const allListings = useListings();
  const user = useCurrentUser();
  const isLoading = useListingLoading();
  const userID = user?._id;
  const [userCards, setUserCards] = useState<TJobListing[]>([]);
  const jumpTo = useNavigate();

  const loadUserCards = async () => {
    try {
      const token = getToken();
      const response = await axios.get(`${API_BASE_URL}/api/listings/${userID}`, {
        headers: { authorization: token },
      });
      console.log(userID);

      setUserCards(response.data);
    } catch (error: any) {
      toast.error(error);
    }
  };

  useEffect(() => {
    // check if cards are already available in Redux
    if (allListings && user) {
      setUserCards(allListings?.filter((listing: TJobListing) => listing.businessId === user?._id));
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
