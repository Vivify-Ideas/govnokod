
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class SnippetInput {
    content: string;
}

export class UserLoginInput {
    password: string;
    email: string;
}

export class UserRegisterInput {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
}

export class JWTData {
    accessToken: string;
    expiresIn: number;
}

export abstract class IMutation {
    abstract register(data?: UserRegisterInput): JWTData | Promise<JWTData>;

    abstract login(data?: UserLoginInput): JWTData | Promise<JWTData>;

    abstract addSnippet(snippet?: SnippetInput): Snippet | Promise<Snippet>;
}

export abstract class IQuery {
    abstract getSnippets(): Snippet[] | Promise<Snippet[]>;

    abstract getSnippet(id: number): Snippet | Promise<Snippet>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class Snippet {
    id?: number;
    content: string;
    author?: User;
}

export class User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
}
