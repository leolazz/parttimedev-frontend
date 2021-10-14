import React from "react";
import { Container, Row } from "react-bootstrap";
import { sortColumn } from "../common/interfaces";
import { JobDto } from "../dto/job.dto";
// import TableHeader from "./TableHeader";
import BootstrapTable, { SortOrder } from "react-bootstrap-table-next";
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
    { dataField: "title", text: "Job Title", sort: true },
    { dataField: "description", text: "Job Description" },
    { dataField: "income", text: "Salary", sort: true },
    {
      dataField: "field",
      text: "Field",
      // sort: true,
      filter: selectFilter({ options: filterOptions }),
    },
    { dataField: "company", text: "Company", sort: true },
    { dataField: "location", text: "Location", sort: true },
    { dataField: "link", text: "Link", formatter: returnAnchor },
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

  // this is necessary due to some unholy type error
  // const order: SortOrder = "asc";
  // const dataField: string = "field";

  const defaultSorted = [{ dataField: "field", order: "asc" }];

  return (
    <Container fluid>
      <Row>
        <ToolkitProvider
          bootstrap4
          keyField='id'
          data={props.jobs}
          columns={columns}
          search
        >
          {(props) => (
            <div className='allign-center'>
              <SearchBar {...props.searchProps} />
              <ClearSearchButton {...props.searchProps} />
              <hr />
              <BootstrapTable
                defaultSorted={defaultSorted as any}
                pagination={pagination}
                {...props.baseProps}
                hover={true}
                striped={true}
                classes={"table-primary active"}
                filter={filterFactory()}
              />
            </div>
          )}
        </ToolkitProvider>
      </Row>
      <hr />
      <hr />
      <hr />
      <hr />
    </Container>
  );
};

export default JobTable;
