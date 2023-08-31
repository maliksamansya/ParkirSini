const app = require("../app");
const port = process.env.PORT || 3000;
const job = require("../crons/kernel")

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// job.start()