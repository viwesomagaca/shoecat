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


     function brands(){
     $.ajax({
         url:"http://localhost:3006/api/shoes/brand/:brandname",
         type: "GET"
     }).then(function(data){


         console.log(data);

 })

    }
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

function search(){
    var brandFilter = document.querySelector(".brands");
    var colorFilter = document.querySelector(".colors");
    var sizeFilter = document.querySelector(".sizes")


    $.ajax({
        url:"http://localhost:3006/api/shoes",
        type: "GET"
    }).then(function(data){
        var dropdowns = myTemplate({
            stock:data.result
        })

    document.querySelector("show").innerHTML = myTemplate;
        console.log(data);
    })
}


// function addingStock(){
//     var addBrand = document.getElementById("brandAdd");
//     var addColor = document.getElementById("colorAdd");
//     var addQuantity = parseInt(document.getElementById("quantityAdd").value);
// 	var addPrice = parseInt(document.getElementById("priceAdd").value);
//     var addSize = parseInt(document.getElementById("sizeAdd").value);
//
//
//     var availableStock = document.getElementById('shoesCat').innerHTML;
//     var template = Handlebars.compile(availableStock);
//
//
// }
