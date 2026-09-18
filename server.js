const express = require("express");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

// Supabase connection
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

// Home
app.get("/", (req, res) => {
    res.json({
        message: "🚀 SolveSphere Backend + Database is running!",
        status: "success"
    });
});

// Get challenges
app.get("/api/challenges", async (req, res) => {
    const { data, error } = await supabase
        .from("challenges")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

    res.json(data);
});

// Add challenge
app.post("/api/challenges", async (req, res) => {
    const { title, category, description } = req.body;

    if (!title || !category || !description) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields."
        });
    }

    const { data, error } = await supabase
        .from("challenges")
        .insert([
            {
                title: title,
                category: category,
                description: description
            }
        ])
        .select();

    if (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

    res.status(201).json({
        success: true,
        message: "Challenge submitted successfully!",
        challenge: data[0]
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`SolveSphere Backend running on port ${PORT}`);
});