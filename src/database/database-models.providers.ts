import { Connection } from 'mongoose';
import { Comment, createCommentModel } from './comment.model';
import {
  COMMENT_MODEL,
  DATABASE_CONNECTION,
  USER_MODEL,
  FILM_MODEL,
  RATING_MODEL
} from './database.constants';
import { createFilmModel } from './film.model';
import { createUserModel } from './user.model';
import {createRatingModel} from './rating.model'

export const databaseModelsProviders = [
  {
    provide: COMMENT_MODEL,
    useFactory: (connection: Connection) => createCommentModel(connection),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) => createUserModel(connection),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: FILM_MODEL,
    useFactory: (connection: Connection) => createFilmModel(connection),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: RATING_MODEL,
    useFactory: (connection: Connection) => createRatingModel(connection),
    inject: [DATABASE_CONNECTION],
  }


];
