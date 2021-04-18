import { environment } from './../../environments/environment.prod';

const prefix = "http://localhost:9000"
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
        consult: prefix + "/api/patient/consultation"
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
    date: string;
    time: string;
}
export type CarbForm = {
    id?: number;
    carbIntake: number;
    date: string;
    time: string;
}
export type ConsultationForm = {
    id: number;
    text: string;
    date: string;
}