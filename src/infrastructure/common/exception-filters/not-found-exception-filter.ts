import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus, NotFoundException} from "@nestjs/common";
import {Request, Response} from "express";


@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = exception.getStatus()
        const responseBody: any = exception.getResponse()
        if (status === HttpStatus.NOT_FOUND) {
            const errorsResponse: any = {
                errorsMessages: []
            }
            if (Array.isArray(responseBody.message)) {
                responseBody.message.forEach((msg) => {
                        errorsResponse.errorsMessages.push(msg)
                    }
                )
            } else {
                errorsResponse.errorsMessages.push({message: responseBody.message, field: 'id'})
            }
            response.status(status).send(errorsResponse)
        } else {
            response
                .status(status)
                .json(responseBody)
        }

    }
}
