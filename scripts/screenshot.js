import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.resolve(__dirname, "..", "figma-screenshots");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const teacherRoutes = [
  { path: "/teacher", name: "teacher-dashboard" },
  { path: "/gradebook", name: "gradebook-list" },
  { path: "/gradebook/1", name: "gradebook-detail" },
  { path: "/student/1", name: "student-profile-view" },
  { path: "/attendance-management", name: "attendance-management" },
  { path: "/attendance/student/1", name: "attendance-per-student" },
  { path: "/leave-requests", name: "leave-requests-list" },
  { path: "/leave-request/1", name: "leave-request-approval" },
];

const studentRoutes = [
  { path: "/student-dashboard", name: "student-dashboard" },
  { path: "/journal", name: "journal-summary" },
  { path: "/journal/math", name: "journal-per-subject" },
  { path: "/grades", name: "grade-detail" },
  { path: "/assignment/1", name: "assignment-detail" },
  { path: "/attendance", name: "attendance-overview" },
  { path: "/attendance/session/1", name: "attendance-per-session" },
  { path: "/leave-request", name: "leave-request-form" },
  { path: "/leave-requests-status", name: "leave-request-status" },
  { path: "/profile", name: "student-profile" },
];

const sharedRoutes = [
  { path: "/login", name: "login" },
  { path: "/register", name: "register" },
  { path: "/reports", name: "reports" },
  { path: "/404", name: "error-state" },
];

const modalRoutes = [
  { path: "/gradebook/1?modal=grade-edit", name: "grade-edit-modal" },
  { path: "/grades?modal=grade-history", name: "grade-history-modal" },
];

const viewports = [{ name: "desktop", width: 1440, height: 900 }];

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  // Capture all routes without authentication since role restrictions were removed
  const allRoutes = [
    ...teacherRoutes,
    ...studentRoutes,
    ...sharedRoutes,
    ...modalRoutes,
  ];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });

    for (const route of allRoutes) {
      const url = `http://localhost:5173${route.path}`;
      try {
        await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
        await new Promise((r) => setTimeout(r, 600));
        const file = path.join(outputDir, `${route.name}-${vp.name}.png`);
        await page.screenshot({ path: file, fullPage: true });
        console.log("Saved", file);
      } catch (err) {
        console.error("Failed to capture", url, err.message);
      }
    }
  }

  await browser.close();
})();
