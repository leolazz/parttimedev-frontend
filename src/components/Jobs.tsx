import React, { useEffect } from "react";
import { useState } from "react";
import JobTable from "./JobTable";
import { filterOptions, sortColumn } from "../common/interfaces";
import { JobAPI } from "../api/job.api";
import { JobDto } from "../dto/job.dto";
import _, { filter } from "lodash";
import { NavBar } from "./NavBar";
import { TableFilters } from "./TableFilters";

const Job: React.FC = () => {
  const [jobs, setJobs] = useState<JobDto[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const [filterOption, setFilterOption] = useState<filterOptions>({
    filterField: "na",
    filterValue: "na",
  });
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
      let jobFields: string[] = [];
      jobs.forEach((job) => {
        jobFields.push(job.field);
      });
      let setJobFields = [...new Set(jobFields)];
      setJobFields.push("Reset Filter");
      setFields(setJobFields);
    }
    assignFields();
  }, [jobs]);

  const handleFilter = (filterOption: filterOptions) => {
    console.log(filterOption);
    setFilterOption(filterOption);
  };

  const handleSort = (sortColumn: sortColumn) => {
    setSortColumn(sortColumn);
  };

  const filtered = () => {
    const { filterField, filterValue } = filterOption;
    if (filterValue === "Reset Filter") return jobs;
    if (filterField === "field")
      return jobs.filter((j) => j.field === filterValue);
    // if (filterField === "location")
    //   return jobs.filter((j) => j.location === filterValue);

    return jobs;
  };

  const sorted = _.orderBy(
    filtered(),
    [sortColumn.path],
    sortColumn.order === "asc" ? "asc" : "desc"
  );
  return (
    <div>
      <NavBar />
      <h3 className='mx-auto text-center'>Job Listings</h3>
      <TableFilters fields={fields} onFilter={handleFilter} />
      <div>
        <JobTable jobs={sorted} onSort={handleSort} sortColumn={sortColumn} />
      </div>
    </div>
  );
};

export default Job;
