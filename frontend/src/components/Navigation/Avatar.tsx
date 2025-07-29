import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ActionIcon, Avatar } from '@mantine/core';
import { RootState } from '@/store/store';
//import { toggleAdminView } from '@/store/authSlice';

export function AvatarIcon(props: { closeDrawer?: () => void }) {
  //const dispatch = useDispatch();
  const jumpTo = useNavigate();
  const user = useSelector((state: RootState) => state.authSlice.currentUser);

  return (
    <ActionIcon
      variant="outline"
      color="green"
      radius={100}
      size={40}
      onClick={() => {
        //dispatch(toggleAdminView(false));
        jumpTo(`/edit-profile/${user?._id}`);
        if (props.closeDrawer) {
          props.closeDrawer();
        }
      }}
    >
      <Avatar style={{ cursor: 'pointer' }} size={30} />
    </ActionIcon>
  );
}
