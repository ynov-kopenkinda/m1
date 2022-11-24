import { RequestHandler } from "express";

const keyToUser: { [key: string]: { id: number; name: string } | undefined } = {
  "9cdfb439c7876e703e307864c9167a15": {
    id: 1,
    name: "John Doe",
  },
};

const AuthMiddleware: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown,
  { user: User }
> = (req, res, next) => {
  const apiKey = req.header("X-YBook-API-Key");
  const apiUser = req.header("X-YBook-API-User");
  if (!apiKey || !apiUser) {
    return next({
      status: 401,
      message: "Missing API Key or API User",
    });
  }
  const user = keyToUser[apiKey];
  if (!user || user.id !== parseInt(apiUser)) {
    return next({
      status: 401,
      message: "Invalid API Key",
    });
  }
  res.locals.user = user;
  next();
};

export default AuthMiddleware;
