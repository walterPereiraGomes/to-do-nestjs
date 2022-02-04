import { IsNotEmpty, IsIn } from 'class-validator';

export class TodoDto {
  @IsNotEmpty()
  task: string;

  @IsNotEmpty()
  @IsIn([0,1])
  isDone: number;
}