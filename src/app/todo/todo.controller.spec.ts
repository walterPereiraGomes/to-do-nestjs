import { BadRequestException, NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { MockTodoService } from './mocks/mock.todoService'
import { TodoController } from './todo.controller'
import { TodoService } from './todo.service'


describe('TodoController', () => {
  let todoController: TodoController
  let todoService: TodoService
  let mockTodoService: MockTodoService = new MockTodoService()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: mockTodoService
        }
      ]
    }).compile()

    todoController = module.get<TodoController>(TodoController)
    todoService = module.get<TodoService>(TodoService)
  })

  it('should be defined', () => {
    expect(todoController).toBeDefined()
    expect(todoService).toBeDefined()
  })

  describe('index() => ', () => {
    it('should return a todo list entity successfully', async () => {
      const result = await todoController.index()
      
      expect(result).toEqual(mockTodoService.todoEntityList)
    })
  
    it('should throw an exception', () => {
      jest.spyOn(todoService, 'findAll').mockRejectedValueOnce(new Error())
  
      expect(todoController.index()).rejects.toThrowError()
    })
  })

  describe('getById () =>', () => {
    it('should return task correct if provided correct param', async () => {
      const result = await todoController.getById(mockTodoService.todoEntityList[0].id)
      expect(result).toEqual(mockTodoService.todoEntityList[0])
    })

    it('should return error if invalid param', async () => {
      jest.spyOn(todoService, 'findOne').mockRejectedValueOnce(new NotFoundException('any message'))

      expect(todoController.getById('1')).rejects.toThrowError()
    })
  })

  describe('create () =>', () => {
    it('should create a new task if provided is correct params', async () => {
      const result = await todoController.create(mockTodoService.newTodoEntity)
      expect(result).toEqual(mockTodoService.newTodoEntity)
      expect(todoService.create).toHaveBeenCalledTimes(1)
    })

    it('should return error if invalid params', async () => {
      jest.spyOn(todoService, 'create').mockRejectedValueOnce(new NotFoundException('any message'))

      expect(todoController.create(mockTodoService.newTodoEntity)).rejects.toThrowError()
    })
  })

  describe('update () => ', () => {
    it('should update tasks successfully', async () => {
      const result = await todoController.update('50', mockTodoService.updatedTodoEntity)
      expect(result).toEqual(mockTodoService.updatedTodoEntity)
    })

    it('should error an update task', () => {
      jest.spyOn(todoService, 'updateByIyd').mockRejectedValueOnce(new BadRequestException('any error'))

      expect(todoController.update(mockTodoService.updatedTodoEntity.id, mockTodoService.updatedTodoEntity)).rejects.toThrowError()
    })
  })

  describe('delete () =>', () => {
    it('should delete is successfully', async () => {
      const result = await todoController.delete('1')

      expect(result).toBeUndefined()
    })

    it('should throw an exception', () => {
      jest.spyOn(todoService, 'deleteById').mockRejectedValueOnce(new BadRequestException('any error'))

      expect(todoController.delete('1')).rejects.toThrowError()
    })
  })
})
