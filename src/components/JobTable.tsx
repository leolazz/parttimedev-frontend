import React from "react";
import { Container, Row } from "react-bootstrap";
import { sortColumn } from "../common/interfaces";
import { JobDto } from "../dto/job.dto";
// import TableHeader from "./TableHeader";
import BootstrapTable, {
  CellAlignment,
  SortOrder,
} from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";

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

  function returnAnchor(cell: string) {
    return (
      <a className={"secondary"} href={cell}>
        <h5>Apply</h5>
      </a>
    );
  }
  let jobFields: string[] = [];
  props.jobs.forEach((job) => {
    jobFields.push(job.field);
  });
  let reducedJobFields = [...new Set(jobFields)];
  const filterOptions: any = {};
  reducedJobFields.forEach((jobField) => {
    filterOptions[jobField] = jobField;
  });

  const columns = [
    {
      dataField: "field",
      text: "Field",
      headerStyle: () => {
        return { width: "10%" };
      },
      filter: selectFilter({
        options: filterOptions,
        style: { color: "white" },
      }),
    },
    {
      dataField: "title",
      text: "Job Title",
      sort: true,
      headerStyle: () => {
        return { width: "15%" };
      },
    },
    {
      dataField: "description",
      text: "Job Description",
      headerStyle: () => {
        return { width: "20%" };
      },
    },
    {
      dataField: "income",
      text: "Salary",
      sort: true,
      headerStyle: () => {
        return { width: "10%" };
      },
    },
    {
      dataField: "company",
      text: "Company",
      sort: true,
      headerStyle: () => {
        return { width: "10%" };
      },
    },
    {
      dataField: "location",
      text: "Location",
      sort: true,
      headerStyle: () => {
        return { width: "20%" };
      },
    },
    {
      dataField: "link",
      text: "Link",
      formatter: returnAnchor,
      headerStyle: () => {
        return { width: "5%" };
      },
    },
  ];
  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });

  const { SearchBar, ClearSearchButton } = Search;

  const defaultSorted = [{ dataField: "field", order: "asc" }];

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
  // return (
  //   <Container fluid>
  //     <Row>
  //       <ToolkitProvider
  //         bootstrap4
  //         keyField='id'
  //         data={props.jobs}
  //         columns={columns}
  //         search
  //       >
  //         {(props) => (
  //           <div className='allign-center'>
  //             <SearchBar {...props.searchProps} />
  //             <ClearSearchButton {...props.searchProps} />
  //             <hr />
  //             <BootstrapTable
  //               defaultSorted={defaultSorted as any}
  //               pagination={pagination}
  //               {...props.baseProps}
  //               hover={true}
  //               striped={true}
  //               classes={"table-primary active"}
  //               filter={filterFactory()}
  //             />
  //           </div>
  //         )}
  //       </ToolkitProvider>
  //     </Row>
  //     <hr />
  //     <hr />
  //     <hr />
  //     <hr />
  //   </Container>
  // );
};

export default JobTable;
