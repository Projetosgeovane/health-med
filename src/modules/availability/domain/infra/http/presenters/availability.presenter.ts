import { AvailabilityEntity } from '../../../enterprise/availability.entity';

export class AvailabilityPresenter {
  static toHTTP(availability: AvailabilityEntity) {
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
