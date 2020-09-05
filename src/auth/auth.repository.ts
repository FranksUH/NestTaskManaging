import { Repository, EntityRepository } from "typeorm"
import { User } from "./auth.entity"
import { UserCreatorDto } from "./dto/userCreationDto"
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { genSalt, hash } from 'bcrypt';
import { jwtConfig } from "src/configs/jwt.config";

@EntityRepository(User)
export class UserRepository extends Repository<User>
{
    async registerUser(userCreator: UserCreatorDto): Promise<void>
    {
        const user = new User();
        user.username = userCreator.username;

        user.salt = await genSalt();
        user.password = await hash(`${jwtConfig.hashPrefix}${userCreator.password}`, user.salt);

        try {
            await user.save();
        } 
        catch (error) {
            if(error.code == '23505')//Unique value vialation
                throw new ConflictException({message: 'Username already exist'});
            else
                throw new InternalServerErrorException({message: error.message});
        }        
    }

    async authorizeUser(userCredentials: UserCreatorDto): Promise<{username:string, userId:string}>
    {
        const {username, password} = userCredentials;
        const user = await this.findOne({username});
        
        if(user && user.password === await hash(`${jwtConfig.hashPrefix}${password}`, user.salt))
            return {'username': username, 'userId': user.id };
        return null;
    }
}