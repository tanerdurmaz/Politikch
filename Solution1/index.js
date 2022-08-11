



// to avoid cors uses someones elses proxy server to save time, I would use our own proxy server or better would ask backend devs to allow our origin 
const fillTable = async () => {
  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent("http://ws-old.parlament.ch/councillors?format=json")}`)
    .then((response) => response.json())
    .then((data) => {
      let contents = JSON.parse(data.contents);

      function filterWerner(value) {
        return value.firstName != "Werner";
      }

      let filtered = contents.filter(filterWerner);

      let sorted = filtered.sort((a, b) => b.id - a.id);


      var table = document.getElementById("myTable");
      for (let i = 0; i < sorted.length; i++) {
        var row = table.insertRow(0);
        var cell = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);

        cell.innerHTML = sorted[i].id;
        cell1.innerHTML = sorted[i].firstName;
        cell2.innerHTML = sorted[i].lastName;
      }
    })
    .catch(console.error);

}


fillTable();
