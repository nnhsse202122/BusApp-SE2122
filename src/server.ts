import express, { Request, Response } from 'express'; 

const app = express(); // Make the express application
const port = process.env.PORT || 3000; // Check if there is an .env file with a PORT value, otherwise default to 3000

// Handles GET request for root(main page)
app.get('/',(req: Request, res: Response)=>{
    console.log(req.query);
    res.send('test');
});

// Starts the server by making it listen to connections on the specfied port 
app.listen(port, () => {
  console.log(`running on port ${port}.`);
});