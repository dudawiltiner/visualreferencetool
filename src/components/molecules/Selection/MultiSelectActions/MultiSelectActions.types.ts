export interface MultiSelectActionsProps<T> {
  items: T[]
  selectedItems: string[]
  onSelectItem: (id: string, selected: boolean) => void
  onSelectAll: (selected: boolean) => void
  onDeleteSelected: (ids: string[]) => void
  idField?: keyof T
  type: "images" | "palettes" | "groups" | "tags"
}

