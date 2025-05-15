import { RootState } from '@/store/store';
import { Avatar } from '@mantine/core';
import { useSelector } from 'react-redux';



export function AvatarIcon() {
    const image = useSelector((state:RootState) => state.userSlice.user?.image?.url);
    // const firstName = useSelector((state:RootState) => state.userSlice.user?.name.first);
    // const lastName = useSelector((state:RootState) => state.userSlice.user?.name.last);
    // const name = `${firstName} ${lastName}`;

    
  return <Avatar 
            src={image}
            // key={name} 
            // name={name} 
            // color="initials"
          />;
}