import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import { Task } from "../models/Task";
import { isEqualPoint } from "../util";

const router = express.Router();
const upload = multer({ dest: `public/uploads/` });

router.use(
  bodyParser.urlencoded({
    extended: true
  })
);
router.use(bodyParser.json());

router.post("/upload", upload.array("file"), async (req, res) => {
  const images = req.files.map(f =>
    Object.assign(
      {},
      {
        pathname: f.originalname,
        regions: []
      }
    )
  );
  const task = new Task({
    task: req.body.label,
    divide: req.body.column,
    data: req.files,
    images: images
  });

  const result = await task.save();

  res.send(result.id);
});

router.get("/db", async (req, res) => {
  const targetTask = await Task.findById(req.query.id);
  res.send(targetTask);
});

router.post("/update", async (req, res) => {
  try {
    const targetTask = await Task.findById(req.body.id);
    const targetIndex = targetTask.images.findIndex(
      item => item.pathname === req.body.fileName
    );

    if (targetIndex !== -1) {
      req.body.add
        ? targetTask.images[targetIndex].regions.push(req.body.region)
        : (targetTask.images[targetIndex].regions = targetTask.images[
            targetIndex
          ].regions.filter(item => !isEqualPoint(item, req.body.region)));
    }

    console.log(targetTask.images[targetIndex].regions);
    await targetTask.markModified("images");
    await targetTask.save();

    res.status(200).send("success");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/all", async (req, res) => {
  const result = await Task.find();
  res.send(result);
});

router.get("/progress", async (req, res) => {
  let target = await Task.findById(req.query.id);
  const result = {
    images: target.images,
    task: target.task,
    divide: target.divide
  };

  res.attachment(`${target.task}.json`);
  res.send(result);
});

export default router;
