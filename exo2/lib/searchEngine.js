$(document).ready(function () {

  let api_url = 'https://pokeapi.co/api/v2/';

  function generateLvSelectEl(el){
    let selectEl='<form><select name="niveau" id="niveau">'+
      '<option value="">Sélectionner niveau 0-100</option>';

    for(let i=1; i<=100; i++){
      selectEl+='<option value="'+i+'">Niveau '+ i + '</option>';
    }

    selectEl+= '</select></form>';

    $(el).append(selectEl);
  }







  function calculateStat(data, lv){
  //  selectLv * data.truc * data.truc
  }

  function render(response){
    // let data = JSON.stringify(response);
    let data = response;
    // console.log(data);
    let pokemonCard = '<div class="card-pokemon" id="card-' +data.id+'">'
      +'<div>'
        +'<div><span class="name">Nom: '+data.name+ '</span></div>'
        +'<div class="image"><img src="'+data.sprites.front_default+ '"></div>'
        +'<div><span class="weight">Poid: '+data.weight+ 'kg</span></div>'
        +'<div><span class="types">Type: '+data.types[0].type.name+ '</span></div>'
        +'<div class="select-level"></div>'
      +'</div>';


    $('#list-card').append(pokemonCard);
    generateLvSelectEl('.select-level');
  }


  $('#search-btn').click(function (e) {
    e.preventDefault();
    let query = $('#query').val();
    console.log("query vaut "+ query);
    let url = api_url + 'pokemon/' + query+'/';
    let settings = {
      "async": true,
      "crossDomain": true,
      "type": "GET",
      "url": url,
      "success" : function (response) {
        console.log(response);
        render(response);
      },
    };
    $.ajax(settings)
  });
});


//
// $(function(){
//   // const Pokedex = require('pokeapi-js-wrapper');
//   // const P = new Pokedex.Pokedex();
//   let searchField = $('#query');
//   let icon = $('#search-btn');
//  //  let pokeapiUrl = 'http://pokeapi.co/api/v2/generation/1';
//  //  $.getJSON(pokeapiUrl).done(function(data){
//  //    console.log(data);
//  //    $.each(data.pokemon_species, function(index, pokemon){
//  //      var name = pokemon.name.charAt(0).toUpperCase()
//  // + pokemon.name.slice(1);
//  //    var par = $('<p>').html('Pokemon species no. ' + (index+1) + ' is ' + name);
//  //    par.appendTo('#pokemon');
//  //    });
//  //  }).fail(function(){
//  //    console.log("Request to pokeAPI failed.");
//  //  }).always(function(){
//  //    console.log('ever print something')
//  //  });
//   $('searchField').on('focus', function(){
//     $(this).animate({
//         width: '100%'
//     },400);
//     $(icon).animate({
//       right:'10px'
//     },400);
//   });
//
//   $('searchField').on('blur', function(){
//     if(searchField.val() == ''){
//       $(searchField).animate({
//         width:'45px'
//       },400, function(){
//         $(icon).animate({
//           right:'360px'
//         },400, function(){});
//       });
//     }
//   });
// });
//
// function search() {
//   $('#results').html('');
//   $('#buttons').html('');
//
//   let query = $('#query').val();
//   // $.get(
//   //   'https://pokeapi.co/api/v2/language/',{
//   //     query:query
//   //   }
//   // )
//
//   let settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "http://pokeapi.co/api/v2/pokemon/" + query,
//     "type": "GET",
//     "headers": {}
//   };
//   // $.ajax({
//   //   async: true,
//   //   crossDomain: true,
//   //   url: "http://pokeapi.co/api/v2/pokemon/",
//   //   data: {
//   //     query:query,
//   //   },
//   //   type: "GET",
//   //   success: function (response) {
//   //     let cached = response;
//   //     return console.log(JSON.parse(cached));
//   //   }
//   // });
//
//
// }
//
