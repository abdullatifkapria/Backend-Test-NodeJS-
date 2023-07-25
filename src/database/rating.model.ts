import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';
import { User } from './user.model';
import { Film } from './film.model';

interface Rating extends Document {
  readonly rating: string;
  readonly film?: Partial<Film>;
  readonly createdBy?: Partial<User>;
  readonly updatedBy?: Partial<User>;
}

type RatingModel = Model<Rating>;

const RatingSchema = new Schema<Rating>(
  {
    rating: SchemaTypes.Number,
    film: { type: SchemaTypes.ObjectId, ref: 'Film', required: false },
    createdBy: { type: SchemaTypes.ObjectId, ref: 'User', required: false },
    updatedBy: { type: SchemaTypes.ObjectId, ref: 'User', required: false },
  },
  { timestamps: true },
);

const createRatingModel: (conn: Connection) => RatingModel = (
  connection: Connection,
) => connection.model<Rating>('Rating', RatingSchema, 'ratings');

export { Rating, RatingModel, createRatingModel };
