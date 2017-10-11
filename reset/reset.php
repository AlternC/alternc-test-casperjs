<?php
require_once("../class/config.php");
if (!$admin->enabled) {                                                                                                                                                                      
      $msg->raise("ERROR", "admin", _("This page is restricted to authorized staff"));
        echo $msg->msg_html_all();
	  exit();
}

exec("bash -x reset.sh 2>&1",$output, $return_code );

var_dump( $output, $return_code );
