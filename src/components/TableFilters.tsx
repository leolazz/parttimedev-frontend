import * as React from "react";
import { Dropdown } from "react-bootstrap";
import { filterOptions } from "../common/interfaces";

interface props {
  fields: string[];
  locations: string[];
  filterOption: filterOptions;
  onFilter: (arg: filterOptions) => void;
}

const TableFilters: React.FC<props> = (props) => {
  const { fields, locations, filterOption, onFilter } = { ...props };
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
          <Dropdown.Toggle variant='secondary'>
            {filterOption.filterField === "All Fields"
              ? "Fields"
              : filterOption.filterField}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {fields.map((field) => (
              <Dropdown.Item
                className={field === "All Fields" ? "text-danger" : ""}
                onClick={() =>
                  onFilter({
                    filterField: field,
                    filterLocation: filterOption.filterLocation,
                  })
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
          <Dropdown.Toggle variant='secondary'>
            {filterOption.filterLocation === "All Locations"
              ? "Locations"
              : filterOption.filterLocation}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {locations.map((location) => (
              <Dropdown.Item
                className={location === "All Locations" ? "text-danger" : ""}
                onClick={() =>
                  onFilter({
                    filterLocation: location,
                    filterField: filterOption.filterField,
                  })
                }
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
