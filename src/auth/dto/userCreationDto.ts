import { IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class UserCreatorDto
{
    @IsNotEmpty()    
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    password: string;    
}