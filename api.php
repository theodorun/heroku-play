<?php

    //this is the basic way of getting a database handler from PDO, PHP's built in quasi-ORM
    $dbhandle = new PDO("sqlite:scrabble.sqlite") or die("Failed to open DB");
    if (!$dbhandle) die ($error);
 
    //this is a sample query which gets some data, the order by part shuffles the results
    $query = "SELECT rack FROM racks where length>5 order by random() limit 1";


    // Opening a SQLite3 database using a object-oriented (PDO) approach


    //this next line could actually be used to provide user_given input to the query to 
    //avoid SQL injection attacks
    $statement = $dbhandle->prepare($query);
    $statement->execute();
    
    //The results of the query are typically many rows of data
    //there are several ways of getting the data out, iterating row by row,
    //I chose to get associative arrays inside of a big array
    //this will naturally create a pleasant array of JSON data when I echo in a couple lines

    $results = $statement->fetchAll(PDO::FETCH_ASSOC);

    $no1rack=$results[0]['rack'];

    $statement2 = $dbhandle->prepare('SELECT * FROM racks WHERE rack = :norack');
    $statement2->bindValue(':norack', $no1rack);
    $results2 = $statement2->execute();
     $results2 = $statement2->fetchAll(PDO::FETCH_ASSOC);
     $temPerArray = permutaions($no1rack);
     $perArray=array_unique($temPerArray, SORT_STRING);

print_r($perArray);


     for($i=1; $i<=count($perArray); $i++){

       $queryTemp = 'SELECT * FROM racks WHERE rack = :norack';
       $statementTemp = $dbhandle->prepare($queryTemp);

       $statementTemp->bindValue(':norack', $perArray[$i]);
       $resultsTemp= $statementTemp->execute();
       $resultsTemp = $statementTemp->fetchAll(PDO::FETCH_ASSOC);
       $results2=array_merge($results2, $resultsTemp);
       }




    //this part is perhaps overkill but I wanted to set the HTTP headers and status code
    //making to this line means everything was great with this request
    header('HTTP/1.1 200 OK');
    //this lets the browser know to expect json
    header('Content-Type: application/json');
    //this creates json and gives it back to the browser
    echo json_encode($results2);

function permutaions($str) {

    $words =  str_split($str);

    $num = count($words);

    $total = pow(2, $num);

    $tempPerr=[];

    for ($i = 0; $i < $total; $i++) {



        for ($j = 0;$j < $num; $j++) {
            if (pow(2, $j) & $i) {
                $tempPerr[$i][$j]=  $words[$j];
            }

        }


    }

    $perr=[];
    for ($i = 0; $i <$total; $i++) {
        $off=1;
        if(count($tempPerr[$i])>$off) {
            $str=implode($tempPerr[$i]);
            array_push($perr,$str);
       }

    }
return $perr;
}


?>