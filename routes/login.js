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
              status: "Invaid Cresidentials",
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
                status: "Invaid Cresidentials",
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
            res.redirect("/rest-profile");
          } else {
            res.render("login/restaurant-login.ejs", {
              title: "Restaurant Login",
              status: "Bad cresidential",
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
        db.query("insert into donors set ?", {
          Name: restName,
          Phone: restPhone,
          Quantity: quantity,
          Pincode: restPin,
          Email: restEmail,
          desc: desc,
        });
        db.query(
          "insert into orders set ?",
          {
            Name: restName,
            Phone: restPhone,
            Quantity: quantity,
            Pincode: restPin,
            email: restEmail,
          },
          (err, results) => {
            res.redirect("/rest-profile");
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
    db.query("INSERT INTO guestlogin SET ?  ", {
      name: guestName + "(Guest)",
      number: guestNumber,
      address: guestAddr,
      pincode: donPin,
      quantity: quantity,
      description: desc,
    });
    db.query("INSERT INTO orders set ?", {
      name: guestName,
      phone: guestNumber,
      pincode: donPin,
      quantity: quantity,
    });
    res.render("login/guest-don.ejs", {
      title: "Guest Donor",
      stsMsg: "Sent Successfully",
    });
  },
  adminlogOut: (req, res) => {
    res.clearCookie("username");
    res.redirect("admin-login");
  },
};
