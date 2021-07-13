
const scriptTag = document.createElement('script');

scriptTag.src = "https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.18.0/js/md5.min.js";
document.head.appendChild(scriptTag);
//alert(md5("hiii"));



class User {
    constructor(user_id,name,pass,profile) {
        this.user_id = user_id;
        this.name = name;
        this.pass = pass;
        this.profile = profile;
    }
}

function typing(srcs) {
	if (isSession()) {
		window.location = srcs;
	}else{
		alert("Log in First!");
	}
}

function isSession() {
	return (sessionStorage.getItem("userId") != null && sessionStorage.getItem("name") != null && sessionStorage.getItem("profile") != null);
}

function getUserData() {
	if (isSession()) {
		$("#myimage").attr("src",sessionStorage.getItem("profile"));
		document.getElementById('circle').style.display='inline';
		document.getElementById('UserId').innerHTML=sessionStorage.getItem("userId");
		document.getElementById('UserId1').innerHTML=sessionStorage.getItem("name");
		document.getElementById("userName").innerHTML="Name : "+sessionStorage.getItem("name");
	}else{
		document.getElementById('circle').style.display='inline';	
	}	
}

function getSession() {
	if (isSession()) {
		$("#logInB").hide();
		$("#myimage").attr("src",sessionStorage.getItem("profile"));
		document.getElementById('circle').style.display='block';
	}
}
 
 var firebaseConfig = {
    apiKey: "AIzaSyDjXRCLQBtjwPYU_HqmC9mD9zuzjcMMiWQ",
    authDomain: "taipingu-25269.firebaseapp.com",
    projectId: "taipingu-25269",
    storageBucket: "taipingu-25269.appspot.com",
    messagingSenderId: "387748518557",
    appId: "1:387748518557:web:bf6f9647d9ec1981b6d274",
    measurementId: "G-70HY85MH0H"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  var db = firebase.database();
  var str = firebase.storage().ref();
  var user;
  
  function signUpByUP(){
	var user_id=$('#userid').val();
	var name = $('#username').val();
	var pass = $('#userPass').val(); 
		pass=md5(pass);
	var file = document.getElementById("imgs").files[0];
	
	if(typeof file === 'undefined'){
		alert("Please fill out all the details");
		return;
	}
	
	let fileName = file.name;
	if(user_id != "" && name != "" && pass != "" && fileName != ""){
		
		let mData = {
			contentType: file.type
		};
		$("#signUp").attr("disabled", true);
		if(validUserId(user_id)){
			db.ref().child('users').orderByChild('user_id').equalTo(user_id).once('value').then(snapshot =>{
				if (snapshot.exists()) {
					alert(user_id+" user id already exist!");
					$('#form2')[0].reset();
					$("#signUp").attr("disabled", false);
				}else{
					  str.child("profiles").child(fileName).put(file,mData)
						.then(snap=>snap.ref.getDownloadURL())
						.then((url)=>{
							user = new User(user_id,name,pass,url);
							db.ref().child("users").child(user_id).set(user);
							$('#form2')[0].reset();
							$("#signInModal").modal('hide');
							sessionStorage.setItem("userId",user_id );
							sessionStorage.setItem("name",name );
							sessionStorage.setItem("profile",url );
							getSession();
						});
					}	
			});
		}else{
			alert("userId length should be equal or greater then 6 and must contains at least 1 alphabate, 1 number and 1 spacial char (excluding #, $, ., [, ])");
			$("#signUp").attr("disabled", false);
		}
	}else{
		alert("Please fill out all the details");
	}
	
 }
  
  function loginByUP(){
	  var userId = $("#userLogId").val();
	  var pass = $("#userLogPass").val();
		  pass = md5(pass);
	  
	  if(userId != "" && pass != ""){
		  $("#signIn").attr("disabled", true);
		db.ref().child("users").child(userId).on("value",(snapshot)=>{
			let myPass = snapshot.child("pass").val();
			if (snapshot.exists()) {
				if (pass == myPass){
			
					let user_id = snapshot.child("user_id").val();
					let name = snapshot.child("name").val();
					let pass = snapshot.child("pass").val();
					let profile = snapshot.child("profile").val();
					
					user = new User(user_id,name,pass,profile);
					$('#form1')[0].reset();
					$("#signInModal").modal('hide');
					sessionStorage.setItem("userId",user_id );
					sessionStorage.setItem("name",name );
					sessionStorage.setItem("profile",profile );
					getSession();
					
				}else {
					alert("You password is incorrect!");
					$("#signIn").attr("disabled", false);
				}
			}else {
				alert("This user id not exist");
				$("#signIn").attr("disabled", false);
			}
		});
	  }else {
		  alert("Please fill out all the details");
	  }
  }
  
  
  function logOutFunc(){
	  sessionStorage.clear();
	  document.getElementById('circle').style.display='none';
	  $("#logInB").show();
	  $("#signIn").attr("disabled", false);
	  $("#signUp").attr("disabled", false);
	  alert("Are you sure you want to log out now?");
  }
  
  function validUserId(userId){
	var c1=0,c2=0,c3=0;
	for(let i=0;i<userId.length;i++){
		var ch = userId.charAt(i);    
		if((ch.charCodeAt(0)>=65 && ch.charCodeAt(0)<=90) || (ch.charCodeAt(0)>=97 && ch.charCodeAt(0)<=122)) c1=1;
		if(ch.charCodeAt(0)>=48 && ch.charCodeAt(0)<=57) c2=1;
		if((ch.charCodeAt(0)>=33 && ch.charCodeAt(0)<=47) || (ch.charCodeAt(0)>=58 && ch.charCodeAt(0)<=64) && ch.charCodeAt(0)!=35 && ch.charCodeAt(0)!=36 && ch.charCodeAt(0)!=46) c3=1;
		if(c1==1 && c2==1 && c3==1) break;
	} 
	if(c1==1 && c2==1 && c3==1 && userId.length>=6 ) return true;;
	return false; 
  }
  