const { moment, crypto, app, md5, path, fs } = require("./main")
const { koneksi } = require("./koneksi")
const { upload } = require("./../file/image")
const { isDate } = require("util")
const { define } = require("mime")

const db = koneksi("penyewaan_mobil")

const different_days = (start, end, harga) => {
    let date_start = moment(start, "YYYY-MM-DD HH:mm:ss")
    let date_end = moment(end, "YYYY-MM-DD HH:mm:ss")
    let total = (date_end.diff(date_start, "days")) * harga

    return total
}
const registrasi_pelanggan = (link) => {
    return app.post(link, (req, res) => {
        let data = {
            id_pelanggan: req.body.id_pelanggan,
            nama_pelanggan: req.body.nama_pelanggan,
            alamat_pelanggan: req.body.alamat_pelanggan,
            kontak: req.body.kontak
        }
        let sql = "insert into pelanggan set ?"

        db.query(sql, data, (err, result) => {
            if (err) throw err
            res.json({ massage: result.affectedRows + " has been inserted" })
        })

    })
}
const registrasi_mobil = (link) => {
    return app.post(link, upload.single("image"), (req, res) => {
        if (!req.file) {
            res.json({
                massage: "File not send"
            })
        } else {
            let data = {
                id_mobil: req.body.id_mobil,
                nomor_mobil: req.body.nomor_mobil,
                merk: req.body.merk,
                jenis: req.body.jenis,
                warna: req.body.warna,
                tahun_pembuatan: req.body.tahun_pembuatan,
                biaya_sewa_per_hari: req.body.biaya_sewa_per_hari,
                image: req.file.filename

            }
            let sql = "insert into mobil set ?"

            db.query(sql, data, (err, result) => {
                if (err) throw err
                res.json({ massage: result.affectedRows + " has been inserted" })
            })
        }
    })
}
const registrasi_karyawan = (link) => {
    return app.post(link, (req, res) => {
        let data = {
            id_karyawan: req.body.id_karyawan,
            nama_karyawan: req.body.nama_karyawan,
            alamat_karyawan: req.body.alamat_karyawan,
            kontak: req.body.kontak,
            username: req.body.username,
            password: md5(req.body.password)
        }
        let sql = "insert into karyawan set ?"

        db.query(sql, data, (err, result) => {
            if (err) throw err

            res.json({ massage: result.affectedRows + " has been inserted" })
        })

    })
}
const getInfo_pelanggan = (link, valid) => {
    return app.get(link, (req, res) => {
        let data = null
        let sql = null
        if (Object(req.params) === undefined) {
            data = { id_pelanggan: req.params.id_pelanggan }
            sql = "select * from pelanggan where ?"
            db.query(sql, data, (err, result) => {
                if (err) throw err
                res.json({ count: result.count, result: result })
            })
        } else {
            sql = "select * from pelanggan"
            db.query(sql, (err, result) => {
                if (err) throw err
                res.json({ count: result.count, result: result })
            })
        }
    })
}
const getInfo_karyawan = (link, valid) => {
    return app.get(link, (req, res) => {
        let data = null
        let sql = null
        if (Object(req.params) === undefined) {
            data = { id_karyawan: req.params.id_karyawan }
            sql = "select * from karyawan where ?"
            db.query(sql, data, (err, result) => {
                if (err) throw err
                res.json({ count: result.count, result: result })
            })
        } else {
            sql = "select * from karyawan"
            db.query(sql, (err, result) => {
                if (err) throw err

                res.json({ count: result.count, result: result })
            })
        }
    })
}
const getInfo_mobil = (link, valid) => {
    return app.get(link, (req, res) => {
        let data = null
        let sql = null
        if (Object(req.params) === undefined) {
            data = { id_mobil: req.params.id_mobil }
            sql = "select * from mobil where ?"
            db.query(sql, data, (err, result) => {
                if (err) throw err
                res.json({ count: result.count, result: result })
            })
        } else {
            sql = "select * from mobil"
            db.query(sql, (err, result) => {
                if (err) throw err
                res.json({ count: result.count, result: result })
            })
        }
    })
}
const edit_pelanggan = (link, valid) => {
    return app.put(link, (req, res) => {
        let data = [{
            nama_pelanggan: req.body.nama_pelanggan,
            alamat_pelanggan: req.body.alamat_pelanggan,
            kontak: req.body.kontak
        }, {
            id_pelanggan: req.body.id_pelanggan
        }]
        for (x in data[0]) {
            if (data[0][x] === undefined) {
                delete data[0][x]
            }
        }
        let sql = "update pelanggan set ? where ?"

        db.query(sql, data, (err, result) => {
            if (err) throw err
            res.json({ massage: result.affectedRows + " has been updated" })
        })
    })
}
const edit_karyawan = (link, valid) => {
    return app.put(link, (req, res) => {
        let data = [{
            nama_karyawan: req.body.nama_karyawan,
            alamat_karyawan: req.body.alamat_karyawan,
            kontak: req.body.kontak,
            username: req.body.username,
            password: req.body.password
        }, {
            id_karyawan: req.body.id_karyawan
        }]
        for (x in data[0]) {
            if (data[0][x] === undefined) {
                delete data[0][x]
            }
        }
        if (data[0].password !== undefined) {
            data[0].password = md5(data[0].password)
        }
        let sql = "update karyawan set ? where ?"

        db.query(sql, data, (err, result) => {
            if (err) throw err
            res.json({ massage: result.affectedRows + " has been updated" })
        })
    })
}
const edit_mobil = (link, valid) => {
    return app.put(link, upload.single("image"), (req, res) => {
        let sql = null
        let data = null
        let id_mobil = req.body.id_mobil


        if (req.file) {
            sql = "select * from mobil where ?"
            db.query(sql, { id_mobil: id_mobil }, (err, result) => {
                if (err) throw err
                let filename = result[0].image
                let dir = path.join(__dirname, "..", "file", "image", filename)
                fs.unlink(dir, (error) => {})
            })
        }
        data = [{
            nomor_mobil: req.body.nomor_mobil,
            merk: req.body.merk,
            jenis: req.body.jenis,
            warna: req.body.warna,
            tahun_pembuatan: req.body.tahun_pembuatan,
            biaya_sewa_per_hari: req.body.biaya_sewa_per_hari,
            image: req.file.filename
        }, {
            id_mobil: id_mobil
        }]
        for (x in data[0]) {
            if (data[0][x] === undefined) {
                delete data[0][x]
            }
        }
        sql = "update mobil set ? where ?"

        db.query(sql, data, (err, result) => {
            if (err) throw err
            res.json({ massage: result.affectedRows + " has been updated" })
        })
    })
}
const delete_pelanggan = (link, valid) => {
    return app.delete(link, (req, res) => {
        let data = {
            id_pelanggan: req.params.id_pelanggan
        }
        let sql = "delete from pelanggan where ?"
        db.query(sql, data, (err, result) => {
            if (err) throw err
            res.json({ massage: result.affectedRows + " has been deleted" })

        })
    })
}
const delete_karyawan = (link, valid) => {
    return app.delete(link, (req, res) => {
        let data = {
            id_karyawan: req.params.id_karyawan
        }
        let sql = "delete from karyawan where ?"
        db.query(sql, data, (err, result) => {
            if (err) throw err
            res.json({ massage: result.affectedRows + " has been deleted" })

        })
    })
}
const delete_mobil = (link, valid) => {
    return app.delete(link, (req, res) => {
        let sql = null
        let data = {
            id_mobil: req.params.id_mobil
        }
        sql = "select * from mobil where ?"
        db.query(sql, data, (err, result) => {
            let filename = result[0].image
            let dir = path.join(__dirname, "..", "file", "image", filename)
            fs.unlink(dir, (error) => {})
        })
        sql = "delete from mobil where ?"

        db.query(sql, data, (err, result) => {
            if (err) throw err
            res.json({ massage: result.affectedRows + " has been deleted" })

        })
    })
}
const input_sewa = (link) => {
    return app.post(link, (req, res) => {
        let data = null
        let sql = null
        data = {
            id_sewa: req.body.id_sewa,
            id_karyawan: req.body.id_karyawan,
            id_pelanggan: req.body.id_pelanggan,
            tgl_sewa: moment().format("YYYY-MM-DD HH:mm:ss")

        }
        let id_mobil = req.body.id_mobil


        sql = "insert into sewa set ?"

        db.query(sql, data, (err, result) => {
            if (err) throw err

            let lastid = data.id_sewa

            data = { id_sewa: lastid, id_mobil: id_mobil }

            sql = "insert into kembali set ?"

            db.query(sql, data, (err, result) => {
                if (err) throw err

                res.json({ massage: result.affectedRows + " Data has been inserted" })
            })

        })

    })
}


