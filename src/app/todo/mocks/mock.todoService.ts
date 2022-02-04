import { TodoEntity } from "../entity/todo.entity"

export class MockTodoService {
  todoEntityList: TodoEntity[] = [
    new TodoEntity({ id: '1', task: 'task-1', isDone: 0}),
    new TodoEntity({ id: '2', task: 'task-2', isDone: 0}),
    new TodoEntity({ id: '3', task: 'task-3', isDone: 0})
  ]

  newTodoEntity: TodoEntity = new TodoEntity({ task: 'task-100', isDone: 1})

  updatedTodoEntity: TodoEntity = new TodoEntity({id: '50', task: 'updated-task', isDone: 1})

  findAll: jest.Mock = jest.fn().mockResolvedValue(this.todoEntityList)
  findOne: jest.Mock = jest.fn().mockResolvedValue(this.todoEntityList[0])
  create: jest.Mock = jest.fn().mockResolvedValue(this.newTodoEntity)
  updateByIyd: jest.Mock = jest.fn().mockResolvedValue(this.updatedTodoEntity)
  deleteById: jest.Mock = jest.fn().mockResolvedValue(undefined)
}