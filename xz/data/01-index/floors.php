<?php
header("Context-Type:application/json;charset=utf-8");
require_once("../init.php");
$output=[
    /* recommendedItems */
    /* newArrivalItems */
    /* topSaleItems */
];
$sql="select title,details,pic,price,href from xz_index_product where seq_recommended>0 order by  seq_recommended limit 6";
$output["recommendedItems"]=sql_execute($sql);
$sql="select title,details,pic,price,href from xz_index_product where seq_new_arrival>0 order by  seq_new_arrival limit 6";
$output["newArrivalItems"]=sql_execute($sql);
$sql="select title,details,pic,price,href from xz_index_product where seq_top_sale>0 order by  seq_top_sale limit 6";
$output["topSaleItems"]=sql_execute($sql);

echo json_encode($output);