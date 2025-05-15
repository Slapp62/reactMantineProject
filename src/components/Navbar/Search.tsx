import { setSearchWord } from '@/store/searchSlice';
import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useDispatch} from 'react-redux';


export function Search() {
  const dispatch = useDispatch();
      
  return (
    <TextInput
        variant='default'
        rightSection=<IconSearch/>
        placeholder="Fullstack developer..."
        w='100%'
        onChange={(e)=> {dispatch(setSearchWord(e.target.value))}}
    />
  );
}