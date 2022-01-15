import React, { ChangeEvent, useEffect } from 'react';
import { useState } from 'react';
import JobTable from './JobTable';
import { filterOptions } from '../common/interfaces';
import { JobAPI } from '../api/job.api';
import { JobDto } from '../dto/job.dto';
import { TableFilters } from './TableFilters';
import usePagination from './usePagination';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/react';

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<JobDto[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filterOptions, setfilterOptions] = useState<filterOptions>({
    filterField: 'All Fields',
    filterLocation: 'All Locations',
  });
  const [search, setSearch]: [string, (search: string) => void] = useState('');

  const PER_PAGE = 15;

  let count = Math.ceil(jobs.length / PER_PAGE);

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
    _DATA.jump(page);
  };

  const resetPage = () => {
    setPage(1);
    _DATA.jump(1);
  };

  useEffect(() => {
    async function fetchAll() {
      setIsLoading(true);
      const resp = await JobAPI.getAll();
      setJobs(resp);
      setIsLoading(false);
    }
    fetchAll();
  }, []);

  useEffect(() => {
    async function assignFields() {
      let jobFields: string[] = [];
      jobs.forEach((job) => {
        jobFields.push(job.field.toUpperCase());
      });
      let setJobFields = [...new Set(jobFields)];
      setJobFields.push('All Fields');
      setFields(setJobFields);
    }
    assignFields();
  }, [jobs]);

  useEffect(() => {
    async function assignLocations() {
      let jobLocations: string[] = [];
      jobs.forEach((job) => {
        jobLocations.push(job.searchedLocation.toUpperCase());
      });
      let setJobLocations = [...new Set(jobLocations)];
      setJobLocations.push('All Locations');
      setLocations(setJobLocations);
    }
    assignLocations();
  }, [jobs]);

  const handleFilter = (filterOption: filterOptions) => {
    setfilterOptions(filterOption);
  };
  const filterField = () => {
    const { filterField, filterLocation } = filterOptions;
    const filters = [
      { type: 'field', name: filterField },
      { type: 'searchedLocation', name: filterLocation },
    ];
    let filteredJobs;
    /// JUST LOCATION FILTER
    if (filterField === 'All Fields' && filterLocation !== 'All Locations') {
      filteredJobs = jobs.filter(
        (j) => j.searchedLocation.toUpperCase() === filterLocation
      );
      count = Math.ceil(filteredJobs.length / PER_PAGE);
      return filteredJobs;
    }
    ///  JUST FIELD FILTER
    if (filterField !== 'All Fields' && filterLocation === 'All Locations') {
      filteredJobs = jobs.filter((j) => j.field.toUpperCase() === filterField);
      count = Math.ceil(filteredJobs.length / PER_PAGE);
      return filteredJobs;
    }
    // Combination
    if (filterField !== 'All Fields' && filterLocation !== 'All Locations') {
      filteredJobs = jobs.filter((job) =>
        filters.every(
          (filterEl) => job[filterEl.type as keyof typeof job] === filterEl.name
        )
      );
      count = Math.ceil(filteredJobs.length / PER_PAGE);
      return filteredJobs;
    }
    return jobs;
  };
  const handleFilterReset = (filterOption: filterOptions) => {
    setfilterOptions(filterOption);
  };

  const handleSearch = (e: { target: { value: string } }) => {
    setSearch(e.target.value);
  };
  const jobData = () => {
    let filtered: JobDto[] = [];
    filterField().forEach((job) => {
      if (
        search === '' ||
        job.title.toLowerCase().includes(search.toLowerCase())
      )
        filtered.push(job);
    });
    count = Math.ceil(filtered.length / PER_PAGE);
    return filtered;
  };
  let _DATA = usePagination(jobData(), PER_PAGE);

  console.log('current page ' + _DATA.currentPage);
  console.log('max page ' + _DATA.maxPage);

  if (page > _DATA.maxPage && _DATA.maxPage !== 0) {
    resetPage();
  }

  console.log('AFTER Current page ' + _DATA.currentPage + '----' + page);

  const useStyles = makeStyles(() => ({
    root: {
      '& .MuiPaginationItem-outlinedSecondary.Mui-selected': {
        border: '2px solid rgb(234 57 184 / 90%)',
      },
      '& .MuiPaginationItem-outlined ': {
        border: '1px solid rgb(234 57 184 / 30%)',
      },
    },
    ul: {
      '& .MuiPaginationItem-root': {
        color: '#fff',
      },
    },
  }));
  const classes = useStyles();
  if (isLoading) {
    return (
      <div style={{ marginTop: '3%' }}>
        <ClipLoader
          color={'fuchsia'}
          loading={isLoading}
          css={css`
            display: block;
            margin: 0 auto;
          `}
          size={250}
        />
      </div>
    );
  } else
    return (
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TableFilters
          fields={fields}
          locations={locations}
          onFilter={handleFilter}
          onResetFilters={handleFilterReset}
          filterOption={filterOptions}
          onSearch={handleSearch}
        />
        <div>
          <JobTable jobs={_DATA.currentData()} />
        </div>
        <div
          style={{
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            margin: '1%',
          }}
        >
          <Pagination
            count={count}
            page={page}
            variant='outlined'
            shape='rounded'
            onChange={handleChange}
            siblingCount={1}
            color='secondary'
            classes={{ ul: classes.ul, root: classes.root }}
          />
        </div>
        <hr />
        <hr />
      </div>
    );
};

export default Jobs;
