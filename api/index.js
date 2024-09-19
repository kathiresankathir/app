const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const socketIO = require('socket.io')
const http = require('http')
const app = express();
const Server = http.createServer(app)
const port = 3000;
const multer = require('multer');



app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Handle large base64 images

const io = socketIO(Server, {
  cors: {
    origin: 'http://localhost:19006', // Replace with your React Native app's URL
    methods: ['GET', 'POST'],
  },
});

Server.listen(8080, () => {
  console.log('server.io is running on port 8080');
}
)
app.use(cors({
  origin: 'http://localhost:19006',
  
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

// Configure multer for file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'sample',
  
});



connection.connect();

// Define your API routes here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`connected to mysql`);
});

const generatesecretkey=()=>{
  const secretkey= crypto.randomBytes(32).toString('hex');
  return secretkey;
};
const secretkey = generatesecretkey();


// Endpoint to handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
  const { doctorid } = req.body; // Doctor ID from request body
  const image = req.file.buffer.toString('base64'); // Convert the image buffer to base64

  if (!image || !doctorid) {
    return res.status(400).send('Missing required fields');
  }

  // Query to insert base64 image and doctorid into MySQL database
  const query = 'INSERT INTO patientimg (images, doctorid) VALUES (?, ?)';
  connection.query(query, [image, doctorid], (err, result) => {
    if (err) {
      console.error('Error saving image to MySQL:', err);
      return res.status(500).send('Error saving image');
    }
    res.send('Image uploaded successfully');
  });
});

// Endpoint to fetch uploaded reports for a specific doctorid
app.get('/reports/:doctorid', (req, res) => {
  const { doctorid } = req.params;

  // Query to fetch all images for a specific doctorid
  const query = 'SELECT images FROM patientimg WHERE doctorid = ?';
  connection.query(query, [doctorid], (err, results) => {
    if (err) {
      console.error('Error fetching reports:', err);
      return res.status(500).send('Error fetching reports');
    }
    res.json(results); // Send the results back to the client
  });
});


// endpoint for login 
app.post('/login', (req, res) => {
  try{
    const { username, password } = req.body;
    // Replace with your actual query
    const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
  
    connection.query(query, [username, password], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
   
      if (results.length === 1) {
        const user = results[0];
        const token = jwt.sign({ userId: user.id, username: user.username , userType: user.userType}, secretkey);
        return res.status(200).json({ success: true, message: 'Login successful', token });
      } else {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
    });
  }catch(error){
    console.log('error logging user', error)
  }
});

