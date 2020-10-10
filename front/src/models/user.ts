export default class User {
    // 1. Typage des propiétés d'un user.
    age: number;
    blocked: boolean;
    first_name: string;
    id: number;
    last_seens: string;
    liked: boolean;
    matches: boolean;
    pictures: Array<string>;
    sex: string;


    /*id: number;
    name: string;
    picture: string;
    types: Array<string>;
    created: Date;
    gender:string;
     */
    // 2. Définition des valeurs par défaut des propriétés d'un user.
    constructor(
        age: number,
        blocked: boolean,
        first_name: string,
        id: number,
        last_seens: string,
        liked: boolean,
        matches: boolean,
        pictures: Array<string>,
        sex: string,
    ) {
     // 3. Initialisation des propiétés d'un user.
     this.age = age;
     this.blocked = blocked;
     this.first_name = first_name;
     this.id = id;
     this.last_seens = last_seens;
     this.liked = liked;
     this.matches = matches;
     this.pictures = pictures;
     this.sex = sex;
    }
/*
    constructor(
        id: number,
        name: string = 'name',
        picture: string = 'http://...',
        types: Array<string> = ['Normal'],
        created: Date = new Date(),
        gender:string = 'Unknow',
       ) {
        // 3. Initialisation des propiétés d'un user.
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.types = types;
        this.created = created;
        this.gender = gender;
       }
       */
   }