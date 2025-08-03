import { Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import ListingCard from '@/components/ListingCard';
import { TJobListing } from '@/Types';

type JobListingsGridProps = {
  listings: TJobListing[];
};

export function JobListingsGrid({ listings }: JobListingsGridProps) {
  const isMobile = useMediaQuery('(max-width: 500px)');

  return (
    <Flex wrap="wrap" gap="lg" justify="center" w={isMobile ? '100%' : '80%'}>
      {listings.map((listing: TJobListing) => (
        <ListingCard listingID={listing._id} key={listing._id} />
      ))}
    </Flex>
  );
}