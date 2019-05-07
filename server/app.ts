import express from "express"
import mongoose from "mongoose"
import multer from "multer"
import cors from "cors"
import bodyParser from "body-parser"

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

const taskSchema = new mongoose.Schema({
  task: String,
  divide: Number,
  images: [{ filepath: String, regions: [] }],
  data: []
})

const Task = mongoose.model("Task", taskSchema)

app.post("/upload", upload.array("file"), async (req, res, next) => {
  // console.log(req.files)
  // console.log(req.body)
  const images = req.files.map(f =>
    Object.assign(
      {},
      {
        filepath: f.originalname,
        regions: []
      }
    )
  )
  console.log(images)
  const task = new Task({
    task: req.body.label,
    divide: req.body.column,
    data: req.files
    // images: req.files,map(f=>Object.assign({}, {
    //   filepath: f.originalname,
    //   regions: []
    // }))
  })

  const result = await task.save()

  res.send(result.id)
})

app.post("/db", async (req, res) => {
  console.log(req.body.id)
  const result = await Task.update(
    {
      _id: req.body.id
      // images.pathname: req.body.pathname
    },
    {}
  )
  result.images.regions.push(req.body.region)
})

app.post("/update", async (req, res) => {
  const targetTask = await Task.findById(req.body.id)
})

app.listen(3333, () => console.log("working at 3333"))
