import { createAbstractBuilder } from 'typescript';
import { environment } from './../../environments/environment.prod';

const prefix = "http://192.168.1.105:9000"
export const ApiRoutes = {
    login: prefix + "/api/auth/login",
    signup: prefix + "/api/auth/signup",
    patient: {
        info: prefix + "/api/patient",
        glucose: prefix + "/api/patient/glucose",
        carb: prefix + "/api/patient/carb",
        avg: {
            carb: prefix + "/api/patient/average/carb",
            glucose: prefix + "/api/patient/average/glucose"
        },
        count : prefix + "/api/patient/count",
        consult: prefix + "/api/patient/consultation",
        notified: prefix + "/api/patient/notified"
    },
    doctor: {
        info: prefix + "/api/doctor",
        patient: {
            list : prefix + "/api/doctor/patients",
            carb : prefix + "/api/doctor/patient/carb",
            glucose: prefix + "/api/doctor/patient/glucose"
        },
        consultation: prefix + "/api/doctor/consultation",
        pending: prefix + "/api/consultation/pending",
    },
    reporter:{
        info: prefix + "/api/reporter/",
        patient:  {
            search : prefix + "/api/reporter/patient/search",
            carb: prefix + "/api/reporter/patient/carb",
            glucose: prefix + "/api/reporter/patient/glucose"
        },
        doctor: {
            search: prefix + "/api/reporter/doctor/search",
            consults: prefix + "/api/reporter/doctor/consults"
        },
        pending: prefix + "/api/reporter/pending"
    }
}

export type SignUpForm = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}
export type LoginForm = {
    username: string;
    password: string;
}
export type GlucoseForm = {
    id?: number;
    glucoseLevel: number;
    date: Date;
    time: string;
}
export type CarbForm = {
    id?: number;
    carbIntake: number;
    date: Date;
}
export type ConsultationForm = {
    id: number;
    text: string;
    date: Date;
}
export type RecordCounts = {
    carbs:number;
    glucose:number;
}