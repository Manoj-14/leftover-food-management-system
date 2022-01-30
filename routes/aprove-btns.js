module.exports = {
  ngoAprove: (req, res) => {
    console.log(req.body.id);
    const ordNo = req.body.id;
    db.query("select * from orders where Sl_no = ?", [ordNo], (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        console.log(rows[0]);
        let ts = Date.now();
        let myDate = new Date(ts);
        var date = myDate.getDate();
        var month = myDate.getMonth() + 1;
        var year = myDate.getFullYear();
        var presentDate = year + "-" + month + "-" + date;
        console.log(presentDate);
        const name = rows[0].Name;
        const phone = rows[0].Phone;
        const quantity = rows[0].Quantity;
        const pincode = rows[0].Pincode;
        const Sl_no = rows[0].Sl_no;
        const email = rows[0].email;
        const ngoName = req.cookies.ngoDet.ngo_name;
        db.query(
          "update log set Ngo = ? where order_no = ? ",
          [ngoName, Sl_no],
          (err, results) => {
            console.log(results);
            db.query(
              "update orders set Status = ? where Sl_no =?",
              ["Accepted by ngo", Sl_no],
              (err, row) => {
                res.redirect("/ngo-profile");
              }
            );
          }
        );
      }
    });
  },
  adminAprove: (req, res) => {
    const Sl_no = req.body.id;
    db.query(
      "update orders set Status = ? where Sl_no =?",
      ["Waiting for NGO", Sl_no],
      (err, results) => {
        let ts = Date.now();
        let myDate = new Date(ts);
        var date = myDate.getDate();
        var month = myDate.getMonth() + 1;
        var year = myDate.getFullYear();
        var presentDate = year + "-" + month + "-" + date;
        db.query("select * from orders where Sl_no=?", [Sl_no], (err, rows) => {
          restName = rows[0].Name;
          phone = rows[0].Phone;
          pincode = rows[0].Pincode;
          quantity = rows[0].Quantity;
          action = rows[0].Status;
          console.log(Sl_no, restName, phone, pincode, quantity, action);
          db.query(
            "insert into log set ?",
            {
              order_no: Sl_no,

              date: presentDate,
            },
            (err, opt) => {
              console.log(opt);
              res.redirect("/orders");
            }
          );
        });
      }
    );
  },
  adminReject: (req, res) => {
    const Sl_no = req.body.id;
    db.query(
      "update orders set Status = ? where Sl_no =?",
      ["Rejected", Sl_no],
      (err, results) => {
        let ts = Date.now();
        let myDate = new Date(ts);
        var date = myDate.getDate();
        var month = myDate.getMonth() + 1;
        var year = myDate.getFullYear();
        var presentDate = year + "-" + month + "-" + date;
        db.query("select * from orders where Sl_no=?", [Sl_no], (err, rows) => {
          restName = rows[0].Name;
          phone = rows[0].Phone;
          pincode = rows[0].Pincode;
          quantity = rows[0].Quantity;
          action = rows[0].Status;
          console.log(Sl_no, restName, phone, pincode, quantity, action);
          db.query(
            "insert into log set ?",
            {
              order_no: Sl_no,

              date: presentDate,
            },
            (err, opt) => {
              console.log(opt);
              res.redirect("/orders");
            }
          );
        });
      }
    );
  },
};
