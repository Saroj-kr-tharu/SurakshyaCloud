const FILE_TYPE_CONFIG = {
  image: {
    icon: "fa-file-image",
    color: "green-500",
    badgeClass: "badge-success",
    badgeText: ext => `${ext.toUpperCase()} Image`
  },

  video: {
    icon: "fa-file-video",
    color: "purple-500",
    badgeClass: "badge-secondary",
    badgeText: () => "Video"
  },

  audio: {
    icon: "fa-file-audio",
    color: "yellow-500",
    badgeClass: "badge-warning",
    badgeText: () => "Audio"
  },

  "application/pdf": {
    icon: "fa-file-pdf",
    color: "red-500",
    badgeClass: "badge-error",
    badgeText: () => "PDF Document"
  },

  default: {
    icon: "fa-file",
    color: "gray-500",
    badgeClass: "badge-neutral",
    badgeText: ext => ext.toUpperCase()
  }
};

module.exports = FILE_TYPE_CONFIG;
