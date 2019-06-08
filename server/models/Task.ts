import mongoose from 'mongoose'

// mongooseスキーマ
const taskSchema = new mongoose.Schema({
  task: String,
  divide: Number,
  images: [],
  data: [],
})

// TSスキーマ（findした際などに継承するため)
interface ITaskSchema extends mongoose.Document {
  task: String
  divide: Number
  images: { pathname: string; regions: any }[]
  data: any[]
}

export const Task = mongoose.model<ITaskSchema>('Task', taskSchema)
