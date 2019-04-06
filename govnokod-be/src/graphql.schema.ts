
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export enum Language {
    PHP = "PHP",
    C_PLUS_PLUS = "C_PLUS_PLUS",
    C_SHARP = "C_SHARP",
    JavaScript = "JavaScript",
    Java = "Java",
    C = "C",
    Python = "Python",
    SQL = "SQL",
    Objective_C = "Objective_C",
    Bash = "Bash",
    Perl = "Perl",
    Ruby = "Ruby",
    VisualBasic = "VisualBasic",
    Assembler = "Assembler",
    Lua = "Lua",
    Swift = "Swift",
    Haskell = "Haskell",
    Kotlin = "Kotlin"
}

export class SnippetInput {
    content: string;
    language: Language;
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
    abstract getProfile(): User | Promise<User>;

    abstract getSnippets(): Snippet[] | Promise<Snippet[]>;

    abstract getSnippet(id: number): Snippet | Promise<Snippet>;

    abstract getRandomSnippet(exclude?: number): Snippet | Promise<Snippet>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class Snippet {
    id?: number;
    content: string;
    author: User;
    language: string;
}

export class User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
}
