<?php
	if(isset($_GET['logged'])){ ?>
<!DOCTYPE html>
<html>
<head>
	<title>Origami|Validation</title>
	<script  src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous">
	</script>
	<meta name="viewport" content="width=device-width, initial-scale=1"> <!-- To use @media you have to insert this in the html file-->
	<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
	<style type="text/css">

		/*Loading Animation*/
		.loader {
		    border: 10px solid #f3f3f3; /* Light grey */
		    border-top: 10px solid #9BC1BC; /* Blue */
		    border-radius: 50%;
		    width: 80px;
		    height: 80px;
		    animation: spin .5s linear infinite;
		    margin: 0 auto;
		    display: block;
		   	margin-top: 250px;
		}
		@keyframes spin {
		    0% { transform: rotate(0deg); }
		    100% { transform: rotate(360deg); }
		}
		@media only screen and (max-width: 600px){
			.loader {
			    border: 10px solid #f3f3f3; /* Light grey */
			    border-top: 10px solid #9BC1BC; /* Blue */
			    border-radius: 50%;
			    width: 160px;
			    height: 160px;
			    animation: spin .5s linear infinite;
			    margin: 0 auto;
			    display: block;
			   	margin-top: 140px;

			}

			@keyframes spin {
			    0% { transform: rotate(0deg); }
			    100% { transform: rotate(360deg); }
			}
		}
	</style>
</head>
<body>
	<div class="loader"></div>
	<script>
		
	    setTimeout(function (){
			window.location = 'initial_page.php';
		}, 3000); //This is how you make the web browser to wait a certain amount of tima and then redirect it to some other page! The setTimeout executes the function in the first parameter after the amount of time (in miliseconds) has passed.
	</script>
</body>
</html>


<?php	}

	else{
		header("Location: index.php");
	}
?>


