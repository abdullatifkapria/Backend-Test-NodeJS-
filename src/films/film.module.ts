import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
// import { PostDataInitializerService } from './post-data-initializer.service';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';

@Module({
  imports: [DatabaseModule],
  controllers: [FilmController],
  providers: [FilmService],
})
export class FilmModule{}
  //implements NestModule {
  // configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
//     consumer
//       .apply(AuthenticationMiddleware)
//       .forRoutes(
//         { method: RequestMethod.POST, path: '/posts' },
//         { method: RequestMethod.PUT, path: '/posts/:id' },
//         { method: RequestMethod.DELETE, path: '/posts/:id' },
//       );
//   }
// }
