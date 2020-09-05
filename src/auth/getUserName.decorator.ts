import { createParamDecorator } from "@nestjs/common";

export const GetUsername = createParamDecorator((data, request) => 
{
    console.log(request)
    return request.user?.username;
}); 