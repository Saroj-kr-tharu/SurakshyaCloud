function buildDashboardStats({
  totalFiles = 0,
  totalFolders = 0,
  usedGb = 0,
  totalGb = 0
}) {
// Convert bytes to GB (1 GB = 1024^3 bytes)
const safeUsed = Math.max(0, usedGb / (1024 ** 3));
const safeTotal = Math.max(1, totalGb / (1024 ** 3));

const availableGb = +(safeTotal - safeUsed).toFixed(2);
const usedPercent = Math.round((safeUsed / safeTotal) * 100);

  return [
    {
      key: "files",
      title: "Total Files",
      value: totalFiles,
      desc: "↗︎ Active storage",
      icon: "fa-file",
      color: "primary",
      border: "primary"
    },
    {
      key: "folders",
      title: "Total Folders",
      value: totalFolders,
      desc: "↗︎ Organized",
      icon: "fa-folder",
      color: "secondary",
      border: "secondary"
    },
    {
      key: "used",
      title: "Total Size",
      value: `${safeUsed.toFixed(2)} GB`,
      desc: "Used space",
      icon: "fa-database",
      color: "accent",
      border: "accent"
    },
    {
      key: "available",
      title: "Available",
      value: `${availableGb} GB`,
      desc: `${usedPercent}% remaining`,
      icon: "fa-hard-drive",
      color: "success",
      border: "success"
    }
  ];
}

module.exports =  buildDashboardStats ;
