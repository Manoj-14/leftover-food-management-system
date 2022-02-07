module.exports = {
  restList: (req, res) => {
    if (req.cookies.username == undefined) {
      res.render("login/admin-login.ejs", {
        title: "Admin Login",
        status: "Please login again",
      });
    } else {
      db.query("Select * from restaurant", (err, rows) => {
        res.render("lists/rest-list.ejs", {
          title: "Admin Dashboard || Restaurent list",
          length: rows.length,
          admin_prof: true,
          rest_prof: false,
          ngo_prof: false,
          nav_stat: "admin-rest",
          nav_title: "Restaurents list",
          rows,
        });
      });
    }
  },
  ngoList: (req, res) => {
    if (req.cookies.username == undefined) {
      res.render("login/admin-login.ejs", {
        title: "Admin Login",
        status: "Please login again",
      });
    } else {
      db.query("Select * from ngo", (err, rows) => {
        res.render("lists/ngo-list.ejs", {
          title: "Admin Dashboard || NGO's List",
          length: rows.length,
          admin_prof: true,
          nav_title: "NGO's list",
          rest_prof: false,
          nav_stat: "admin-ngo",
          ngo_prof: false,
          rows,
        });
      });
    }
  },
  orderList: (req, res) => {
    if (req.cookies.username == undefined) {
      res.render("login/admin-login.ejs", {
        title: "Admin Login",
        status: "Please login again",
      });
    } else {
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
            nav_stat: "admin-order",
            rows,
          });
        }
      );
    }
  },
  logList: (req, res) => {
    if (req.cookies.username == undefined) {
      res.render("login/admin-login.ejs", {
        title: "Admin Login",
        status: "Please login again",
      });
    } else {
      const username = req.cookies.username;
      db.query(
        "Select L.order_no , L.date , L.ngo_uid ,O.name ,O.Quantity,O.Pincode,O.Status,N.Name from log L, orders O,ngo N where Sl_no = order_no and N.ngo_unique_id = L.ngo_uid  and L.username=? order by Sl_no DESC",
        [username],
        (err, rows) => {
          console.log(rows);
          res.render("lists/history.ejs", {
            title: "Admin Dashboard || History",
            length: rows.length,
            admin_prof: true,
            rest_prof: false,
            ngo_prof: false,
            nav_stat: "admin-log",
            nav_title: "History",
            rows,
          });
        }
      );
    }
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
        nav_stat: "rest-log",
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
      "select L.order_no , L.date  ,O.Name ,O.Quantity from log L, orders O where Sl_no = order_no and L.ngo_uid = ?",
      [ngoUid],
      (err, rows) => {
        console.log(rows);
        res.render("lists/ngo-log.ejs", {
          title: "Ngo Log",
          admin_prof: false,
          rest_prof: false,
          ngo_prof: true,
          nav_title: "Log",
          nav_stat: "ngo-log",
          length: rows.length,
          rows,
        });
      }
    );
    console.log(req.cookies);
  },
};
