import { Hono } from "hono";
import usersRoute from "./routes/users";
import { migrate } from "./db";

// Apply migrations
migrate();

const app = new Hono();

app.route("/", usersRoute);

export default app;
