<?php

namespace Controllers;

class Utils {
  public static function mapArrayKeys($f, array $xs) {
    $out = array();
    foreach ($xs as $key => $value) {
      $out[call_user_func($f,$key)] = is_array($value) ? self::mapArrayKeys($f, $value) : $value;
    }
    return $out;
  }

  public static function underToCamel($str) {
    return lcfirst(implode('', array_map('ucfirst', explode('_', $str))));
  }

  public static function modelsToValidJson (array $arr) {
    return json_encode(self::mapArrayKeys('self::underToCamel', $arr));
  }

  public static function generateStrId ($entropy) {
    $s=uniqid("",$entropy);
    $num= hexdec(str_replace(".","",(string)$s));
    $index = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $base= strlen($index);
    $out = '';
        for($t = floor(log10($num) / log10($base)); $t >= 0; $t--) {
            $a = floor($num / pow($base,$t));
            $out = $out.substr($index,$a,1);
            $num = $num-($a*pow($base,$t));
        }
    return 'MANABU-'.$out;
  }
}