// Endpoint to update the user table
app.put('/updateProfile', (req, res) => {
  const { doctorid, username, password, name } = req.body;

  if (!doctorid || !username || !password || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Query to update the user profile based on doctorid
  const query = `UPDATE users SET username = ?, password = ?, name = ? WHERE doctorid = ?`;

  connection.query(query, [username, password, name, doctorid], (error, results) => {
    if (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Error updating profile' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    return res.status(200).json({ success: true, message: 'Profile updated successfully' });
  });
});

// to get user 
app.get('/user', async (req, res) => {
  const usertoken = req.headers.authorization;

  if (!usertoken) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  try {
    const token = usertoken.split(' ')[1]; // Extract the token part
    const decodedToken = jwt.verify(token, secretkey);

    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized request' });
    }

    // Replace with your actual MySQL query
    const query = 'SELECT * FROM users WHERE id = ?';
    connection.query(query, [decodedToken.userId], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (results.length === 1) {
        const user = results[0];
        return res.json(user);
      } else {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint to save a new doctor
app.post('/doctors', async (req, res) => {
  try {
    const {
      username,
      password,
      doctorid,
      userType,
      name,
    } = req.body;

    // Validate input data if needed
    if (!username || !password || !doctorid || !userType || !name) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }

    // Replace with your actual query
    const query = 'INSERT INTO users (username, password, doctorid, userType, name) VALUES (?, ?, ?, ?, ?)';

    connection.query(
      query,
      [
        username,
        password,
        doctorid,
        userType,
        name
      ],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(501).json({ error: 'Error saving doctor details' });
        }

        const newDoctorId = results.insertId;

        // Emit the new-doctor event to all connected clients
        io.emit('new-doctor', { ...req.body, _id: newDoctorId });

        return res.status(201).json({ success: true, newDoctorId });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving doctor details' });
  }
});


app.post('/patients', async (req, res) => {
  try {
    const {
      name,
      patientid,
      age,
      haemoglobin,
      bloodGroup,
      mobile,
      height,
      weight,
      doctorid,
    } = req.body;

    // Log the incoming data for debugging
    console.log('Incoming patient data:', req.body);

    // Check if all required fields are provided
    if (!name || !patientid || !age || !bloodGroup || !mobile || !height || !weight || !doctorid) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // SQL query
    const query = 'INSERT INTO addpatient (name, patientid, age, haemoglobin, bloodGroup, mobile, height, weight, doctorid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    // Execute the query
    connection.query(
      query,
      [name, patientid, age, haemoglobin, bloodGroup, mobile, height, weight, doctorid],
      (error, results) => {
        if (error) {
          console.error('Database error:', error);
          return res.status(500).json({ error: 'Error saving patient details' });
        }

        const newPatientId = results.insertId;

        // Emit the new-patient event to all connected clients
        io.emit('new-patient', { ...req.body, _id: newPatientId });

        return res.status(201).json({ success: true, newPatientId });
      }
    );
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Error saving patient details' });
  }
});


// Endpoint to update patient details
app.put('/patients/:patientid', async (req, res) => {
  try {
    const { patientid } = req.params;
    const { name, mobile, age, bloodGroup, weight, height } = req.body;

    const query = `
      UPDATE addpatient
      SET 
        name = ?,
        mobile = ?,
        age = ?,
        bloodGroup = ?,
        weight = ?,
        height = ?
      WHERE patientid = ?
    `;

    connection.query(
      query,
      [name, mobile, age, bloodGroup, weight, height, patientid],
      (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          return res.status(501).json({ error: 'Error updating patient details' });
        }
        return res.status(200).json({ success: true });
      }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Error updating patient details' });
  }
});



// Endpoint to delete a patient
app.delete('/patients/:patientid', async (req, res) => {
  const patientid = req.params.patientid; // Corrected parameter name

  try {
    // Replace with your actual query to delete the patient by ID
    const query = 'DELETE FROM addpatient WHERE patientid = ?';

    connection.query(
      query,
      [patientid],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Error deleting patient' }); // Corrected status code
        }

        if (results.affectedRows > 0) {
          res.sendStatus(204); // No content response for successful deletion
          io.emit('delete-patient');  // Emit event to indicate deletion
        } else {
          res.status(404).json({ error: 'Patient not found' }); // Corrected status code
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' }); // Corrected status code
  }
});



// get list api
app.get('/patients', async (req, res) => {
  try {
    const doctorID = req.query.doctorID;

    // Replace with your actual query
    const query = 'SELECT * FROM addpatient WHERE doctorID = ?';

    connection.query(query, [doctorID], (error, results) => {
      if (error) {
        console.error('Error retrieving patients:', error);
        return res.status(500).json({ error: 'Error retrieving patients' });
      }

      res.json(results);
    });
  } catch (error) {
    console.error('Error retrieving patients:', error);
    res.status(500).json({ error: 'Error retrieving patients' });
  }
});

// endpoint for save data of anemia pageone and anemia page two
app.post('/save-details', (req, res) => {
  const { date, PatientID, HemoglobinLevel, BloodTransfusion, BleedingDisorder, MCV, MCH, MCHC, RDW, MentzerIndex,
     IronDeficiencyAnemia, targetHB, actualHB, prepregnancyWeight, IronDeficiencyAnemiaValue, otherReports } = req.body;
  // Insert user details into the database
  const query = 'INSERT INTO userdetailstwo (date, PatientID, HemoglobinLevel, BloodTransfusion, BleedingDisorder, MCV, MCH, MCHC, RDW, MentzerIndex, IronDeficiencyAnemia, targetHB, actualHB, prepregnancyWeight, IronDeficiencyAnemiaValue, otherReports) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [date, PatientID, HemoglobinLevel, BloodTransfusion, BleedingDisorder, MCV, MCH, MCHC, RDW, MentzerIndex, IronDeficiencyAnemia, targetHB, actualHB, prepregnancyWeight, IronDeficiencyAnemiaValue, otherReports], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error saving user details');
    } else {
      console.log('User details saved successfully');
      res.status(200).send('User details saved successfully');
    } 
  });
});

// Endpoint to fetch all data from anemiaone and anemiatwo pages
app.get('/fetch-anemia-data/:patientid', async (req, res) => {
  try {
    const patientID = req.params.patientid;

    // Fetch data from userdetailstwo table based on patientID
    const query = 'SELECT * FROM userdetailstwo WHERE patientID = ?';
    connection.query(query, [patientID], (error, results) => {
      if (error) {
        console.error('Error fetching Anemia Page Two data:', error);
        return res.status(500).json({ error: 'Error fetching Anemia Page Two data' });
      }

      // Send the fetched data as a response
      res.json(results);
    });
  } catch (error) {
    console.error('Error fetching Anemia data:', error);
    res.status(500).json({ error: 'Error fetching Anemia data' });
  }
});

// Define a new endpoint to save hyper page one and two
app.post('/hypertwo', (req, res) => {
  const { date, PatientID, Headache, Blurringofvision, Epigastricpain, Urineoutput, SystolicBP, DiastolicBP,    
    Meditationtaken, HistoryofHypertension, Hemoglobin, Platelets,
    SGOT, SGPT, Albumin, Totalprotein, DirectBilirubin, TotalBilirubin, UREA, UrineAlbumin, Urineketone, UrineSugar, Otherreports
  } = req.body;

  // Insert symptom data into the symptoms table
  const query = 'INSERT INTO hypertensiontwo (date, PatientID, Headache, Blurringofvision, Epigastricpain, Urineoutput,SystolicBP, DiastolicBP,HistoryofHypertension, Meditationtaken,  Hemoglobin, Platelets, SGOT, SGPT, Albumin, Totalprotein, DirectBilirubin, TotalBilirubin, UREA, UrineAlbumin, Urineketone, UrineSugar, Otherreports) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [date,PatientID, Headache, Blurringofvision, Epigastricpain, Urineoutput,SystolicBP, DiastolicBP,HistoryofHypertension, Meditationtaken,  Hemoglobin, Platelets, SGOT, SGPT, Albumin, Totalprotein, DirectBilirubin, TotalBilirubin, UREA, UrineAlbumin, Urineketone, UrineSugar, Otherreports], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error saving user details');
    } else {
      console.log('User details saved successfully');
      res.status(200).send('User details saved successfully');
    }
  });

});

