import React from "react";
import { sortColumn } from "../common/interfaces";
import { JobDto } from "../dto/job.dto";

interface props {
  jobs: JobDto[];
  onSort: (sortColumn: sortColumn) => void;
  sortColumn: sortColumn;
}

const JobTable: React.FC<props> = (props) => {
  // const { sortColumn, onSort, jobs } = props;
  // const columns = [
  //   { path: "title", label: "Job Title" },
  //   { path: "description", label: "Job Description" },
  //   { path: "income", label: "Salary" },
  //   { path: "field", label: "Field" },
  //   { path: "company.name", label: "Company" },
  //   { path: "location", label: "Location" },
  // ];

  // let jobFields: string[] = [];
  // props.jobs.forEach((job) => {
  //   jobFields.push(job.field);
  // });
  // let reducedJobFields = [...new Set(jobFields)];
  // const filterOptions: any = {};
  // reducedJobFields.forEach((jobField) => {
  //   filterOptions[jobField] = jobField;
  // });

  return (
    <section className='basic-grid'>
      {props.jobs.map((job) => {
        return (
          <div className='card border-secondary mb-3'>
            <h5 className='card-header text-secondary'>
              {job.company} - <em>{job.searchedLocation}</em>
            </h5>
            <h5 className='card-footer text-secondary font-italic'>
              {job.field}
            </h5>
            <div className='card-body'>
              <h4 className='card-title'>{job.title}</h4>
              <p className='card-text'>{job.description}</p>
            </div>
            <div className='card-footer font-italic'>
              <p className='font-italic'>
                <em>Income : </em> {job.income}
              </p>
            </div>
            <div className='card-footer'>
              <a className='btn btn-secondary' href={job.link}>
                Apply
              </a>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default JobTable;
