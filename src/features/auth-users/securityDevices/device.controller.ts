import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IsAuthRefreshTokenGuard } from '../auth/guards/is-auth-refresh-token.guard';
import { DeviceQueryRepository } from './device.query.repository';

@Controller('devices')
@UseGuards(IsAuthRefreshTokenGuard)
export class DeviceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly deviceQueryRepository: DeviceQueryRepository,
  ) {}

  @Get()
  async getDevices(@Request() req) {
    return await this.deviceQueryRepository.getDevices(req.userId);
  }

  @Delete('devices')
  @HttpCode(204)
  async deleteDevices(@Param('id') id: string) {
    // const result = await this.commandBus.execute(new DeleteUserCommand(id));
    // if (!result) {
    //   throw new NotFoundException();
    // }
  }

  @Delete(':deviceId')
  @HttpCode(204)
  async deleteDeviceById(@Param('id') id: string) {
    // const result = await this.commandBus.execute(new DeleteUserCommand(id));
    // if (!result) {
    //   throw new NotFoundException();
    // }
  }
}
