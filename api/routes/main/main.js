var express = require('express'), router = express.Router();
const baseURL = "http://192.168.1.27:8081/api/";

const mysql = require('mysql');
const util = require('util');
const CryptoJS = require("crypto-js");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/api/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
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


router.post('/v1/insert_sample_data', function (req, res) {
    /*

        The post request body must be of the form:
        {
            "measurement": "25.3,248.6,415.45,25.6,24.1,25.9,56.3,42.5,14.2,36.4,52.4",
            "start_time": "2021-01-21 05:05:08"
        }
        
        The return object will contain the JWT and will take the form:

        {
            "status": "OK"
        }

        {
            "status": "ERROR"
        }

    */

    var measurement = req.body.measurement;
    var startTime = req.body.start_time;
    var returnData = {};

    if ((typeof measurement !== 'undefined') && (typeof startTime !== 'undefined') ) {

        var queryString = "INSERT INTO `measurements` (measurement_num, measurement, start_time, finish_time) VALUES (NULL, ?, ?, NULL);";
        pool.getConnection(function(err1, conn1) {
            if (err1) {
                res.send(err1);
                console.log(err1);
            } else {
                conn1.query(queryString, [measurement, startTime], function (err2, records1, fields1) {
                    if (!err2) {
                        returnData = {
                            "status": "OK"
                        };
                        res.send(returnData);
                    } else {
                        returnData = {
                            "status": "ERROR"
                        };
                        res.send(returnData);
                    }

                    conn1.release();
                });
            }
        });

    } else {
        returnData = {
            "status": "There is an error within the post request."
        };
        res.send(returnData);
    }

});

router.post('/v1/create_measurement_entry', function (req, res) {
    /*

        The post request body must be of the form:
        {
            "measurement": "25.3,248.6,415.45,25.6,24.1,25.9,56.3,42.5,14.2,36.4,52.4",
            "start_time": "2021-01-21 05:05:08"
        }
        
        The return object will contain the JWT and will take the form:

        {
            "status": "OK"
        }

        {
            "status": "ERROR"
        }

    */

    var measurement = req.body.measurement;
    var startTime = req.body.start_time;
    var returnData = {};

    if ((typeof measurement !== 'undefined') && (typeof startTime !== 'undefined') ) {

        var queryString = "INSERT INTO `measurements` (measurement_num, measurement, start_time, finish_time) VALUES (NULL, ?, ?, NULL);";
        pool.getConnection(function(err1, conn1) {
            if (err1) {
                res.send(err1);
                console.log(err1);
            } else {
                conn1.query(queryString, [measurement, startTime], function (err2, records1, fields1) {
                    if (!err2) {
                        res.send(records1);
                    } else {
                        returnData = {
                            "status": "ERROR"
                        };
                        res.send(returnData);
                    }

                    conn1.release();
                });
            }
        });

    } else {
        returnData = {
            "status": "There is an error within the post request."
        };
        res.send(returnData);
    }

});


router.get('/v1/create_job', function (req, res) {
    /*

        The post request body must be of the form:
        {
            "measurement": "25.3,248.6,415.45,25.6,24.1,25.9,56.3,42.5,14.2,36.4,52.4",
            "start_time": "2021-01-21 05:05:08"
        }
        
        The return object will contain the JWT and will take the form:

        {
            "status": "OK"
        }

        {
            "status": "ERROR"
        }

    */

    var returnData = {};

    var queryString = "INSERT INTO `job_manager` (job_id, job_status, job_requested_time, job_completion_time) VALUES (NULL, 'Requested', NULL, NULL);";
    pool.getConnection(function(err1, conn1) {
        if (err1) {
            res.send(err1);
            console.log(err1);
        } else {
            conn1.query(queryString, function (err2, records1, fields1) {
                if (!err2) {
                    returnData = {
                        "status": "OK"
                    };
                    res.send(returnData);
                } else {
                    returnData = {
                        "status": "ERROR"
                    };
                    res.send(returnData);
                }

                conn1.release();
            });
        }
    });

});

router.post('/v1/get_job_status', function (req, res) {
    /*

        The post request body must be of the form:
        {
            "job_id": 1
        }
        
        The return object will contain the JWT and will take the form:

        {
            "status": "OK"
        }

        {
            "status": "ERROR"
        }

    */

    var jobId = req.body.job_id;

    var returnData = {};

    if (typeof jobId !== 'undefined') {

        var queryString = "SELECT `job_status` FROM `job_manager` WHERE `job_id` = ?;";
        pool.getConnection(function(err1, conn1) {
            if (err1) {
                res.send(err1);
                console.log(err1);
            } else {
                conn1.query(queryString, [jobId], function (err2, records1, fields1) {
                    if (!err2) {
                        res.send(records1);
                    } else {
                        returnData = {
                            "status": "ERROR"
                        };
                        res.send(returnData);
                    }

                    conn1.release();
                });
            }
        });

    } else {
        returnData = {
            "status": "There is an error within the post request."
        };
        res.send(returnData);
    }

});


