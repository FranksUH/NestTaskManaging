import { Repository, EntityRepository } from "typeorm"
import { User } from "./auth.entity"
import { UserCreatorDto } from "./dto/userCreationDto"

@EntityRepository(User)
export class UserRepository extends Repository<User>
{
    async registerUser(userCreator: UserCreatorDto): Promise<void>
    {
        const user = new User();
        user.username = userCreator.username;
        user.password = userCreator.password;
        await user.save();
    }
}