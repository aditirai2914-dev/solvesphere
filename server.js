const express = require("express");

const app = express();

app.use(express.json());

// Allow GitHub Pages frontend to connect
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

let challenges = [
    {
        id: 1,
        title: "Waste Management in Cities",
        category: "Environment",
        description: "How can technology improve waste collection and recycling?"
    },
    {
        id: 2,
        title: "Digital Learning Access",
        category: "Education",
        description: "How can students get better access to digital education?"
    },
    {
        id: 3,
        title: "Rural Healthcare Support",
        category: "Healthcare",
        description: "How can technology improve healthcare in rural areas?"
    }
];

app.get("/", (req, res) => {
    res.json({
        message: "🚀 SolveSphere Backend is running!",
        status: "success"
    });
});

app.get("/api/challenges", (req, res) => {
    res.json(challenges);
});

app.post("/api/challenges", (req, res) => {
    const { title, category, description } = req.body;

    if (!title || !category || !description) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields."
        });
    }

    const challenge = {
        id: challenges.length + 1,
        title,
        category,
        description
    };

    challenges.push(challenge);

    res.status(201).json({
        success: true,
        message: "Challenge submitted successfully!",
        challenge
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`SolveSphere Backend running on port ${PORT}`);
});