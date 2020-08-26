import { IsNotEmpty } from "class-validator";

export class UserCreatorDto
{
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;    
}