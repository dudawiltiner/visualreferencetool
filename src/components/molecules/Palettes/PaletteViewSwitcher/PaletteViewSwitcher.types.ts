export interface PaletteViewSwitcherProps {
  view: "grid" | "list" | "columns" | "details"
  onViewChange: (view: "grid" | "list" | "columns" | "details") => void
}

