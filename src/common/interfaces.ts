interface Column {
  path: string;
  label: string;
}

interface sortColumn {
  path: string;
  order: string;
}

interface filterOption {
  filterField: string;
  filterValue: string;
}

export type { sortColumn, Column, filterOption };
