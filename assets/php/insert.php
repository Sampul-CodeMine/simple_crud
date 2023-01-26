<?php
    require_once ('./connections.php');
    $data = stripslashes(file_get_contents("php://input"));
    $param = json_decode($data, true);

    $sid = (int)$param['stu_id'];
    $firstname = ucfirst($param['firstname']);
    $lastname = ucfirst($param['lastname']);
    $email = strtolower($param['email']);
    $age = (int)$param['age'];
    $gender = strtolower($param['gender']);

    if (empty($sid)){
        if(empty($firstname) || empty($lastname) || empty($email) || empty($age) || empty($gender)){
            echo 'All fields are required.';
            exit;
        } else {
            if ( isExistEmail($email) ) {
                echo 'Email address already exist.';
                exit;
            } else {
                //Insert New Record
                $insert_query = "INSERT INTO `faker` (`u_firstname`, `u_lastname`, `u_email`, `u_age`, `u_gender`) VALUES (?, ?, ?, ?, ?);";
                $statement = $db_connect->prepare($insert_query);
                $statement->bind_param('sssis', $firstname, $lastname, $email, $age, $gender);
                if ( $statement->execute() ) {
                    echo 'inserted';
                    exit;
                } else {
                    echo 'Record was not successfully saved.';
                    exit;
                }
            }
        }
    } else {
        if(empty($firstname) || empty($lastname) || empty($email) || empty($age) || empty($gender)){
            echo 'All fields are required.';
            exit;
        } else {
           // Update Existing Record 
            $update_query = "UPDATE`faker` SET `u_firstname` = ?, `u_lastname` = ?, `u_email` = ?, `u_age` = ?, `u_gender` = ? WHERE `u_id` = ? AND `u_status` = '1';";
            $statement = $db_connect->prepare($update_query);
            $statement->bind_param('sssisi', $firstname, $lastname, $email, $age, $gender, $sid);
            if ( $statement->execute() ) {
                echo 'updated';
                exit;
            } else {
                echo 'Record was not successfully updated.';
                exit;
            }
        }
    }