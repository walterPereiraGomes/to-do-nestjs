import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TodoDto } from './dto/todo.dto'
import { TodoEntity } from './entity/todo.entity'

@Injectable()
export class TodoService {
  constructor( @InjectRepository(TodoEntity) private readonly todoRepository: Repository<TodoEntity>) {}

  async findAll(): Promise<TodoEntity[]> {
    return await this.todoRepository.find()
  }

  async findOne(id: string): Promise<TodoEntity> {
    try {
      return await this.todoRepository.findOneOrFail(id)
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  async create(data: TodoDto): Promise<TodoEntity> {
    return await this.todoRepository.save(this.todoRepository.create(data))
  }

  async updateByIyd (id: string, data: TodoDto) {
    const todo = await this.findOne(id)

    this.todoRepository.merge(todo, data)
    return await this.todoRepository.save(todo)
  }

  async deleteById(id: string) {
    try {
      await this.findOne(id)
      await this.todoRepository.softDelete(id)

    } catch (error) {
      throw new NotFoundException(error.message)
    }

  }
}
