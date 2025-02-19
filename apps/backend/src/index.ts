import express from "express";
import ModelRouter from "./controllers/Model.controller";
import PackRouter from "./controllers/Pack.controller";
import prismaClient from "db";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;

const USER_ID = "abc";

app.post("/ai", ModelRouter);
app.post("/bundle", PackRouter);

app.get("/image/bulk", async (req, res) => {
  const Ids = req.query.images as string[];
  const images = await prismaClient.outputImages.findMany({
    where: {
      Id: { in: Ids },
      userId: USER_ID,
    },
  });
  res.json({
    images,
  });
});

app.listen(PORT, () => {
  console.log("running");
});
