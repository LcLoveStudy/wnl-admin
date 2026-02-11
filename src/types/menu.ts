export type MenuItemType = {
  title: string
  name: string
  hidden?: boolean
  icon?: string
  children?: MenuItemType[]
}
