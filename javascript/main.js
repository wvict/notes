/*This will make the data from the form go to the addNote.php 
file without loading the page.*/
/*I removed the ready part of the algorithm since it was adding the notes in the
database twice...*/
$("#addNote-form").submit(function(event){//When the form is submited (button is clicked):
	event.preventDefault();/*this makes the form not to go to the action site. It, instead, 
		sets everything to default (do nothing).*/
	var note_title = $("#addNote-title").val();//data from the title
	var note_content = $("#addNote-content").val();//data from the content
	$.post("action/addNote.php", {/*the js sends the data behind the scenes to the
		 addNote.php file with the note_title and note_content!*/
		note_title: note_title,
		note_content: note_content
	}, function (){ /*This will remove the data from the title and textarea when the
	 note is added!*/
		$("#addNote-title").val("");
		$("#addNote-content").val("");
	});
});




//When the add note button is clicked, the page loads the showNotes.php file without realoading itself and adds the title and content to the database behind the scenes.
$(document).ready(function(){
	$("#notes").load("action/showNotes.php");
	$("#addNote-form").submit(function(){
		
		$("#notes").load("action/showNotes.php");
	});
});



var modal = document.getElementById('myModal');//getting the element of the modal
var close = document.getElementsByClassName("close")[0];//getting the close button element

function deleteNote(note_id){//delete notes using AJAX
	var confirmValue = confirm('Do you really want to delete this note?');
	if(confirmValue == true){
		$.post('action/deleteNote.php', { id: note_id }, function(){ //run the deleteNote.php file using AJAX.
			modal.style.display = 'none';
			var x = document.getElementById(note_id).parentNode.outerHTML = '';//Selects the parent node (the element the button is in) from the button that has the note's id and deletes it!	I created a button with an id that is equal to the note's id in the database. So, when I delete the note in the database using AJAX, I can also delete its content from the client webpage using the same id.
			
		});
	}
}	

//EDIT NOTE 
var a = document.getElementsByClassName('div-note');

/*MODAL INTERACTION*/
function editNote(note_id){ //When the note is clicked, the modal is shown.
	modal.style.display = "block";
		$.post('action/editNote-modal.php', {id: note_id}, function (data){
	document.getElementById('data').innerHTML = data;
	});
}	
close.onclick = function(){//if the close button is clicked, the modal is closed
	modal.style.display = 'none';
}
window.onclick = function(event){ //When clicked outside the modal, it automatically closes.
	if(event.target == modal) {
		modal.style.display = 'none';
	}
}


//Add animation in notes div (when clicking inside the "add note" section)
var noteContent = document.querySelector('#addNote-content')
var noteTitle = document.querySelector('#addNote-title');

document.addEventListener('click', function(event){
	var	targetElement = event.target; //gets the element that trigered the event.

	do{
		if(targetElement == noteContent | targetElement == noteTitle){/* If the user 
			clicks in the noteContent or the noteTitle, the animation will occur. 
			The only way I could make this work is using only one |. For now, I don't 
			know why. I will try to figure it out...*/
			noteContent.style.paddingBottom = '200px';
			noteTitle.style.opacity = '1';
			noteTitle.style.top = '10px';
			noteTitle.style.cursor = 'text';
			noteTitle.style.zIndex = '1'; /*This is what solved the problem
			When the user clicks in the textarea, the z-index goes to 1 and
			the user can insert the title. When clicked outside, the z-index 
			goes to -1, and the user can no loger click on it - before it was
			possible to click on it even if it was not visible (if you knew it
			you could set the animation going without clicking the textarea - and
			it was not what I wanted). Now, apparently, it's all solved with this.*/

			return; //I have to return nothing here. If not, it will not work!
				
		}
		targetElement = targetElement.parentNode;
	}
	while(targetElement);
	
	noteContent.style.paddingBottom = '0';
	noteTitle.style.opacity = '0';	
	noteTitle.style.cursor = 'default';
	noteTitle.style.zIndex = '-1';
	
		
});

//add animation in the search input (color animation)
//later
/*var searchButton = document.querySelector('#search-button');
var searchInput = document.querySelector('#search-input');
searchInput.onkeyup = function(){
	if(searchInput.value != ''){
		searchButton.style.opacity = '1';
	}
	else{
		searchButton.style.opacity = '0';
	}
	
}*/


//Side-bar animation. Just a heads up: from now on, only use querySelector!
var sideBarIcon = document.querySelector('.side-icon');
var sideBar = document.querySelector('.side-bar');
var body = document.querySelector('.body');

/*When the user clicks for the first time, the count variable is equal to 0 and, thus
will display the fade in animation. The count will be increase by one. The second
time, the count variable will be equal to 1 and the module of 1 and 2 is not 0, 
so, it will display the fade out animation. Well done. */
var count = 0;
sideBarIcon.onclick = function(){//This 
	if(count%2 == 0){
		sideBar.style.width = '20%';
		body.style.width = '80%';
		count++;
	}
	else {
		sideBar.style.width = '0%';
		body.style.width = '100%';
		count++;
	}
	
}

//ALGORITHM THAT DISPLAYS MORE NOTES WHEN USER REACHES THE BOTTOM OF THE PAGE(jQuery)!
$(document).ready(function(){
	var limit = 10; /*This number is equal to the number of LIMIT in the showNotes 
	function!*/
	var numberControl = 0;
	var loader = document.querySelector('.loading');
	$(window).scroll(function(){
		var scrollHeight = $(document).height();
		var scrollPosition = $(window).height() + $(document).scrollTop();

		if(scrollPosition == scrollHeight){
			loader.setAttribute('class', 'loader');
			function setNotes(){
				limit+= 10; /*Number of aditional notes displayed when user
				reaches the bottom of the page*/
				$.post('action/showMoreNotes.php', {limit: limit}, function(data){
					var count = parseInt($('#countNotes').html());
					if(limit > count){
						if(numberControl == 0){
							$('#notes').html(data);
							numberControl+=1;
						}	
						else{
							loader.classList.remove('loader');
						}
					}
					else{
						$('#notes').html(data);
					}
				});	
			}
			setTimeout(setNotes, 2000);/*This is a function that runs another function
			but waits a certain amount of time. The first parameter is the function
			it's going to execute and the second is the time it will take to do it (in
			miliseconds) - in this case, it will wait 2 seconds to execute the
			function setNotes!*/
		}
	});
});

