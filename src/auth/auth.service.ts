import { Injectable } from '@nestjs/common';
import { UserRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreatorDto } from './dto/userCreationDto';

@Injectable()
export class AuthService 
{
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository)
    {}

    async registerUser(userCreator: UserCreatorDto): Promise<void>
    {
        await this.userRepository.registerUser(userCreator);
    }
}
