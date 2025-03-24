
export interface UserAuth {
    name: string;
    email: string;
    password: string;
}

export interface User extends UserAuth {
    id: string;
}