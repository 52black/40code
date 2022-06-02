<?php
date_default_timezone_set( 'Asia/Shanghai' );
function _addEtag($file) {
    $last_modified_time = filemtime($file);
    $etag = md5_file($file);
    // always send headers
    header("Last-Modified: ".gmdate("D, d M Y H:i:s", $last_modified_time)." GMT");
    header("Etag: $etag");
    // exit if not modified
    if (@strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) == $last_modified_time ||
        @trim($_SERVER['HTTP_IF_NONE_MATCH']) == $etag) {
        header("HTTP/1.1 304 Not Modified");
        exit;
    }
};
$file_path=explode('/',$_SERVER["REQUEST_URI"],3)[2];
_addEtag($file_path);
if (file_exists($file_path)) {
    $fp = fopen($file_path, "r");
    $str = fread($fp, filesize($file_path));//指定读取大小，这里把整个文件内容读取出来
    echo $str;
}

?>