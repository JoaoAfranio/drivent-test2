import { prisma } from "@/config";
import { Booking, Room } from "@prisma/client";

async function findBookingByUser(userId: number): Promise<BookingWithRoom> {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    },
  });
}

type BookingWithRoom = Booking & { Room: Room };

async function findBookingById(bookingId: number): Promise<BookingWithRoom> {
  return prisma.booking.findFirst({
    where: {
      id: bookingId,
    },
    include: {
      Room: true,
    },
  });
}

async function findBookingsRoom(roomId: number): Promise<Booking[]> {
  return prisma.booking.findMany({
    where: {
      roomId,
    },
  });
}

async function createBooking(userId: number, roomId: number): Promise<Booking> {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

async function updateBooking(roomId: number, bookingId: number): Promise<Booking> {
  return prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      roomId,
    },
  });
}

const bookingRepository = {
  findBookingByUser,
  findBookingsRoom,
  createBooking,
  updateBooking,
  findBookingById,
};

export default bookingRepository;
