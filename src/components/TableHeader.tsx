import React from "react";
import { Column, sortColumn } from "../common/interfaces";

interface props {
  columns: Column[];
  sortColumn: sortColumn;
  onSort: (arg: sortColumn) => void;
}

const TableHeader: React.FC<props> = (props) => {
  const raiseSort = (path: string) => {
    const sortColumn = { ...props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    props.onSort(sortColumn);
  };
  return (
    <thead>
      <tr>
        {props.columns.map((column) => (
          <th key={column.path} onClick={() => raiseSort(column.path)}>
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
