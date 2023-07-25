import { Connection, Date, Document, Model, Schema, SchemaTypes } from 'mongoose';
import { User } from './user.model';

interface Film extends Document {
  readonly name: string;
  readonly description: string;
  readonly releaseDate:Date;
  readonly ticketPrice:Number;
  readonly country:string;
  readonly genre:string;
  readonly photo:string;
  readonly createdBy?: Partial<User>;
  readonly updatedBy?: Partial<User>;
}

type FilmModel = Model<Film>;

const FilmSchema = new Schema<Film>(
  {
    name: SchemaTypes.String,
    description: SchemaTypes.String,
    releaseDate:SchemaTypes.Date,
    ticketPrice:SchemaTypes.Number,
    country:SchemaTypes.String,
    genre:SchemaTypes.String,
    photo:SchemaTypes.String,
    createdBy: { type: SchemaTypes.ObjectId, ref: 'User', required: false },
    updatedBy: { type: SchemaTypes.ObjectId, ref: 'User', required: false },
  },
  { timestamps: true },
);

const createFilmModel: (conn: Connection) => FilmModel = (conn: Connection) =>
  conn.model<Film>('Film', FilmSchema, 'films');

export { Film, FilmModel, createFilmModel };
