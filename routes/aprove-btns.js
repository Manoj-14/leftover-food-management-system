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
    rest_email = req.query.restEmail;
    db.query(
      "DELETE FROM restaurant where rest_email = ?",
      [rest_email],
      (err, rows) => {
        if (err) {
          console.log(err);
        } else {
          console.log(rows);
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
};
