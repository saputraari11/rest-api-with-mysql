const { koneksi } = require("./koneksi.js")
const { app, port, md5, moment } = require("./main.js")
let db = koneksi("pelanggaran_siswa")
let { data_ins, data_put, data_get, data_del } = require("./my")
    //crud pelanggaran

// app.post("/pelanggaran", (req, res) => {

//     let data = {
//         nama_pelanggaran: req.body.nama_pelanggaran,
//         poin: req.body.poin
//     }
//     let sql = "insert into pelanggaran set ?"

//     db.query(sql, data, (err, result) => {
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

// app.get("/pelanggaran", (req, res) => {
//     let data = {
//         id_pelanggaran: req.query.id
//     }
//     let sql = "select * from pelanggaran where ?"

//     if (data.id_pelanggaran === undefined) {
//         sql = "select * from pelanggaran"
//     }

//     db.query(sql, data, (err, result) => {
//         if (err) {
//             response = {
//                 error: err.massage
//             }
//         } else {
//             response = {
//                 count: result.length,
//                 result: result
//             }
//         }
//         res.json(response)
//     })

// })

// app.put("/pelanggaran", (req, res) => {
//     let data = [{
//         nama_pelanggaran: req.body.nama_pelanggaran,
//         poin: req.body.poin
//     }, {
//         id_pelanggaran: req.body.id_pelanggaran
//     }]

//     for (p in data[0]) {
//         if (data[0][p] === undefined) {
//             delete data[0][p]
//         }
//     }

//     let sql = "update pelanggaran set ? where ?"
//     db.query(sql, data, (err, result) => {
//         if (err) {
//             respone = {
//                 massage: result.affectedRows + " data updated",
//                 error: err.massage
//             }
//         } else {
//             respone = {
//                 massage: result.affectedRows + " data updated"
//             }
//         }
//         res.json(respone)
//     })


// })

// app.delete("/pelanggaran/:id", (req, res) => {
//     let data = {
//         id_pelanggaran: req.params.id
//     }

//     let sql = "delete from pelanggaran where ?"

//     db.query(sql, data, (err, result) => {
//         if (err) {
//             response = {
//                 massage: result.affectedRows + " data updated",
//                 error: err.massage
//             }
//         } else {
//             response = {
//                 massage: result.affectedRows + " data updated"
//             }
//         }
//         res.json(response)
//     })

// })

//crud user

// app.post("/user", (req, res) => {

//     let data = {
//         nama_user: req.body.nama_user,
//         username: req.body.username,
//         password: md5(req.body.password)
//     }

//     let sql = "insert into user set ?"

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

// app.get("/user", (req, res) => {
//         let data = {
//             id_user: req.query.id
//         }
//         let sql = "select * from user where ?"

//         if (data.id_user === undefined) {
//             sql = "select * from user"
//         }

//         db.query(sql, data, (err, result) => {
//             if (err) {
//                 response = {
//                     error: err.massage
//                 }
//             } else {
//                 response = {
//                     count: result.length,
//                     result: result
//                 }
//             }
//             res.json(response)
//         })

//     })

// app.put("/user", (req, res) => {
//     let data = [{
//         nama_user: req.body.nama_user,
//         username: req.body.username,
//         password: md5(req.body.password)
//     }, {
//         id_user: req.body.id_user
//     }]

//     for (p in data[0]) {
//         if (data[0][p] === undefined) {
//             delete data[0][p]
//         }
//     }

//     let sql = "update user set ? where ?"
//     db.query(sql, data, (err, result) => {
//         if (err) {
//             respone = {
//                 massage: result.affectedRows + " data updated",
//                 error: err.massage
//             }
//         } else {
//             respone = {
//                 massage: result.affectedRows + " data updated"
//             }
//         }
//         res.json(respone)
//     })


// })

// app.delete("/user/:id", (req, res) => {
//     let data = {
//         id_user: req.params.id
//     }
//     let sql = "delete from user where ?"


//     db.query(sql, data, (err, result) => {
//         if (err) {
//             response = {
//                 error: err.massage
//             }
//         } else {
//             response = {

//                 massage: result.affectedRows + " data deleted"
//             }
//         }
//         res.json(response)
//     })

// })

// app.post("/pelanggaran_siswa", (req, res) => {
//     let data = {
//         id_siswa: req.body.id_siswa,
//         id_user: req.body.id_user,
//         waktu: moment().format("YYYY-MM-DD HH-mm-ss")
//     }


//     let pelanggaran = JSON.parse(req.body.id_pelanggaran)

//     let sql = "insert into pelanggaran_siswa set ?"

//     db.query(sql, data, (err, result) => {

//         if (err) {
//             res.json({ massage: err.massage })
//         } else {
//             let data = []
//             let lastID = result.insertId

//             for (let index = 0; index < pelanggaran.length; index++) {
//                 data.push([lastID, pelanggaran[index].id_pelanggaran])
//             }

//             sql = "insert into detail_pelanggaran values ?"
//             db.query(sql, [data], (err, result) => {
//                 if (err) {
//                     res.json({ massage: err.massage })
//                 } else {
//                     res.json({ massage: data })
//                 }
//             })
//         }
//     })

// })

// app.get("/pelanggaran_siswa", (req, res) => {
//     let sql = "select p.id_pelanggaran_siswa,p.id_siswa,p.waktu,s.nis,s.nama_siswa,p.id_user,u.nama_user from pelanggaran_siswa p join siswa s using(id_siswa) join user u using(id_user)"

//     db.query(sql, (err, result) => {
//         if (err) {
//             res.json({ massage: err.massage })
//         } else {
//             res.json({
//                 count: result.length,
//                 result: result
//             })
//         }
//     })
// })

// app.get("/pelanggaran_siswa/:id", (req, res) => {



//     let sql = "select p.nama_pelanggaran,p.poin from detail_pelanggaran join pelanggaran p using(id_pelanggaran) where ?"

//     db.query(sql, { id_pelanggaran_siswa: req.params.id }, (err, result) => {
//         if (err) {
//             res.json({ massage: err.massage })
//         } else {
//             res.json({
//                 count: result.length,
//                 result: result
//             })
//         }
//     })
// })

// app.delete("/pelanggaran_siswa/:id", (req, res) => {
//     let data = {
//         id_pelanggaran_siswa: req.params.id
//     }

//     let sql = "delete from detail_pelanggaran where ?"

//     db.query(sql, data, (err, result) => {
//         if (err) {
//             res.json({ massage: err.massage })
//         } else {
//             sql = "delete from pelanggaran_siswa where ?"
//             db.query(sql, data, (err, result) => {
//                 if (err) {
//                     res.json({ massage: err.massage })
//                 } else {
//                     res.json({ massage: "Data has been deleted" })
//                 }
//             })
//         }
//     })


// })

port()