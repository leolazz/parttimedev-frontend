import React, { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import JobTable from "./JobTable";
import { filterOptions } from "../common/interfaces";
import { JobAPI } from "../api/job.api";
import { JobDto } from "../dto/job.dto";
// import _ from "lodash";
import { NavBar } from "./NavBar";
import { TableFilters } from "./TableFilters";
import usePagination from "./usePagination";
import { Pagination, Typography } from "@mui/material";

const Job: React.FC = () => {
  const [jobs, setJobs] = useState<JobDto[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [filterFieldOption, setFilterFieldOption] = useState<filterOptions>({
    filterField: "na",
    filterFieldValue: "na",
  });

  const PER_PAGE = 15;

  let count = Math.ceil(jobs.length / PER_PAGE);

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
    _DATA.jump(page);
  };

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
    setFilterFieldOption(filterOption);
  };
  const filterField = () => {
    const { filterField, filterFieldValue } = filterFieldOption;
    if (filterFieldValue === "Reset Filter") return jobs;
    if (filterField === "field") {
      count = Math.ceil(
        jobs.filter((j) => j.field === filterFieldValue).length / PER_PAGE
      );
      console.log(count);
      return jobs.filter((j) => j.field === filterFieldValue);
    }
    return jobs;
  };

  let _DATA = usePagination(filterField(), PER_PAGE);
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <NavBar />
      <TableFilters
        fields={fields}
        locations={locations}
        onFilter={handleFilter}
        filterOption={filterFieldOption}
      />
      <div>
        <JobTable jobs={_DATA.currentData()} />
      </div>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          margin: "1%",
        }}
      >
        <Pagination
          count={count}
          page={page}
          variant='outlined'
          shape='rounded'
          onChange={handleChange}
          siblingCount={1}
        />
      </div>
    </div>
  );
};

export default Job;
