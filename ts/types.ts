export interface Hero {
    id: string;
    name: string;
    thumb: string;
}

export interface GridOptions {
    parent?: string;
}

export interface Player {
    name: string;
    pick?: Hero[];
    ban?: Hero[];
    heroes?: [Hero, Hero];
}