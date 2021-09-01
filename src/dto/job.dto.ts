import { company } from "./company.dto";

export interface JobDto {
  id: number;

  title: string;

  income: number;

  field: Fields;

  company: company;

  location: string;
}

export enum Fields {
  softwareEngineer = "Software Engineer",
  frontendDevloper = "Frontend Developer",
  backendDeveloper = "Backend Developer",
  securityEngineer = "Security Engineer",
  uxUi = "UX/UI",
  designer = "Designer",
}