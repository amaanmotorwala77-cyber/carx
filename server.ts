import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route to expose the Gemini API Key safely
  app.get("/api/config", (req, res) => {
    console.log("Server: Received request for /api/config");
    // We only expose the key if it exists in the environment
    // This allows the client to know if it should show the selection dialog
    const config = { 
      hasKey: !!(process.env.GEMINI_API_KEY || process.env.API_KEY),
      apiKey: process.env.GEMINI_API_KEY || process.env.API_KEY || ""
    };
    console.log("Server: Returning config:", { hasKey: config.hasKey, keyLength: config.apiKey.length });
    res.json(config);
  });

  // API route for sending emails
  app.post("/api/send-email", async (req, res) => {
    const { to, subject, html } = req.body;

    if (!resend) {
      console.log("-----------------------------------------");
      console.log("MOCK EMAIL SERVICE (NO RESEND_API_KEY)");
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log("HTML Content (truncated):", html.substring(0, 200));
      console.log("-----------------------------------------");
      
      return res.status(200).json({ 
        data: { id: "mock-id-" + Date.now() },
        mock: true,
        message: "Email logged to server console (mock mode)"
      });
    }

    try {
      const { data, error } = await resend.emails.send({
        from: "AI Studio Free Tier 2 <onboarding@resend.dev>",
        to: [to],
        subject: subject,
        html: html,
      });

      if (error) {
        console.error("Resend error:", error);
        return res.status(400).json({ error });
      }

      res.status(200).json({ data });
    } catch (error) {
      console.error("Server error sending email:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
