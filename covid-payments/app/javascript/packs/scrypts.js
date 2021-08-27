
$(document).ready(function(){
  function interInputField() {
    $(function () {
      const inputs = $(".phonenumber-intl");
      var currentInput, currentInputID;
      for( var i = 0; i < inputs.length; i++) {
        currentInput = inputs[i];
        currentInputID = currentInput.id;
  
        var iti = intlTelInput(currentInput, {
          initialCountry: "CG",
          nationalMode: false,
          autoPlaceholder: "polite",
          formatOnDisplay: true,
          separateDialCode: false,
        });
  
        // listen to the telephone input for changes
        currentInput.addEventListener("countrychange", function (e) {
          var iso2 = iti.getSelectedCountryData().iso2;
          $('#phone_country_code').val(iso2);
        });
      }
      
    });
  }
  
  
  function removeButtonDisable() {
    $('input[type=submit]', this).attr('disabled', false)
  }

  
  removeButtonDisable();
  interInputField();
});
// document.addEventListener("turbolinks:load", removeButtonDisable);
// document.addEventListener("turbolinks:load", interInputField);
