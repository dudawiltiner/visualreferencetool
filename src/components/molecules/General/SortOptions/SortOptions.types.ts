export type SortDirection = "asc" | "desc"

export interface SortOption {
  field: string
  direction: SortDirection
  label: string
}

export interface SortOptionsProps {
  options: SortOption[]
  currentSort: SortOption
  onSortChange: (sort: SortOption) => void
}

