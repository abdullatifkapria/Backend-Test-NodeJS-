import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { LoggerModule } from './logger/logger.module';
import { FilmModule } from './films/film.module';
import InternalServerErrorExceptionFilter  from './shared/InternalServerError.filter'

@Module({
  imports: [
    ConfigModule.forRoot({ ignoreEnvFile: true }),
    DatabaseModule,
    AuthModule,
    UserModule,
    FilmModule,
    LoggerModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    InternalServerErrorExceptionFilter
    
  ],
  exports:[AppService]
})
export class AppModule { }
