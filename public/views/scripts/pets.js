$(document).ready(onReady);


function onReady (){
// event listeners
$('#register').on('click', registerOwners);
  appendOwners();
$('#addPetButton').on('click', addPet);
  getAllPets();
  console.log('JS and JQ');
  $('#deletePetButton').on('click', deletePets);


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
  }//end success
});//end GET
}//end appendOwners

function addPet (){
  petToSend = {
    owner : $('#owners-name').val(),
    pet : $('#pet-name').val(),
    color : $('#color').val(),
    breed : $('#breed').val(),
  };// end petToSend

  $.ajax ({
    url: "/addPet",
    type: 'POST',
    data: petToSend,
    success: function (response){

    }
  });//end POST
}//end addPet

function getAllPets() {
  $.ajax ({
    url: "/getAllPets",
    type: 'GET',
    success: function (response){
      console.log('response from client getAllPets(): ', response[0]);

      for (var i = 0; i < response.length; i++) {
        $('.petsTable').append('<TR>' + '<td>' +response[i].owner + '</td>' + '<td>' +response[i].pet + '</td>' + '<td>' +response[i].breed + '</td>' + '<td>' +response[i].color + '</td>' + '</tr>');

      }
      // magical row appending here
    } //end success
  }); //end ajax
} //end getallpets

function deletePets() {
  var idNumber = ($(this).data().idnum);

  $.ajax ({
    url: '/deletePets/' + idNumber,
    method: 'DELETE',
    success: function (response){
      console.log('in deletePets:', response);
    }
  });
}
