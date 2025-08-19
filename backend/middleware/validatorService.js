import { handleError } from "../utils/errorHandler.js";
import { listingSchema } from "../validation/listingValidationZod.js";
import { zodValidator } from "../validation/zodValidator.js";

const resolver = "Zod";

export const validator = (req, res, next) => {
  const data = req.body;
  const path = req.originalUrl;
  
  if (resolver === "Zod") {
    if (path === "/api/listings/create"){
      req.validation = zodValidator(listingSchema, data);
    }
    
    if (req.validation.success === true) {
      next();
    } else {
      const zodErrorMessage = req.validation.error;
      handleError(res, 400, zodErrorMessage);
    }
  }
};

