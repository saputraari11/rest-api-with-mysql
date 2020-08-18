const md5 = require("md5")
const con = require("./koneksi.js")
const main = require("./main")
const { port } = require("./main")
const app = main.app
let db = con.koneksi("pelanggaran_siswa")
const { valid } = require("./api")
module.exports = { db }


// app.get("/siswa/:id", valid(), (req, res) => {

//     let data = {
//         nis: Number(req.params.id)
//     }

//     let sql = "select * from siswa where ?"


//     db.query(sql, data, (error, result) => {
//         let response = null

//         if (error) {
//             response = {
//                 massage: error.massage
//             }
//         } else {
//             response = {
//                 count: result.count,
//                 result: result
//             }
//         }
//         res.json(response)
//     })
// })

// app.post("/siswa", (req, res) => {

//     let data = {
//         nis: req.body.nis,
//         nama_siswa: req.body.nama_siswa,
//         kelas: req.body.kelas,
//         poin: req.body.poin
//     }
//     let sql = "insert into siswa set ?"

//     db.query(sql, data, (err, result) => {
//         let response = null
//         if (err) {
//             response = {
//                 massage: result.affectedRows + " data inserted",
//                 error: err.massage
//             }
//         } else {
//             response = {
//                 massage: result.affectedRows + " data inserted"
//             }
//         }
//         res.json(response)
//     })

// })

// app.put("/siswa", (req, res) => {
//     let data = [{
//             nis: req.body.nis,
//             nama_siswa: req.body.nama_siswa,
//             poin: req.body.poin,
//             kelas: req.body.kelas
//         },
//         {
//             id_siswa: req.body.id_siswa
//         }
//     ]
//     let sql = "update siswa set ? where ?"

//     db.query(sql, data, (err, result) => {
//         let response = null

//         if (err) {
//             response = {
//                 massaage: result.affectedRows + " data updated",
//                 error: err.message
//             }
//         } else {
//             response = {
//                 massaage: result.affectedRows + " data updated"
//             }

//         }
//         res.json(response)
//     })

// })

// app.delete("/siswa/:id", (req, res) => {
//     let data = {
//         id_siswa: req.params.id
//     }
//     let sql = "delete from siswa where ?"

//     db.query(sql, data, (err, result) => {
//         let response = null

//         if (err) {
//             response = {
//                 massage: result.affectedRows + " data deleted",
//                 error: err.massage
//             }
//         } else {
//             response = {
//                 massage: result.affectedRows + " data deleted"
//             }
//         }
//         res.json(res)
//     })
// })

port()