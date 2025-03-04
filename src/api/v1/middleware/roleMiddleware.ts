import { Request, Response, NextFunction } from "express";

// Extend Response type to include `locals`
interface CustomResponse extends Response {
  locals: {
    uid: string;
    role: string;
  };
}

/**
 * Middleware to authorize users based on roles.
 */
export const authorizeRole = (requiredRole: string) => {
  return (req: Request, res: CustomResponse, next: NextFunction) => {
    if (res.locals.role !== requiredRole) {
      return res.status(403).json({ error: "Forbidden: Insufficient permissions" });
    }
    next();
  };
};
