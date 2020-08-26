import { TaskStatus } from "../tasks.model";
import { IsOptional, IsNumber } from "class-validator";

export class SearchTaskDTO{
    @IsOptional()
    title: string;

    @IsOptional()
    description: string;
    
    @IsOptional()
    status: TaskStatus;

    @IsOptional()
    @IsNumber()
    skip: number

    @IsOptional()
    @IsNumber()
    top: number
}