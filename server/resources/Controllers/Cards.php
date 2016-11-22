<?php

namespace Controllers;

class Cards extends Controller {

    protected $attributes = [
        'front',
        'back',
        'note',
        'icon',
        'resource_url'
    ];

  public static function getAll () {
    return \Models\Card::all();
  }

  public static function getById ($id) {
    $id = intval($id);
    return \Models\Card::find($id);
  }

  public static function addNewCard ($params) {
    $params = self::getValidArray($params);
    $params['str_id'] = Utils::generateStrId(true);
    $card = \Models\Card::create($params);
    return $card;
  }

  public static function updateCard ($id, $params) {
    $card = self::getById($id);
    foreach (self::getValidArray($params) as $key => $value) {
      $card->{$key} = $value;
    }
    $card->save();
    return $card;
  }

  public static function deleteById ($id) {
    $card = self::getById($id);
    $card->delete();
  }
}