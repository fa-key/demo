<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$pesan =[];

$id = $data['id'];
$nama = $data['nama'];
$merek = $data['merek'];
$mesin = $data['mesin'];
$tanggal=  $data['tanggal'];
$rerata = $data['rerata'];

$query = mysqli_query($koneksi, "UPDATE user SET nama='$nama',  merek='$merek', mesin='$mesin', tanggal='$tanggal', rerata='$rerata' WHERE id='$id'");
if($query){
    http_response_code(201);
    $pesan['status']= 'sukses';
}else{
    http_response_code(422);
    $pesan['status']= 'gagal';
}

echo json_encode($pesan);
echo mysqli_error($koneksi);
?>
