import React, { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import JobTable from "./JobTable";
import { filterOptions } from "../common/interfaces";
import { JobAPI } from "../api/job.api";
import { JobDto } from "../dto/job.dto";
import { NavBar } from "./NavBar";
import { TableFilters } from "./TableFilters";
import usePagination from "./usePagination";
import { Pagination } from "@mui/material";

const Job: React.FC = () => {
  const [jobs, setJobs] = useState<JobDto[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [filterOptions, setfilterOptions] = useState<filterOptions>({
    filterField: "All Fields",
    filterLocation: "All Locations",
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
      setJobFields.push("All Fields");
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
      setJobLocations.push("All Locations");
      setLocations(setJobLocations);
    }
    assignLocations();
  }, [jobs]);

  const handleFilter = (filterOption: filterOptions) => {
    setfilterOptions(filterOption);
  };
  const filterField = () => {
    const { filterField, filterLocation } = filterOptions;
    const filters = [
      { type: "field", name: filterField },
      { type: "searchedLocation", name: filterLocation },
    ];
    let filteredJobs: JobDto[] = [];
    /// NO FILTERS
    if (filterField === "All Fields" && filterLocation === "All Locations") {
      count = Math.ceil(jobs.length / PER_PAGE);
      return jobs;
    }

    /// JUST LOCATION FILTER
    if (filterField === "All Fields" && filterLocation !== "All Locations") {
      filteredJobs = jobs.filter((j) => j.searchedLocation === filterLocation);
      count = Math.ceil(filteredJobs.length / PER_PAGE);
      return filteredJobs;
    }
    ///  JUST FIELD FILTER
    if (filterField !== "All Fields" && filterLocation === "All Locations") {
      filteredJobs = jobs.filter((j) => j.field === filterField);
      count = Math.ceil(filteredJobs.length / PER_PAGE);
      return filteredJobs;
    }

    if (filterField !== "All Fields" && filterLocation !== "All Locations") {
      filteredJobs = jobs.filter((job) =>
        filters.every(
          (filterEl) => job[filterEl.type as keyof typeof job] === filterEl.name
        )
      );
      count = Math.ceil(filteredJobs.length / PER_PAGE);
      return filteredJobs;
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
        filterOption={filterOptions}
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
