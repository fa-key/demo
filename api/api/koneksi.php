<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: PUT, GET, HEAD, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');
// membuat variabel koneksi
$koneksi = mysqli_connect('localhost', 'root', '', 'services') or die ('koneksi gagal');





?>