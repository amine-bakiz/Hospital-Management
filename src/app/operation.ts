import { Time } from "@angular/common";
import { Patient } from "./patient";
import { Doctor } from "./doctor";
import { Equipement } from "./equipement";

export class Operation {
    id ?: number;
    dateoperation !: Date;
    salle !: string;
    pat !: Patient;
    med !: Doctor;
    equi: Equipement[] = [];
}
