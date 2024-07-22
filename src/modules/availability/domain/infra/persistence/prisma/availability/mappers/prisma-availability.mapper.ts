import { Prisma, Availability as PrismaAvailability } from '@prisma/client';
import { UniqueEntityID } from 'libs/core/src/entities';
import { AvailabilityEntity } from 'src/modules/availability/domain/enterprise/availability.entity';

export class PrismaAvailabilityMapper {
  static toDomain(raw: PrismaAvailability): AvailabilityEntity {
    const availability = AvailabilityEntity.instance(
      {
        date: raw.date,
        time: raw.time,
        userId: raw.userId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      new UniqueEntityID(raw.id),
    );

    return availability;
  }

  static toPrisma(
    availability: AvailabilityEntity,
  ): Prisma.AvailabilityUncheckedCreateInput {
    return {
      id: availability.id.toValue(),
      date: availability.date,
      time: availability.time,
      userId: availability.userId,
      createdAt: availability.createdAt,
      updatedAt: availability.updatedAt,
      deletedAt: availability.deletedAt,
    };
  }
}
