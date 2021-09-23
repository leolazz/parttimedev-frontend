import { company } from "./company.dto";

export interface JobDto {
  id: number;

  title: string;

  income: string;

  description: string;

  field: string;

  company: string;

  location: string;

  link: string;
}

export enum Fields {
  softwareEngineer = "Software Engineer",
  frontendDevloper = "Frontend Developer",
  backendDeveloper = "Backend Developer",
  securityEngineer = "Security Engineer",
  uxUi = "UX/UI",
  designer = "Designer",
}
