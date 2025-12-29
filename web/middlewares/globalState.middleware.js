module.exports = (req, res, next) => {

    // global state 
  res.locals.loading = false;
  res.locals.error = null;
  res.locals.success = false;
  res.locals.user = req.userdata || null; 
  res.locals.baseUrl = "http://localhost:3000/api/v1"
  res.locals.baseWebUrl = "http://localhost:3000"
 

    // current User
    const user = req.userdata || null; 
    const currentPath = req.path;

    let menu = [];

    if (!user) {
        // Guest
        menu = [
            { label: "Login", url: "/login" , handle:"handleLogin"},
            { label: "Register", url: "/register" , handle:"handleRegister"},
        ];
    } 
    else if (user.role === "admin") {
        menu = [
            { label: "Dashboard", url: "/admin/dashboard" , handle:"handleDashboard"},
            { label: "Profile", url: "/admin/profile" , handle:"handleProfile"},
            
        ];
    } 
    else {
        // Normal user
        menu = [
            { label: "Dashboard", url: "/dashboard" , handle:"handleDashboard"},
            { label: "My Files", url: "/my-files" , handle:"handleFiles"},
            { label: "Profile", url: "/admin/profile" , handle:"handleProfile"},
        ];
    }

   
   
    res.locals.headerMenu = menu;
    res.locals.currentPath = currentPath;



  next();
};