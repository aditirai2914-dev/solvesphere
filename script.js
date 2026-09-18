function showLogin() {
    alert("Login / Sign Up feature coming soon!");
}

function showChallengeForm() {
    const title = prompt("Enter your challenge title:");

    if (title) {
        const description = prompt("Describe your problem:");

        if (description) {
            let category = "General";
            const text = (title + " " + description).toLowerCase();

            if (
                text.includes("waste") ||
                text.includes("garbage") ||
                text.includes("pollution") ||
                text.includes("water")
            ) {
                category = "Environment";
            } 
            else if (
                text.includes("school") ||
                text.includes("student") ||
                text.includes("education")
            ) {
                category = "Education";
            } 
            else if (
                text.includes("hospital") ||
                text.includes("health") ||
                text.includes("medical")
            ) {
                category = "Healthcare";
            }

            alert(
                "Challenge Submitted Successfully! 🎉\n\n" +
                "Title: " + title + "\n" +
                "Category: " + category + "\n\n" +
                "AI Categorization: Completed 🤖\n" +
                "Smart Match: Finding suitable teams 🎯"
            );
        }
    }
}

function scrollToChallenges() {
    document.getElementById("challenges").scrollIntoView({
        behavior: "smooth"
    });
}


function showDetails(name) {
    const choice = confirm(
        "Challenge: " + name + "\n\n" +
        "🟢 Status: Open\n" +
        "👥 Students interested: 12\n" +
        "👨‍🏫 Experts available: 4\n" +
        "💡 Solutions submitted: 6\n\n" +
        "Do you want to continue to collaboration?"
    );

    if (choice) {
        document.getElementById("collaboration").scrollIntoView({
            behavior: "smooth"
        });
    }
}

async function submitChallenge() {
    const title = document.getElementById("challengeTitle").value;
    const description = document.getElementById("challengeDescription").value;
    const category = document.getElementById("challengeCategory").value;
    // Automatic AI-like category suggestion
let aiCategory = aicategory;

const text = (title + " " + description).toLowerCase();

if (text.includes("water") || text.includes("river") || text.includes("pollution")) {
    aiCategory = "Environment";
} 
else if (text.includes("hospital") || text.includes("health") || text.includes("disease")) {
    aiCategory = "Healthcare";
} 
else if (text.includes("education") || text.includes("school") || text.includes("student")) {
    aiCategory = "Education";
} 
else if (text.includes("traffic") || text.includes("road") || text.includes("transport")) {
    aiCategory = "Transport";
} 
else if (text.includes("farmer") || text.includes("agriculture") || text.includes("crop")) {
    aiCategory = "Agriculture";
}
    const result = document.getElementById("result");

    if (title === "" || description === "" || category === "") {
        result.innerHTML = "⚠️ Please fill all the fields.";
        return;
    }

    result.innerHTML = "⏳ Submitting challenge...";

    try {
        const response = await fetch(
            "https://solvesphere-pgw2.onrender.com/api/challenges",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    category: category
                })
            }
        );

        const data = await response.json();

        if (data.success) {
            result.innerHTML =
                "✅ Challenge submitted successfully!<br><br>" +
                "🤖 AI Categorization: Completed<br>" +
                "🎯 Smart Matching: Finding suitable teams...";
        } else {
            result.innerHTML = "❌ " + data.message;
        }

    } catch (error) {
        result.innerHTML =
            "❌ Could not connect to backend. Please try again.";
        console.error(error);
    }
}

function submitSolution() {
    const title = document.getElementById("solutionTitle").value;
    const team = document.getElementById("teamName").value;
    const description = document.getElementById("solutionDescription").value;
    const result = document.getElementById("solutionResult");

    if (title === "" || team === "" || description === "") {
        result.innerHTML = "⚠️ Please fill all the fields.";
        return;
    }

    result.innerHTML =
        "✅ Solution submitted successfully!<br>" +
        "🤝 Your solution is now available for collaboration.";
}

function loginUser() {
    const name = document.getElementById("userName").value;
    const email = document.getElementById("userEmail").value;
    const role = document.getElementById("userRole").value;
    const result = document.getElementById("loginResult");

    if (name === "" || email === "" || role === "") {
        result.innerHTML = "⚠️ Please fill all the fields.";
        return;
    }

    result.innerHTML =
        "✅ Welcome, " + name + "!<br>" +
        "👤 Role: " + role + "<br>" +
        "🎯 You can now explore challenges and collaborate.";
}

function joinTeam() {
    const result = document.getElementById("collaborationResult");

    result.innerHTML = `
        <div class="team-list">
            <h3>👥 Available Teams</h3>

            <div class="team-card">
                <h4>Team SolveSphere</h4>
                <p>💻 Web Development • Data Science</p>
                <p>👥 Members: 3/5</p>
                <button onclick="joinSelectedTeam('Team SolveSphere')">
                    Join Team
                </button>
            </div>

            <div class="team-card">
                <h4>Team Innovators</h4>
                <p>🤖 AI • Machine Learning</p>
                <p>👥 Members: 4/5</p>
                <button onclick="joinSelectedTeam('Team Innovators')">
                    Join Team
                </button>
            </div>

            <div class="team-card">
                <h4>Team Future Minds</h4>
                <p>📚 Digital Learning • Technology</p>
                <p>👥 Members: 2/5</p>
                <button onclick="joinSelectedTeam('Team Future Minds')">
                    Join Team
                </button>
            </div>
        </div>
    `;
}

