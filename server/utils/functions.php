<?php

function mapArrayKeys(callable $f, array $xs) {
  $out = array();
  foreach ($xs as $key => $value) {
    $out[$f($key)] = is_array($value) ? mapArrayKeys($f, $value) : $value;
  }
  return $out;
}

function underToCamel($str) {
  return lcfirst(implode('', array_map('ucfirst', explode('_', $str))));
}