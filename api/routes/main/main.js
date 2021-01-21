var express = require('express'), router = express.Router();
const baseURL = "https://www.nautilusdevelopment.ca/api/";

const mysql = require('mysql');
const util = require('util');
const CryptoJS = require("crypto-js");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/api/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    console.log(file.mimetype)
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'text/plain') {
        cb(null, true);
    } else {
        cb(new Error('File type is not allowed.'), false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

var pool = mysql.createPool({
    connectionLimit: 50,
    host: 'mysql1',
    user: 'root',
    password: '9fe0f919743cd92b',
    database: 'base_db',
    timezone: 'utc'
});


/*
=========================== ENDPOINTS =============================

1)  POST    /api/main/v1/

*/


// Base referrals route

router.get("/v1/", (req, res) => {
    console.log("Responding to root");
    res.send("Hello from main routee");
});

//-------------------------------- DATA ------------------------------------------

router.get("/v1/test1", (req, res) => {
    /*
        This endpoint is for requesting the data of the current user
    */

    var queryString = "SELECT * FROM `challenge_user_data`;";
    pool.getConnection(function(err1, conn1) {
        if (err1) {
            res.send(err1);
            console.log(err1);
        } else {
            conn1.query(queryString, function (err2, records1, fields1) {
                
                if (!err2) {

                    res.send(records1);
                   
                } else {
                    var errorResponse = {
                        'status': 'There was an error'
                    };
                    res.send(errorResponse);
                }

                conn1.release();

            });
        }

        
    });

});

router.post('/v1/create_new_user', function (req, res) {
    /*

        There are two types of accounts that are distinguishable by their `type_of_account` field:
        1 = regular user account

            Only able to see data relating to themselves. Able to write data to their account.
            All accounts will be initially created with these level of permissions.

        2 = admin user account

            Able to see data for all accounts. Able to write data to any account.
            
        
        The following fields will be generated by default within this block of code:
            
            type_of_account             ==>     1
            user_number_of_absences     ==>     0
            user_token                  ==>     A signed JSON Web Token (JWT)
        
        
        The post request body must be of the form:
        {
            "username": "Example Username",
            "password": "Example Password",
            "groupCode": "aposdjhgfaaasdf"
        }
        
        The return object will contain the JWT and will take the form:

        {
            "jwt": signedToken
        }

    */

    var username = req.body.username;
    var password = req.body.password;
    var groupCode = req.body.groupCode;

    if ((typeof username !== 'undefined') && (typeof password !== 'undefined') && (typeof groupCode !== 'undefined') ) {

        // Generating the JWT
        var signedToken = generateJWT(username, password);

        var queryString = "SELECT * FROM `group_data` WHERE group_code = ?;";
        pool.getConnection(function(err1, conn1) {
            if (err1) {
                res.send(err1);
                console.log(err1);
            } else {
                conn1.query(queryString, [groupCode], function (err2, records1, fields1) {
                    if (!err2) {

                        if (records1.length == 1) {
                            queryString = "INSERT INTO `referral_user_data` (`user_index`, `group_code`, `type_of_account`, `username`, `password`, `user_first_name`, `user_last_name`, `user_email`, `user_phone_number`, `user_fax_number`, `user_website`, `profile_picture_file_path`, `user_number_of_absences`, `account_status`, `user_token`, `account_creation_date`) VALUES (NULL, ?, '1', ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, 'https://www.nautilusdevelopment.ca/api/placeholder.png', '0', 'none', ?, CURRENT_TIMESTAMP);";

                            pool.getConnection(function(err3, conn2) {
                                if (err3) {
                                    res.send(err3);
                                    console.log(err3);
                                } else {
                                    conn2.query(queryString, [groupCode, username, password, signedToken], function (err4, records2, fields2) {
                                        if (!err4) {
                    
                                            var returnData = {
                                                "jwt": signedToken
                                            };
                    
                                            res.send(returnData);

                                        } else if (err4['sqlMessage'].includes("Duplicate entry")) {
                                            var returnData = {
                                                "jwt": "The username is already taken."
                                            };
                    
                                            res.send(returnData);
                                        }
                    
                                        conn2.release();
                                    });
                                }
                            });

                        } else {

                            var returnData = {
                                "jwt": "The group code is invalid."
                            };
                            res.send(returnData);
                        }
                    }

                    conn1.release();
                });
            }
        });

    } else {
        var returnData = {
            "jwt": "There is an error within the post request."
        };
        res.send(returnData);
    }

});


router.post('/v1/authenticate', function (req, res) {
    /*
        This endpoint takes in the user's credentials and returns their unique JSON Web Token.

        The post request body must be of the form:
        {
            "username": "Example Username",
            "password": "Example Password"
        }
        
        The return object will contain the JWT and will take the form:

        {
            "jwt": signedToken
        }

    */

    var username = req.body.username;
    var password = req.body.password;

    if ((typeof username !== 'undefined') && (typeof password !== 'undefined') ) {

        var queryString = "SELECT `type_of_account`, `user_token` FROM `referral_user_data` WHERE username = ? AND password = ?;";
        pool.getConnection(function(err, conn) {
            if (err) {
                res.send(err);
                console.log(err);
            } else {
                conn.query(queryString, [username, password], function (err2, records, fields) {
                    if (!err2) {

                        if (records.length == 1) {

                            var returnData = {
                                "jwt": records[0]['user_token'],
                                "typeOfAccount": records[0]['type_of_account']
                            };
    
                            res.send(returnData);

                        } else {
                            res.send("The username or password is incorrect.")
                        }
                        
                    }

                    conn.release();
                });
            }
        });

    } else {
        res.send("Error within post request.")
    }

});






// ============================ HELPER FUNCTIONS =============================

function generateJWT(username, password) {

    var header = {
        "alg": "HS256",
        "typ": "JWT"
    };
      
    var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    var encodedHeader = base64url(stringifiedHeader);

    var data = {
        "username": username
    }

    var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
    var encodedData = base64url(stringifiedData);
      
    var token = encodedHeader + "." + encodedData;

    var signature = CryptoJS.HmacSHA256(token, password);
    signature = base64url(signature);

    var signedToken = token + "." + signature;

    return signedToken;

}


function base64url(source) {
    // Encode in classical base64
    encodedSource = CryptoJS.enc.Base64.stringify(source);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
}


pool.query = util.promisify(pool.query);

module.exports = pool;

module.exports = router;