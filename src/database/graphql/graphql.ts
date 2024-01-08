
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class LoginInput {
    email: string;
    password: string;
}

export class CeremonyInput {
    host: string;
    events: string;
    date: string;
    duration?: Nullable<string>;
    location: string;
    venue?: Nullable<string>;
}

export class EventInput {
    type: string;
    prfnIds?: Nullable<string>;
}

export class OrgInput {
    name: string;
    type: string;
    email: string;
    phone: string;
    location: string;
    media?: Nullable<string>;
    prfns?: Nullable<string>;
}

export class OrgPrfnInput {
    orgId: string;
    prfnId: string;
    experienceTime: string;
    description: string;
    images?: Nullable<Nullable<string>[]>;
    address?: Nullable<string>;
}

export class ProfessionInput {
    name: string;
    description: string;
}

export class UserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    location?: Nullable<string>;
}

export class TResponse {
    statusCode: number;
    message: string;
    data?: Nullable<JSON>;
}

export abstract class IQuery {
    abstract welcomeMsg(): Nullable<string> | Promise<Nullable<string>>;

    abstract getCeremony(id?: Nullable<string>): Nullable<Ceremony> | Promise<Nullable<Ceremony>>;

    abstract getCeremonies(): Nullable<Nullable<Ceremony>[]> | Promise<Nullable<Nullable<Ceremony>[]>>;

    abstract getEvents(): Nullable<Nullable<Event>[]> | Promise<Nullable<Nullable<Event>[]>>;

    abstract getEvent(id: string): Nullable<Event> | Promise<Nullable<Event>>;

    abstract getOrgs(): Nullable<Nullable<Org>[]> | Promise<Nullable<Nullable<Org>[]>>;

    abstract getOrg(id: string): Nullable<Org> | Promise<Nullable<Org>>;

    abstract getProfessions(): Nullable<Nullable<Profession>[]> | Promise<Nullable<Nullable<Profession>[]>>;

    abstract getProfession(id: string): Nullable<Profession> | Promise<Nullable<Profession>>;

    abstract getUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract getUser(id: string): User | Promise<User>;
}

export class IResponse {
    statusCode: number;
    message: string;
    error?: Nullable<JSON>;
    data?: Nullable<JSON>;
}

export abstract class IMutation {
    abstract login(loginInput: LoginInput): IResponse | Promise<IResponse>;

    abstract createCeremony(ceremonyInput?: Nullable<CeremonyInput>): Ceremony | Promise<Ceremony>;

    abstract deleteCeremonies(): Nullable<JSON> | Promise<Nullable<JSON>>;

    abstract createEvent(eventInput: EventInput): Event | Promise<Event>;

    abstract linkProfession(orgPrfnInput: OrgPrfnInput): OrgPrfnRel | Promise<OrgPrfnRel>;

    abstract deleteOrgs(): Nullable<JSON> | Promise<Nullable<JSON>>;

    abstract createProfession(professionInput: ProfessionInput): Nullable<Profession> | Promise<Nullable<Profession>>;

    abstract userRegister(userInput: UserInput): User | Promise<User>;
}

export class Ceremony {
    id: string;
    date: string;
    duration?: Nullable<string>;
    location: string;
    venue?: Nullable<string>;
}

export class Event {
    id: string;
    type: string;
}

export class Org {
    id: string;
    name: string;
    type: string;
    email: string;
    password?: Nullable<string>;
    phone: string;
    location: string;
    images?: Nullable<Nullable<string>[]>;
    media?: Nullable<string>;
}

export class OrgPrfnRel {
    id: string;
    experienceTime: string;
    description: string;
    images?: Nullable<Nullable<string>[]>;
    address?: Nullable<string>;
}

export class Profession {
    id: string;
    name: string;
    description: string;
}

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: Nullable<string>;
    phone: string;
    location?: Nullable<string>;
}

export type JSON = any;
type Nullable<T> = T | null;
