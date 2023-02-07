import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getBooking, createBooking, updateBooking } from "@/controllers";
import { createBookingSchema } from "@/schemas";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBooking)
  .post("/", validateBody(createBookingSchema), createBooking)
  .put("/:bookingId", updateBooking);

export { bookingRouter };
