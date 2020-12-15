$(document).ready(function () {
  var url =
    "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";
  function tableRows() {
    fetch(url)
      .then(function (response) {
        // console.log(response);
        return response.json();
      })
      .then(function (data) {
        createTableRows(data);
        console.log(data);
        $("#search-box").on("keyup", function () {
          let value = $(this).val();
          let filteredData = search(value, data);
          console.log(filteredData);
          createTableRows(filteredData);
        });
      })
      .catch((err) => console.error(err));
  }
  tableRows();
  function createTableRows(data) {
    console.log(data);
    $("tbody").html("");
    for (let i = 0; i < data.length; i++) {
      $("tbody").append(`
      <tr class="data-row" id = '${i}'>
        <td class="column1">${data[i].id}</td>
        <td class="column2">${data[i].firstName}</td>
        <td class="column3">${data[i].lastName}</td>
        <td class="column4">${data[i].email}</td>
        <td class="column5">${data[i].phone}</td>
      </tr>
      `);
      $(".data-row").click(function (e) {
        $(".data-row").removeClass("active");
        $(this).addClass("active");
        var id = $(this).attr("id");
        details(id, data);
      });
    }
    // $("#overlay").css("display", "none");
  }

  function details(id, data) {
    $(
      "#info-content"
    ).html(`<div><b>User selected:</b> ${data[id].firstName} ${data[id].lastName}</div>
    <div>
      <b>Description: </b>
      <textarea cols="50" rows="5" readonly>
                  ${data[id].description}
              </textarea
      >
    </div>
    <div><b>Address:</b> ${data[id].address.streetAddress}</div>
    <div><b>City:</b> ${data[id].address.city}</div>
    <div><b>State:</b> ${data[id].address.state}</div>
    <div><b>Zip:</b> ${data[id].address.zip}</div>`);
  }
  function search(value, data) {
    var newData = [];
    for (var i = 0; i < data.length; i++) {
      value = value.toLowerCase();
      var num = data[i].id.toString();
      var firstName = data[i].firstName.toLowerCase();
      var lastName = data[i].lastName.toLowerCase();
      var email = data[i].email.toLowerCase();
      var phone = data[i].phone;
      if (
        num.includes(value) ||
        firstName.includes(value) ||
        lastName.includes(value) ||
        email.includes(value) ||
        phone.includes(value) ||
        num.includes(value)
      ) {
        newData.push(data[i]);
      }
    }

    return newData;
  }
});
