import { ApplicationError } from "@/protocols";

export function cannotBookingRoomFull(): ApplicationError {
  return {
    name: "CannotBookingRoomFull",
    message: "Cannot booking room full!",
  };
}
