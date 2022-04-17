
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface IQuery {
    cat(id?: Nullable<number>): Nullable<Cat> | Promise<Nullable<Cat>>;
    cats(): Nullable<Nullable<Cat>[]> | Promise<Nullable<Nullable<Cat>[]>>;
}

export interface Cat {
    id: number;
    name?: Nullable<string>;
    age?: Nullable<number>;
    breed?: Nullable<string>;
}

type Nullable<T> = T | null;
