const { cookie } = require("request");

module.exports = {
  getAdminLogin: (req, res) => {
    res.render("login/admin-login.ejs", {
      title: "Admin Login",
      status: false,
    });
  },
  getAdminAuth: (req, res) => {
    var adminUsername = req.body.adminusername;
    var adminPassword = req.body.adminpassword;
    console.log(req.body);
    db.query(
      "Select * from admin where username = ? and password =?",
      [adminUsername, adminPassword],
      (error, results, fields, rows) => {
        if (results != undefined) {
          if (results.length > 0) {
            res.cookie("username", adminUsername);
            res.redirect("/admin-profile");
          } else {
            res.render("login/admin-login.ejs", {
              title: "Admin Login",
              status: "Invaid Credential",
            });
          }
        }
      }
    );
  },

  //Ngo
  getNgoLogin: (req, res) => {
    res.render("login/ngo-login.ejs", {
      title: "Ngo Login",
      status: false,
    });
  },
  getNgoAuth: (req, res) => {
    const ngoEmail = req.body.ngoEmail;
    const ngoPassword = req.body.ngoPassword;
    db.query(
      "select * from ngo where ngo_email = ? and ngo_password=?",
      [ngoEmail, ngoPassword],
      (err, rows) => {
        if (err) {
          console.log(err);
        } else {
          if (rows != undefined) {
            if (rows.length > 0) {
              const ngoLogDet = {
                ngo_email: rows[0].ngo_email,
                ngo_uid: rows[0].ngo_unique_id,
                ngo_name: rows[0].Name,
              };
              res.cookie("ngoDet", ngoLogDet);
              res.redirect("/ngo-profile");
            } else {
              res.render("login/ngo-login.ejs", {
                title: "Ngo Login",
                status: "Invaid Credential",
              });
            }
          }
        }
      }
    );
  },

  //Rest

  getRestLogin: (req, res) => {
    res.render("login/restaurant-login.ejs", {
      title: "Restaurant Login",
      status: false,
    });
  },

  getRestAuth: (req, res) => {
    const restEmail = req.body.restEmail;
    const restPassword = req.body.restPassword;
    db.query(
      "Select * from restaurant where rest_email = ? and rest_password = ?",
      [restEmail, restPassword],
      (error, results, rows, fields) => {
        if (results != undefined) {
          if (results.length > 0) {
            var restLogDet = {
              restEmail: results[0].rest_email,
              restName: results[0].rest_name,
            };
            res.cookie("restDet", restLogDet);
            // res.render("profiles/rest-profile.ejs", {
            //   status: false,
            // });
            res.redirect("/rest-profile");
          } else {
            res.render("login/restaurant-login.ejs", {
              title: "Restaurant Login",
              status: "Invaid Credential",
            });
          }
        }
      }
    );
  },
  restOrd: (req, res) => {
    const restEmail = req.cookies.restDet.restEmail;
    const desc = req.body.discription;
    const quantity = req.body.foodQuantity;
    db.query(
      "Select rest_name, rest_phone , rest_pin from restaurant where rest_email = ?",
      [restEmail],
      (err, rows) => {
        restName = rows[0].rest_name;
        restPhone = rows[0].rest_phone;
        restPin = rows[0].rest_pin;
        db.query(
          "insert into donors set ?",
          {
            Name: restName,
            Phone: restPhone,
            Quantity: quantity,
            Pincode: restPin,
            Email: restEmail,
            desc: desc,
          },
          (err, rows) => {
            if (err) {
              console.log(err);
            } else {
              db.query("SELECT LAST_INSERT_ID() as id", (err, result) => {
                const orderId = result[0].id;
                db.query(
                  "insert into orders set ?",
                  {
                    order_no: orderId,
                  },
                  (err, results) => {
                    res.redirect("/rest-profile");
                  }
                );
              });
            }
          }
        );
      }
    );
  },

  //Guest Login
  guestDonate: (req, res) => {
    res.render("login/guest-don.ejs", {
      title: "Guest Donor",
      stsMsg: false,
    });
  },
  guestReg: (req, res) => {
    const guestName = req.body.donorName;
    const guestNumber = req.body.donorNumber;
    const guestAddr = req.body.donorAddress;
    const donPin = req.body.donorPin;
    const quantity = req.body.foodQuantity;
    const desc = req.body.discription;
    db.query(
      "INSERT INTO guestlogin SET ?  ",
      {
        name: guestName + "(Guest)",
        number: guestNumber,
        address: guestAddr,
        pincode: donPin,
        quantity: quantity,
        description: desc,
      },
      (err, rows) => {
        db.query(
          "insert into donors set ?",
          {
            Name: guestName + "(Guest)",
            Phone: guestNumber,
            Quantity: quantity,
            Pincode: donPin,
            // Email: restEmail,
            desc: desc,
          },
          (err, results) => {
            if (err) {
              console.log(err);
            } else {
              db.query("SELECT LAST_INSERT_ID() as id", (err, result) => {
                const orderId = result[0].id;
                db.query(
                  "insert into orders set ?",
                  {
                    order_no: orderId,
                  },
                  (err, results) => {
                    res.render("login/guest-don.ejs", {
                      title: "Guest Donor",
                      stsMsg: "Sent Successfully",
                    });
                  }
                );
              });
            }
          }
        );
      }
    );
  },
  adminlogOut: (req, res) => {
    res.clearCookie("username");
    res.redirect("admin-login");
  },
  restlogOut: (req, res) => {
    res.clearCookie("restDet");
    res.redirect("restaurant-login");
  },
  ngologOut: (req, res) => {
    res.clearCookie("ngoDet");
    res.redirect("ngo-login");
  },
  addReg: (req, res) => {
    db.query(
      "insert into restaurant set ?",
      {
        rest_name: req.body.restName,
        rest_email: req.body.restEmail,
        rest_phone: req.body.restNumber,
        rest_loc: req.body.restAddress,
        rest_pin: req.body.restPin,
      },
      (err, results) => {
        if (err) {
          if (err.code == "ER_DUP_ENTRY") {
            res.send(
              "<script>alert('Email already exist');window.location.href = '/rest-list';</script>"
            );
          } else {
            throw err;
          }
        } else {
          res.redirect("rest-list");
        }
      }
    );
  },
  addNgo: (req, res) => {
    db.query(
      "insert into ngo set ?",
      {
        Name: req.body.ngoName,
        ngo_unique_id: req.body.ngoUid,
        ngo_address: req.body.ngoAddress,
        ngo_pincode: req.body.ngoPin,
        ngo_email: req.body.ngoEmail,
        ngo_phone: req.body.ngoNumber,
      },
      (err, results) => {
        if (err) {
          if (err.code == "ER_DUP_ENTRY") {
            res.send(
              "<script>alert('UID already exist');window.location.href = '/ngo-list';</script>"
            );
          } else {
            throw err;
          }
        } else {
          res.redirect("ngo-list");
        }
      }
    );
  },
  ngoRegs: (req, res) => {
    res.render("login/guest-don.ejs", {
      title: "Guest Donor",
      stsMsg: false,
    });
  },
  restRegAuth: (req, res) => {
    console.log(req.body);
    const {
      restName,
      restNumber,
      restAddress,
      restPin,
      restEmail,
      restPass,
      restCnf,
    } = req.body;
    if (restPass == restCnf) {
      // res.json({ sent: req.body });
      db.query(
        "insert into restaurant set ?",
        {
          rest_name: restName,
          rest_email: restEmail,
          rest_phone: restNumber,
          rest_loc: restAddress,
          rest_pin: restPin,
          rest_password: restCnf,
        },
        (err, results) => {
          if (err) {
            if (err.code == "ER_DUP_ENTRY") {
              res.render("regs-form/rest-reg-form.ejs", {
                title: "Restaurent Registration",
                stsMsg: "Email ID Already Exist",
              });
            } else {
              throw err;
            }
          } else {
            res.render("regs-form/rest-reg-form.ejs", {
              title: "Restaurent Registration",
              stsMsg: "Regestration Successfull",
            });
          }
        }
      );
    }
  },
  ngoRegAuth: (req, res) => {
    const {
      restName,
      uid,
      restNumber,
      restAddress,
      restPin,
      restEmail,
      restPass,
      restCnf,
    } = req.body;
    if (restPass == restCnf) {
      // res.json({ sent: req.body });
      db.query(
        "insert into ngo set ?",
        {
          Name: restName,
          ngo_unique_id: uid,
          ngo_email: restEmail,
          ngo_phone: restNumber,
          ngo_address: restAddress,
          ngo_pincode: restPin,
          ngo_password: restCnf,
        },
        (err, results) => {
          if (err) {
            if (err.code == "ER_DUP_ENTRY") {
              res.render("regs-form/ngo-reg-form.ejs", {
                title: "NGO Registration",
                stsMsg: "UID Exist",
              });
            } else {
              throw err;
            }
          } else {
            res.render("regs-form/ngo-reg-form.ejs", {
              title: "NGO Registration",
              stsMsg: "Regestration Successfull",
            });
          }
        }
      );
    }
  },
};
