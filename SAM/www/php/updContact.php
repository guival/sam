<?php
header("Content-Type: application/json; charset=UTF-8");
$obj = json_decode($_POST["json_contact_u"], false);

$conn = new mysqli('db701404699.db.1and1.com','dbo701404699','bf168abc','db701404699');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql="UPDATE tb_contactos SET co_nombre ='" . $obj->nombre . "', co_correo ='" . $obj->correo . "', co_edad =" . $obj->edad . ", co_nacimiento ='" . $obj->nacimiento . "', co_acepta =" . $obj->recibir . ", co_color ='" .  $obj->color . "' WHERE co_id =" . $obj->identificador;

if ($conn->query($sql) === TRUE) {
    echo "EL registro de [" . $obj->nombre . "] ha sido actualizado exitosamente!";
} else {
    echo "ERROR: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
