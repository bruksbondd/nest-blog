/* eslint-disable prettier/prettier */
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'sqlite',
    // host: configService.get('HOST'),
    // port: configService.get('PORT'),
    // username: configService.get('USERNAME'),
    // password: configService.get('PASSWORD'),
    database: configService.get('DATABASE'),
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
  }),
  inject: [ConfigService],
};
