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
}

