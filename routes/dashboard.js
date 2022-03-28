module.exports = {
  getAdmindash: (req, res) => {
    console.log(req.cookies);
    if (req.cookies.username == undefined) {
      res.render("login/admin-login.ejs", {
        title: "Admin Login",
        status: "Please login again",
      });
    } else {
      adminUser = req.cookies.username;
      db.query(
        "Select * from admin where username  = ?",
        [adminUser],
        (err, rows) => {
          if (err) {
            console.log(err);
          } else {
            console.log(rows[0]);
            res.render("profiles/admin-profile.ejs", {
              title: "admin Dashboard || Profile",
              adminUsername: rows[0].username,
              adminName: rows[0].name,
              adminEmail: rows[0].email,
              adminPhone: rows[0].pho_no,
              adminPassword: rows[0].password,
              adminAddr: rows[0].address,
              adminImg: rows[0].img_path,
              nav_stat: "admin-prof",
              admin_prof: true,
              nav_title: "Profile",
              rest_prof: false,
              ngo_prof: false,
              uptMsg: false,
            });
          }
        }
      );
    }
  },
  getRestDash: (req, res) => {
    if (req.cookies.restDet == undefined) {
      res.render("login/restaurant-login.ejs", {
        title: "Restaurant Login",
        status: "Please login again",
      });
    } else {
      restName = req.cookies.restDet.restName;
      restEmail = req.cookies.restDet.restEmail;
      db.query(
        "Select * from restaurant where rest_email = ? and rest_name = ?",
        [restEmail, restName],
        (err, rows) => {
          if (err) {
            console.log(err);
          }
          res.render("profiles/rest-profile.ejs", {
            title: "Restaurant Profile || Dashboard",
            admin_prof: false,
            rest_prof: true,
            ngo_prof: false,
            status: false,
            nav_title: "Restaurant dashboard",
            restName: rows[0].rest_name,
            restEmail: rows[0].rest_email,
            restPhone: rows[0].rest_phone,
            restLoc: rows[0].rest_loc,
            restPin: rows[0].rest_pin,
            nav_stat: "rest-prof",
          });
        }
      );
    }
  },
  getNgoDash: (req, res) => {
    if (req.cookies.ngoDet == undefined) {
      res.render("login/ngo-login.ejs", {
        title: "Ngo Login",
        status: "Please login again",
      });
    } else {
      ngoUid = req.cookies.ngoDet.ngo_uid;
      ngoEmail = req.cookies.ngoDet.ngo_email;
      db.query(
        "select * from ngo where ngo_unique_id = ?",
        [ngoUid],
        (err, results) => {
          if (err) {
            console.log(err);
          }
          db.query(
            "select O.ordered_date,O.order_no,D.desc ,O.status ,D.Name ,D.Phone , D.Pincode,D.Quantity from donors D,orders O WHERE D.SEND_ID = O.order_no and O.status = ?",
            ["waiting for NGO"],
            (err, rows) => {
              console.log(rows);
              res.render("profiles/ngo-profile.ejs", {
                title: "NGO Dashboard",
                ngoUid: results[0].ngo_unique_id,
                ngoName: results[0].Name,
                ngoEmail: results[0].ngo_email,
                ngoPhone: results[0].ngo_phone,
                ngoLoc: results[0].ngo_address,
                ngoPin: results[0].ngo_pincode,
                length: rows.length,
                nav_stat: "ngo-prof",
                nav_title: "NGO Dashboard",
                admin_prof: false,
                rest_prof: false,
                ngo_prof: true,
                rows,
              });
            }
          );
        }
      );
    }
  },
  adminProfUp: (req, res) => {
    const adminUsername = req.body.adminUsername;
    const adminName = req.body.adminName;
    const adminEmail = req.body.adminEmail;
    const adminPhone = req.body.adminPhone;
    const adminAddr = req.body.adminAddr;
    const adminPass = req.body.adminPass;
    console.log(req);
    try {
      db.query(
        "SELECT * FROM admin where username = ?",
        [adminUsername],
        async (error, rows) => {
          if (
            adminUsername == rows[0].username &&
            adminName == rows[0].name &&
            adminEmail == rows[0].email &&
            adminPhone == rows[0].pho_no &&
            adminAddr == rows[0].address &&
            adminPass == rows[0].password
          ) {
            res.render("profiles/admin-profile.ejs", {
              title: "admin Dashboard || Profile",
              adminUsername: rows[0].username,
              adminName: rows[0].name,
              adminEmail: rows[0].email,
              adminPhone: rows[0].pho_no,
              adminPassword: rows[0].password,
              adminAddr: rows[0].address,
              adminImg: rows[0].img_path,
              nav_stat: "admin-prof",
              admin_prof: true,
              nav_title: "Profile",

              rest_prof: false,
              ngo_prof: false,
              uptMsg: false,
            });
          } else {
            db.query(
              "update admin set name=? ,email =?,pho_no=?,password=?,address=? where username=?",
              [
                adminName,
                adminEmail,
                adminPhone,
                adminPass,
                adminAddr,
                adminUsername,
              ],
              async (error, selresults) => {
                if (error) {
                  console.log(error);
                }
              }
            );
            db.query(
              "SELECT * FROM admin where username = ?",
              [adminUsername],
              (error, rows) => {
                if (error) {
                  console.log(error);
                }
                res.render("profiles/admin-profile.ejs", {
                  title: "admin Dashboard || Profile",
                  adminUsername: rows[0].username,
                  adminName: rows[0].name,
                  adminEmail: rows[0].email,
                  adminPhone: rows[0].pho_no,
                  adminPassword: rows[0].password,
                  adminAddr: rows[0].address,
                  admin_prof: true,
                  adminImg: rows[0].img_path,
                  nav_stat: "admin-prof",
                  nav_title: "Profile",
                  rest_prof: false,
                  ngo_prof: false,
                  uptMsg: "Updated Successfully",
                });
              }
            );
          }
        }
      );

      // console.log(req.url);
    } catch (err) {
      console.log(err);
    }
  },
  ngoRegs: (req, res) => {
    res.render("regs-form/ngo-reg-form.ejs", {
      title: "Ngo Registration",
      stsMsg: false,
    });
  },
  restRegs: (req, res) => {
    res.render("regs-form/rest-reg-form.ejs", {
      title: "Ngo Registration",
      stsMsg: false,
    });
  },
  restProfUp: (req, res) => {
    // console.log(req.body);
    db.query(
      "select * from restaurant where rest_email =?",
      [req.body.restEmail],
      (err, rows) => {
        if (err) {
          console.log(err);
        } else {
          console.log(rows[0]);
          console.log(req.body);
          console.log(req.body.restName === rows[0].rest_name);

          if (
            req.body.restName.trim() == rows[0].rest_name &&
            req.body.restNumber.trim() == rows[0].rest_phone &&
            req.body.restAddress.trim() == rows[0].rest_loc &&
            req.body.restPin.trim() == rows[0].rest_pin
          ) {
            res.redirect("rest-list");
          } else {
            db.query(
              "update restaurant set rest_name=? , rest_phone=?,rest_loc=?,rest_pin=? where rest_email=?",
              [
                req.body.restName.trim(),
                req.body.restNumber.trim(),
                req.body.restAddress.trim(),
                req.body.restPin.trim(),
                req.body.restEmail.trim(),
              ],
              (err, results) => {
                res.redirect("rest-list");
                // res.render("profiles\rest-profile.ejs", {
                //   status: "Thank you for food",
                // });
              }
            );
          }
        }
      }
    );
  },
  ngoProfUp: (req, res) => {
    db.query(
      "select Name,ngo_unique_id,ngo_address,ngo_pincode,ngo_email,ngo_phone from ngo where ngo_unique_id =?",
      [req.body.ngoUid],
      (err, rows) => {
        if (err) {
          console.log(err);
        } else {
          console.log(rows);
          const { ngoName, ngoUid, ngoNumber, ngoAddress, ngoPin } = req.body;
          console.log(req.body.ngoName);
          const {
            Name,
            ngo_unique_id,
            ngo_address,
            ngo_pincode,
            ngo_email,
            ngo_phone,
          } = rows[0];
          if (
            Name == ngoName.trim() &&
            ngo_address == ngoAddress.trim() &&
            ngo_pincode == ngoPin.trim() &&
            ngo_phone == ngoNumber.trim()
          ) {
            console.log(ngoName == Name);
            res.redirect("ngo-list");
          } else {
            db.query(
              "update ngo set  Name=? ,ngo_address=?,ngo_pincode=?,ngo_phone=? where ngo_unique_id=?",
              [
                ngoName.trim(),
                ngoAddress.trim(),
                ngoPin.trim(),
                ngoNumber.trim(),
                ngo_unique_id,
              ],
              (err, results) => {
                if (err) {
                  console.log(err);
                }
                res.redirect("ngo-list");
              }
            );
          }
        }
      }
    );
  },
};
