import React from "react";
import NumberFormat from "react-number-format";
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
    { path: "title", label: "Job Title" },
    { path: "income", label: "Salary" },
    { path: "field", label: "Field" },
    { path: "company.name", label: "Company" },
    { path: "location", label: "Location" },
  ];

  return (
    <table className='table table-dark mx-auto'>
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <tbody>
        {jobs.map((job) => {
          return (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>
                <NumberFormat
                  value={job.income}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </td>
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
