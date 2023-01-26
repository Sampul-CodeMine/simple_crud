<?php

     // error_reporting(0);

    date_default_timezone_set('Africa/Lagos');

    // Definition of constants and variables 
    define ('DB_HOST', '127.0.0.1');
    define ('DB_NAME', 'test');
    define ('DB_USER', 'root');
    define ('DB_PASS', '');
        
    

    try {
        $db_connect = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    } catch (Exception $err) {
        echo 'Connection issues:: ' . $err->getMessage();
        exit;
    }

    function isExistEmail( string $email) : bool{
        global $db_connect;

        $query = "SELECT * FROM `faker` WHERE `u_email` = ?;";
        $stmt = $db_connect->prepare($query);
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows === 1){
            return true;
        }

        return false;
    }

    function getData( $query){
        global $db_connect;
        $statement = $db_connect->prepare($query);
        $statement->execute();
        $result = $statement->get_result();
        if($result->num_rows > 0){
            return $result;
        } 
    }