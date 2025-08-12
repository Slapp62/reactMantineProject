import { useEffect, useState } from 'react';
import { IconArrowUp, IconMoodSad2 } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { Box, Button, Flex, Pagination, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Hero } from '@/components/Hero';
import ListingCard from '@/components/ListingCard';
import { RootState } from '@/store/store';
import { TJobListing } from '@/Types';
import { reduxHelpers } from '@/utils/reduxHelperHooks';
import { CustomLoader } from '@/components/CustomLoader';

export function HomePage() {

  const allListings = reduxHelpers.useListings() ?? [];
  const isLoading = reduxHelpers.useListingLoading();

  const initSortedCards = [...allListings].sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      return b.createdAt?.localeCompare(a.createdAt);
    }
    return 0;
  });

  const searchWord = useSelector((state: RootState) => state.searchSlice.searchWord);
  const sortOption = useSelector((state: RootState) => state.listingSlice.sortOption);
  const isMobile = useMediaQuery('(max-width: 500px)');

  const sortedCards = [...initSortedCards].sort((a, b) => {
    if (sortOption === 'title-asc') {
      return a.jobTitle.localeCompare(b.jobTitle);
    }
    if (sortOption === 'title-desc') {
      return b.jobTitle.localeCompare(a.jobTitle);
    }
    if (sortOption === 'date-created-old') {
      if (a.createdAt && b.createdAt) {
        return a.createdAt?.localeCompare(b.createdAt);
      }
    }
    if (sortOption === 'date-created-new') {
      if (a.createdAt && b.createdAt) {
        return b.createdAt?.localeCompare(a.createdAt);
      }
    }
    return 0;
  });

  const searchCards = sortedCards.filter((listing: TJobListing) => {
      const keyWord = searchWord.toLowerCase();
      return (
        listing.jobTitle?.toLowerCase().includes(keyWord) ||
        listing.jobDescription?.toLowerCase().includes(keyWord)
      );
  });

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;

  const paginatedCards = searchCards
    .slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)
    .map((card: TJobListing) => card._id);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchCards]);

  const startCurrentCards = (currentPage - 1) * cardsPerPage + 1;
  const endCurrentCards = Math.min(currentPage * cardsPerPage, searchCards.length);
  const totalCurrentCards = searchCards.length;
  const noCards = searchCards.length === 0;

  return (
    <>
      <Hero />
      {isLoading || !allListings ? (
        <CustomLoader />
      ) : (
        <Flex direction="column" align="center" gap={20}>
          <Flex wrap="wrap" gap="lg" justify="center" w={isMobile ? '100%' : '80%'}>
            {paginatedCards.map((id: string) => (
              <ListingCard listingID={id} key={id} />
            ))}
          </Flex>

          {!noCards && (
            <>
              <Text fw={500}>
                Showing {startCurrentCards} to {endCurrentCards} of {totalCurrentCards} results
              </Text>
              <Pagination
                mt="md"
                total={Math.ceil(searchCards.length / cardsPerPage)}
                value={currentPage}
                onChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </>
          )}

          {noCards && (
            <Box ta="center">
              <IconMoodSad2 color="red" size={80} />
              <Title order={2} fw={700} c="red">
                No Cards Found
              </Title>
            </Box>
          )}

          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            mt={20}
            c="green"
            variant="light"
            rightSection={<IconArrowUp />}
          >
            Back to Top
          </Button>
        </Flex>
      )}
    </>
  );
}
