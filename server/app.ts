import express from "express"
import mongoose from "mongoose"
import multer from "multer"
import cors from "cors"
import bodyParser from "body-parser"
import { isEqualPoint } from "./util"

const app = express()
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())
app.use(express.static("public"))

const upload = multer({ dest: `public/uploads/` })
mongoose.connect("mongodb://127.0.0.1:27017/annotation", {
  useNewUrlParser: true
})

// Check DB Connection
const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => console.log("connection OK"))

// mongooseスキーマ
const taskSchema = new mongoose.Schema({
  task: String,
  divide: Number,
  images: [],
  data: []
})

// TSスキーマ（findした際などに継承するため)
interface ITaskSchema extends mongoose.Document {
  task: String
  divide: Number
  images: { pathname: string; regions: any }[]
  data: any[]
}

const Task = mongoose.model<ITaskSchema>("Task", taskSchema)

/*
以下ルーティング処理
*/

app.post("/upload", upload.array("file"), async (req, res) => {
  // console.log(req.files)
  // console.log(req.body)
  const images = req.files.map(f =>
    Object.assign(
      {},
      {
        pathname: f.originalname,
        regions: []
      }
    )
  )
  console.log(images)
  const task = new Task({
    task: req.body.label,
    divide: req.body.column,
    data: req.files,
    images: images
  })

  const result = await task.save()

  res.send(result.id)
})

app.get("/db", async (req, res) => {
  const targetTask = await Task.findById(req.query.id)
  res.send(targetTask)
})

app.post("/update", async (req, res) => {
  // console.log(req.body.add);
  try {
    const targetTask = await Task.findById(req.body.id)
    const targetIndex = targetTask.images.findIndex(
      item => item.pathname === req.body.fileName
    )
    // const targetRegionIndex = targetTask.images[targetIndex].regions.findIndex(
    //   req.body.region
    // );
    console.log(req.body.add ? "今から追加するよん" : "今から削除するよん")

    // if (!req.body.add) {
    //   console.log(
    //     targetTask.images[targetIndex].regions.filter(
    //       item => !isEqualPoint(item, req.body.region)
    //     )
    //   );
    // }

    if (targetIndex !== -1) {
      req.body.add
        ? targetTask.images[targetIndex].regions.push(req.body.region)
        : (targetTask.images[targetIndex].regions = targetTask.images[
            targetIndex
          ].regions.filter(item => !isEqualPoint(item, req.body.region)))
    }

    console.log(targetTask.images[targetIndex].regions)
    await targetTask.markModified("images")
    await targetTask.save()

    console.log("targettaskを保存した")
    res.status(200).send("success")
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

app.get("/all", async (req, res) => {
  const result = await Task.find()
  res.send(result)
})

app.get("/progress", async (req, res) => {
  let target = await Task.findById(req.query.id)
  const result = {
    images: target.images,
    task: target.task,
    divide: target.divide
  }

  res.attachment(`${target.task}.json`)
  res.send(result)
})

app.listen(3333, () => console.log("working at 3333"))
