import express from "express";
import bodyParser from "body-parser";

const app = express();

let userGoal = "Learn Docker";

app.use(express.json())
app.use(express.static('public'));  // Serves static files like CSS

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/style.css">

        <title>Course Goal</title>

    </head>
    <body>
        <section>
            <h2>MY Course Goal !!</h2>
            <h3>${userGoal}</h3>
        </section>
        <form action="/store-goal" method="POST">
            <div>
                <label for="goal">Course Goal</label>
                <input type="text" name="goal" id="goal" required>
            </div>
            <button type="submit">Set Course Goal</button>
        </form>
    </body>
    </html>
    `);
});

app.post("/store-goal", (req, res) => {
    userGoal = req.body.goal || "No goal set";
    res.redirect('/');
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
