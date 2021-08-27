//Query model with marque name
function fetchModels(marqueId){
  $.getJSON('/marques/'+marqueId+'/models', function( data ) {
  var items = [];
  $.each( data, function( key, val ) {
    items.push( "<option id='" + key + " value='" + val + "'>" + val + "</li>" );
  });

  $('#appointment_vehicule_attributes_model').append(items.join( "" ))

 });
}

function setDommage(value, id){
  $(".fh5co-card").removeClass('active')
  $('#'+id).addClass('active')
  $("input[name='appointment[dommage]']").val(value)
}

function next(stepNumber){
  switch (stepNumber) {
    case 2:
     var domageVal = $("input[name='appointment[dommage]']").val()
      if(!domageVal){
        $('#errorsMessages').removeClass('hidden')
        $('#errorsMessages').html('<p>Vueillez indiquer le vitre endomagé.</p>')
        return 0;
      }else{
        $('#errorsMessages').addClass('hidden')
      }
      break;
      case 3:
      var marque = $("select[name='appointment[vehicule_attributes][marque_id]']").val(),
      model = $("input[name='appointment[vehicule_attributes][model]']").val(), error = false
      if(marque){
        $('#marqueInput').removeClass('has-error')
      }else{
        $('#marqueInput').addClass('has-error')
        error = true
      }
      if(model){
          $('#modeleInput').removeClass('has-error')
      }else{
          $('#modeleInput').addClass('has-error')
          error = true
      }
      if(error){
        return 0
      }
      break;
    default:

  }

  $('.step').hide()
  $('#step-'+stepNumber).show()
  $('.step-icon').removeClass('active')
  $('#step-icon-'+stepNumber).addClass('active')
}


$( document ).ready(function() {

  var marqueInput = $('#appointment_vehicule_attributes_marque_id')
  marqueInput.change(function() {
    var marqueId = marqueInput.val()
    if(marqueId){
      fetchModels(marqueId)
    }
  })

  //Sow first step
  next(1)

 //Hide adresse input
  var adresseInput = $('#adresse_user')
  adresseInput.hide()

  //show adresse
  $("input[name='appointment[lieu]']").change(function() {
    if($(this).val() == 'Notre équipe se déplace chez vous'){
      adresseInput.show()
    }else{
      adresseInput.hide()
    }
  })

  //handle form submit ajax
  var appointForm = $("#form_appointment");

  appointForm.on("ajax:success", function(e, data, status, xhr) {
    $("#success_message").append(data.message)
  });

  appointForm.on("ajax:error", function(e, xhr, status, error) {

    //$("#new_article").append("<p>ERROR</p>")
  });

//Handle dommage select
$('.domage-card').click(function(){
  var id = this.id
  switch (id) {
    case "pare-brise":
      setDommage("Pare-brise", "pare-brise")
      break;
    case "lunette-arriere":
      setDommage("Lunette arriére", "lunette-arriere")
      break;
    case "vitre-gauche":
      setDommage("Vitre latérale gauche", "vitre-gauche")
      break;
    case "vitre-droite":
      setDommage("Vitre latérale droite", "vitre-droite")
      break;
    default:

  }
})


//form validation
$('#form_appointment').formValidation({
    framework: 'bootstrap',
    icon: {
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        "appointment[user_attributes][prenom]": {
            validators: {
                notEmpty: {
                    message: 'Veuillez indiquer votre prénom'
                }
            }
        },
        "appointment[user_attributes][nom]": {
            validators: {
                notEmpty: {
                    message: 'Veuillez indiquer votre nom'
                }
            }
        },
        "appointment[user_attributes][email]": {
            validators: {
                notEmpty: {
                    message: 'Veuillez indiquer votre E-mail'
                }
            }
        },
        "appointment[user_attributes][telephone]": {
            validators: {
                notEmpty: {
                    message: 'Veuillez indiquer votre numéro de téléphone '
                }
            }
        }
    }
});

});
