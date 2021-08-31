interface Column {
  path: string;
  label: string;
}

interface sortColumn {
  path: string;
  order: string;
}

export type { sortColumn, Column };
