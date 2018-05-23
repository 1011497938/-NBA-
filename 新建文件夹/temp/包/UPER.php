<?php 
	header("Content-Type: text/html; charset=UTF-8");
	$con = mysql_connect("localhost","root","");
	if (!$con)
	  die('Could not connect: ' . mysql_error());
	mysql_select_db("cba", $con);

	$result = mysql_query("SELECT distinct playerName  FROM player");

	while($row = mysql_fetch_array($result))
	{
		echo $row['playerName']."<br>";
	}
	// var_dump(mysql_fetch_array($result));

