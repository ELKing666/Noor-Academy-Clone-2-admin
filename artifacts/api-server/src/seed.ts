import { db, coursesTable, contactInfoTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";

export async function runSeed() {
  try {
    // ── Contact Info ──────────────────────────────────────────────
    // Only update if still has placeholder phone number
    const [contact] = await db.select().from(contactInfoTable).where(eq(contactInfoTable.id, "main"));
    if (!contact || contact.phone.includes("0555 12 34 56") || contact.phone.trim() === "") {
      await db
        .insert(contactInfoTable)
        .values({
          id: "main",
          phone: "0770 764 200\n0770 767 750\n0550 686 498",
          email: "nooracademyalgeria@gmail.com",
          address: "Hay Arroudj, Centre des Affaires Erriadh N°02 Chlef DZ، 02000",
        })
        .onConflictDoUpdate({
          target: contactInfoTable.id,
          set: {
            phone: "0770 764 200\n0770 767 750\n0550 686 498",
            email: "nooracademyalgeria@gmail.com",
            address: "Hay Arroudj, Centre des Affaires Erriadh N°02 Chlef DZ، 02000",
          },
        });
    }

    // ── Course Badges ─────────────────────────────────────────────
    // Only update if badge is null or empty
    const badgeSeed: Array<{ id: string; badge: string }> = [
      { id: "bac", badge: "شعبة العلوم والتقني رياضي" },
      { id: "english", badge: "من مبتدئ إلى متقدم" },
      { id: "robotics", badge: "للأعمار 8-14 سنة" },
    ];
    for (const { id, badge } of badgeSeed) {
      await db
        .update(coursesTable)
        .set({ badge })
        .where(sql`${coursesTable.id} = ${id} AND (${coursesTable.badge} IS NULL OR ${coursesTable.badge} = '')`);
    }

    // ── French Course (insert if missing) ─────────────────────────
    const [existing] = await db.select({ id: coursesTable.id }).from(coursesTable).where(eq(coursesTable.id, "french"));
    if (!existing) {
      await db.insert(coursesTable).values({
        id: "french",
        title: "اللغة الفرنسية",
        description: "دورات متكاملة لتعلم اللغة الفرنسية من الصفر أو تحسين المستوى، بأسلوب تفاعلي حديث.",
        price: "4,000 د.ج / شهرياً",
        duration: "4 ساعة/أسبوع",
        icon: "🇫🇷",
        category: "adults",
        is_featured: false,
        sort_order: 2,
        badge: "من مبتدئ إلى متقدم",
      });
    }
  } catch (err) {
    console.error("Seed error (non-fatal):", err);
  }
}
