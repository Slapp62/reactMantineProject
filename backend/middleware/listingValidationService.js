import { handleError } from "../utils/errorHandler.js";
import { zodListingValidator } from "../validation/listingValidationZod.js";

const resolver = "Zod";

export const validator = (req, res, next) => {
  const listing = req.body;

  if (resolver === "Zod") {
    req.validation = zodListingValidator(listing);

    if (req.validation.success === true) {
      next();
    } else {
      const zodErrorMessage = req.validation.error;
      handleError(res, 400, zodErrorMessage);
    }
  }
};
