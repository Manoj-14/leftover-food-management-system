module.exports = {
  getAdmindash: (req, res) => {
    console.log(req.cookies);
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
  },
  getRestDash: (req, res) => {
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
          title: "Rest Profile || Dashboard",
          admin_prof: false,
          rest_prof: true,
          ngo_prof: false,
          nav_title: "Restaurent dashboard",
          restName: rows[0].rest_name,
          restEmail: rows[0].rest_email,
          restPhone: rows[0].rest_phone,
          restLoc: rows[0].rest_loc,
          restPin: rows[0].rest_pin,
          nav_stat: "rest-prof",
        });
      }
    );
  },
  getNgoDash: (req, res) => {
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
          "Select * from orders where status = ?",
          ["waiting for NGO"],
          (err, rows) => {
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
};
