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
    <div className='container'>
      <div className='row'>
        <div className='col'>
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
        <div className='col'>
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
    </div>
  );
};
export { TableFilters };
