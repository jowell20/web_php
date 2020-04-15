<?php
include('database.php');/**incluyo la base de datos */

$_POST['id'];

if(isset($_POST['id'])){/*resivo el id que envia el cliente */

     $id = $_POST['id'];/**id resivido */  
     $query = "DELETE FROM task WHERE id=$id";/**eliminamos por medio del id obtenido */
     $result = mysqli_query($connection , $query);/**se ejcuta la coneccion y la consulta en una variable */
     if(!$result){
        die('query failed');

     }
     echo "tarea eliminada";
}



?>