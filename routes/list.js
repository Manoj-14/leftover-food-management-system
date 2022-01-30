module.exports = {
  restList: (req, res) => {
    db.query("Select * from restaurant", (err, rows) => {
      res.render("lists/rest-list.ejs", {
        title: "Admin Dashboard || Restaurent list",
        length: rows.length,
        admin_prof: true,
        rest_prof: false,
        ngo_prof: false,
        nav_title: "Restaurents list",
        rows,
      });
    });
  },
  ngoList: (req, res) => {
    db.query("Select * from ngo", (err, rows) => {
      res.render("lists/ngo-list.ejs", {
        title: "Admin Dashboard || NGO's List",
        length: rows.length,
        admin_prof: true,
        nav_title: "NGO's list",
        rest_prof: false,
        ngo_prof: false,
        rows,
      });
    });
  },
  orderList: (req, res) => {
    console.log(req.session);
    db.query(
      "Select * from orders where status = ?",
      ["Waiting for admin"],
      (err, rows) => {
        res.render("lists/orders.ejs", {
          title: "Admin Dashboard || Orders",
          length: rows.length,
          admin_prof: true,
          rest_prof: false,
          ngo_prof: false,
          nav_title: "Orders",
          rows,
        });
      }
    );
  },
  logList: (req, res) => {
    console.log(req.session);
    db.query(
      "select L.order_no , L.date , L.Ngo ,O.Name ,O.Quantity,O.Pincode,O.Status from log L, orders O where Sl_no = order_no",
      (err, rows) => {
        res.render("lists/history.ejs", {
          title: "Admin Dashboard || History",
          length: rows.length,
          admin_prof: true,
          rest_prof: false,
          ngo_prof: false,
          nav_title: "History",
          rows,
        });
      }
    );
  },
  restLog: (req, res) => {
    const restEmail = req.cookies.restDet.restEmail;
    const restName = req.cookies.restDet.restName;
    db.query("select * from orders where name = ?", [restName], (err, rows) => {
      console.log(rows);
      res.render("lists/rest-log.ejs", {
        title: "Rest Log",
        admin_prof: false,
        rest_prof: true,
        ngo_prof: false,
        nav_title: "Log",
        length: rows.length,
        rows,
      });
    });
  },
  ngoLog: (req, res) => {
    const ngoEmail = req.cookies.ngoDet.ngo_email;
    const ngoName = req.cookies.ngoDet.ngo_name;
    const ngoUid = req.cookies.ngoDet.ngo_uid;
    console.log(ngoName, ngoEmail, ngoUid);
    db.query(
      "select L.order_no , L.date  ,O.Name ,O.Quantity from log L, orders O where Sl_no = order_no and L.Ngo = ?",
      [ngoName],
      (err, rows) => {
        console.log(rows);
        res.render("lists/ngo-log.ejs", {
          title: "Ngo Log",
          admin_prof: false,
          rest_prof: false,
          ngo_prof: true,
          nav_title: "Log",
          length: rows.length,
          rows,
        });
      }
    );
    console.log(req.cookies);
  },
};
