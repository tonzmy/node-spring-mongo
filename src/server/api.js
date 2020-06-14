import {Router} from 'express'
import C from '../constants'
import {v4} from 'uuid'
import fs from 'fs'
import path from 'path'

let rawdata = fs.readFileSync(path.join(__dirname, '../data/session.json'))
let sessions = JSON.parse(rawdata)

const writeFile = () => {
  fs.writeFile(path.join(__dirname, '../data/session.json'),
  JSON.stringify(sessions),
  error => (error)? console.log("Error saving state!", error) : null
  )
}

const router = Router()

// const ResponseAction = (req, res, action) => {
//   if (req.body.username == req.body.password) {
//     res.status(200).json(action)
//   } else {
//     res.status(200).json({})
//   }
// }

router.get("/test", (req, res, next) => {
  console.log("cookie: ", req.cookies["_uuid"])
  if (req.cookies["_uuid"] !== null && req.cookies["_uuid"] !== undefined) {
    let cookie_list = req.cookies["_uuid"].split('&')
    let cookie_token = cookie_list[0]
    let cookie_username = cookie_list[1]
    let local = sessions["session"].filter(c => Object.keys(c)[0] == cookie_username)
    console.log("local", local)
    // console.log(cookie_username)
    // console.log(sessions["session"][cookie_username])
    // console.log(cookie_token)
    // console.log(sessions["session"][cookie_username] === cookie_token)
    if (local.length != 0 && local[0][cookie_username] === cookie_token) {
      next()
    }
    else {
      res.redirect("/login")
      return
    }
  } else {
    res.redirect("/login")
    return
  }
})

router.get("/login", (req, res, next) => {
  console.log("cookies:", req.cookies)
  console.log(sessions)
  if (req.cookies["_uuid"]!==null && req.cookies["_uuid"] !== undefined) {
    let cookie_list = req.cookies["_uuid"].split('&')
    let cookie_token = cookie_list[0]
    let cookie_username = cookie_list[1]
    let local = sessions["session"].filter(c => Object.keys(c)[0] == cookie_username)
    if (local.length != 0 && local[0][cookie_username] === cookie_token) {
      res.redirect("/")
      return
    } else {
      next()
    }
  }
  next()
})

// isLogin -1 => not login; 0 => password is wrong; token => success
router.post("/api/login", (req, res) => {
  if (req.cookies["_uuid"]) {
    res.redirect("/")
    return
  } else {
    if (req.body.username === req.body.password) {
      let token = v4()
      let obj = {}
      obj[req.body.username] = token
      let username = req.body.username
      let local = sessions["session"].filter(c => Object.keys(c)[0] == req.body.username)
      if (local.length != 0) {
        sessions["session"] = sessions["session"].map(s => {
          if (Object.keys(s)[0] == req.body.username)
            {
              return obj
            } else {
              return s
            }
          })
      } else {
        sessions["session"].push(obj)
      }
      // sessions["session"][token] = req.body.username
      writeFile()
      token = token + "&" + `${req.body.username}`
      res.cookie('_uuid', token, { httpOnly: false, maxAge: 900000 })
      res.status(200).json({
        type: C.LOGIN,
        isLogin: token
      })
    } else {
      res.status(200).json({
        type: C.LOGIN,
        isLogin: 0
      })
    }
  }
  }
)

router.get("/api/logout", (req, res) => {
  if (req.cookies["_uuid"] == null || req.cookies["_uuid"] == undefined) {
    res.redirect("/")
    return
  }
  // get cookies
  let cookie_list = req.cookies["_uuid"].split('&')
  let cookie_token = cookie_list[0]
  let cookie_username = cookie_list[1]
  // filter out session
  sessions["session"] = sessions["session"].filter(s => Object.keys(s)[0] !== cookie_username)
  writeFile()
  // clear browser cookie
  res.cookie('_uuid', '', {maxAge: 0})
  res.status(200).json({
    type: C.LOGOUT,
    isLogin: -1
  })
  // res.redirect('/')
})

export default router
