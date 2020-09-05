import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreatorDto } from './dto/userCreationDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService 
{
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService)
    {}

    async registerUser(userCreator: UserCreatorDto): Promise<void>
    {
        await this.userRepository.registerUser(userCreator);
    }

    async loginUser(credentials: UserCreatorDto): Promise<{accessToken: string, username: string}>
    {
        const userInfo = await this.userRepository.authorizeUser(credentials);

        if(!userInfo)
            throw new UnauthorizedException('Invalid credentials');

        const payload = {username: userInfo.username, userId: userInfo.userId};
        
        return {
            accessToken: await this.jwtService.signAsync(payload),
            username: userInfo.username
        };
    }
}
