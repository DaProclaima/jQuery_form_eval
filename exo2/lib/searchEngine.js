let api_url = 'https://pokeapi.co/api/v2/';
let arrayChances = [];
let arrayPkmon = [0];
let prefill = '';
let query = '';

// let splitQuery = '';

function init() {
  preparePrefill();
  $('#query').keyup(function (e) {
    e.preventDefault();
    query = $('#query').val();
    query = query.trim();
    query = query.toLowerCase();
    // console.log('val vaut ' + query);
    setTimeout(function(){
      if (query!== '') {
        compareInput(query);
        showPrefill();
      }
    }, 500);
  });


  $('#search-btn').click(function (e) {
    e.preventDefault();
    fetchPokemon(query);
  });

}

function render(data) {
  showCard(data);
}


function generateLvSelectEl(el) {
  let selectEl = '<form><select name="niveau" id="niveau">' +
    '<option value="">Sélectionner niveau 1-100</option>';

  for (let i = 1; i <= 100; i++) {
    selectEl += '<option value="' + i + '">Niveau ' + i + '</option>';
  }

  selectEl += '</select></form>';

  $(el).append(selectEl);
}


function calculateStat(data, lvl = 1) {
  console.log('lvl: ' + lvl);
  if (!(lvl == null || lvl == undefined || lvl == 0 || lvl == '')) {
    let stats = [];
    let stat = null;
    for (let i = 0; i < data.stats.length; i++) {

      if (data.stats[i].stat.name == 'hp') {
        stat = Math.floor(2 * data.stats[i].base_stat + data.base_experience * lvl / 100 + lvl + 10);
      } else {
        stat = Math.floor((2 * data.stats[i].base_stat + data.base_experience) * lvl / 100 + 5);

      }
      stats.push({
        'name': data.stats[i].stat.name,
        'val': stat
      });

    }
    console.log(stats);
    let newStatsEl = '<div id="stats-' + data.name + '">' +
      '<span class="stat-level">Stats au niveau ' + lvl + '</span><br>' +
      '<span class="speed">Vitesse: ' + stats[0].val + '</span><br>' +
      '<span class="special-defense">Défense spéciale: ' + stats[1].val + '</span><br>' +
      '<span class="special-attack">Attaque spéciale: ' + stats[2].val + '</span><br>' +
      '<span class="defense">Défense: ' + stats[3].val + '</span><br>' +
      '<span class="attack">Attaque: ' + stats[4].val + '</span><br>' +
      '<span class="hp">Points de vie: ' + stats[5].val + '</span><br>';
    $('#stats-' + data.name).replaceWith(newStatsEl);
  }
}

function preparePrefill() {
  // let fso = new ActiveXObject("Scripting.FileSystemObject");
  // let txtFile = fso.CreateTextFile("./pokenames.txt", true);
  // txtFile.WriteLine('[');

  let url = api_url + 'pokemon/?offest=0&limit=964';
  let settings = {
    'async': true,
    'crossDomain': true,
    'type': 'GET',
    'url': url,
    'success': function (data) {
      let i = 1;
      // console.log(data);
      while (i < data.count) {
        let obj = {};
        obj.name = data.results[i].name;
        obj.url = data.results[i].url;
        arrayPkmon.push(obj);
        i++;
      }
      arrayPkmon.sort(function (a, b) {
        // console.log('hello world');
        // console.log(a.name, b.name)
        return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
      });
      // console.log(arrayPkmon);
    },
    'error': function (data) {
      console.error('datas not fetched. The url API is not correct.');
    }
  };
  $.ajax(settings);
  // console.log(arrayPkmon);
}

function compareInput(input) {
  // console.log('Hello compareInput');
  let splitQuery = [];

  for(let i=0; i< input.length; i++){
    // console.log('input'+i+' vaut '+ input[i]);
    splitQuery.push(input[i]);
    // console.log(splitQuery);
  }
  // console.log(splitQuery);

  for(let i=1;  i < arrayPkmon.length; i++){
    let valid = [];
    for (let j = 0; j < splitQuery.length; j++) {
      // console.log('splitQuery['+j+']= '+splitQuery[j]);
      // console.log('arrayPkmon['+i+'].name['+j+']= '+ arrayPkmon[i].name[j]);
      let bool = '';
      if(splitQuery[j] === arrayPkmon[i].name[j]) {
        bool = true;
        valid.push(bool);
      } else {
        bool = false;
        valid.push(bool);
        // console.log('bool vaut '+ bool);
        break;
      }
      // console.log('bool vaut '+ bool);
      // if valid contains only true, then send the pokemon name in the list of chances
    }
    // console.log('valid = '+valid);

    let loop = valid.length;
    for(let k = 0; loop === valid.length; k++ ){
      if( valid[k] === false) {
        loop -=1;
        break;
      }
      if (k === valid.length) {
        break;
      }
    }
    // console.log('loop = '+ loop);
    // console.log('valid.length= '+ valid.length);
    if (loop === valid.length && valid.length > 0){
      arrayChances.push(i);
    }
  }
  // console.log('arrayChances = '+arrayChances);
  // should wait a few seconds that there is no more entry else it lags


}

