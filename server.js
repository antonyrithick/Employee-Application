import express from "express";
import mysql from 'mysql';
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_current_password",
    database : "test"
})
app.post("/approve", (req, res) => {
  const { eid } = req.body;
  const sql = `UPDATE employees SET approval = 1 WHERE eid = ?`;

  db.query(sql, [eid], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(200).json({ message: "Leave Approved" });
  });
});

app.post("/reject", (req, res) => {
  const { eid } = req.body;
  const sql = `UPDATE employees SET approval = 0 WHERE eid = ?`;

  db.query(sql, [eid], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(200).json({ message: "Leave Rejected" });
  });
});

// app.get("/hrdashboard", (req, res) => {
//   const sql = `SELECT * FROM employees WHERE leaverequested = 1 AND (approval IS NULL OR approval = -1)`;
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({ message: "No Data Found" });
//     }
//     return res.status(200).json(result);
//   });
// });
app.get("/hrdashboard", (req, res) => {
    const sql = "SELECT * FROM employees";
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ Message: "Server error" });
      }
      return res.status(200).json(result);
    });
  });

  app.get("/status/:eid", (req, res) => {
    const { eid } = req.params;
    const sql = `SELECT * FROM employees WHERE eid = ?`;
  
    db.query(sql, [eid], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "No Data Found" });
      }
      return res.status(200).json(result[0]);
    });
  });
  app.post("/empleaveapply", (req, res) => {
    const { name, eid, leavestart, leaveend, leavedays, leavedes } = req.body;
    const sql = "INSERT INTO employees (name, eid, leavestart, leaveend, leavedays, leavedes) VALUES (?, ?, ?, ?, ?, ?)";
  
    db.query(sql, [name, eid, leavestart, leaveend, leavedays, leavedes], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      }
      return res.status(200).json({ message: "Success" });
    });
  });



  // HR login route
app.post("/hrlogin", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM hr WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    
    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    return res.status(200).json({ message: "Login Successful" });
  });
});

app.listen(8000,()=>{
    console.log("sever is running...")
})