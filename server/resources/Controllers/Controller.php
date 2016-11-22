<?php

namespace Controllers;

use Monolog\Handler\Curl\Util;

class Controller {

    protected $attributes = [];

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

    public static function getValidArray ($params) {
        $instance = new static;

        $validParams = [];
        foreach ($instance->attributes as $attribute) {
            $attributeCamel = Utils::underToCamel($attribute);
            if (isset($params[$attributeCamel]) && !is_null($params[$attributeCamel])) $validParams[$attribute] = $params[$attributeCamel];
        }
        return $validParams;
    }
}