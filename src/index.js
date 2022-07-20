require("dotenv").config();
const app = require("./app.js");
const envPort = process.env.PORT;

const main = ()=>{

    const port = envPort || 3000;
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
}

main();