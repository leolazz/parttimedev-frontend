import { JobDto } from "../dto/job.dto";

export class JobAPI {
  public static async getAll(): Promise<JobDto[]> {
    const resp = await fetch("http://localhost:5000/jobs", {
      method: "GET",
    });

    const data = await resp.json();

    return data;
  }

  public static async getAllByField(field: String): Promise<JobDto[]> {
    const resp = await fetch(`http://localhost:5000/jobs/field/${field}`, {
      method: "GET",
    });

    const data = await resp.json();

    return data;
  }
}