function fetchPokemon(val) {
  //function fetch datas

  // console.log('query vaut ' + query);
  let url = api_url + 'pokemon/' + query + '/';
  let settings = {
    'async': true,
    'crossDomain': true,
    'type': 'GET',
    'url': url,
    'success': function (data) {
      // console.log(data);
      render(data);
    },
    'error': function (data) {
      $('#query').addClass('query-error').after('<div class="error">Ce pokemon n\'existe pas</div>');
    }
  };
  $('#query').keyup(function (event) {
    $('#query').removeClass('query-error');
    $('.error').remove();
  });
  $.ajax(settings);
}

function showPrefill(){
  // let listPkmon = [];
  let liEl = '';
  for(let i = 0; i < arrayChances.length; i++){
    // console.log(arrayPkmon[arrayChances[i]].name);
    liEl += '<li><a class="api-url" href="' +arrayPkmon[arrayChances[i]].url+ '">'+arrayPkmon[arrayChances[i]].name+'</a></li>';
    // console.log(liEl);
  }
  // listPkmon.forEach(el => console.log('listPkmon.el.name = '+ el.name));
  console.log('liEl.length = '+liEl.length);
  prefill = `<div class= "block-prefill"><ul class="list-prefill">${liEl}</ul></div>`;
  //

  if(document.querySelector('.block-prefill')){
    $('.block-prefill').replaceWith(prefill);
  } else{
    $('#query').after(prefill);
  }
  // $('.api-url').click(function(event){
  //   event.preventDefault
  // })
}

function showCard(data){
  let pokemonCard = '<div class="card-pokemon" id="card-pokemon-' + data.id + '">' +
    '<div>' +
    '<div><span class="name">Nom: ' + data.name + '</span></div>' +
    '<div class="image"><img src="' + data.sprites.front_default + '"></div>' +
    '<div><span class="weight">Poid: ' + data.weight + 'kg</span></div>' +
    '<div class="types"><span class="type-1" >Type 1: ' + data.types[0].type.name + '</span><br>';
  if (data.types[1]) {
    pokemonCard += '<span class="type-1" >Type 2: ' + data.types[1].type.name + '</span>';
  }
  pokemonCard += '</div>' +
    '<div class="select-level"></div>' +
    '<div id="stats-' + data.name + '">' +
    '<span class="stat-level">Stats de base</span><br>' +
    '<span class="speed">Vitesse: ' + data.stats[0].base_stat + '</span><br>' +
    '<span class="special-defense">Défense spéciale: ' + data.stats[1].base_stat + '</span><br>' +
    '<span class="special-attack">Attaque spéciale: ' + data.stats[2].base_stat + '</span><br>' +
    '<span class="defense">Défense: ' + data.stats[3].base_stat + '</span><br>' +
    '<span class="attack">Attaque: ' + data.stats[4].base_stat + '</span><br>' +
    '<span class="hp">Points de vie: ' + data.stats[5].base_stat + '</span><br>' +
    '</div>' +
    '</div>';

  if (!document.querySelector('#card-pokemon-' + data.id)) {

    $('#list-card').append(pokemonCard);
    generateLvSelectEl('#card-pokemon-' + data.id + ' .select-level');
    $('#card-pokemon-' + data.id + ' #niveau').change(function (e) {
      calculateStat(data, $('#card-' + data.id + ' #niveau').val());
    });
  } else {

    $('#card-pokemon-' + data.id).replaceWith(pokemonCard);
    generateLvSelectEl('#card-' + data.id + ' .select-level');
    $('#card-' + data.id + ' #niveau').change(function (e) {
      calculateStat(data, $('#card-' + data.id + ' #niveau').val());
    });
  }
}

$(document).ready(function () {
  init();

});


