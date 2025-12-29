const { ConnectionClosedEvent } = require('mongodb');
const {homeData, userdashboardData, itemActionData} = require('../JsonData')
const webapiservice = require('../services/webapi.service');


class WebController { 

    async homePage(req,res) {
            res.locals.loading = true; 
            res.render('home', {data: homeData} )
    }

    async getLogin(req,res) {
            const fieldList = [
                    {title:'Email', type:'email', icon: 'fa-regular fa-message'}, 
                    {title:'password', type:'password', icon: 'fa-solid fa-lock'},  
                  ]
               res.locals.loading = true; 
            res.render('login', {fieldList} )
    }

    async postLogin(req,res) {
            const {email, password} = req?.body;
            const response = await webapiservice.login({email, password});
            console.log('res => ', response?.data)
    }


    async getRegister(req,res) {
        const fieldList = [
            {title:'Email', type:'email', icon: 'fa-regular fa-message'}, 
            {title:'Username', type:'text', icon: 'fa-solid fa-circle-user'}, 
            {title:'password', type:'password', icon: 'fa-solid fa-lock'},  
            {title:'Repeat password', type:'password', icon: 'fa-solid fa-lock'},  
      ]
      res.locals.loading = true; 
      res.render('register', {fieldList} )
    }

     async logout(req,res) {
       
        const cook = req.headers.cookie || ''; 
        await webapiservice.logout(cook);

     
        res.clearCookie("userSession");       
        res.clearCookie("accessToken");      
        res.clearCookie("refreshToken");      

        res.locals.loading = false;
        res.locals.error = null;
        res.locals.success = false;
        res.locals.user =  null; 

        // Redirect to login page after logout
        return res.redirect("/login");
    }

    async dashboard(req,res) {
       const accessToken = req?.userdata.jwt; 
       const storageUsed = req?.userdata.storageUsed; 
       const storageMax = req?.userdata.storageMax; 

       if(req?.userdata.role == "USER"){
            res.locals.loading = true; 

            const result =  await webapiservice.RootFolder(accessToken);
            const dashboardUser = userdashboardData({totalFiles: result?.data?.files.length, totalFolders: result?.data?.folders.length, totalGb: storageMax, usedGb: storageUsed}); 
            

            const data = {
                folders: result?.data?.folders,
                files: result?.data?.files,
                stats:  dashboardUser,
                itemActions:itemActionData,
            }

            
            

           res.render('userDashboard', data)
        }
        else if( req?.userdata.role == "ADMIN"){
             res.locals.loading = true; 
            res.render('adminDashboard', )

        }
       
    }

    async previewFile(req,res) {
        const accessToken = req?.userdata.jwt; 
        const { fileId } = req.query;
        const response = await webapiservice.previewFile(accessToken, fileId);

        return res.json(response);
      
    }

    async deleteItems(req,res) {
        const accessToken = req?.userdata.jwt; 
        const  Items  = req.body;
        const response = await webapiservice.deleteItem(accessToken, Items);

        return res.json(response);
      
    }

    async detailsItems(req,res) {
        const accessToken = req?.userdata.jwt; 
        const  {itemId, fileType}  = req.query;
        console.log("items => ", req.query)

        if(!fileType) throw new Error("  invalid file type ")
            let response; 
        if(fileType == 'file'){
             response = await webapiservice.detailsFile(accessToken, itemId);
        }else if(fileType == 'folder'){
            response = await webapiservice.detailsFolder(accessToken, itemId);
        }

       
    
        return res.json(response);
      
    }
    
    
}



const webCtrl = new WebController();

module.exports = webCtrl;