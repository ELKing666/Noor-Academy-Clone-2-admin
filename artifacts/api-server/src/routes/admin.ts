import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, siteSettingsTable } from "@workspace/db";
import { contentRouter, DEFAULT_CONTENT, type SiteContent } from "./content";

const router = Router();

const CONTENT_KEY = "site_content";

function requireAdmin(
  req: import("express").Request,
  res: import("express").Response,
  next: import("express").NextFunction,
) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    res.status(503).json({ error: "لم يتم تعيين كلمة مرور المشرف" });
    return;
  }
  const auth = req.headers.authorization;
  if (!auth || auth !== `Bearer ${adminPassword}`) {
    res.status(401).json({ error: "كلمة المرور غير صحيحة" });
    return;
  }
  next();
}

router.post("/admin/login", (req, res) => {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    res.status(503).json({ error: "لم يتم تعيين كلمة مرور المشرف" });
    return;
  }
  const { password } = req.body as { password?: string };
  if (!password || password !== adminPassword) {
    res.status(401).json({ error: "كلمة المرور غير صحيحة" });
    return;
  }
  res.json({ success: true });
});

router.get("/admin/content", requireAdmin, async (_req, res) => {
  const [row] = await db
    .select()
    .from(siteSettingsTable)
    .where(eq(siteSettingsTable.key, CONTENT_KEY));

  if (!row) {
    res.json(DEFAULT_CONTENT);
    return;
  }

  try {
    res.json(JSON.parse(row.value) as SiteContent);
  } catch {
    res.json(DEFAULT_CONTENT);
  }
});

router.put("/admin/content", requireAdmin, async (req, res) => {
  const content = req.body as SiteContent;

  if (!content || typeof content !== "object") {
    res.status(400).json({ error: "البيانات غير صحيحة" });
    return;
  }

  const value = JSON.stringify(content);

  await db
    .insert(siteSettingsTable)
    .values({ key: CONTENT_KEY, value })
    .onConflictDoUpdate({
      target: siteSettingsTable.key,
      set: { value, updated_at: new Date() },
    });

  res.json({ success: true });
});

export { router as adminRouter };
