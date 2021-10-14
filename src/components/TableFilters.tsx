import * as React from "react";
import { Dropdown } from "react-bootstrap";
import { filterOptions } from "../common/interfaces";

interface props {
  fields: string[];
  locations: string[];
  onFilter: (arg: filterOptions) => void;
}

const TableFilters: React.FC<props> = (props) => {
  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        marginLeft: "10%",
        marginRight: "10%",
      }}
    >
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          margin: "1%",
        }}
      >
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
      </div>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          margin: "1%",
        }}
      >
        <Dropdown>
          <Dropdown.Toggle variant='secondary'>Locations</Dropdown.Toggle>
          <Dropdown.Menu>
            {props.locations.map((location) => (
              <Dropdown.Item
                className={location === "Reset Filter" ? "text-danger" : ""}
                // onClick={() =>
                //   props.onFilter({ filterlocation: "location", filterValue: location })
                // }
                key={location}
              >
                {location}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};
export { TableFilters };
