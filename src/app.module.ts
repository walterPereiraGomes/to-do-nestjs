import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123',
      database: 'todo',
      entities: [],
      synchronize: true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
