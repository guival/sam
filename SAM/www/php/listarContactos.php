<?php
    
include 'ChromePhp.php';
ChromePhp::log('Hello console!');
    
//$q = intval($_GET['q']);
$q = $_GET['q'];

$con = mysqli_connect('db701404699.db.1and1.com','dbo701404699','bf168abc','db701404699');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"AMPA");
//$result = $conn->query("SELECT * FROM tb_contactos LIMIT 10");
$sql="SELECT * FROM tb_contactos WHERE " . $q;
$result = mysqli_query($con,$sql);

$outp = array();
$outp = $result->fetch_all(MYSQLI_ASSOC);
mysqli_close($con);
echo json_encode($outp);

/*
class Contacto {
 public $co_id;
 public $co_nombre;
 public $co_correo;
 public $co_edad;
 public $co_nacimiento;
 public $co_acepta;
 public $co_color;
}
    
$myArray;
$i=0;
    
while($row = mysqli_fetch_array($result)) {
    $contacto = new Contacto();
    $contacto->co_id = $row['co_id'];
    $contacto->co_nombre = $row['co_nombre'];
    $contacto->co_correo = $row['co_correo'];
    $contacto->co_edad = $row['co_edad'];
    $contacto->co_nacimiento = $row['co_nacimiento'];
    $contacto->co_acepta = $row['co_acepta'];
    $contacto->co_color = $row['co_color'];
    $myArray[$i] = $contacto;
    $i = $i + 1;
    $contacto=null;
}

mysqli_close($con);
echo json_encode($myArray);
*/
?>