router.post('/v1/change_job_status', function (req, res) {
    /*

        The possible options for the new job status are the following:
            Requested
            In progress
            Completed
            Failed

        The post request body must be of the form:
        {
            "job_id": 1,
            "new_job_status": "In progress"
        }
        
        The return object will contain the JWT and will take the form:

        {
            "status": "OK"
        }

        {
            "status": "ERROR"
        }

    */

    var jobId = req.body.job_id;
    var jobStatus = req.body.new_job_status;

    var returnData = {};

    if ((typeof jobId !== 'undefined') && (typeof jobStatus !== 'undefined') ) {

        var queryString = "UPDATE `job_manager` SET job_status = ? WHERE job_id = ?;";
        pool.getConnection(function(err1, conn1) {
            if (err1) {
                res.send(err1);
                console.log(err1);
            } else {
                conn1.query(queryString, [jobStatus, jobId], function (err2, records1, fields1) {
                    if (!err2) {
                        returnData = {
                            "status": "OK"
                        };
                        res.send(returnData);
                    } else {
                        returnData = {
                            "status": "ERROR"
                        };
                        res.send(returnData);
                    }

                    conn1.release();
                });
            }
        });

    } else {
        returnData = {
            "status": "There is an error within the post request."
        };
        res.send(returnData);
    }

});

router.post('/v1/change_job_completion_time', function (req, res) {
    /*

        The post request body must be of the form:
        {
            "job_id": 1,
            "job_completion_time": "2020-01-22 10:05:06"
        }
        
        The return object will contain the JWT and will take the form:

        {
            "status": "OK"
        }

        {
            "status": "ERROR"
        }

    */

    var jobId = req.body.job_id;
    var jobCompletionTime = req.body.job_completion_time;

    var returnData = {};

    if ((typeof jobId !== 'undefined') && (typeof jobCompletionTime !== 'undefined') ) {

        var queryString = "UPDATE `job_manager` SET job_completion_time = ? WHERE job_id = ?;";
        pool.getConnection(function(err1, conn1) {
            if (err1) {
                res.send(err1);
                console.log(err1);
            } else {
                conn1.query(queryString, [jobCompletionTime, jobId], function (err2, records1, fields1) {
                    if (!err2) {
                        returnData = {
                            "status": "OK"
                        };
                        res.send(returnData);
                    } else {
                        returnData = {
                            "status": "ERROR"
                        };
                        res.send(returnData);
                    }

                    conn1.release();
                });
            }
        });

    } else {
        returnData = {
            "status": "There is an error within the post request."
        };
        res.send(returnData);
    }

});

router.get("/v1/get_measurement_data", (req, res) => {
    /*
        This endpoint is for requesting the data of the current user
    */

    var queryString = "SELECT * FROM `measurements`;";
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

router.post('/v1/get_measurement_data_by_id', function (req, res) {
    /*

        The possible options for the new job status are the following:
            Requested
            In progress
            Completed
            Failed

        The post request body must be of the form:
        {
            "measurement_num": 1 
        }
        
        The return object will contain the measurement form:

        {
            "status": "OK"
        }

        {
            "status": "ERROR"
        }

    */

    var measurementNumber = req.body.measurement_num;

    var returnData = {};

    if (typeof measurementNumber !== 'undefined') {

        var queryString = "SELECT * FROM `measurements` WHERE `measurement_num` = ?;";
        pool.getConnection(function(err1, conn1) {
            if (err1) {
                res.send(err1);
                console.log(err1);
            } else {
                conn1.query(queryString, [measurementNumber], function (err2, records1, fields1) {
                    if (!err2) {
                        res.send(records1);
                    } else {
                        returnData = {
                            "status": "ERROR"
                        };
                        res.send(returnData);
                    }

                    conn1.release();
                });
            }
        });

    } else {
        returnData = {
            "status": "There is an error within the post request."
        };
        res.send(returnData);
    }

});


router.get("/v1/get_job_data", (req, res) => {
    /*
        This endpoint is for requesting the data of the current user
    */

    var queryString = "SELECT * FROM `job_manager`;";
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


router.post("/v1/upload_photo", upload.single('plotPicture'), (req, res) => {
    /*
        The measurement_number must be a query parameter in the url
            Example: /api/v1/upload_photo?measurement_number=1
        The post request must have the following header:
            Content-Type: multipart/form-data
        
        The key for the picture must be 'plotPicture'.
        { 
            fieldname: 'plotPicture',
            originalname: '12.jpg',
            encoding: '7bit',
            mimetype: 'image/jpeg',
            destination: 'uploads/',
            filename: 'b186f7e6afcd5fbc95665c2ad38812da',
            path: 'uploads/b186f7e6afcd5fbc95665c2ad38812da',
            size: 771037 
        }
    */

    // Parameters
    var measurementNumber = req.query.measurement_number;

    var plotPictureFilePath = baseURL + req.file.filename;

    if (typeof plotPictureFilePath !== 'undefined') {
    
        var queryString = "UPDATE `measurements` SET `graph_picture_location` = ? WHERE `measurement_num` = ?;";
        pool.getConnection(function(err1, conn1) {
            if (err1) {
                res.send(err1);
                console.log(err1);
            } else {
                conn1.query(queryString, [plotPictureFilePath, measurementNumber], function (err2, records1, fields1) {
                    
                    if (!err2) {

                        var returnData = {
                            "plotPictureFilePath": plotPictureFilePath
                        };

                        res.send(returnData);

                    } else {

                        var returnData = {
                            "status": "ERROR"
                        };

                        res.send(returnData);

                    }

                    conn1.release();

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