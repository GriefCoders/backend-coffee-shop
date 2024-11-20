import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PasswordService {
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(2);
    return bcrypt.hash(password, salt);
  }
}
