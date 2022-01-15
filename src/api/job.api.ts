import { JobDto } from '../dto/job.dto';

export class JobAPI {
  public static async getAll(): Promise<JobDto[]> {
    const resp = await fetch('/jobs', {
      method: 'GET',
    });

    const data = await resp.json();

    return data;
  }
}