const input_kembali = (link) => {
    return app.put(link, (req, res) => {
        let sql, data, tgl_kembali = null
        var harga, tgl_sewa = null
        tgl_kembali = moment().format("YYYY-MM-DD HH:mm:ss")
        data = { id_sewa: req.body.id_sewa }

        sql = "select m.biaya_sewa_per_hari as biaya from kembali k join mobil m using(id_mobil) where k.?"

        db.query(sql, data, (err, result) => {
            if (err) throw err
            harga = result[0].biaya

            sql = "select s.tgl_sewa as tanggal from kembali k join sewa s using(id_sewa) where k.?"

            db.query(sql, data, (err, result) => {
                if (err) throw err
                tgl_sewa = result[0].tanggal

                data = [{
                    tgl_kembali: tgl_kembali,
                    total_bayar: different_days(tgl_sewa, tgl_kembali, harga)
                }, { id_sewa: req.body.id_sewa }]

                sql = "update kembali set ? where ?"
                db.query(sql, data, (err, result) => {
                    if (err) throw err

                    res.json({ massage: result.affectedRows + " has been updated" })
                })

            })
        })
    })
}
const getInfo_sewa = (link, valid) => {
    return app.get(link, (req, res) => {
        let data, sql, tgl_sewa, harga, tgl_kembali = null

        data = { id_sewa: req.body.id_sewa }

        sql = "select m.biaya_sewa_per_hari as biaya,s.tgl_sewa as tanggal from kembali k join mobil m using(id_mobil) join sewa s using(id_sewa) where k.?"

        db.query(sql, data, (err, result) => {
            if (err) throw err
            tgl_sewa = moment(result[0].tanggal).format("YYYY-MM-DD HH:mm:ss").toString()
            harga = result[0].biaya
            tgl_kembali = moment().format("YYYY-MM-DD HH:mm:ss").toString()

            data = [{
                total_bayar: null
            }, { id_sewa: req.body.id_sewa }]

            data[0].total_bayar = different_days(tgl_sewa, tgl_kembali, harga)

            sql = "update kembali set ? where ? and tgl_kembali IS null"

            db.query(sql, data, (err, result) => {
                if (err) throw err
            })

        })




        if (Object(req.params) === undefined) {
            data = [{ id_sewa: req.params.id_sewa }, { tgl_kembali: null }]
            sql = "select s.id_sewa,m.nomor_mobil,s.tgl_sewa,k.tgl_kembali,k.total_bayar from sewa s join kembali k using(id_sewa) join mobil m using(id_mobil) where s.? and k.?"
            db.query(sql, data, (err, result) => {
                if (err) throw err
                res.json({ count: result.count, result: result })
            })
        } else {
            sql = "select s.id_sewa,m.nomor_mobil,s.tgl_sewa,k.tgl_kembali,k.total_bayar from sewa s join kembali k using(id_sewa) join mobil m using(id_mobil) where k.tgl_kembali IS null"
            db.query(sql, (err, result) => {
                result[0].tgl_sewa = moment(result[0].tgl_sewa).format("YYYY-MM-DD HH:mm:ss")
                if (err) throw err
                res.json({ count: result.count, result: result })
            })
        }
    })
}
const getInfo_kembali = (link, valid) => {
    return app.get(link, (req, res) => {
        let data = null
        let sql = null


        if (Object(req.params) === undefined) {
            data = { id_sewa: req.params.id_sewa }
            sql = "select s.id_sewa,k.id_mobil,s.tgl_sewa,k.tgl_kembali,k.total_bayar from sewa s join kembali k using(id_sewa) where k.?"
            db.query(sql, data, (err, result) => {
                if (err) throw err
                res.json({ count: result.count, result: result })
            })
        } else {
            sql = "select s.id_sewa,k.id_mobil,s.tgl_sewa,k.tgl_kembali,k.total_bayar from sewa s join kembali k using(id_sewa)"
            db.query(sql, (err, result) => {
                if (err) throw err
                result[0].tgl_sewa = moment(result[0].tgl_sewa).format("YYYY-MM-DD HH:mm:ss")
                result[0].tgl_kembali = moment(result[0].tgl_kembali).format("YYYY-MM-DD HH:mm:ss")
                res.json({ count: result.count, result: result })
            })
        }
    })
}
const update_sewa = (link) => {
    return app.put(link, (req, res) => {
        let sql = null
        let data = [{
            id_pelanggan: req.body.id_pelanggan,
            id_karyawan: req.body.id_karyawan,
            tgl_sewa: req.body.tgl_sewa
        }, {
            id_sewa: req.body.id_sewa
        }]
        for (x in data[0]) {
            if (data[0][x] === undefined) {
                delete data[0][x]
            }
        }
        if (data[0].tgl_sewa !== undefined) {
            let tgl_kembali, harga = null

            sql = "select k.tgl_kembali,m.biaya_sewa_per_hari as harga from kembali k join mobil m using(id_mobil) where k.? or k.tgl_kembali IS NOT null "
            db.query(sql, data[1], (err, result) => {
                if (err) throw err
                if (result[0].tgl_kembali != null) {
                    tgl_kembali = result[0].tgl_kembali
                    harga = result[0].harga

                    sql = "update kembali set ? where ?"
                    db.query(sql, [{ total_bayar: different_days(data[0].tgl_sewa, tgl_kembali, harga) }, data[1]], (err, result) => {
                        if (err) throw err
                    })
                } else {
                    harga = result[0].harga
                    tgl_kembali = moment().format("YYYY-MM-DD HH:mm:ss")

                    sql = "update kembali set ? where ?"
                    db.query(sql, [{ total_bayar: different_days(data[0].tgl_sewa, tgl_kembali, harga) }, data[1]], (err, result) => {
                        if (err) throw err
                    })
                }
            })

        }
        sql = "update sewa set ? where ?"

        db.query(sql, data, (err, result) => {
            if (err) throw err
            res.json({ massage: result.affectedRows + " has been updated" })
        })
    })
}
const update_kembali = (link) => {
    return app.put(link, (req, res) => {
        let sql, id_mobil, tgl_kembali, harga, tgl_sewa = null
        let data = [{
            id_mobil: req.body.id_mobil,
            tgl_kembali: req.body.tgl_kembali,
            total_bayar: null
        }, {
            id_sewa: req.body.id_sewa
        }]
        sql = "select m.id_mobil,m.biaya_sewa_per_hari as harga,k.tgl_kembali as kembali,s.tgl_sewa as sewa from kembali k join sewa s using(id_sewa) join mobil m using(id_mobil) where k.? and k.tgl_kembali IS NOT null"
        db.query(sql, data[1], (err, result) => {
            if (err) throw err
            harga = result[0].harga
            tgl_sewa = moment(result[0].id_sewa).format("YYYY-MM-DD HH:mm:ss").toString()
            id_mobil = result[0].id_mobil
            tgl_kembali = moment(result[0].tgl_kembali).format("YYYY-MM-DD HH:mm:ss").toString()

            for (x in data[0]) {
                if (data[0][x] === undefined) {
                    delete data[0][x]
                }
            }
            if (data[0].id_mobil === undefined) {
                data[0].total_bayar = different_days(tgl_sewa, data[0].tgl_kembali, harga)
                data[0].id_mobil = id_mobil
                sql = "update kembali set ? where ?"
                console.log(data[0].total_bayar)
                db.query(sql, data, (err, result) => {
                    if (err) throw err
                    res.json({ massage: result.affectedRows + " has been updated" })
                })
            } else if (data[0].tgl_kembali === undefined) {
                sql = "select m.biaya_sewa_per_hari as harga from mobil m join kembali k using(id_mobil) where k.?"
                db.query(sql, data[1], (err, result) => {
                    if (err) throw err
                    harga = result[0].harga

                    data[0].tgl_kembali = tgl_kembali
                    data[0].total_bayar = different_days(tgl_sewa, tgl_kembali, harga)

                    sql = "update kembali set ? where ?"

                    db.query(sql, data, (err, result) => {
                        if (err) throw err
                        res.json({ massage: result.affectedRows + " has been updated" })
                    })
                })


            } else {
                sql = "select biaya_sewa_per_hari as harga from mobil where ?"
                db.query(sql, { id_mobil: data[0][id_mobil] }, (err, result) => {
                    if (err) throw err
                    harga = result[0].harga
                    tgl_kembali = data[0].tgl_kembali
                    data[0].total_harga = different_days(tgl_sewa, tgl_kembali, harga)
                    sql = "update kembali set ? where ?"

                    db.query(sql, data, (err, result) => {
                        if (err) throw err
                        res.json({ massage: result.affectedRows + " has been updated" })
                    })
                })

            }
        })

    })
}
const hapus_penyewaan = (link) => {
    return app.delete(link, (req, res) => {
        let sql = null
        let data = { id_sewa: req.params.id_sewa }

        sql = "delete from sewa where ?"

        db.query(sql, data, (err, result) => {
            if (err) throw err

            sql = "delete from kembali where ?"

            db.query(sql, data, (err, result) => {
                if (err) throw err
            })
            res.json({ massage: result.affectedRows + " has been deleted" })
        })
    })
}

module.exports = { input_sewa, input_kembali, registrasi_pelanggan, registrasi_karyawan, registrasi_mobil, getInfo_karyawan, getInfo_kembali, getInfo_mobil, getInfo_pelanggan, getInfo_sewa, edit_karyawan, edit_mobil, edit_pelanggan, update_sewa, update_kembali, delete_karyawan, delete_mobil, delete_pelanggan, hapus_penyewaan }