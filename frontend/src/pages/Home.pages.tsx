import { useEffect, useMemo, useState, useCallback } from 'react';
import { IconArrowUp, IconMoodSad2 } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Center, Flex, Loader, Pagination, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Hero } from '@/components/Hero';
import ListingCard from '@/components/ListingCard';
import { fetchListingsThunk } from '@/store/listingSlice';
import { RootState, AppDispatch } from '@/store/store';
import { TJobListing } from '@/Types';

export function HomePage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchListingsThunk());
  }, [dispatch]);

  const allListings = useSelector((state: RootState) => state.listingSlice.listings);
  const isLoading = useSelector((state: RootState) => state.listingSlice.loading);

  const searchWord = useSelector((state: RootState) => state.searchSlice.searchWord);
  const sortOption = useSelector((state: RootState) => state.listingSlice.sortOption);
  const isMobile = useMediaQuery('(max-width: 500px)');

  // Combine all filtering and sorting into a single optimized useMemo
  const processedCards = useMemo(() => {
    if (!allListings || allListings.length === 0) {
      return [];
    }

    let processed = [...allListings];
    
    // Filter by search word first (most selective)
    if (searchWord.trim()) {
      const keyWord = searchWord.toLowerCase().trim();
      processed = processed.filter((listing: TJobListing) => {
        return (
          listing.jobTitle.toLowerCase().includes(keyWord) ||
          listing.jobDescription.toLowerCase().includes(keyWord) ||
          listing.industry?.toLowerCase().includes(keyWord) ||
          listing.location?.city?.toLowerCase().includes(keyWord)
        );
      });
    }

    // Then sort the filtered results
    processed.sort((a: TJobListing, b: TJobListing) => {
      switch (sortOption) {
        case 'title-asc':
          return a.jobTitle.localeCompare(b.jobTitle);
        case 'title-desc':
          return b.jobTitle.localeCompare(a.jobTitle);
        case 'date-created-old':
          if (a.createdAt && b.createdAt) {
            return a.createdAt.localeCompare(b.createdAt);
          }
          return 0;
        case 'date-created-new':
          if (a.createdAt && b.createdAt) {
            return b.createdAt.localeCompare(a.createdAt);
          }
          return 0;
        default:
          // Default sort by creation date (newest first)
          if (a.createdAt && b.createdAt) {
            return b.createdAt.localeCompare(a.createdAt);
          }
          return 0;
      }
    });

    return processed;
  }, [allListings, searchWord, sortOption]);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;

  const paginatedCards = useMemo(() => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return processedCards.slice(startIndex, endIndex);
  }, [processedCards, currentPage, cardsPerPage]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchWord, sortOption]);

  // Memoized pagination handler
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const startCurrentCards = (currentPage - 1) * cardsPerPage + 1;
  const endCurrentCards = Math.min(currentPage * cardsPerPage, processedCards.length);
  const totalPages = Math.ceil(processedCards.length / cardsPerPage);
  const totalCurrentCards = processedCards.length;
  const noCards = processedCards.length === 0;

  return (
    <>
      <Hero />
      {isLoading || !allListings ? (
        <Center>
          <Loader color="cyan" size="xl" mt={30} />
        </Center>
      ) : (
        <Flex direction="column" align="center" gap={20}>
          <Flex wrap="wrap" gap="lg" justify="center" w={isMobile ? '100%' : '80%'}>
            {paginatedCards.map((listing: TJobListing) => (
              <ListingCard listingID={listing._id} key={listing._id} />
            ))}
          </Flex>

          {!noCards && (
            <>
              <Text fw={500}>
                Showing {startCurrentCards} to {endCurrentCards} of {totalCurrentCards} results
              </Text>
              <Pagination
                mt="md"
                total={totalPages}
                value={currentPage}
                onChange={handlePageChange}
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
