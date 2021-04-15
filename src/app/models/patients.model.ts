export class Patients {
    id: string;
    name: string;
    consultation: string;

    constructor(id: string, name:string, consultation: string){
        this.id = id;
        this.name = name;
        this.consultation = consultation;
    }

    getPatient(){ 
       return this.id + this.name + this.consultation;
    }
}