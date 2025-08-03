import { Pagination, Text } from '@mantine/core';

type JobListingsPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  resultsPerPage: number;
  onPageChange: (page: number) => void;
};

export function JobListingsPagination({
  currentPage,
  totalPages,
  totalResults,
  resultsPerPage,
  onPageChange,
}: JobListingsPaginationProps) {
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  return (
    <>
      <Text fw={500}>
        Showing {startResult} to {endResult} of {totalResults} results
      </Text>
      <Pagination
        mt="md"
        total={totalPages}
        value={currentPage}
        onChange={onPageChange}
      />
    </>
  );
}