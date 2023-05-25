export type TitlebarMenuItem = {
  name: string;
  action?: string;
  shortcut?: string;
  value?: string | number;
  items?: TitlebarMenuItem[];
};

export type TitlebarMenu = {
  name: string;
  items: TitlebarMenuItem[];
};

const titlebarMenus: TitlebarMenu[] = [
  {
    name: "User",
    items: [
      {
        name: "Logout",
        action: "logout",
      },
    ],
  },
  {
    name: "Edit",
    items: [
      {
        name: "Undo",
        action: "undo",
        shortcut: "Ctrl+Z",
      },
      {
        name: "Redo",
        action: "redo",
        shortcut: "Ctrl+Y",
      },
      {
        name: "__",
      },
      {
        name: "Cut",
        action: "cut",
        shortcut: "Ctrl+X",
      },
      {
        name: "Copy",
        action: "copy",
        shortcut: "Ctrl+C",
      },
      {
        name: "Paste",
        action: "paste",
        shortcut: "Ctrl+V",
      },
      {
        name: "Delete",
        action: "delete",
      },
      {
        name: "__",
      },
      {
        name: "Select All",
        action: "select_all",
        shortcut: "Ctrl+A",
      },
    ],
  },
  {
    name: "Window",
    items: [
      {
        name: "Reload",
        action: "reload",
        shortcut: "Ctrl+R",
      },
      {
        name: "Minimize",
        action: "minimize",
        shortcut: "Ctrl+M",
      },
      {
        name: "Close",
        action: "exit",
        shortcut: "Ctrl+W",
      },
    ],
  },
  {
    name: "Help",
    items: [
      {
        name: "iris",
        action: "open_url",
        value: "https://github.com/iris",
        shortcut: "@iris",
      },
    ],
  },
];

export default titlebarMenus;
