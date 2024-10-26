const express = require("express");
const router = express.Router();

const connection = require("../config");


router.get('/bookings', async (req, res) => {
    try {
        const [bookings] = await connection.query('SELECT * FROM bookings');
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({
            message: 'Failed to fetch bookings',
            error: {
                message: error.message,
                code: error.code,
                errno: error.errno,
                sql: error.sql,
                sqlState: error.sqlState,
                sqlMessage: error.sqlMessage
            }
        });
    }
});



router.post('/bookings', async (req, res) => {
    const { detailId, packageName, packageDetails, dateOfTravel, noOfTravelers, adults, children,userEmail,payment } = req.body;
  
    try {
        

        // Perform the database insert operation
        const [bookingResult] = await connection.query(
            'INSERT INTO bookings (detailId, packageName, packageDetails, dateOfTravel, noOfTravelers, userEmail, payment) VALUES (?, ?, ?, ?, ?, ?,?)',
            [detailId, packageName, packageDetails, dateOfTravel, noOfTravelers, userEmail, payment]
        );
          
        //   console.log('Query Result:', bookingResult);
          const bookingId = bookingResult.insertId;
          console.log('Inserted Booking ID:', bookingId);

      for (const adult of adults) {
        await connection.query('INSERT INTO adults (bookingId, name, email, country, number) VALUES (?, ?, ?, ?, ?)', [bookingId, adult.name, adult.email, adult.country, adult.number]);
      }
  
      for (const child of children) {
        await connection.query('INSERT INTO children (bookingId, name, age, country) VALUES (?, ?, ?, ?)', [bookingId, child.name, child.age, child.country]);
      }
  
      res.status(201).send('Booking information saved successfully');
    } catch (error) {
        console.error('Error saving booking information:', error);
        res.status(500).json({
            message: 'Failed to save booking ',
            error: {
                message: error.message,
                code: error.code,
                errno: error.errno,
                sql: error.sql,
                sqlState: error.sqlState,
                sqlMessage: error.sqlMessage
            }
        });
    }
    
    
  });

  


  // Delete a booking and its related data
router.delete('/bookings/:id', async (req, res) => {
    const bookingId = req.params.id;

    try {
        // Begin a transaction
        await connection.query('START TRANSACTION');

        // Delete from adults table
        await connection.query('DELETE FROM adults WHERE bookingId = ?', [bookingId]);

        // Delete from children table
        await connection.query('DELETE FROM children WHERE bookingId = ?', [bookingId]);

        // Delete from bookings table
        await connection.query('DELETE FROM bookings WHERE id = ?', [bookingId]);

        // Commit transaction
        await connection.query('COMMIT');

        res.status(200).send('Booking and related information deleted successfully');
    } catch (error) {
        // Rollback transaction in case of an error
        await connection.query('ROLLBACK');

        console.error('Error deleting booking and related information:', error);
        res.status(500).json({
            message: 'Failed to delete booking',
            error: {
                message: error.message,
                code: error.code,
                errno: error.errno,
                sql: error.sql,
                sqlState: error.sqlState,
                sqlMessage: error.sqlMessage
            }
        });
    }
});


  


module.exports = router;
