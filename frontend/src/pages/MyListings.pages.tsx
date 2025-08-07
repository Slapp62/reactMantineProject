import { useEffect, useState } from 'react';
import { IconCards, IconMoodSad } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Center, Flex, Loader, Title } from '@mantine/core';
import { useBusinessListings, useCurrentUser } from '@/utils/reduxHelperHooks';
import fetchBusinessListings from '@/utils/fetchBusinessListings';
import { useDispatch } from 'react-redux';
import { setBusinessListings } from '@/store/businessSlice';
import ListingCard from '@/components/ListingCard';
import { TJobListing } from '@/Types';

export function MyCards() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const user = useCurrentUser();
  const userId = user?._id;

  const jumpTo = useNavigate();
  

  useEffect(() => {
    const getBusinessListings = async () => {
      setIsLoading(true);
      const fetchedBusinessListings = await fetchBusinessListings(userId);
      dispatch(setBusinessListings(fetchedBusinessListings));
      setIsLoading(false);
    };
    getBusinessListings();
  }, []);

  const businessListings = useBusinessListings();
  // if cards are loading, show loader
  if (isLoading) {
    return (
      <>
        <Center>
          <Loader color="cyan" size="xl" mt={30} />
        </Center>
      </>
    );
  }

  // if no cards, show message
  if (businessListings?.length === 0) {
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

  // if cards exist, show them
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

      <Flex w="80%" align='center' justify="center" wrap="wrap" gap="lg">
        {businessListings && (
          businessListings.map((listing: TJobListing) => 
            <ListingCard key={listing._id} listingID={listing._id} />
          )
        )}
      </Flex>
    </Flex>
  );
}
