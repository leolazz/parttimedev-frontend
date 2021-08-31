import React, { useEffect, useState } from "react";
import "./App.css";
import { JobAPI } from "./api/job.api";
import { JobDto } from "./dto/job.dto";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [jobs, setJobs] = useState<JobDto[]>([]);

  useEffect(() => {
    async function fetchAll() {
      const resp = await JobAPI.getAll();

      setJobs(resp);
    }

    fetchAll();
  }, []);

  return (
    <table className='table table-dark'>
      <thead>
        <tr>
          <th>Job Title</th>
          <th>Salary</th>
          <th>Field</th>
          <th>company</th>
          <th>location</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => {
          return (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.income}</td>
              <td>{job.field}</td>
              <td>{job.companyName}</td>
              <td>{job.location}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default App;
