import { BaseRepository } from 'libs/core/src/repositories';
import { AvailabilityEntity } from '../../enterprise/availability.entity';

export interface AvailabilityPaginationProps {
  page: number;
  perPage: number;
  param: string;
}

export abstract class AvailabilityRepository extends BaseRepository<AvailabilityEntity> {
  abstract findMany(params: AvailabilityPaginationProps);
}
