import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { PasswordModule } from 'src/password/password.module';
import { UsersRepository } from './users.repository';

@Module({
  imports: [PasswordModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService],
  exports: [UsersService, UsersRepository], // Export UsersRepository here
})
export class UsersModule {}
