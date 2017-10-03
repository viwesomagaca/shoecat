var ddowns = document.querySelector(".dropdown").innerHTML;
var myTemplate = Handlebars.compile(ddowns);

function brandUnique() {
    'use strict';
    $.ajax({
        url:"http://localhost:3006/api/shoes",
        type: "GET"
    }).then(function(data){

    var uniqueT = [];
    var map = {};

    for (var i=0; i < data.length; i++){
        var brandN = data[i];

        if(map[brandN.brand] === undefined){
          map[brandN.brand] = brandN.brand;
           uniqueT.push(brandN.brand)
        }
    }
  document.querySelector(".brands").innerHTML = myTemplate({brand: uniqueT});
})
}
brandUnique();

function UniqueColor(){
    var uniColor = [];
    var mapColor = {};

    $.ajax({
        url:"http://localhost:3006/api/shoes",
        type: "GET"
    }).then(function(data){

    for (var i=0;  i < data.length; i++){
        var shoeColor = data[i];

        if(mapColor[shoeColor.color] === undefined){
            mapColor[shoeColor.color] = shoeColor.color;
            uniColor.push(shoeColor.color);
        }
    }
    document.querySelector(".colors").innerHTML = myTemplate({color:uniColor});
})
}
UniqueColor();


function UniqueSize(){
    var uniSize = [];
    var mapSize = {};

    $.ajax({
        url:"http://localhost:3006/api/shoes",
        type: "GET"
    }).then(function(data){

    for(var i=0; i < data.length; i++){
        var shoeSize = data[i];
        if(mapSize[shoeSize.size] === undefined){
            mapSize[shoeSize.size] = shoeSize.size;
            uniSize.push(shoeSize.size);
        }
    }
    document.querySelector(".sizes").innerHTML = myTemplate({size:uniSize});
})
}
UniqueSize();

function search(){
var brandFilter = document.querySelector(".brands");
var colorFilter = document.querySelector(".colors");
var sizeFilter = document.querySelector(".sizes")

var availableStock = document.getElementById('shoesCat').innerHTML;
var template = Handlebars.compile(availableStock);

function brands(input) {
       return brandFilter.value == input.brand;
   }

function shoesize(input) {
      return brandFilter.value == input.brand;
       return sizeFilter.value == input.size;
   }

  function brandsizes(input) {
       return sizeFilter.value == input.size;
   }

     $.ajax({
         url:"http://localhost:3006/api/shoes/brand/"+brandFilter.value,
         type: "GET"
     }).then(function(data){
       console.log(data);
       console.log(brandFilter.value);
       if(brandFilter.value !== ""){
         var shoes = data.filter(brands);

           var searched = template({
                shoes : data
                    });
        document.getElementById("display").innerHTML = searched;
           //console.log(data);
}
 })

    $.ajax({
        url:"http://localhost:3006/api/shoes/size/"+sizeFilter.value,
        type: "GET"
    }).then(function(data){
      console.log(data);
       console.log(sizeFilter.value);
      if(sizeFilter.value !== ""){
          var shoes = data.filter(brandsizes);

          var searched = template({
               shoes : data
                   });
       document.getElementById("display").innerHTML = searched;


     }
})

    $.ajax({
      url:"http://localhost:3006/api/shoes/brand/"+brandFilter.value+"/size/"+sizeFilter.value,
      type: "GET"
    }).then(function(data){
      console.log(data);
       console.log(sizeFilter.value);
       console.log(brandFilter.value);
      if (sizeFilter.value !== "")  {
         if (brandFilter.value !== "" && sizeFilter.value !== "") {
             var shoes = data.filter(shoesize);
         } else {
             var shoes = data.filter(shoesize);
         }

         var searched = template({
              shoes : data
                  });
      document.getElementById("display").innerHTML = searched;
     }

  })


}


function showAll(){
    var availableStock = document.getElementById('shoesCat').innerHTML;
    var template = Handlebars.compile(availableStock);


    $.ajax({
        url:"http://localhost:3006/api/shoes",
        type: "GET"
    }).then(function(data){
        console.log(data);
        var searched = template({
             shoes : data
                 });
     document.getElementById("display").innerHTML = searched;
        //console.log(data);
    })

};

// function purchaseShoe(){
document.getElementById("display").addEventListener("click", function(e){

  var _id = e.target.id;
  $.ajax({
    url:"http://localhost:3006/api/shoes/sold/"+_id,
    type: "POST",
  }).then(function(data){
    console.log(data);
    var searched = template({
         shoes : data
             });
 document.getElementById("display").innerHTML = searched;


  })
})

function addingStock(){
    var addBrand = document.querySelector(".brandAdd");
    var addColor = document.querySelector(".colorAdd");
    var addIn_stock = document.querySelector(".in_stockAdd");
	  var addPrice = document.querySelector(".priceAdd");
    var addSize = document.querySelector(".sizeAdd");



     $.ajax({
         url:"http://localhost:3006/api/shoes/",
         type: "POST",
         async : "true",
         dataType: "application/json",
       data:{
         color: addColor.value,
         brand: addBrand.value,
         price: addPrice.value,
         size: addSize.value,
         in_stock: addIn_stock.value
       },

       sucess: function(data){
         var searched = template({
              shoes : data
                  });

      document.getElementById("display").innerHTML = searched;
      console.log(data.brand);
      document.getElementById('error').innerHTML = data.brand + "Has been added Sucessfully";
    }
});
};
