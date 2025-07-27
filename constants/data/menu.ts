export interface MenuItem {
  id: string
  name: string
  link: string
  icon: string
  enabled: boolean
}

export const menuItems: MenuItem[] = [
  {
    id: "item-1",
    name: "About",
    link: "/",
    icon: "FaUser",
    enabled: true
  },
  {
    id: "item-2",
    name: "Resume",
    link: "/resume",
    icon: "FaFileAlt",
    enabled: false
  },
  {
    id: "item-3",
    name: "Portfolio",
    link: "/portfolio",
    icon: "FaBriefcase",
    enabled: true
  },
  {
    id: "item-4",
    name: "Blogs",
    link: "/blogs",
    icon: "FaBlogger",
    enabled: false
  },
  {
    id: "item-5",
    name: "Contact",
    link: "/contact",
    icon: "FaAddressBook",
    enabled: true
  },
  {
    id: "item-6",
    name: "Tools",
    link: "/tools",
    icon: "FaWrench",
    enabled: true
  }
] 