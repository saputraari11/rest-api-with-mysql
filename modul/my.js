const { app } = require("./main.js")

const data_ins = (url, sql, db, data) => {
    let post = app.post(url, (req, res) => {
        let konten = []
        let input = Object(req.body)
        konten.push(input)
        if (!(data === undefined)) {
            Object.assign(konten[0], data)
        }
        db.query(sql, konten, (err, result) => {
            if (err) {
                res.json({ massage: err.massage })
            } else {
                res.json({ massage: result.affectedRows + " Data inserted" })
            }

        })



    })
    return post

}

const data_put = (url, sql, db, data) => {
    return app.put(url, (req, res) => {
        const konten = new Array()
        const input = Object(req.body)
        const clone = {...input }
        let key = new Array()
        konten.push(input)
        for (k in clone) {
            key.push(k)
        }
        for (i = 0; i < key.length; i++) {
            if (i === key.length - 1) {
                delete konten[0][key[i]]
            } else {
                delete clone[key[i]]
            }
        }
        if (!(data === undefined)) {
            Object.assign(konten[0], data)

        }
        konten.push(clone)

        db.query(sql, konten, (err, result) => {
            if (err) {
                res.json({ massage: err.massage })
            } else {
                res.json({ massage: result.affectedRows + " Data updated" })
            }

        })



    })

}

const data_get = (url, sql, db) => {
    return app.get(url, (req, res) => {
        let input = Object(req.params)

        if (!(input === undefined)) {
            db.query(sql, input, (err, result) => {
                if (err) {
                    res.json({ massage: err.massage })
                } else {
                    res.json({
                        count: result.length,
                        result: result
                    })
                }
            })
        } else {
            db.query(sql, (err, result) => {
                if (err) {
                    res.json({ massage: err.massage })
                } else {
                    res.json({
                        count: result.length,
                        result: result
                    })
                }
            })
        }

    })
}
const data_del = (url, sql, db) => {
    return app.delete(url, (req, res) => {
        let input = Object(req.params)
        db.query(sql, input, (err, result) => {
            if (err) {
                res.json({ massage: err.massage })
            } else {
                res.json({
                    massage: result.affectedRows + " Data deleted"
                })
            }
        })
    })
}
module.exports = { data_ins, data_put, data_get, data_del }