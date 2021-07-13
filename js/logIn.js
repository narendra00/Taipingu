function changeLog(){
		if(document.getElementById("form2").style.display=="none"){
			document.getElementById("form1").style.display="none";
			document.getElementById("form2").style.display="block";
		}
		else{
			document.getElementById("form1").style.display="block";
			document.getElementById("form2").style.display="none";
		}
	}
	
	/*function imgclick(){
		document.getElementById("inpclick").click();
	}
	function onFileSelected(event) {
	  var selectedFile = event.target.files[0];
	  var reader = new FileReader();

	  var imgtag = document.getElementById("myimage");
	  imgtag.title = selectedFile.name;

	  reader.onload = function(event) {
		imgtag.src = event.target.result;
	  };

	  reader.readAsDataURL(selectedFile);
	}*/
	
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('#myimage')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}