import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { config } from "./config.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
let app;
if (getApps().length === 0) {
    if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
        // Production (Vercel): credentials passed as JSON env var
        const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
        app = initializeApp({ credential: cert(serviceAccount) });
    }
    else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        // Local dev: resolve file path for GOOGLE_APPLICATION_CREDENTIALS
        let credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
        if (!path.isAbsolute(credPath)) {
            const absolutePath = path.resolve(process.cwd(), credPath);
            if (fs.existsSync(absolutePath)) {
                credPath = absolutePath;
            }
            else {
                const __filename = fileURLToPath(import.meta.url);
                const __dirname = path.dirname(__filename);
                const alt = path.resolve(__dirname, "..", credPath);
                if (fs.existsSync(alt))
                    credPath = alt;
            }
            process.env.GOOGLE_APPLICATION_CREDENTIALS = credPath;
        }
        app = initializeApp({ projectId: config.FIREBASE_PROJECT_ID });
    }
    else {
        app = initializeApp({ projectId: config.FIREBASE_PROJECT_ID });
    }
}
else {
    app = getApp();
}
export const db = getFirestore(app);
