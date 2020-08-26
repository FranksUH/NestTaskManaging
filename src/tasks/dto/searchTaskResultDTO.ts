import {Task} from '../tasks.entity';

export class SearchTaskResultDTO{
    tasks: Task[];
    resultCount: number
}