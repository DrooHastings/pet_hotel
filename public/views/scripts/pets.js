$(document).ready(onReady);


function onReady (){
// event listeners
$('#register').on('click', registerOwners);
  appendOwners();
// $('#addPetButton').on('click', addPet);
  getAllPets();
//   console.log('JS and JQ');
//   $('#deletePetButton').on('click', deletePets);


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
     appendOwners();
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
      $('#owners-name').append('<option id="'+response[i].id +'">' + response[i].name + '</option>');
    }
    console.log(response[0].name);
  }//end success
});//end GET
}//end appendOwners

// function addPet (){
//   petToSend = {
//     owner : $('#owners-name').val(),
      ownerId: $('#owners-name').attr('id');
//     pet : $('#pet-name').val(),
//     color : $('#color').val(),
//     breed : $('#breed').val(),
//   };// end petToSend
//
//   $.ajax ({
//     url: "/addPet",
//     type: 'POST',
//     data: petToSend,
//     success: function (response){
//
//     }
//   });//end POST
// }//end addPet

function getAllPets() {
  $.ajax ({
    url: "/getAllPets",
    type: 'GET',
    success: function (response){
      console.log('response from client getAllPets(): ', response[0]);

      for (var i = 0; i < response.length; i++) {
        // $('.petsTable').append('<TR>' + '<td>' +response[i].owner + '</td>' + '<td>' +response[i].pet + '</td>' + '<td>' +response[i].breed + '</td>' + '<td>' +response[i].color + '<button id="deletePetButton" data-idNum = '+ response[i].id +' >Delete Pet</button></td>' + '</tr>');
        $tr =$('<tr></tr>');
        $tr.append('<td>' +response[i].owner);
        $tr.append('<td>' +response[i].name);
        $tr.append('<td>' +response[i].breed);
        $tr.append('<td>' +response[i].color);
        $tr.append('<td><button data-idnum="' + response[i].id +
                        '" class="delete">delete</button></td>');
        $tr.append('<td><button data-idnum="' + response[i].id +
                        '" class="go">Check In/Out</button></td>');

        $('.petsTable').append($tr);
      }
      // magical row appending here
    } //end success
  }); //end ajax
} //end getallpets
//
// function deletePets() {
//   var idNumber = ($(this).data().idnum);
//
//   $.ajax ({
//     url: '/deletePets/' + idNumber,
//     method: 'DELETE',
//     success: function (response){
//       console.log('in deletePets:', response);
//     }
//   });
// }
