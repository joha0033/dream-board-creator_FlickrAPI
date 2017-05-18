let selectedImages=[]
$(document).ready(function(){
      $('.collage').hide();
      $('.modal').modal();
      carouselMaterialize()
      materialBoxed()
      getPictures()
      clearButton()
      createCollage();
    });//document.ready

function clearButton(){
  $('#clear').on('click', function(){
      $('.output').empty()
      $('img').removeClass('clicked');
      selectedImages=[]
  })
}
function carouselMaterialize(){
  $('.carousel').carousel()
}

function materialBoxed(){
   $('.materialboxed').materialbox()
 }

 function getPictures(){
   $('form').on('submit', function(event){
     event.preventDefault();
     $('.galImg').remove();
       getFlickrInfo()
   });
 }

 function getFlickrInfo(){
   let searchTag = $('.searchInput').val()
   let flickrAPI = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b541554a8269b20a62f7d4c43bc7cc47&format=json&nojsoncallback=1';
   let flickrTag = {
     text: searchTag
   }
   $.getJSON(flickrAPI, flickrTag, function(data) {
     for(i=0; i<data.photos.photo.length; i++){
       let urlData = createURL(data.photos.photo[i])
       appendImages(urlData)
     }
     selectableToOutput()
   })//getJSON
 }

 function createURL (photo){
   let farmData = photo.farm
   let serverID = photo.server
   let secretData = photo.secret
   let idData = photo.id
   let urlData = 'https://farm' + farmData + '.staticflickr.com/' + serverID+ '/'+idData+'_'+secretData+'.jpg'
     return urlData

 }

function appendImages(url){
   var img = $('<img class="container row col s3 img-cropper galImg">'); //Equivalent: $(document.createElement('img'))
   img.attr('src', url);
   img.appendTo('.gallery');
 }

function selectableToOutput(){
 $(function(){
  var output = $('.output');
  $('#selectList img').each(function(i, el){
    $(this).addClass('img' + i); // identtify imgs by index (class="imgN")
  }).click(function(){
    var $img = $(this).toggleClass('clicked');
    if($img.hasClass('clicked')){
        output.append($img.clone().removeClass('clicked').removeClass('galImg'));
    } else {
        console.log("removing?!", $img[0]);
        output.find('.' + $img[0].className).remove();
    }
  });
});
}

function createCollage(){

  $('#create').on('click', function(){
    $('form').hide();
    $('.gallery').hide();

    var $collageImage = $(".output").children("img").clone();
    console.log($collageImage);
    $($collageImage).attr('class', '')
    $collageImage.each(function(){
      var $gridItem = $('<div class="grid-item"></div>')
        $($gridItem).append(this);
        $('.collage').append($gridItem)

    });
    $('.collage').show();

  $('.collage').masonry({
      itemSelector: '.grid-item',
      percentPosition: true,
      columnWidth: '.grid-sizer'
    });

  })
}


//
// $('#create').on('click', function(){
//   console.log("bunnies");
//   window.location = 'view.html?images='+encodeURIComponent(JSON.stringify(selectedImages))
//
// })

    //took out token and sig from below.
    //kittens: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9d759785085216b5915d3e5586188a67&format=json&nojsoncallback=1&auth_token=72157683767307786-200f07ef2520561a&api_sig=244342919986ff425cdd58810e25ba85'
    //take treehouse address/URL
//key: b541554a8269b20a62f7d4c43bc7cc47
