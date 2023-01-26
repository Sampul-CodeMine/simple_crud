<?php
    require_once ('./connections.php');
    
    $retrieve_query = "SELECT * FROM `faker` WHERE `u_status` = '1' ORDER BY `u_lastname` ASC;";
    $data = getData($retrieve_query);
    $records = array();
    if ( $data == NULL) {
        echo '0';
        exit;
    } else {
        while($row = $data->fetch_object()){
            $records[] = $row;
        }
        echo json_encode($records);
    }
    