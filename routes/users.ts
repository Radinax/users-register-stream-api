import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { db } from "../db";
import { users } from "../db/schema";

const router = new Hono();

const credentialsSchema = z.object({
  username: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(20),
});

router.post("/signup", zValidator("json", credentialsSchema), async (c) => {
  const { username, password } = c.req.valid("json");
  const hashedPassword = await Bun.password.hash(password, "argon2d");

  try {
    await db.insert(users).values({ username, password: hashedPassword });
    return c.body(null, 201);
  } catch (err) {
    console.error(err);
    return c.body(null, 500);
  }
});

export default router;
