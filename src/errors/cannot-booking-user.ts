import { ApplicationError } from "@/protocols";

export function userCannotBooking(): ApplicationError {
  return {
    name: "UserCannotBooking",
    message: "User cannot booking",
  };
}
