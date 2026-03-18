export type ContextMenuItem = {
  label: string
  action?: () => void
  children?: ContextMenuItem[]
}
