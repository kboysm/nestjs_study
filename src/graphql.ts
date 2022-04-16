
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface IQuery {
    cat(id: string): Nullable<Admin> | Promise<Nullable<Admin>>;
    admins(page?: Nullable<number>, size?: Nullable<number>): Nullable<Nullable<Admin>[]> | Promise<Nullable<Nullable<Admin>[]>>;
}

export interface Admin {
    id: string;
    name?: Nullable<string>;
    age?: Nullable<number>;
    breed?: Nullable<string>;
}

type Nullable<T> = T | null;
