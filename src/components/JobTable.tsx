import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
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
    { path: "description", label: "Job Description" },
    { path: "income", label: "Salary" },
    { path: "field", label: "Field" },
    { path: "company.name", label: "Company" },
    { path: "location", label: "Location" },
  ];

  return (
    <Container fluid>
      <Row>
        <Table striped bordered hover variant='primary'>
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
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default JobTable;
