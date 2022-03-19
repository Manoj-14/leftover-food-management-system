const { saveBufferToFile } = require("express-fileupload/lib/utilities");

module.exports = {
  ngoAprove: (req, res) => {
    // console.log(req.body.id);
    const ordNo = req.body.id;
    console.log(ordNo);
    db.query(
      "update orders set status = ? where order_no =?",
      ["Acceped by NGO", ordNo],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const ngo_uid = req.cookies.ngoDet.ngo_uid;
          db.query(
            "update log set ngo_uid =? where order_no =?",
            [ngo_uid, ordNo],
            (err, results) => {
              if (err) {
                console.log(err);
              } else {
                res.redirect("/ngo-profile");
              }
            }
          );
        }
      }
    );
  },
  adminAprove: (req, res) => {
    if (req.cookies.username == undefined) {
      res.render("login/admin-login.ejs", {
        title: "Admin Login",
        status: "Please login again",
      });
    } else {
      const username = req.cookies.username;
      const Sl_no = req.body.id;
      db.query(
        "update orders set Status = ?,aproved_admin = ? where order_no =?",
        ["Waiting for NGO", username, Sl_no],
        (err, results) => {
          let ts = Date.now();
          let myDate = new Date(ts);
          var date = myDate.getDate();
          var month = myDate.getMonth() + 1;
          var year = myDate.getFullYear();
          var presentDate = year + "-" + month + "-" + date;
          db.query(
            "Insert into log set ?",
            {
              order_no: Sl_no,
            },
            (err, rows) => {
              res.redirect("/orders");
            }
          );
        }
      );
    }
  },
  adminReject: (req, res) => {
    if (req.cookies.username == undefined) {
      res.render("login/admin-login.ejs", {
        title: "Admin Login",
        status: "Please login again",
      });
    } else {
      const Sl_no = req.body.id;
      const username = req.cookies.username;
      db.query(
        "update orders set Status = ?,aproved_admin = ? where order_no =?",
        ["Rejected", username, Sl_no],
        (err, results) => {
          let ts = Date.now();
          let myDate = new Date(ts);
          var date = myDate.getDate();
          var month = myDate.getMonth() + 1;
          var year = myDate.getFullYear();
          var presentDate = year + "-" + month + "-" + date;
          db.query(
            "select * from orders where order_no=?",
            [Sl_no],
            (err, rows) => {
              console.log(rows);
              console.log(Sl_no);
              db.query(
                "Insert into log set ?",
                {
                  order_no: Sl_no,
                },
                (err, rows) => {
                  res.redirect("/orders");
                }
              );
            }
          );
        }
      );
    }
  },
  delrest: (req, res) => {
    rest_email = req.query.restEmail.trim();
    db.query(
      "DELETE FROM restaurant where rest_email = ?",
      [rest_email],
      (err, rows) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect("rest-list");
        }
      }
    );
  },
  delngo: (req, res) => {
    rest_email = req.query.restEmail;
    db.query(
      "DELETE FROM ngo where ngo_unique_id = ?",
      [rest_email],
      (err, rows) => {
        if (err) {
          console.log(err);
        } else {
          console.log(rows);
          res.redirect("ngo-list");
        }
      }
    );
  },
  restpass: (req, res) => {
    const rest_email = req.cookies.restDet.restEmail;
    const { cur_pass, new_pass, con_pass } = req.body;
    db.query(
      "select * from restaurant where rest_email=? and rest_password=?",
      [rest_email, cur_pass],
      (err, rows) => {
        if (rows != undefined) {
          if (rows.length > 0) {
            if (new_pass == con_pass) {
              db.query(
                "update restaurant set rest_password=? where rest_email=?",
                [new_pass, rest_email],
                (err, rows) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(rows);
                    res.redirect("/rest-profile");
                  }
                }
              );
            } else {
              res.send(
                "<script>alert('Password not Matched');window.location.href = '/rest-profile';</script>"
              );
            }
          } else {
            res.send(
              "<script>alert('incorrect Password');window.location.href = '/rest-profile';</script>"
            );
          }
        }
      }
    );
  },
  ngopass: (req, res) => {
    const ngo_uid = req.cookies.ngoDet.ngo_uid;
    console.log(ngo_uid);
    const { cur_pass, new_pass, con_pass } = req.body;
    db.query(
      "select * from ngo where ngo_unique_id=? and ngo_password=?",
      [ngo_uid, cur_pass],
      (err, rows) => {
        // console.log(rows);
        if (rows != undefined) {
          if (rows.length > 0) {
            if (new_pass == con_pass) {
              db.query(
                "update ngo set ngo_password=? where ngo_unique_id=?",
                [new_pass, ngo_uid],
                (err, rows) => {
                  if (err) {
                    console.log(err);
                  } else {
                    // console.log(rows);
                    res.redirect("/ngo-profile");
                  }
                }
              );
            } else {
              res.send(
                "<script>alert('Password not Matched');window.location.href = '/ngo-profile';</script>"
              );
            }
          } else {
            res.send(
              "<script>alert('incorrect Password');window.location.href = '/ngo-profile';</script>"
            );
          }
        }
      }
    );
  },
};
