<?php
    require_once ('./connections.php');
    $data = stripslashes(file_get_contents("php://input"));
    $param = json_decode($data, true);
    
    
    if ( $param['sid'] !== ''){
        $sid = (int)$param['sid'];
        $delete_query = "UPDATE `faker` SET `u_status` = '0' WHERE `u_id` = ?;";
        $statement = $db_connect->prepare($delete_query);
        $statement->bind_param('i', $sid);
        if ( $statement->execute() ) {
            echo 'success';
            exit;
        } else {
            echo 'Record was not successfully deleted.';
            exit;
        }
    }