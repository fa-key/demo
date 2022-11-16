<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input,true);

$pesan=[];
$nama = trim($data['nama']);
$merek = trim($data['merek']);
$mesin = trim($data['mesin']);
$tanggal = trim($data['tanggal']);
$rerata = trim($data['rerata']);

$query = mysqli_query($koneksi, "INSERT INTO user(nama, merek, mesin, tanggal, rerata) VALUES ('$nama','$merek','$mesin','$tanggal','$rerata')");
if($query){
    http_response_code(201);
    $pesan['status']='sukses';
}else{
    http_response_code(442);
    $pesan['status']='gagal';
}

echo json_encode($pesan);
echo mysqli_error($koneksi);
?>