import * as React from "react";
import { Dropdown, Button } from "react-bootstrap";
import { filterOptions } from "../common/interfaces";

interface props {
  fields: string[];
  locations: string[];
  filterOption: filterOptions;
  onFilter: (arg: filterOptions) => void;
  onResetFilters: (arg: filterOptions) => void;
  onSearch: (e: { target: { value: string } }) => void;
}

const TableFilters: React.FC<props> = (props) => {
  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const {
    fields,
    locations,
    filterOption,
    onFilter,
    onResetFilters,
    onSearch,
  } = {
    ...props,
  };
  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        marginLeft: "5%",
        marginRight: "5%",
        minWidth: "20%",
      }}
      className='row'
    >
      <div className='col'>
        <form className='d-flex' onSubmit={handleSumbit}>
          <input
            className='form-control me-sm-2'
            placeholder='search'
            style={{
              margin: "2%",
              marginLeft: "15%",
            }}
            onChange={onSearch}
            type='text'
          ></input>
        </form>
      </div>
      <div
        className='col-sm'
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
          className='col-sm'
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
        <div
          className='col'
          style={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            // margin: "1%",
            marginRight: "10%",
          }}
        >
          <Button
            style={{ whiteSpace: "nowrap" }}
            variant='secondary'
            onClick={() =>
              onResetFilters({
                filterField: "All Fields",
                filterLocation: "All Locations",
              })
            }
          >
            Reset All Filters
          </Button>
        </div>
      </div>
    </div>
  );
};
export { TableFilters };
