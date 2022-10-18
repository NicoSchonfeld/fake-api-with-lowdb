import app from "./app.js";
import { createConnection } from "./database.js";

const PORT = process.env.PORT || 8080;

createConnection();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
