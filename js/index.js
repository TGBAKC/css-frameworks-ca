$(document).ready(function() {
 
    $('.dropdown-toggle').dropdown();


    $('#dropdownMenuButton').on('show.bs.dropdown', function () {
      console.log('Dropdown gösteriliyor.');
    });

    $('#dropdownMenuButton').on('shown.bs.dropdown', function () {
      console.log('Dropdown gösterildi.');
    });

    $('#dropdownMenuButton').on('hide.bs.dropdown', function () {
      console.log('Dropdown gizleniyor.');
    });

    $('#dropdownMenuButton').on('hidden.bs.dropdown', function () {
      console.log('Dropdown gizlendi.');
    });
  });


 