// Endpoint to fetch all data from hyperone and hypertwo pages
app.get('/fetch-hyper-data/:patientid', async (req, res) => {
  try {
    // Fetch data from both tables (hyperone and hypertentiontwo)
    const patientID = req.params.patientid;
    const query = 'SELECT * FROM sample.hypertensiontwo WHERE patientID = ? ';

    // Execute queries and combine results
    connection.query(query, [patientID], (error, results) => {
      if (error) {
        console.error('Error fetching hypertention  data:', error);
        return res.status(500).json({ error: 'Error fetching hypertention data' });
      }
      // Send the fetched data as a response
     res.json(results);
      });
      } catch (error) {
      console.error('Error fetching Hypertension data:', error);
      res.status(500).json({ error: 'Error fetching Hypertension data' });
      }
      });


// Define the POST endpoint
app.post('/generaldatas', (req, res) => {
  const {
    date, patientID, difficultyinbreathing, feelingtired, chestpain, palpitation, indigestion,
    swellinginlegs, bleedinghistory, bleedinghistorywhen, bleedinghistorymanage, surgeries,
    surgeriesdetails, medicalillness, medicalillnessdetails, lastchildbirth
  } = req.body;

  // SQL query to insert data into the table
  const query = `
    INSERT INTO generaldatas (
      date, patientID, difficultyinbreathing, feelingtired, chestpain, palpitation, indigestion,
      swellinginlegs, bleedinghistory, bleedinghistorywhen, bleedinghistorymanage, surgeries,
      surgeriesdetails, medicalillness, medicalillnessdetails, lastchildbirth
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    date, patientID, difficultyinbreathing, feelingtired, chestpain, palpitation, indigestion,
    swellinginlegs, bleedinghistory, bleedinghistorywhen, bleedinghistorymanage, surgeries,
    surgeriesdetails, medicalillness, medicalillnessdetails, lastchildbirth
  ];

  // Execute the query
  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).send('Error saving user details');
    } else {
      console.log('Data saved successfully');
      res.status(200).send('User details saved successfully');
    }
  });
});


   // Endpoint to fetch all data from general page,

app.get('/fetch-General-data/:patientid', async (req, res) => {
  try {
    const patientID = req.params.patientid;

    // Fetch data from generaldatas table based on patientID
    const query = 'SELECT * FROM generaldatas WHERE patientID = ?';
    connection.query(query, [patientID], (error, results) => {
      if (error) {
        console.error('Error fetching general report data:', error);
        return res.status(500).json({ error: 'Error fetching general report data' });
      }

      // Send the fetched data as a response
      res.json(results);
    });
  } catch (error) {
    console.error('Error fetching General data:', error);
    res.status(500).json({ error: 'Error fetching General data' });
  }
});


// fetch patientlistrecord
app.get('/patients', async (req, res) => {
  try {
    const doctorID = req.query.doctorid;

    // Replace with your actual SQL query to fetch patients data based on doctorID
    const query = 'SELECT * FROM patients WHERE doctorID = ?';

    connection.query(query, [doctorID], (error, results) => {
      if (error) {
        console.error('Error fetching patients:', error);
        return res.status(500).json({ error: 'Error fetching patients' });
      }

      res.json(results);
    });
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Error fetching patients' });
  }
});