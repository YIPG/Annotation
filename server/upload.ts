import { IncomingForm } from "formidable"

export const upload = (req, res) => {
  const form = new IncomingForm()
  form.on("file", (field, file) => {
    // FIX ME
    // PLZ Save files in DB
    console.log("ファイル届いてます。ファイルは下記")
    console.log(field, file)
  })
  form.on("end", () => {
    res.json()
  })
  form.parse(req)
}
