import { RootState } from '@/store/store';
import { Avatar } from '@mantine/core';
import { useSelector } from 'react-redux';



export function AvatarIcon() {
    const image = useSelector((state:RootState) => state.userSlice.user?.image?.url);
    
  return <Avatar src={image}/>;
}