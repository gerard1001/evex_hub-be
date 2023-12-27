import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EventService } from './event.service';
import { CreateEventInput } from './types/event.create.types';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver()
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Mutation()
  async createEvent(
    @Args('eventInput') eventInput: CreateEventInput,
  ): Promise<any> {
    try {
      return await this.eventService.createEvent(eventInput);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Query()
  async getEvents() {
    try {
      return await this.eventService.getEvents();
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Query()
  async getEvent(@Args('id') id: string) {
    try {
      return await this.eventService.getEvent(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
