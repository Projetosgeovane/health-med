import { BaseRepository } from 'libs/core/src/repositories';
import { AvailabilityEntity } from '../../enterprise/availability.entity';

export abstract class AvailabilityRepository extends BaseRepository<AvailabilityEntity> { }
