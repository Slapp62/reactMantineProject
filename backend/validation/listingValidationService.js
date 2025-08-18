import zodListingValidator from './listingValidationZod.js';

const resolver = 'Zod';

export const validator = (listing) => {
  if (resolver === 'Zod') {
    return zodListingValidator(listing);
  }
}

