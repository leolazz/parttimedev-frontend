import * as React from "react";
import { Dropdown } from "react-bootstrap";
import { filterOptions } from "../common/interfaces";

interface props {
  fields: string[];
  onFilter: (arg: filterOptions) => void;
}

const TableFilters: React.FC<props> = (props) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant='secondary'>Fields</Dropdown.Toggle>
      <Dropdown.Menu>
        {props.fields.map((field) => (
          <Dropdown.Item
            className={field === "Reset Filter" ? "text-danger" : ""}
            onClick={() =>
              props.onFilter({ filterField: "field", filterValue: field })
            }
            key={field}
          >
            {field}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
export { TableFilters };
