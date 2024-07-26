import { ResourceNotFoundError } from '@enablers/core/errors';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EditAvailabilityUseCase } from 'src/modules/availability/domain/application/use-cases/availability/edit-availability.use-case';
import { UpdateAvailabilityDTO } from '../../dtos/availability/update-availability.dto';
import { Roles } from 'src/modules/auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth-guard';
import { RolesGuard } from 'src/modules/auth/roles.guard';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class EditAvailabilityController {
  constructor(
    private readonly updateAvailabilityUseCase: EditAvailabilityUseCase,
  ) { }

  @Put('availabilities/:id')
  @Roles(UserRole.DOCTOR)
  @HttpCode(204)
  async handle(
    @Param('id') availabilityID: string,
    @Body() body: UpdateAvailabilityDTO,
    @Req() req: any,
  ) {
    const { date, time } = body;
    const doctorId = req.user.sub;

    const result = await this.updateAvailabilityUseCase.execute({
      availabilityID,
      date,
      time,
      doctorId,
    });

    if (result.isFailure()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException();
      }
    }
  }
}
