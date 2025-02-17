import express,{type Request, type Response} from "express";
import { s3, write, S3Client } from "bun";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const credentials = {
  
}


app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log("running");
});
