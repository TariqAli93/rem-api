// webhook.js
import express from "express";
import { exec } from "child_process";

const app = express();
app.use(express.json());

app.post("/webhook", (req, res) => {
    // أمان: تأكد أن البوش من GitHub
    const branch = req.body.ref;
    if (branch !== "refs/heads/main") return res.sendStatus(200);

    exec("./deploy.sh", (err, stdout, stderr) => {
        if (err) {
            console.error(stderr);
            return res.status(500).send("Deploy failed");
        }
        console.log(stdout);
        res.send("✅ Deployed!");
    });
});

app.listen(3003, () => console.log("🚀 Webhook server running on port 3003"));
