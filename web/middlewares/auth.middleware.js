const authMiddleare = async(req, res, next) => {
    try {
        const { accessToken, refreshToken } = req.cookies;
        
        // No tokens at all - user not logged in
        if (!accessToken && !refreshToken) {
            req.userdata = null;
            return next();
        }
     
        
        // Try to verify access token
        if (accessToken) {
            try { 
                let url = `${process.env.APP_URL}/auth/veriyToken`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': accessToken,
                    },
                    credentials: 'include',
                });

               
                const result = await response.json()
               
                if (response.ok) { 
                   
                    if (result.success) {
                        req.userdata = result.data;
                        console.log('Access token verified successfully');
                        return next();
                    }
                }
                
              
                console.log('Access token expired, trying refresh...');
            } catch (error) {
                console.log('Access token verification failed:', error);
            }
        }
         
        // Both tokens failed - clear all auth cookies
        res.clearCookie('accessToken');
        res.clearCookie('AccessToken');
        res.clearCookie('refreshToken');
        res.clearCookie('UserData');
        
        req.userdata = null;
        next();
        
    } catch (error) {
        console.error('Auth middleware error:', error);
        req.userdata = null;
        next();
    }
};

const authGuard = (req, res, next) => {
    if (!req.userdata) { 
        
        return res.redirect('/login');
    }
    
    next();
};

module.exports = {
    authMiddleare,
    authGuard
};