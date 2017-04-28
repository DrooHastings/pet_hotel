console.log('JS up ');
$(document).ready(onReady);


function onReady (){
  console.log('js and jq up');
// event listeners
$('#register').on('click', registerOwners);
  appendOwners();
}


function registerOwners (){
  objectToSend = {
    name: $('#first-name').val() + " " + $('#last-name').val()
  };

  $.ajax({
    url: '/registerOwners',
    type: 'POST',
    data: objectToSend,
    success: function (response){
     $('#owners-name').append('<option>' + response[response.length - 1] + '</option>');
     console.log(response[response.length - 1]);
    }
  });
}

function appendOwners (){
$.ajax ({
  url: "/getOwners",
  type: 'GET',
  success: function (response){
    // console.log('in getOwners route', response);
    for (var i = 0; i < response.length; i++) {
      $('#owners-name').append('<option>' + response[i] + '</option>');
    }
    console.log(response);
    console.log(response.length);
    $('.container').append($('#owners-name').val());
  }//end success
});//end GET
}//end appendOwners
