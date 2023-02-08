import bookingRepository from "@/repositories/booking-repository";
import roomRepository from "@/repositories/room-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

import { notFoundError, cannotBookingRoomFull, userCannotBooking } from "@/errors";

async function getBooking(userId: number) {
  const booking = await bookingRepository.findBookingByUser(userId);
  if (!booking) {
    throw notFoundError();
  }

  return { bookingId: booking.id, Room: booking.Room };
}

async function createBooking(userId: number, roomId: number) {
  await validateIfUserCanBook(userId);
  await validateRoomBooking(roomId);

  const booking = await bookingRepository.createBooking(userId, roomId);

  return { bookingId: booking.id };
}

async function updateBooking(userId: number, roomId: number, bookingId: number) {
  await validateIfUserCanBook(userId);
  await validateRoomBooking(roomId);
  await validateIfUserCanUpdateBooking(userId, bookingId);

  const updatedBooking = await bookingRepository.updateBooking(roomId, bookingId);

  return { bookingId: updatedBooking.id };
}

async function validateIfUserCanUpdateBooking(userId: number, bookingId: number) {
  const booking = await bookingRepository.findBookingById(bookingId);
  if (!booking) throw userCannotBooking();

  if (booking.userId !== userId) throw userCannotBooking();
}

async function validateRoomBooking(roomId: number) {
  const room = await roomRepository.findById(roomId);

  if (!room) throw notFoundError();

  const bookings = await bookingRepository.findBookingsRoom(roomId);

  if (bookings.length >= room.capacity) throw cannotBookingRoomFull();
}

async function validateIfUserCanBook(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw userCannotBooking();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw userCannotBooking();
  }
}

const bookingService = { getBooking, createBooking, updateBooking };

export default bookingService;
