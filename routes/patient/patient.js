const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const Patient = require('../../models/Patient');
//let PatientEntry = require('../../models/PatientEntry');

router.get('/patient/login', (req, res) => {
});
// POST request: This route takes in user login input and compares it to database in order to login user. TEST WITH: => postman post to http://localhost:5000/patient/login
router.post('/patient/login', [
      check('email', 'Enter a valid email').isEmail(),
      check('password', 'Password is required').exists(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        let patient = await Patient.findOne({ email });
  
        if (!patient) {
          res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const isMatch = await bcrypt.compare(req.body.password, patient.password);

        if(!isMatch) {
            res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const payload = {
            patient: {
                id: patient.id
            }
        };
        res.status(400).send('Logged in');

      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

//route for all patients
router.get('/patient/',(req, res) => {
    Patient
        .find()
        .then(patient => res.json(patient))
        .catch(err => res.status(400).json('Error: ' + err));
});

//route for only 1 patient by id
router.get('/patient/:id',(req, res) => {
    Patient
        .findById(req.params.id)
        .then(patient => res.json(patient))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/patient/:_id', (req, res) => {});



// Post req, This route registers user unless already exists TEST => POSTMAN POST to http://localhost:5000/patient/
router.post(
  '/patient/',
  [
    check('firstName', 'firstName is required').not().isEmpty(),
    check('lastName', 'lastName is required').not().isEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check('age', 'Enter a valid age').not().isEmpty()
   // check('password', 'Please enter password with atleast 4 characters').isLength({ min: 4 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //const { name, email, password } = req.body;
      const { firstName, lastName, email, age, underli } = req.body;


    try {
      let patient = await Patient.findOne({ email });

      if (patient) {
        res.status(400).json({ errors: [{ msg: 'Patient alread in system' }] });
      }

      patient = new Patient({
          firstName,
          lastName,
          email,
          age,
          underlying
    //    password,
      });
/*
      // encrypt password
      patient.password = await bcrypt.hash(req.body.password, 10);
      console.log(patient.password);
      // End encryption
*/
      await patient.save();
      res.send('Patient added');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/patient/logout', (req, res) => {
  // TO DO --
});

module.exports = router;