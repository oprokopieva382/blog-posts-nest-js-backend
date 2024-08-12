import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeviceRepository } from '../device.repository';
import { AuthRepository } from '../../auth/auth.repository';
import { ForbiddenException, NotFoundException, UnauthorizedException } from '@nestjs/common';

export class DeleteDeviceByIdCommand {
  constructor(
    public userId: string,
    public id: string,
  ) {}
}

@CommandHandler(DeleteDeviceByIdCommand)
export class DeleteDeviceByIdUseCase
  implements ICommandHandler<DeleteDeviceByIdCommand>
{
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(command: DeleteDeviceByIdCommand) {
    const dbSession = await this.authRepository.getSessionByDeviceId(
      command.id,
    );
    if (!dbSession) {
      throw new UnauthorizedException();
    }

    if (command.userId !== dbSession.userId) {
      throw new ForbiddenException();
    }

    const result = await this.deviceRepository.removeDevice(command.id);

    if (!result) {
      throw new NotFoundException();
    }
  }
}