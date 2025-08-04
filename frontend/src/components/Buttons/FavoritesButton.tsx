import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { useLikeUnlike } from '@/hooks/UseLikeUnlike';
import { TJobListing } from '@/Types';
import { useJobseekerProfile } from '@/utils/reduxHelperHooks';

export function FavoritesButton({ listing }: { listing: TJobListing }) {
  const toggleLike = useLikeUnlike();

  const listingId = listing._id;
  const jobseeker = useJobseekerProfile();
  const isLiked = jobseeker?.favorites?.includes(listingId) ?? false;

  return (
    <ActionIcon
      style={{ flex: 1 }}
      color="purple"
      c="purple"
      variant="outline"
      size={40}
      onClick={() => toggleLike(listingId, isLiked)}
    >
      {isLiked ? <IconHeartFilled /> : <IconHeart />}
    </ActionIcon>
  );
}
