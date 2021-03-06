<?php
	session_start();
	include_once 'classes/Notes.php';//the notes class is a child of the User class
	include_once 'classes/User.php';
	$id = $_SESSION['id'];
	$user = new User;
	$notes = new Notes;
	$user->setUserLogged($id); //setting logged user to user class
?>
<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1"> <!-- To use @media you have to insert this in the html file-->
	<title>Settings | Origami - Your personal journal!</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro|Nanum+Myeongjo|Kaushan+Script|Gaegu|Open+Sans+Condensed|Righteous|Rajdhani|Josefin+Slab" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/index.css">
	<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
</head>
<body>
	<?php
		if(!isset($_SESSION['id'])){
			header("Location: index.php");
		}
	?>
	<nav class="nav">
		<div class="dropdown-settings">
			<ul>
				<li><a href="#">Profile</a></li>
				<li><a>
					<form class="logout-form" method="POST" action="action/logout.php">
						<button class="logout" type="submit" name="submit">Logout</button>
					</form></a>
				</li>
			</ul>
		</div>
		<img class="side-icon" src="icons/sidebar.png">
			<a href="initial_page.php">
				<h1 class="logo-text">Origami</h1>
				<img class="logo" src="icons/logo.svg">
			</a>
		</div>

		<form class="search-form" method="POST" action="action/searchNote.php">
			<input id="search-input" type="search" name="search" placeholder="Search notes...">
			<img id="search-img" src="images/search.png">
		</form>

		<?php 	//DISPLAYING PROFILE IMAGE IN THE NAVBAR
			$imgFormat = $user->getImgFormat($id);
			if($imgFormat == ''){ ?>
			<a href="profile.php"> <img class="profile-img-nav" src="profile_images/blank.png"></a>
	<?php }
			else{
	?>
				<a href="profile.php"><img class="profile-img-nav" src="profile_images/user<?php echo $id; ?>.<?php echo $imgFormat; ?>"></a>

		<?php }	?>

	</nav>


  <div class="side-bar">
			<ul>
        <li>
            <img class="notes-icon" src="images/notes.png">
            <p class="sidebar-text side-bar-notes" style="position: relative">Your notes</p>
        </li>
				<li>
					<img class="notes-icon" src="images/config.png">
					<p class="sidebar-text side-bar-settings" style="position: relative">Settings</p>
				</li>
				<li>
					<img class="notes-icon" src="images/logout.png">
					<p class="sidebar-text logout-button">Logout</p>
				</li>
			</ul>
	</div>

    <div class="body">
        <div class="setting-body">
            <h1>Settings</h1>
            <hr>
            <h3>Bakup all your notes</h3>
            <p>Click the bottom bellow to download the backup of all your notes!</p>
            <form action="action/backupNotes.php" method="POST">
                <input style="display:none" type="text" name="backup" >
                <button>Backup your notes</button>
            </form>
        </div>
    </div>

	<script src="javascript/settings.js"></script>

</body>
</html>
