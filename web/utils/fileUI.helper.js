const FILE_TYPE_CONFIG = require("../JsonData/index");

function resolveFileUI(file) {
  // Add validation for file object
  if (!file || !file.originalName || !file.mimeType) {
    return {
      iconClass: "bi-file-earmark",
      colorClass: "text-secondary",
      badgeClass: "badge-secondary",
      badgeText: "FILE"
    };
  }

  const ext = file.originalName.split(".").pop().toLowerCase();
  const mimeGroup = file.mimeType.split("/")[0];

  const config =
    FILE_TYPE_CONFIG[file.mimeType] ||
    FILE_TYPE_CONFIG[mimeGroup] ||
    FILE_TYPE_CONFIG.default ||
    // Fallback if default is also undefined
    {
      icon: "bi-file-earmark",
      color: "text-secondary",
      badgeClass: "badge-secondary",
      badgeText: (ext) => ext.toUpperCase()
    };

  return {
    iconClass: config.icon,
    colorClass: config.color,
    badgeClass: config.badgeClass,
    badgeText: config.badgeText(ext)
  };
}

module.exports = resolveFileUI;