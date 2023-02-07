import { prisma } from "@/config";
import { Room } from "@prisma/client";

async function findById(roomId: number): Promise<Room> {
  return prisma.room.findFirst({
    where: {
      id: roomId,
    },
  });
}

const roomRepository = {
  findById,
};

export default roomRepository;
