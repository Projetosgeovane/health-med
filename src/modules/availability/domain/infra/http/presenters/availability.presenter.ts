import { AvailabilityEntity } from '../../../enterprise/availability.entity';

export class AvailabilityPresenter {
  static toHTTP(availability: AvailabilityEntity) {
    return {
      id: availability.id.toValue(),
      date: availability.date,
      time: availability.time,
      doctorId: availability.doctorId,

      createdAt: availability.createdAt,
      updatedAt: availability.updatedAt,
      deletedAt: availability.deletedAt,
    };
  }
}
