import {PipeTransform, ArgumentMetadata, BadRequestException} from '@nestjs/common'
import { TaskStatus } from '../task-status.enum'

export class TaskStatusValidatorPipe implements PipeTransform
{
    readonly allowedStatus = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN
    ]

    transform(value: any, metadata: ArgumentMetadata) 
    {
        if(value.status)
        {
            value.status = value.status.toUpperCase();
            if(!this.IsAllowedStatus(value.status))
                throw new BadRequestException(`${value.status} is not a valid State.`)
        }    
        return value
    }

    private IsAllowedStatus(status: string)
    {
        return this.allowedStatus.findIndex(s=> s===status) !== -1;
    }
}