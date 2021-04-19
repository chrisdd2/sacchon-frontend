export class ApiError{
    code?:number;
    contactEmail?:string;
    description:string;
    homeRef?:string;
    reasonPhrase?:string;
    uri?:string;

    constructor(desc){
        this.description=desc;
        this.code=500;
    }
}