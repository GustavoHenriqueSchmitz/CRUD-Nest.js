import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { persons } from '@prisma/client';
import { AppService } from './app.service';
import { Person } from './crud.dto';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/read')
  async read(): Promise<string | persons[]> {
    return this.appService.read();
  }

  @Post('/create')
  create(@Body() Person: Person): Promise<string> {
    return this.appService.create(Person)
  }

  @Put('/update')
  update(): string {
    return this.appService.update()
  }

  @Delete('/delete')
  delete(@Param() id: number): Promise<string> {
    return this.appService.delete(id)
  }
}
