import { Autocomplete } from '@mantine/core';

export function Search() {
  return (
    <Autocomplete
        variant='default'
    
        placeholder="Search for a card"
        data={[]}
        w={250}
    />
  );
}