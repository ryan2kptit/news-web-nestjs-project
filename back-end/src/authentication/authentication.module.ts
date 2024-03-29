import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { EmailModule } from '../common/services/email.module';
import { OtpModule } from '../common/services/otp.module';
import { EncryptionModule } from '../common/services/encryption.module';
import { BullModule } from '@nestjs/bull';
import { MessageQueueModule } from '../common/services/queue/queue.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      },
    }),
    BullModule.registerQueue({
      name: 'message-queue',
    }),
    PassportModule,
    EmailModule,
    OtpModule,
    EncryptionModule,
    MessageQueueModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
