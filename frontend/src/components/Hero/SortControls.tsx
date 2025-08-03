import { IconFilter2 } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from '@mantine/core';
import { setSortOption } from '@/store/listingSlice';
import { RootState } from '@/store/store';

type SortControlsProps = {
  isMobile: boolean;
};

export function SortControls({ isMobile }: SortControlsProps) {
  const dispatch = useDispatch();
  const sortOption = useSelector((state: RootState) => state.listingSlice.sortOption);

  return (
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
  );
}