import {
    InternalServerErrorException,
    Catch,
    ArgumentsHost,
    ExceptionFilter,
    HttpStatus,
    HttpException
} from "@nestjs/common";
// catch all error
@Catch()
export default class InternalServerErrorExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
      
        let { message: errMsg, stack: errStack, name: errName } = exception;
        // let errRes = exception.getResponse();
        // let errCode = exception.getStatus();
        let ctx = host.switchToHttp();
        let req = ctx.getRequest();
        let res = ctx.getResponse();
        const statusName = "Internal System Error";
        res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        // HttpException Error
        if (exception instanceof HttpException) {
            // set httpException res to res
            res.status(exception.getStatus()).json(exception.getResponse());
            return;
        }
        // other error to rewirte InternalServerErrorException response
        res.render("Error.ejs", {
            exception,
            errMsg,
            errStack,
            errName,
            statusCode: res.statusCode,
            statusName,
            req
        });
    }
}