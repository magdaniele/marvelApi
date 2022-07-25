const app = require("./app.js");
const envPort = process.env.PORT;

const main = ()=>{

    const port = envPort || 3000;
    app.listen(port, () => { // Start the server
      console.log(`App listening on port ${port}`);
    });
}

main(); // Start the app