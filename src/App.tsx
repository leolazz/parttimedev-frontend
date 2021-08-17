import React, { useEffect, useState } from "react";
import "./App.css";
import { JobAPI } from "./api/job.api";
import { JobDto } from "./dto/job.dto";

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
    <div className="App">
      <ul>
        {jobs.map((job) => {
          return <li>{job.income}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
