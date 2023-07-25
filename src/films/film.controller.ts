import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  Scope,
  UseGuards
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoleType } from '../shared/enum/role-type.enum';
import { HasRoles } from '../auth/guard/has-roles.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { ParseObjectIdPipe } from '../shared/pipe/parse-object-id.pipe';
import { Comment } from '../database/comment.model';
import { CreateCommentDto } from './create-comment.dto';
import { CreateFilmDto } from './create-film.dto';
import { FilmService } from './film.service';
import { UpdateFilmDto } from './update-film.dto';
import { Film } from 'database/film.model';
import { CreateRatingDto } from './create-rating.dto';
import { Rating } from 'database/rating.model';

@Controller({ path: 'films', scope: Scope.REQUEST })
export class FilmController {
  constructor(private filmService: FilmService) { }

  @Get('')
  getAllFilms(
    @Query('q') keyword?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Observable<Film[]> {
    return this.filmService.findAll(keyword, skip, limit);
  }

  @Get(':id')
  getFilmById(@Param('id', ParseObjectIdPipe) id: string): Observable<Film> {
    return this.filmService.findById(id);
  }

  @Post('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(RoleType.USER, RoleType.ADMIN)
  createFilm(
    @Body() film: CreateFilmDto,
    @Res() res: Response,
  ): Observable<Response> {
    return this.filmService.save(film).pipe(
      map((film) => {
        return res
          .location('/films/' + film._id)
          .status(201)
          .send();
      }),
    );
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(RoleType.USER, RoleType.ADMIN)
  updateFilm(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() film: UpdateFilmDto,
    @Res() res: Response,
  ): Observable<Response> {
    return this.filmService.update(id, film).pipe(
      map((film) => {
        return res.status(204).send();
      }),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN)
  deleteFilmById(
    @Param('id', ParseObjectIdPipe) id: string,
    @Res() res: Response,
  ): Observable<Response> {
    return this.filmService.deleteById(id).pipe(
      map((post) => {
        return res.status(204).send();
      }),
    );
  }

  @Post(':id/comments')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(RoleType.USER)
  createCommentForFilm(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() data: CreateCommentDto,
    @Res() res: Response,
  ): Observable<Response> {
    return this.filmService.createCommentFor(id, data).pipe(
      map((comment) => {
        return res
          .location('/films/' + id + '/comments/' + comment._id)
          .status(201)
          .send();
      }),
    );
  }

  @Get(':id/comments')
  getAllCommentsOfFilm(@Param('id', ParseObjectIdPipe) id: string): Observable<Comment[]> {
    return this.filmService.commentsOf(id);
  }



  @Post(':id/ratings')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(RoleType.USER)
  createRatingForFilm(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() data: CreateRatingDto,
    @Res() res: Response,
  ): Observable<Response> {
    return this.filmService.createRatingFor(id, data).pipe(
      map((comment) => {
        return res
          .location('/films/' + id + '/ratings/' + comment._id)
          .status(201)
          .send();
      }),
    );
  }
  
  @Get(':id/ratings')
  getAllRatingsForFilm(@Param('id', ParseObjectIdPipe) id: string): Observable<Rating[]> {
    return this.filmService.ratingsOf(id);
  }





}




