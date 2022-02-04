import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { TodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('api/todos')
@ApiTags('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'get all tasks'})
  @ApiResponse({ status: 200, description: 'list of all tasks'})
  async index() {
    return await this.todoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get task by id'})
  @ApiResponse({ status: 200, description: 'data of a task'})
  @ApiResponse({ status: 400, description: 'invalid params'})
  @ApiResponse({ status: 404, description: 'Task not found' })
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todoService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task'})
  @ApiResponse({ status: 201, description: 'task created with success'})
  @ApiResponse({ status: 400, description: 'Invalid Params'})
  async create(@Body() body: TodoDto) {
    return await this.todoService.create(body)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task'})
  @ApiResponse({ status: 400, description: 'Invalid Params'})
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 200, description: 'Task updated with success' })
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: TodoDto) {
    return await this.todoService.updateByIyd(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task'})
  @ApiResponse({ status: 204, description: 'Task deleted' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.todoService.deleteById(id);
  }
}
