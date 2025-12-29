
const homeData  = {

  "hero": {
    "badge": {
      "icon": "fas fa-cloud",
      "text": "Cloud Storage Platform"
    },
    "title": "SurakshyaCloud",
    "subtitle": {
      "rotating": [
        { "icon": "fas fa-upload", "text": "UPLOAD", "color": "text-primary" },
        { "icon": "fas fa-folder", "text": "ORGANIZE", "color": "text-secondary" },
        { "icon": "fas fa-share-nodes", "text": "SHARE", "color": "text-accent" },
        { "icon": "fas fa-lock", "text": "SECURE", "color": "text-success" },
        { "icon": "fas fa-users", "text": "COLLABORATE", "color": "text-info" },
        { "icon": "fas fa-bolt", "text": "DELIVER", "color": "text-warning" }
      ]
    },
    "description": "Professional cloud storage powered by <span class=\"text-secondary font-bold\">AWS S3</span> and <span class=\"text-accent font-bold\">CloudFront CDN</span>",
    "subdescription": "Store your files securely, manage with hierarchical folders, share with secure links, and collaborate with your team—all in one platform.",
    "cta": {
      "primary": {
        "text": "Start Free",
        "icon": "fas fa-rocket",
        "link": "/register"
      },
      "secondary": {
        "text": "Learn More",
        "icon": "fas fa-info-circle",
        "link": "#features"
      }
    },
    "trustBadges": [
      { "icon": "fas fa-server", "text": "AWS S3 Storage", "color": "text-primary" },
      { "icon": "fas fa-network-wired", "text": "CloudFront CDN", "color": "text-secondary" },
      { "icon": "fas fa-shield-halved", "text": "JWT Secured", "color": "text-accent" },
      { "icon": "fas fa-folder-tree", "text": "Hierarchical Folders", "color": "text-success" }
    ]
  },


  "features": {
    "badge": {
      "icon": "fas fa-star",
      "text": "Core Features"
    },
    "title": "What We Offer",
    "subtitle": "Professional cloud storage solution built on proven AWS infrastructure",
    "items": [
      {
        "icon": "fas fa-database",
        "iconColor": "text-primary",
        "bgColor": "from-primary/10 to-primary/5",
        "borderColor": "border-primary/20",
        "title": "AWS S3 Storage",
        "description": "Industry-standard object storage with 99.999999999% durability. Your files are stored on Amazon's proven infrastructure."
      },
      {
        "icon": "fas fa-bolt",
        "iconColor": "text-secondary",
        "bgColor": "from-secondary/10 to-secondary/5",
        "borderColor": "border-secondary/20",
        "title": "CloudFront CDN",
        "description": "Global content delivery network for lightning-fast file access. Signed URLs ensure secure, time-limited access."
      },
      {
        "icon": "fas fa-key",
        "iconColor": "text-accent",
        "bgColor": "from-accent/10 to-accent/5",
        "borderColor": "border-accent/20",
        "title": "JWT Authentication",
        "description": "Secure token-based authentication with bcrypt password hashing and refresh token support for seamless sessions."
      },
      {
        "icon": "fas fa-folder-tree",
        "iconColor": "text-success",
        "bgColor": "from-success/10 to-success/5",
        "borderColor": "border-success/20",
        "title": "Hierarchical Folders",
        "description": "Organize with nested folders, move files between locations, and maintain perfect structure for your data."
      },
      {
        "icon": "fas fa-share-nodes",
        "iconColor": "text-info",
        "bgColor": "from-info/10 to-info/5",
        "borderColor": "border-info/20",
        "title": "Secure Sharing",
        "description": "Generate public share links with expiration dates or grant private access to specific users by email."
      },
      {
        "icon": "fas fa-user-shield",
        "iconColor": "text-warning",
        "bgColor": "from-warning/10 to-warning/5",
        "borderColor": "border-warning/20",
        "title": "Access Control",
        "description": "Role-based permissions (USER/ADMIN) with granular access controls for files and folders."
      }
    ]
  },

  "howItWorks": {
    "badge": {
      "icon": "fas fa-cogs",
      "text": "How It Works"
    },
    "title": "Get Started in Minutes",
    "subtitle": "Simple registration, upload your files, and start sharing",
    "steps": [
      {
        "number": 1,
        "icon": "fas fa-user-plus",
        "iconColor": "text-primary",
        "bgColor": "from-primary to-primary/60",
        "title": "Create Account",
        "description": "Sign up in seconds with your email. No credit card required to get started."
      },
      {
        "number": 2,
        "icon": "fas fa-cloud-upload-alt",
        "iconColor": "text-secondary",
        "bgColor": "from-secondary to-secondary/60",
        "title": "Upload Files",
        "description": "Drag and drop your files or folders. We'll handle encryption and secure storage."
      },
      {
        "number": 3,
        "icon": "fas fa-share-nodes",
        "iconColor": "text-accent",
        "bgColor": "from-accent to-accent/60",
        "title": "Share & Collaborate",
        "description": "Share files instantly with secure links or invite team members to collaborate."
      }
    ]
  },



  "techStack": {
    "badge": {
      "icon": "fas fa-code",
      "text": "Technology Stack"
    },
    "title": "Built with Industry Leading Technologies",
    "subtitle": "Modern backend architecture using Node.js, Express, MongoDB, and AWS services for reliability and performance.",
    "details": [
      {
        "icon": "fa-brands fa-node-js",
        "iconColor": "text-success",
        "bgColor": "bg-success/10",
        "title": "Node.js & Express",
        "description": "High-performance backend with clean MVC architecture - Controllers, Services, and Repository layers."
      },
      {
        "icon": "fas fa-database",
        "iconColor": "text-info",
        "bgColor": "bg-info/10",
        "title": "MongoDB & Mongoose",
        "description": "NoSQL database with Mongoose ODM for flexible schema design and efficient data modeling."
      },
      {
        "icon": "fa-brands fa-aws",
        "iconColor": "text-warning",
        "bgColor": "bg-warning/10",
        "title": "AWS S3 & CloudFront",
        "description": "Reliable object storage with global CDN for fast content delivery and signed URL security."
      },
      {
        "icon": "fas fa-shield-alt",
        "iconColor": "text-error",
        "bgColor": "bg-error/10",
        "title": "JWT & Bcrypt Security",
        "description": "Token-based authentication with bcrypt password hashing and role-based access control."
      }
    ],
    "techCards": [
      { "icon": "fa-brands fa-node-js", "iconColor": "text-success", "name": "Node.js", "category": "Backend" },
      { "icon": "fas fa-leaf", "iconColor": "text-success", "name": "MongoDB", "category": "Database" },
      { "icon": "fa-brands fa-aws", "iconColor": "text-warning", "name": "AWS S3", "category": "Storage" },
      { "icon": "fas fa-network-wired", "iconColor": "text-info", "name": "CloudFront", "category": "CDN" }
    ]
  },


  "useCases": {
    "badge": {
      "icon": "fas fa-briefcase",
      "text": "Use Cases"
    },
    "title": "Perfect For",
    "subtitle": "Whether you're an individual, team, or organization",
    "items": [
      {
        "icon": "fas fa-user",
        "iconColor": "text-primary",
        "borderColor": "border-primary/20",
        "hoverColor": "hover:border-primary",
        "title": "Personal Storage",
        "description": "Store your personal documents, photos, and files securely with organized folder structure."
      },
      {
        "icon": "fas fa-users",
        "iconColor": "text-secondary",
        "borderColor": "border-secondary/20",
        "hoverColor": "hover:border-secondary",
        "title": "Team Collaboration",
        "description": "Share files with team members, manage access permissions, and collaborate on projects."
      },
      {
        "icon": "fas fa-building",
        "iconColor": "text-accent",
        "borderColor": "border-accent/20",
        "hoverColor": "hover:border-accent",
        "title": "Business Assets",
        "description": "Manage company documents, media files, and shared resources with role-based access."
      }
    ]
  },


  "cta": {
    "icon": "fas fa-rocket",
    "title": "Start Using SurakshyaCloud Today",
    "subtitle": "Professional cloud storage solution with AWS infrastructure. Create your account and start uploading files in minutes.",
    "buttons": {
      "primary": {
        "text": "Create Account",
        "icon": "fas fa-user-plus",
        "link": "/register"
      },
      "secondary": {
        "text": "Sign In",
        "icon": "fas fa-sign-in-alt",
        "link": "/login"
      }
    },
    "features": [
      { "icon": "fas fa-check-circle", "text": "Quick Registration" },
      { "icon": "fas fa-check-circle", "text": "AWS Powered" },
      { "icon": "fas fa-check-circle", "text": "Secure Storage" }
    ]
  },



  "faq": {
    "badge": {
      "icon": "fas fa-question-circle",
      "text": "FAQ"
    },
    "title": "Common Questions",
    "subtitle": "Everything you need to know about the platform",
    "items": [
      {
        "icon": "fas fa-shield-alt",
        "iconColor": "text-primary",
        "question": "How is my data stored and secured?",
        "answer": "Your files are stored on AWS S3 with server-side encryption (SSE-S3). We use JWT authentication for user access, bcrypt for password hashing, and CloudFront signed URLs for secure file delivery."
      },
      {
        "icon": "fas fa-cloud",
        "iconColor": "text-secondary",
        "question": "What file types can I upload?",
        "answer": "SurakshyaCloud supports all file types including documents, images, videos, audio files, archives, and more. There are no restrictions on file formats, making it perfect for any use case."
      },
      {
        "icon": "fas fa-users",
        "iconColor": "text-accent",
        "question": "Can I share files with people who don't have an account?",
        "answer": "Yes! You can generate secure, time-limited share links for any file or folder. These links can be shared with anyone, and you can set expiration dates and permission levels (view-only or download)."
      },
      {
        "icon": "fas fa-database",
        "iconColor": "text-info",
        "question": "What are the file size limits?",
        "answer": "File upload limits depend on your configuration. The platform uses AWS S3 for storage, which supports objects up to 5TB. We track storage usage per user for quota management."
      },
      {
        "icon": "fas fa-server",
        "iconColor": "text-success",
        "question": "What technology stack is used?",
        "answer": "Built with Node.js and Express.js backend, MongoDB database, AWS S3 for storage, CloudFront for CDN, JWT for authentication, and bcrypt for password security. Clean MVC architecture for maintainability."
      }
    ]
  }


}

module.exports = homeData;