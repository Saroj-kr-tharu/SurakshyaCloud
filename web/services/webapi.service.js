const   axios  = require('axios');
const {APP_URL }  = require('../config/webserverConfig')


class webapiService {

    async login(data) { 
        try {
        let url = `${APP_URL}/auth/login`;
        const response = await axios.post(url, data, {
            headers: {
            'Content-Type': 'application/json'
            }
        });
        return response ; 
                
        } catch (error) {
            console.log("Something went wrong in service layer (login)",  );
            throw error;
        }
    }

    async logout(cookies) { 
        try {
        let url = `${APP_URL}/auth/logout`;
        await axios.post(url, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookies
            }
        });
                
        } catch (error) {
            console.log("Something went wrong in service layer (logout)", error );
            throw error;
        }
    }

    async RootFolder(token) { 
        try {
        let url = `${APP_URL}/folders/root`;
             const res =    await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    }
                });
                return res?.data; 
                
        } catch (error) {
            console.log("Something went wrong in service layer (logout)", error );
            throw error;
        }
    }

    async previewFile(token, fileId) { 
        try {

            // console.log('token => ', token, ' fileId => ', fileId)
        let url = `${APP_URL}/file/${fileId}`;
            const res =    await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    }
                });
            return res?.data; 
                
        } catch (error) {
            console.log("Something went wrong in service layer (previewFile)", error );
            throw error;
        }
    }

    async deleteItem(token, items) { 
        try {

           
            let url = `${APP_URL}/items`;
            const res = await axios.delete(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    },
                    data: items
                });
            return res?.data; 
                
        } catch (error) {
            console.log("Something went wrong in service layer (previewFile)", error );
            throw error;
        }
    }


    async detailsFile(token, fileId) { 
        try {

            let url = `${APP_URL}/file/${fileId}/details`;
            const res = await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    },
                    
                });
            return res?.data; 
                
        } catch (error) {
            console.log("Something went wrong in service layer (detailsFile)", error );
            throw error;
        }
    }

    async detailsFolder(token, folderId) { 
        try {

            let url = `${APP_URL}/folders/${folderId}/details`;
            const res = await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    },
                   
                });
            return res?.data; 
                
        } catch (error) {
            console.log("Something went wrong in service layer (detailsFolder)", error );
            throw error;
        }
    }



}

const webapiservice = new webapiService()


module.exports = webapiservice;