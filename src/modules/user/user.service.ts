import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/database/neo4j/query.repository';
import { CreateUserInput } from './types/user.create.types';
import { generateUuid } from 'src/utils/uuid.util';
import { User } from 'src/database/graphql/graphql';
import { PasswordHelper } from 'src/helpers/password.helper';

@Injectable()
export class UserService {
  constructor(
    private readonly queryRepo: QueryRepository,
    private readonly passwordHelper: PasswordHelper,
  ) {}

  async userRegister(createUserInput: CreateUserInput): Promise<any> {
    const { firstName, lastName, password, email, phone, location } =
      createUserInput;

    const user = await this.queryRepo
      .initQuery()
      .raw(
        `
            MERGE (user:User {email: $email})
            ON CREATE SET user.id = $userId,
                          user.firstName = $firstName,
                          user.lastName = $lastName,
                          user.password = $password,
                          user.phone = $phone,
                          user.location = $location
            RETURN user                       
            `,
        {
          userId: generateUuid(),
          email,
          firstName,
          lastName,
          password: await this.passwordHelper.hashPassword(password),
          phone,
          location,
        },
      )
      .run();

    if (user?.length > 0) {
      const {
        user: { properties },
      } = user[0];

      return {
        ...properties,
      };
    }
  }

  async getUsers(): Promise<any> {
    const events = await this.queryRepo
      .initQuery()
      .raw(
        `
        MATCH (user:User) RETURN user 
      `,
      )
      .run();

    if (events?.length > 0) {
      const resultArray = [];

      for (let i = 0; i < events.length; i++) {
        const obj = {};
        obj['id'] = events[i].user.properties?.id;
        obj['firstName'] = events[i].user.properties?.firstName;
        obj['lastName'] = events[i].user.properties?.lastName;
        obj['email'] = events[i].user.properties?.email;
        obj['phone'] = events[i].user.properties?.phone;
        obj['location'] = events[i].user.properties?.location;

        resultArray.push(obj);
      }

      return resultArray;
    }
  }

  async getUser(id: string): Promise<any> {
    const user = await this.queryRepo
      .initQuery()
      .raw(
        `
        MATCH (user:User {id: $id}) RETURN user
        `,
        { id },
      )
      .run();

    if (user?.length > 0) {
      const {
        user: { properties },
      } = user[0];

      return {
        id: properties.id,
        ...properties,
      };
    }
  }

  async getByEmail(email: string): Promise<User> {
    const query = await this.queryRepo
      .initQuery()
      .raw(
        `
        MATCH (user:User {email: $email})
        RETURN user
    `,
        { email },
      )
      .run();

    if (query?.length > 0) {
      const {
        user: { properties },
      } = query[0];

      return {
        ...properties,
      };
    }
  }
}
