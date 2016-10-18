<?php

namespace Controllers;

class Controller {

  public static function toJson ($model) {
    return Utils::modelsToValidJson($model->toArray());
  }

  public static function getAlltoArray () {
    $collection = self::getAll();
    return $collection->toArray();
  }

  public static function getAlltoJson () {
    $array = self::getAlltoArray();
    return Utils::modelsToValidJson($array);
  }

}