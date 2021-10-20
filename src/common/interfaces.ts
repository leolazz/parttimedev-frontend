interface Column {
  path: string;
  label: string;
}

interface sortColumn {
  path: string;
  order: string;
}

// interface filterOptions {
//   filterField: string;
//   filterFieldValue: string;
// }
interface filterOptions {
  filterField: string;
  filterLocation: string;
}

export type { sortColumn, Column, filterOptions };
