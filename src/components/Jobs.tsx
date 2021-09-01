import React, { useEffect } from "react";
import { useState } from "react";
import JobTable from "./JobTable";
import { sortColumn } from "../common/interfaces";
import { JobAPI } from "../api/job.api";
import { JobDto } from "../dto/job.dto";
import _ from "lodash";
import { NavBar } from "./NavBar";

const Job: React.FC = () => {
  const [jobs, setJobs] = useState<JobDto[]>([]);
  const [sortColumn, setSortColumn] = useState<sortColumn>({
    path: "jobs.field",
    order: "desc",
  });

  useEffect(() => {
    async function fetchAll() {
      const resp = await JobAPI.getAll();

      setJobs(resp);
    }

    fetchAll();
  }, []);

  const handleSort = (sortColumn: sortColumn) => {
    console.log(sortColumn);
    setSortColumn(sortColumn);
  };

  const sorted = _.orderBy(
    jobs,
    [sortColumn.path],
    sortColumn.order === "asc" ? "asc" : "desc"
  );
  console.log(sorted);
  return (
    <div>
      <NavBar />
      <h3 className='mx-auto text-center'>Job Listings</h3>
      <div>
        <JobTable jobs={sorted} onSort={handleSort} sortColumn={sortColumn} />
      </div>
    </div>
  );
};

export default Job;
