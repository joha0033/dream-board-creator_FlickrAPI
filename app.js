$(document).ready(function(){
      carouselMaterialize()
      materialBoxed()
      getPictures()
    });//document.ready


function carouselMaterialize(){
  $('.carousel').carousel()
}

function materialBoxed(){
   $('.materialboxed').materialbox()
 }


    function getPictures(){
      $('form').on('submit', function(event){
        event.preventDefault();
        let searchTag = $('.searchInput').val()
        let flickrAPI = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9d759785085216b5915d3e5586188a67&format=json&nojsoncallback=1';
        let flickrTag = {
          tags: searchTag
        }
        console.log(searchTag);
        $.getJSON(flickrAPI, flickrTag, function(data) {
          console.log(data)
          for(i=0; i<data.photos.photo.length; i++){
            let farmData = data.photos.photo[i].farm
            let serverID = data.photos.photo[i].server
            let secretData = data.photos.photo[i].secret
            let idData = data.photos.photo[i].id
            let urlData = "https://farm" + farmData + ".staticflickr.com/" + serverID+ "/"+idData+"_"+secretData+".jpg"
            console.log(urlData);
            $('.gallery').append("<img class=\"materialboxed\" width=\"650\" src=\"" + urlData + ">")
          }

    })
  });//getJSON

}




    //took out token and sig from below.
    //kittens: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9d759785085216b5915d3e5586188a67&format=json&nojsoncallback=1&auth_token=72157683767307786-200f07ef2520561a&api_sig=244342919986ff425cdd58810e25ba85'
    //take treehouse address/URL
//key: e660671c31763a33c03bb633110f65db