<?php
$q = $_GET['q'];

$conn = new mysqli('db701404699.db.1and1.com','dbo701404699','bf168abc','db701404699');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql="DELETE FROM tb_contactos WHERE co_id =" . $q;
$result = mysqli_query($con,$sql);

if ($conn->query($sql) === TRUE) {
    echo "EL registro de ID [" . $q . "] ha sido eliminado exitosamente!";
} else {
    echo "ERROR: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>