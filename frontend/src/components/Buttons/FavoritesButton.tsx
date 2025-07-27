import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { ActionIcon } from '@mantine/core';
import { useLikeUnlike } from '@/hooks/UseLikeUnlike';
import { RootState } from '@/store/store';
import { TJobListing, TJobseekerWithUser } from '@/Types';

export function FavoritesButton({ listing }: { listing: TJobListing }) {
  const toggleLike = useLikeUnlike();

  const heartOutline = <IconHeart />;
  const heartFilled = <IconHeartFilled />;
  const listingID = listing._id;
  const user = useSelector((state: RootState) => state.userSlice.user) as TJobseekerWithUser;
  if (!user) {
    return null;
  }
  const isLiked = user.profileData.favorites?.includes(listingID);
  if (isLiked === undefined) {
    return null;
  }

  return (
    <ActionIcon
      style={{ flex: 1 }}
      color="purple"
      c="purple"
      variant="outline"
      size={40}
      onClick={() => toggleLike(listing, listingID, isLiked)}
    >
      {isLiked ? heartFilled : heartOutline}
    </ActionIcon>
  );
}
