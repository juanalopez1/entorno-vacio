import createError from "@fastify/error";

export const juanainesUnauthorizedError = createError("juanaines001", "%s", 401, Error);
export const juanainesNotFoundError = createError("juanaines002", "%s", 404, Error);
export const juanainesBadRequestError = createError("juanaines003", "%s", 400, Error);
export const juanainesForbiddenError = createError("juanaines004", "%s", 403, Error);
export const juanainesConflictError = createError("juanaines005", "%s", 409, Error);
export const juanainesNotImplementedYetError = createError("juanaines006", "%s", 501, Error);