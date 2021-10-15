import React, { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import JobTable from "./JobTable";
import { filterOptions, sortColumn } from "../common/interfaces";
import { JobAPI } from "../api/job.api";
import { JobDto } from "../dto/job.dto";
import _ from "lodash";
import { NavBar } from "./NavBar";
import { TableFilters } from "./TableFilters";
import usePagination from "./usePagination";
import { Pagination } from "@mui/material";

const Job: React.FC = () => {
  const [jobs, setJobs] = useState<JobDto[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  const [page, setPage] = useState(1);
  const PER_PAGE = 15;

  const count = Math.ceil(jobs.length / PER_PAGE);
  const _DATA = usePagination(jobs, PER_PAGE);

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
    _DATA.jump(page);
  };

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

  useEffect(() => {
    async function assignLocations() {
      let jobLocations: string[] = [];
      jobs.forEach((job) => {
        jobLocations.push(job.searchedLocation);
      });
      let setJobLocations = [...new Set(jobLocations)];
      setJobLocations.push("Reset Filter");
      setLocations(setJobLocations);
    }
    assignLocations();
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
    if (filterValue === "Reset Filter") return _DATA.currentData();
    if (filterField === "field")
      return jobs.filter((j) => j.field === filterValue);
    // if (filterField === "location")
    //   return jobs.filter((j) => j.location === filterValue);

    return _DATA.currentData();
  };

  const sorted = _.orderBy(
    filtered(),
    [sortColumn.path],
    sortColumn.order === "asc" ? "asc" : "desc"
  );
  return (
    <div>
      <NavBar />
      <TableFilters
        fields={fields}
        locations={locations}
        onFilter={handleFilter}
      />
      <Pagination
        count={count}
        size='large'
        page={page}
        variant='outlined'
        shape='rounded'
        onChange={handleChange}
      />
      <div>
        <JobTable jobs={sorted} onSort={handleSort} sortColumn={sortColumn} />
      </div>
    </div>
  );
};

export default Job;
