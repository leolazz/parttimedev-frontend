import React, { useEffect } from "react";
import { useState } from "react";
import JobTable from "./JobTable";
import { filterOption, sortColumn } from "../common/interfaces";
import { JobAPI } from "../api/job.api";
import { JobDto } from "../dto/job.dto";
import _, { assign } from "lodash";
import { NavBar } from "./NavBar";
import { TableFilters } from "./TableFilters";

const Job: React.FC = () => {
  const [jobs, setJobs] = useState<JobDto[]>([]);
  const [fields, setFields] = useState<String[]>([]);
  const [filterOption, setFilterOption] = useState<filterOption>();
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

  useEffect(() => {
    async function assignFields() {
      let jobFields: String[] = [];
      jobs.forEach((job) => {
        jobFields.push(job.field);
      });
      let setJobFields = [...new Set(jobFields)];
      setFields(setJobFields);
    }
    assignFields();
  }, [jobs]);

  const sortJobs = () => {};

  const handleSort = (sortColumn: sortColumn) => {
    setSortColumn(sortColumn);
  };

  const sorted = _.orderBy(
    jobs,
    [sortColumn.path],
    sortColumn.order === "asc" ? "asc" : "desc"
  );
  return (
    <div>
      <NavBar />
      <h3 className='mx-auto text-center'>Job Listings</h3>
      <TableFilters fields={fields} />
      <div>
        <JobTable jobs={sorted} onSort={handleSort} sortColumn={sortColumn} />
      </div>
    </div>
  );
};

export default Job;
