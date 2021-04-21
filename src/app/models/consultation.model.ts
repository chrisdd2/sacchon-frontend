export interface Consultation{
    id:number;
    consultationText:string;
    date:Date;
    expirationDate:Date;
    patientName?:string;
}