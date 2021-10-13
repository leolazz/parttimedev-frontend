import React from "react";
import { Container, Row } from "react-bootstrap";
import { sortColumn } from "../common/interfaces";
import { JobDto } from "../dto/job.dto";
// import TableHeader from "./TableHeader";
import BootstrapTable, { SortOrder } from "react-bootstrap-table-next";

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
  const columns = [
    { dataField: "title", text: "Job Title", sort: true },
    { dataField: "description", text: "Job Description" },
    { dataField: "income", text: "Salary", sort: true },
    { dataField: "field", text: "Field", sort: true },
    { dataField: "company", text: "Company", sort: true },
    { dataField: "location", text: "Location", sort: true },
  ];

  // this is necessary due to some unholy type error
  const order: SortOrder = "asc";
  const dataField: string = "field";

  return (
    <Container fluid>
      <Row>
        <BootstrapTable
          bootstrap4
          keyField='id'
          data={props.jobs}
          columns={columns}
          defaultSorted={[{ dataField, order }]}
        />
        {/* <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        /> */}
        {/* <tbody>
            {jobs.map((job) => {
              return (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.description}</td>
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
          </tbody> */}
      </Row>
    </Container>
  );
};

export default JobTable;
