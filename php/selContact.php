<?php
    
$q = $_GET['q'];

 class Contacto {
        public $co_id;
        public $co_nombre;
        public $co_correo;
        public $co_edad;
        public $co_nacimiento;
        public $co_acepta;
        public $co_color;
    }
$contacto;

$conn = new mysqli('db701404699.db.1and1.com','dbo701404699','bf168abc','db701404699');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql="SELECT * FROM tb_contactos WHERE co_id=" . $q;
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $contacto = new Contacto();
        $contacto->co_id         = $row["co_id"];
        $contacto->co_nombre     = $row["co_nombre"];
        $contacto->co_correo     = $row["co_correo"];
        $contacto->co_edad       = $row["co_edad"];
        $contacto->co_nacimiento = $row["co_nacimiento"];
        $contacto->co_acepta     = $row["co_acepta"];
        $contacto->co_color      = $row["co_color"];
    }
} else {
    echo "0 results";
}

$conn->close();
echo json_encode($contacto);
?>