function joinSelectedTeam(teamName) {
    localStorage.setItem("selectedTeam", teamName);

    const result = document.getElementById("collaborationResult");

    if (result) {
        result.innerHTML = `
            <div class="success-box">
                <h3>✅ Team Joined Successfully!</h3>
                <p>You have joined <b>${teamName}</b>.</p>
                <p>🤝 You can now collaborate with your team members.</p>
            </div>
        `;
    }

    const dashboardTeam = document.getElementById("dashboardTeam");

    if (dashboardTeam) {
        dashboardTeam.innerHTML = `
            <h3>👥 My Team</h3>
            <h4>${teamName}</h4>
            <p>✅ You are a member of this team.</p>
            <p>🤝 Collaboration is active.</p>
        `;
    }

    addNotification("You joined " + teamName + " successfully!");
}

function findExpert() {
    document.getElementById("collaborationResult").innerHTML = `
        <h3>🔎 Suitable Experts</h3>

        <div class="expert-card">
            <h4>👨‍💻 Dr. Rahul Sharma</h4>
            <p><b>Expertise:</b> Data Science, AI & Machine Learning</p>
            <p>🎓 University Professor</p>
            <button onclick="connectExpert('Dr. Rahul Sharma')">
                Connect
            </button>
        </div>

        <div class="expert-card">
            <h4>👩‍💻 Priya Verma</h4>
            <p><b>Expertise:</b> Web Development & Digital Education</p>
            <p>💼 Industry Expert</p>
            <button onclick="connectExpert('Priya Verma')">
                Connect
            </button>
        </div>

        <div class="expert-card">
            <h4>👨‍🏫 Amit Singh</h4>
            <p><b>Expertise:</b> Education Technology & E-Learning</p>
            <p>🎓 Education Specialist</p>
            <button onclick="connectExpert('Amit Singh')">
                Connect
            </button>
        </div>
    `;
}

function connectExpert(expertName) {
    alert("Connection request sent to " + expertName + "!");
    addNotification("Connection request sent to " + expertName + "!");
}

function smartMatch() {
    const result = document.getElementById("matchResult");

    if (!result) return;

    result.innerHTML = `
        <div class="match-card">
            <h3>🎯 Best Team Match</h3>
            <h4>Team Innovators</h4>
            <p>🤖 AI • Machine Learning</p>
            <p><b>Match Score: 92%</b></p>
        </div>

        <div class="match-card">
            <h3>👨‍🏫 Recommended Expert</h3>
            <h4>Dr. Rahul Sharma</h4>
            <p>Data Science • AI & Machine Learning</p>
            <p><b>Expertise Match: 95%</b></p>
        </div>

        <div class="success-box">
            ✅ Smart Matching completed successfully!
        </div>
    `;
}

function addNotification(message) {
    let notifications = JSON.parse(
        localStorage.getItem("notifications") || "[]"
    );

    notifications.unshift(message);

    localStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
    );

    displayNotifications();
}

function displayNotifications() {
    const box = document.getElementById("notifications");

    if (!box) return;

    const notifications = JSON.parse(
        localStorage.getItem("notifications") || "[]"
    );

    if (notifications.length === 0) {
        box.innerHTML = "<p>📩 No new notifications.</p>";
        return;
    }

    box.innerHTML = notifications.map(function(notification) {
        return "<p>🔔 " + notification + "</p>";
    }).join("");
}

window.addEventListener("DOMContentLoaded", function() {

    const savedTeam = localStorage.getItem("selectedTeam");
    const dashboardTeam = document.getElementById("dashboardTeam");

    if (savedTeam && dashboardTeam) {
        dashboardTeam.innerHTML = `
            <h3>👥 My Team</h3>
            <h4>${savedTeam}</h4>
            <p>✅ You are a member of this team.</p>
            <p>🤝 Collaboration is active.</p>
        `;
    }

    displayNotifications();
});
function filterChallenges() {
    const searchBox = document.getElementById("challengeSearch");
    const filterBox = document.getElementById("challengeFilter");

    const searchText = searchBox.value.toLowerCase().trim();
    const selectedCategory = filterBox.value.toLowerCase();

    const challenges = document.querySelectorAll(
        ".challenge, .recent-challenge"
    );

    challenges.forEach(function(challenge) {

        const challengeText = challenge.innerText.toLowerCase();
        const category = challenge.getAttribute("data-category");

        const searchMatch = challengeText.includes(searchText);

        const categoryMatch =
            selectedCategory === "all" ||
            category === selectedCategory;

        if (searchMatch && categoryMatch) {
            challenge.style.display = "";
        } else {
            challenge.style.display = "none";
        }
    });
}
async function loadChallenges() {
    try {
        const response = await fetch(
            "https://solvesphere-pgw2.onrender.com/api/challenges"
        );

        const challenges = await response.json();

        console.log("Challenges from database:", challenges);

        // Agar page par challenges container hai
        const container = document.getElementById("challengesContainer");

        if (!container) {
            console.log("Challenges container not found.");
            return;
        }

        container.innerHTML = "";

        challenges.forEach((challenge) => {
            const card = document.createElement("div");

            card.className = "challenge-card";

            card.innerHTML = `
                <h3>${challenge.title}</h3>
                <p><strong>Category:</strong> ${challenge.category}</p>
                <p>${challenge.description}</p>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading challenges:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadChallenges);
