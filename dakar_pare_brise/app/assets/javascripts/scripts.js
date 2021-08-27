// function fullWidht(){
//   if($(window).width() <= 767){
//     $('#fh5co-main > .container').removeClass('container');
//   }else{
//     $('#fh5co-main >  div').addClass('container');
//   }
// }
$(document).ready(function(){
  fullWidht()
  $(window).resize(function(){
      fullWidht()
    });
})
