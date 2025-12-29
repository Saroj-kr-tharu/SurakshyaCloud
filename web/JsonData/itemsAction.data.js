const itemActions = [
  {
    key: "open",
    label: "Open",
    icon: "fa-eye",
    color: "primary",
    targets: ["folder"],          // only folders
    action: "openFolder"
  },
  {
    key: "download",
    label: "Download",
    icon: "fa-download",
    color: "success",
    targets: ["file"],            // only files
    action: "downloadFile"
  },
  {
    key: "rename",
    label: "Rename",
    icon: "fa-edit",
    color: "info",
    targets: ["file", "folder"],  // both
    action: "renameItem"
  },
  {
    key: "share",
    label: "Share",
    icon: "fa-share",
    color: "warning",
    targets: ["file", "folder"],  // both
    action: "shareItem"
  },
  {
    key: "details",
    label: "Details",
    icon: "fa-info-circle",
    color: "secondary",
    targets: ["file", "folder"],  // both
    action: "showDetails"
  },
  {
    key: "delete",
    label: "Delete",
    icon: "fa-trash",
    color: "error",
    targets: ["file", "folder"],  // both
    action: "deleteItem"
  }
];

module.exports = itemActions;