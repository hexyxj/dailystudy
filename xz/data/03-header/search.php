<?php
header("Content-Type:application/json;charset=utf-8");
require_once("../init.php");
$kw=$_REQUEST["kw"];

$sql="select title from xz_laptop where title like '%$kw%' order by sold_count DESC limit 10";
echo json_encode(sql_execute($sql));