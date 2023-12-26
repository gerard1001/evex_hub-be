
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class OrgInput {
    name: string;
    type: string;
    email: string;
    phone: string;
    location: string;
    media?: Nullable<string>;
}

export class TResponse {
    statusCode: number;
    message: string;
    data?: Nullable<JSON>;
}

export abstract class IQuery {
    abstract welcomeMsg(): Nullable<string> | Promise<Nullable<string>>;

    abstract getOrgs(): Nullable<Nullable<Org>[]> | Promise<Nullable<Nullable<Org>[]>>;

    abstract getOrg(id: string): Nullable<Org> | Promise<Nullable<Org>>;
}

export class Org {
    id: string;
    name: string;
    type: string;
    email: string;
    password?: Nullable<string>;
    phone: string;
    location: string;
    images?: Nullable<string>;
    media?: Nullable<string>;
}

export type JSON = any;
type Nullable<T> = T | null;
