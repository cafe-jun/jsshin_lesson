// import {
//   ArgumentsHost,
//   Catch,
//   ExceptionFilter,
//   HttpStatus,
// } from '@nestjs/common';
// import { QueryFailedError } from 'typeorm';

// @Catch(QueryFailedError)
// export class QueryFailedExceptionFilter implements ExceptionFilter {
//   catch(exception: any, host: ArgumentsHost) {
//     const context = host.switchToHttp();
//     const response = context.getResponse<Response>();
//     const request = context.getRequest<Request>();
//     const { url } = request;
//     const { name } = exception;
//     const errorResponse = {
//       path: url,
//       timestamp: new Date().toISOString(),
//       message: name,
//     };
//     console.log(errorResponse);
//     // response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
//   }
// }
