import React from "react";
import { JobDto } from "../dto/job.dto";

interface props {
  jobs: JobDto[];
}

const JobTable: React.FC<props> = (props) => {
  return (
    <section className='basic-grid'>
      {props.jobs.map((job) => {
        return (
          <div key={job.id} className='card border-secondary mb-3'>
            <h5 className='card-header text-secondary'>{job.company}</h5>
            <h5 className='card-footer text-secondary font-italic'>
              {job.field}
            </h5>
            <div className='card-body'>
              <h4 className='card-title'>{job.title}</h4>
              <p className='card-text'>{job.description}</p>
            </div>
            <div className='card-footer font-italic'>
              <p className='font-italic'>
                <em>Income&nbsp;:&nbsp;&nbsp;</em>
                {job.income}
              </p>
              <p className='font-italic'>
                <em>Remote&nbsp;:&nbsp;&nbsp;</em>
                {job.isRemote === true ? "✓" : "✕"}
              </p>
              <p className='font-italic'>
                <em>Location&nbsp;:&nbsp;&nbsp;</em>
                {job.location}
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
