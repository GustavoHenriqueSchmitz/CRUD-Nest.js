import { Injectable } from '@nestjs/common';
import { persons, PrismaClient } from '@prisma/client';
import { Person } from './crud.dto';
const prisma = new PrismaClient()

@Injectable()
export class AppService {

  // read service
  async read(): Promise<string | persons[]> {

    try {
      const persons = await prisma.persons.findMany()
      return persons
    } catch(err) {
      return `Error while trying to read table: ${err}`
    }
  }

  //create service
  async create(Person: Person): Promise<string> {
    
    if (!Person.first_name) {
      return 'Error! The first_name field is null!'
    } else if (!Person.last_name) {
      return 'Error! The last_name field is null!'
    }

    try {
      const person = prisma.persons.findFirst({
        where: {
            first_name: Person.first_name,
            last_name: Person.last_name
        }
    })
    if ((await person).first_name == Person.first_name || (await person).last_name == Person.last_name) {
      return 'This name already exist in the database.'
    }
    } catch(err){
      return `Error when trying to validate: ${err}`
    }

    try {
      await prisma.persons.create({data: Person})
      return 'Person created with success!'
    } catch(err) {
      return `Error when trying to create data in the database: ${err}`
    }
  }

  // update service
  update(): string {
    return ''
  }

  // delete service
  async delete(id: number): Promise<string> {
    
    try {
      const person = await prisma.persons.findUnique({
        where: {
          id: id
        }
      })
    } catch(err) {

    }
    return ''
  }
}
