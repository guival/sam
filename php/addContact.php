<?php
header("Content-Type: application/json; charset=UTF-8");
$obj = json_decode($_POST["json_contact"], false);

$conn = new mysqli('db701404699.db.1and1.com','dbo701404699','bf168abc','db701404699');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO tb_contactos (co_nombre, co_correo, co_edad, co_nacimiento, co_acepta, co_color)
VALUES ('" . $obj->nombre . "', '" . $obj->correo . "', " . $obj->edad . ", '" . $obj->nacimiento . "', " . $obj->recibir . ", '" . $obj->color ."')";

if ($conn->query($sql) === TRUE) {
    echo "EL registro de [" . $obj->nombre . "] ha sido creado exitosamente!";
} else {
    echo "ERROR: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
