import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { upload } from "./upload"

const app = express()

app.use(cors())

app.post("/upload", upload)

app.listen(3333, () => console.log("working at 3333"))
