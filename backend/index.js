

const express = require("express");
const {db} = require("./db.js");




const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/api", async (req, res) => {
    try {
        if (!req.body) return res.status(400).json({ error: "No data provided" });
        
        // Destructure the request body to get the data
        const { name, age, email } = req.body;
        console.log("Received data:", req.body);

        // Basic input validation
        if (!name || !age || !email) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (typeof name !== "string" || typeof age !== "number" || typeof email !== "string") {
            return res.status(400).json({ error: "Invalid data types" });
        }
        if (age < 0) {
            return res.status(400).json({ error: "Age must be a positive number" });
        }
        if (!email.includes("@")) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        // Save to database using a parameterized query to prevent SQL injection
        const query = "INSERT INTO users (name, age, email) VALUES ($1, $2, $3) RETURNING *"; //Added RETURNING *
        const values = [name, age, email];

        // Use await to handle the promise and get the result
        const result = await db.query(query, values);
        const insertedUser = result.rows[0];

        console.log("Data saved to database.  Inserted ID:", insertedUser.id); //Added insertedUser.id to log
        res.status(201).json({ message: "Data saved successfully", user: insertedUser }); // Send back the new user

    } catch (error) {
        // Handle errors, especially database errors
        console.error("Error saving data to database:", error);
        res.status(500).json({ error: "Internal server error", message: error.message }); // Include the error message
    }
});

app.get("/api/users", async (req, res) => {
    try {
        // Fetch all users from the database
        const query = "SELECT * FROM users";
        const result = await db.query(query);
        const users = result.rows;

        console.log("Fetched users from database:", users);
        res.status(200).json({ message: "Users fetched successfully", users });
    } catch (error) {
        console.error("Error fetching users from database:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
});

app.get("/api/users/:id", async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    try {
        // Fetch a specific user by ID from the database
        const query = "SELECT * FROM users WHERE id = $1";
        const values = [userId];
        const result = await db.query(query, values);
        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        console.log("Fetched user from database:", user);
        res.status(200).json({ message: "User fetched successfully", user });
    } catch (error) {
        console.error("Error fetching user from database:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
});





const server = app.listen(3000, () => {
    const port = 3000;
    console.log(`Server is running at http://localhost:${port}`);
});

// Add this line to handle the SIGINT signal (Ctrl+C)
process.on('SIGINT', () => {
  console.log('Received SIGINT. Closing server and database connection...');
  server.close(() => {
    pool.end()
      .then(() => {
        console.log('Database connection closed. Exiting.');
        process.exit(0);
      })
      .catch(err => {
        console.error('Error closing database connection:', err);
        process.exit(1);
      });
  });
});
