import { JobDto } from "../dto/job.dto";

export class JobAPI {
  
  public static async getAll(): Promise<JobDto[]> {
    const resp = await fetch("http://localhost:3000/jobs/", {
        method: "GET"
    })

    const data = await resp.json();

    return data;
  }
}