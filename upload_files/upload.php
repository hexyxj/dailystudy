<?php
if(!empty($_FILES["mypic"])){
    $picName=$_FILES["mypic"]["name"];
    $picSize=$_FILES["mypic"]["size"];
    if($picSize>2*1020*1024){
        echo "图片大小不能超过2MB";
        exit();
    }
    $type=strstr($picName,".");
    if($type!=".gif" && $type != ".png" && $type != ".jpg"){
        echo "图片格式不正确";
        exit();
    }
    $pics=time().rand(1,9999).$type;
    move_uploaded_file($_FILES["mypic"]["tmp_name"],"uploads/".$pics);
}