import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';

@Module({
  controllers: [PasswordService],
  providers: [PasswordService],
})
export class PasswordModule {}
