import DropdownToggle from "@restart/ui/esm/DropdownToggle";
import * as React from "react";
import { Dropdown } from "react-bootstrap";

interface props {
  fields: String[];
}

const TableFilters: React.FC<props> = (props) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant='secondary'>Fields</Dropdown.Toggle>
      <Dropdown.Menu>
        {props.fields.map((field) => (
          <Dropdown.Item href='#/action-1'>{field}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
export { TableFilters };
