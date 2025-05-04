import { Autocomplete } from '@mantine/core';

export function Search() {
  return (
    <Autocomplete
        variant='default'
    
        placeholder="Search for a listing"
        data={[]}
        w={250}
    />
  );
}