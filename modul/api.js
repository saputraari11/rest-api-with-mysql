const { crypt, app, md5 } = require("./main")
const { db } = require("./index")

app.post("/user/auth", (req, res) => {
    let params = [
        req.body.username,
        md5(req.body.password)
    ]
    let sql = "select * from user where username = ? and password = ?"
    db.query(sql, params, (err, result) => {
        if (err) throw err

        if (result.length > 0) {
            res.json({
                massage: "Logged",
                token: crypt.encrypt(result[0].id_user),
                result: result

            })
        } else {
            res.json({
                massage: "Invalid username/password"
            })
        }
    })
})

const valid = () => {
    return (req, res, next) => {
        if (!(req.get("Token"))) {
            res.json({ massage: "Access Forbidden" })
        } else {
            const token = req.get("Token")

            const decrypt = crypt.decrypt(token)

            let sql = "select * from user where ?"

            let params = { id_user: decrypt }

            db.query(sql, params, (err, result) => {
                if (err) throw err

                if (result.length > 0) {
                    next()
                } else {
                    res.json({ massage: "Invalid Token" })
                }
            })
        }
    }
}
app.get("/siswa", valid(), (req, res, next) => {

    let sql = "select * from siswa"


    db.query(sql, (error, result) => {
        let response = null

        if (error) {
            response = {
                massage: error.massage
            }
        } else {
            response = {
                count: result.count,
                result: result
            }
        }
        res.json(response)
    })
})