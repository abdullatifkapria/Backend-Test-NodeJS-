import { ArgumentsHost, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Model } from 'mongoose';
import { EMPTY, from, Observable, of } from 'rxjs';
import { mergeMap, throwIfEmpty } from 'rxjs/operators';
import { AuthenticatedRequest } from '../auth/interface/authenticated-request.interface';
import { Comment } from '../database/comment.model';
import { COMMENT_MODEL, FILM_MODEL,RATING_MODEL } from '../database/database.constants';
import { CreateCommentDto } from './create-comment.dto';
import { CreateFilmDto } from './create-film.dto';
import { UpdateFilmDto } from './update-film.dto';
import { Film, FilmModel } from 'database/film.model';
import { CreateRatingDto } from './create-rating.dto';
import { Rating } from 'database/rating.model';

@Injectable({ scope: Scope.REQUEST })
export class FilmService {
  // catch(exception: error,host:ArgumentsHost)
  // {

  // }
  constructor(
    @Inject(FILM_MODEL) 
    private filmModel: Model<Film>,
    @Inject(COMMENT_MODEL) 
    private commentModel: Model<Comment>,

    @Inject(RATING_MODEL) 
    private ratingModel: Model<Rating>,

    @Inject(REQUEST) 


    private req: AuthenticatedRequest,
  ) { }

  findAll(keyword?: string, skip = 0, limit = 10): Observable<Film[]> {
    if (keyword) {
      return from(
        this.filmModel
          .find({ name: { $regex: '.*' + keyword + '.*' } })
          .skip(skip)
          .limit(limit)
          .exec(),
      );
    } else {
      return from(this.filmModel.find({}).skip(skip).limit(limit).exec());
    }
  }

  findById(id: string): Observable<Film> {
    return from(this.filmModel.findOne({ _id: id }).exec()).pipe(
      mergeMap((p) => (p ? of(p) : EMPTY)),
      throwIfEmpty(() => new NotFoundException(`post:$id was not found`)),
    );
  }



  save(data: CreateFilmDto): Observable<Film> {
 
      console.log(data);
      const createFilm: Promise<Film> = this.filmModel.create({
        ...data,
        createdBy: { _id: this.req.user.id },
      });
      
      return from(createFilm);
    

   
  }



  update(id: string, data: UpdateFilmDto): Observable<Film> {
    return from(
      this.filmModel
        .findOneAndUpdate(
          { _id: id },
          { ...data, updatedBy: { _id: this.req.user.id } },
          { new: true },
        )
        .exec(),
    ).pipe(
      mergeMap((p) => (p ? of(p) : EMPTY)),
      throwIfEmpty(() => new NotFoundException(`post:$id was not found`)),
    );
    // const filter = { _id: id };
    // const update = { ...data, updatedBy: { _id: this.req.user.id } };
    // return from(this.postModel.findOne(filter).exec()).pipe(
    //   mergeMap((post) => (post ? of(post) : EMPTY)),
    //   throwIfEmpty(() => new NotFoundException(`post:$id was not found`)),
    //   switchMap((p, i) => {
    //     return from(this.postModel.updateOne(filter, update).exec());
    //   }),
    //   map((res) => res.nModified),
    // );
  }

  deleteById(id: string): Observable<Film> {
    return from(this.filmModel.findOneAndDelete({ _id: id }).exec()).pipe(
      mergeMap((p) => (p ? of(p) : EMPTY)),
      throwIfEmpty(() => new NotFoundException(`post:$id was not found`)),
    );
    // const filter = { _id: id };
    // return from(this.postModel.findOne(filter).exec()).pipe(
    //   mergeMap((post) => (post ? of(post) : EMPTY)),
    //   throwIfEmpty(() => new NotFoundException(`post:$id was not found`)),
    //   switchMap((p, i) => {
    //     return from(this.postModel.deleteOne(filter).exec());
    //   }),
    //   map((res) => res.deletedCount),
    // );
  }

  deleteAll(): Observable<any> {
    return from(this.filmModel.deleteMany({}).exec());
  }

  //  actions for comments
  createCommentFor(id: string, data: CreateCommentDto): Observable<Comment> {
    const createdComment: Promise<Comment> = this.commentModel.create({
      film: { _id: id },
      ...data,
      createdBy: { _id: this.req.user.id },
    });
    return from(createdComment);
  }

  commentsOf(id: string): Observable<Comment[]> {
    const comments = this.commentModel
      .find({
        film: { _id: id },
      })
      //.select('-film')
      .exec();
    return from(comments);
  }



  createRatingFor(id: string, data: CreateRatingDto): Observable<Rating> {
    const createdComment: Promise<Rating> = this.ratingModel.create({
      film: { _id: id },
      ...data,
      createdBy: { _id: this.req.user.id },
    });
    return from(createdComment);
  }

  ratingsOf(id: string): Observable<Rating[]> {
    const ratings = this.ratingModel
      .find({
        film: { _id: id },
      })
      //.select('-film')
      .exec();
    return from(ratings);
  }



}
