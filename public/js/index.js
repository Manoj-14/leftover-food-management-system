module.exports = {
  show: () => {
    var rowId = event.target.parentNode.parentNode.id;
    console.log(rowId);
    var data = document.getElementById(rowId).querySelectorAll(".row-data");
    data.forEach((x) => {
      console.log(x.innerHTML);
    });
  },
};
