<?php
 
 include('database.php'); /*incuir la coneccion a la base de datos*/
 
$query = "SELECT * from task" ;
$result = mysqli_query($connection , $query);
if(!$result){
    die('consulta fallida'. mysqli_error($connection));
}
$json= array(); 
while($row = mysqli_fetch_array($result)){
    $json[] = array(
        'name' => $row['name'],
        'description' => $row['description'],
        'id' => $row['id']

    );

}
 $jsonstring = json_encode($json);
echo $jsonstring;
?>