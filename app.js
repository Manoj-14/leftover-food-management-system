const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
var cookieParser = require("cookie-parser");
const show = require("./public/js/index");
const fetch = require("node-fetch");
const session = require("express-session");
const bcrypt = require("bcrypt-nodejs");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const app = express();
const port = 5000;
const databaseSet = "wfms";

//DB Credentials
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "wfms",
});

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(fileUpload());
app.use(cookieParser());
//DB connection
db.connect((err) => {
  if (err) {
    console.log("Can't connect to DataBase");
  }
  console.log(`Connected to *${databaseSet}* Database`);
});
global.db = db;
//global.ses = session();

//Configuring Middleware
app.set("port", port);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.static("images"));

// routes
const {
  getAdminLogin,
  getNgoLogin,
  getRestLogin,
  guestDonate,
  guestOrder,
  guestReg,
  getAdminAuth,
  getRestAuth,
  restOrd,
  getNgoAuth,
  adminlogOut,
  addReg,
  addNgo,
  restRegAuth,
  ngoRegAuth,
} = require("./routes/login");
const {
  getAdmindash,
  getRestDash,
  getNgoDash,
  adminProfUp,
  ngoRegs,
  restRegs,
  restProfUp,
  ngoProfUp,
} = require("./routes/dashboard");
const {
  restList,
  ngoList,
  orderList,
  logList,
  restLog,
  ngoLog,
} = require("./routes/list");
const {
  ngoAprove,
  adminAprove,
  adminReject,
  delrest,
  delngo,
} = require("./routes/aprove-btns");
// index page
app.all("/", (req, res) => {
  res.render("index.ejs", {
    title: "Leftover food management system",
  });
});

//login pages
app.all("/admin-login", getAdminLogin);
app.all("/ngo-login", getNgoLogin);
app.all("/restaurant-login", getRestLogin);
app.all("/guest-donate", guestDonate);
app.all("/guest-reg", guestReg);
app.all("/AdminAuth", getAdminAuth);
app.all("/restAuth", getRestAuth);
app.all("/ngoAuth", getNgoAuth);
app.all("/logOut", adminlogOut);
app.all("/rest-reg", addReg);
app.all("/ngo-reg", addNgo);
app.all("/rest-reg-auth", restRegAuth);
app.all("/ngo-reg-auth", ngoRegAuth);

//dashboard
app.all("/Admin-profile", getAdmindash);
app.all("/rest-list", restList);
app.all("/ngo-list", ngoList);
app.all("/orders", orderList);
app.all("/history", logList);
app.all("/rest-profile", getRestDash);
app.all("/ngo-profile", getNgoDash);
app.all("/rest-log", restLog);
app.all("/rest-orders", restOrd);
app.all("/ngo-log", ngoLog);
app.all("/ngo-regs", ngoRegs);
app.all("/rest-regs", restRegs);

// aproval
// app.get("/accept", ngoAprove);

app.all("/accept", ngoAprove);
app.all("/acceptOrd", adminAprove);
app.all("/rejectOrd", adminReject);
app.all("/admin-update", adminProfUp);
app.all("/rest-upt", restProfUp);
app.all("/ngo-upt", ngoProfUp);

app.all("/delete-rest", delrest);
app.all("/delete-ngo", delngo);
//Listening Port
app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});
