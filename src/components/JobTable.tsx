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
  const { sortColumn, onSort, jobs } = props;
  const columns = [
    { path: "title", label: "Job Title" },
    { path: "income", label: "Salary" },
    { path: "field", label: "Field" },
    { path: "company.name", label: "Company" },
    { path: "location", label: "Location" },
  ];

  return (
    <div>
      <table className='table table-striped table-primary mx-auto'>
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <tbody>
          {jobs.map((job) => {
            return (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.income}</td>
                <td>{job.field}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td>
                  <a href={job.link}>Apply</a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
