// import { Request } from 'express';
// import { IResponseError } from './global-error.response.interface';

// export const GlobalResponseError: (
//   statusCode: number,
//   message: string,
//   code: string,
//   request: Request,
// ) => IResponseError = (
//   statusCode: number,
//   message: string,
//   code: string,
//   request: Request,
// ): IResponseError => {
//   return {
//     statusCode: statusCode,
//     message,
//     code,
//     timestamp: new Date().toISOString(),
//     path: request.url,
//     method: request.method,
//   };
// };
