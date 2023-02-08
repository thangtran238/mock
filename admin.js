
const API_URL = "https://5f871d4b49ccbb0016176fe1.mockapi.io/ai";

function callAPI(endpoint, method = "GET", body) {
  return axios ({
    method: method,
    url: `${API_URL}/${endpoint}`,
    data: body,
  }).catch((err) =>{
    console.log(err);
  });
}

var id;
show();
function save (){
  document.getElementById("huy").style.display="none";
  document.getElementById("themmoi").style.display = "block";
  document.getElementById("divAddHotel").style.display = "none";

  var hotels = [];
  callAPI("hotels","GET", null).then((res) => {
    hotels = res.data; 
  } 
  )

  for (i =0;i <= hotels.lenght;i++) {
    id = i;
  }

  var name = document.getElementById("nameproduct").value;
  var price = document.getElementById("priceproduct").value | 0;
  var note = document.getElementById("noteproduct").value;
  var detail = document.getElementById("detailproduct").value;
  let img = document.getElementById("imgproduct").value;
  let image = img.split("\\")[2];

  if (name | detail | note | (price!= "")) {
    var oneProduct = {
      id: id,
      name: name,
      price: price,
      note: note,
      detail: detail,
      img: "images/" + image,
    };
    callAPI("hotels","POST",oneProduct).then((res) => {
      show();
      alert("insert success!");
    });
    } else {
      reset();
    }
  }

  function show() {
    var hotelss = [];
    callAPI("hotels", "GET", null).then((res) => {
        hotelss = res.data;
        let row = "";
        for (i in hotelss) {
            row += "<tr>";
            row += "<td>" + hotelss[i].id + "</td>";
            row += "<td>" + hotelss[i].name + "</td>";
            row +="<td>" + "<img src='" + hotelss[i].img + "style='width: 80px; height: 80px; >" + "</td>";
            row += "<td>" + hotelss[i].price + "</td>";
            row += "<td>" + hotelss[i].note + "</td>";
            row +="<td>" +"<button type='button' onclick='editsp ($(i))' class='btn btn-success'>Edit</button>"+"</td>";
            row +="<td>" + "<button type='button' onclick='deletesp ($(i))' class='btn btn-danger'>Delete</button>"+"</td>";
            row += "</tr>";
        }
        document.getElementById("tab").innerHTML += row;
    })
}

  function editok(id) {
    document.getElementById("huy").style.display = "none";
    document.getElementById("themmoi").style.display = "block";
    document.getElementById("divAddHotel").style.display = "none";
    var name = document.getElementById("nameproduct").value;
    var price = document.getElementById("priceproduct").value;
    var note = document.getElementById("noteproduct").value;
    var detail = document.getElementById("detailproduct").value;
    let img  = document.getElementById("imgproduct").value;
    var image = img.split("\\")[2];

    var oneProduct = {
      id: id,
      name: name,
      price: price,
      note: note,
      detail: detail,
      img: "images/" + image,
    };
    callAPI("hotels","PUT",oneProduct).then((response) => {
      show();
      alert("update sucess!");
    });
    if (document.getElementById("edit").style.display == "block") {
      document.getElementById("edit").style.display = "none";
      document.getElementById("ok").style.display = "block";
    } else {
      document.getElementById("edit").style.display = "block";
      document.getElementById("ok").style.display = "none";
    }
    reset();
  }

  function deletesp(id) {
    var r = confirm("Are you sure you want to delete this item?");
    if (r == true) {
      callAPI("hotels","DELETE",null).then((response) => {
        show();
        alert("delete sucess!");
      });
    } else {
      window.location.href ="adminHotel.html";
    }
  }

  function reset() {
    document.getElementById("nameproduct").value ="";
    document.getElementById("priceproduct").value ="";
    document.getElementById("noteproduct").value ="";
    document.getElementById("detailproduct").value ="";
    document.getElementById("imgproduct").value ="";
  }



