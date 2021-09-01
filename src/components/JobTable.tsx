import React from "react";
import { sortColumn } from "../common/interfaces";
import { JobDto } from "../dto/job.dto";
import TableHeader from "./TableHeader";

interface props {
  jobs: JobDto[];
  onSort: (sortColumn: sortColumn) => void;
  sortColumn: sortColumn;
}

const JobTable: React.FC<props> = (props) => {
  // const jobs = props.jobs;
  const { sortColumn, onSort, jobs } = props;
  const columns = [
    { path: "job.title", label: "Job Title" },
    { path: "job.income", label: "Salary" },
    { path: "job.field", label: "Field" },
    { path: "job.company.name", label: "Company" },
    { path: "job.location", label: "Location" },
  ];

  return (
    <table className='table table-dark'>
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <tbody>
        {jobs.map((job) => {
          return (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.income}</td>
              <td>{job.field}</td>
              <td>{job.company.name}</td>
              <td>{job.location}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default JobTable;