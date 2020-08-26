import { Controller, Post, Body } from '@nestjs/common';
import { UserCreatorDto } from './dto/userCreationDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController 
{
    constructor(private userService: AuthService)
    {}

    @Post()
    async registerUser(@Body() userCreator: UserCreatorDto)
    {
        await this.userService.registerUser(userCreator);
    }
}