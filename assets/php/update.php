<?php
    require_once ('./connections.php');
    $data = stripslashes(file_get_contents("php://input"));
    $param = json_decode($data, true);

    if ($param['sid'] !== ''){
        $sid = (int)$param['sid'];

        $get_data_query = "SELECT * FROM `faker` WHERE `u_status` = '1' AND `u_id` = ?;";
        $statement = $db_connect->prepare($get_data_query);
        $statement->bind_param('i', $sid);
        $statement->execute();
        $data = $statement->get_result();
        if($data->num_rows === 1 ){
            echo json_encode($data->fetch_object());
            exit;
        }
    }