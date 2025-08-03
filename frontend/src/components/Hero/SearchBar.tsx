import { IconSearch } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { TextInput } from '@mantine/core';
import { setSearchWord } from '@/store/searchSlice';

type SearchBarProps = {
  isMobile: boolean;
};

export function SearchBar({ isMobile }: SearchBarProps) {
  const dispatch = useDispatch();

  return (
    <TextInput
      w={isMobile ? '100%' : '50%'}
      variant="default"
      rightSection={<IconSearch />}
      placeholder="Search for a listing..."
      onChange={(e) => {
        dispatch(setSearchWord(e.target.value));
      }}
    />
  );
}