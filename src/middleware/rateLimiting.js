// This code sets up rate limiting for an Express.js server using the express-rate-limit middleware. Rate limiting helps protect your server from abuse or accidental overload by restricting how many requests a client can make in a given time window.




import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { status: "error", message: "Too many requests, try again later." },
});
