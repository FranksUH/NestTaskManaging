import { Controller, Post, Body, UsePipes, ValidationPipe, Get, UseGuards, Req } from '@nestjs/common';
import { UserCreatorDto } from './dto/userCreationDto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUsername } from './getUserName.decorator';

@Controller('auth')
export class AuthController 
{
    constructor(private userService: AuthService)
    {}

    @Post('/register')
    @UsePipes(ValidationPipe)
    async registerUser(@Body() userCreator: UserCreatorDto): Promise<void>
    {
        await this.userService.registerUser(userCreator);
    }

    @Post('/login')
    @UsePipes(ValidationPipe)
    async loginUser(@Body() userCreator: UserCreatorDto): Promise<{accessToken: string, username: string}>
    {
        return await this.userService.loginUser(userCreator);
    }

    @Get()
    @UseGuards(AuthGuard())
    test(@Req() req){
        console.log(req)     
    }
}