function getType(){
  return getSearchType = $('#search-type').val();
}

function getKeyword(){
  return getSearchKeyword = $('#search-keyword').val();
}

function getSearchResults() {
  event.preventDefault();
  var type = getType();
  var keyword = getKeyword();
  $.ajax({
    type: 'GET',
    url: 'https://api.spotify.com/v1/search?q=' + keyword + '&type=' + type
  }).done(function(data, response){
    $('#results').empty();
    if (getType() == "artist"){
      $.each(data.artists.items, function(index, item) {
        $('#results').append("<li>"+ item.name +"</li>");
        $('#results').append('<li><img src="' + item.images[1].url + '"></li>');
      })
    }
    if (getType() == "album"){
      $.each(data.albums.items, function(index, item) {
        $('#results').append("<li>"+ item.name +"</li>");
        $('#results').append('<li><img src="' + item.images[1].url + '"></li>');
      })
    }
    if (getType() == "track"){
      $.each(data.tracks.items, function(index, item) {
        $('#results').append("<li>"+ item.name + ' - ' + item.artists[0].name + "</li>");
        $('#results').append('<li><audio src="' + item.preview_url + '" controls></audio></li>');
      })
    }
  })
}

document.addEventListener('DOMContentLoaded', function() {
  $('input[type=submit]').on('click', getSearchResults);
  $('#search-type').on('change', getType);
});