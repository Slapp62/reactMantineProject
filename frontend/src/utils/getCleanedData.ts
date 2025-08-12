import { TJobListing } from '@/Types';

// export const cleanedUserData = (user: TUsers) => ({
//   name: {
//     first: user.name.first,
//     middle: user.name?.middle || '',
//     last: user.name.last,
//   },
//   phone: user.phone,
//   image: {
//     url: user.image?.url || '',
//     alt: user.image?.alt || '',
//   },
//   address: {
//     country: user.address?.country,
//     state: user.address?.state === "not defined" || !user.address?.state ? '' : user.address?.state,
//     city: user.address?.city,
//     street: user.address?.street,
//     houseNumber: String(user.address?.houseNumber),
//     zip: String(user.address?.zip),
//   }
// });

export const cleanedListingData = (listing: TJobListing) => ({
  jobTitle: listing.jobTitle,
  jobDescription: listing.jobDescription,
  requirements: listing.requirements,
  advantages: listing.advantages,
  apply: {
    method: listing.apply.method,
    contact: listing.apply.contact,
  },
  location: {
    region: listing.location?.region,
    city: listing.location?.city
  },
  workArrangement: listing.workArrangement,
  industry: listing.industry
})
