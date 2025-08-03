import { useEffect, useMemo, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Center, Flex, Loader } from '@mantine/core';
import { Hero } from '@/components/Hero';
import { JobListingsGrid } from '@/components/JobListings/JobListingsGrid';
import { JobListingsPagination } from '@/components/JobListings/JobListingsPagination';
import { EmptyJobListings } from '@/components/JobListings/EmptyJobListings';
import { BackToTopButton } from '@/components/JobListings/BackToTopButton';
import { fetchListingsThunk } from '@/store/listingSlice';
import { RootState, AppDispatch } from '@/store/store';
import { TJobListing } from '@/Types';
import { useListings } from '@/utils/reduxHelperHooks';

export function HomePage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchListingsThunk());
  }, [dispatch]);

  const allListings = useListings();
  const isLoading = useSelector((state: RootState) => state.listingSlice.loading);

  const searchWord = useSelector((state: RootState) => state.searchSlice.searchWord);
  const sortOption = useSelector((state: RootState) => state.listingSlice.sortOption);

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

  const totalPages = Math.ceil(processedCards.length / cardsPerPage);
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
          <JobListingsGrid listings={paginatedCards} />

          {!noCards && (
            <JobListingsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={processedCards.length}
              resultsPerPage={cardsPerPage}
              onPageChange={handlePageChange}
            />
          )}

          {noCards && <EmptyJobListings />}

          <BackToTopButton />
        </Flex>
      )}
    </>
  );
}
