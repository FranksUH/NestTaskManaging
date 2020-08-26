import { TaskStatus } from "../task-status.enum";
import { IsOptional, IsNotEmpty } from "class-validator";

export class UpdateDTO{
    @IsOptional()
    title: string;
    
    @IsOptional()
    description: string;

    @IsOptional()
    status: TaskStatus;

    @IsNotEmpty()
    id: string;
}