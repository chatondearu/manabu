<?php

namespace Controllers;

class Cards extends Controller {

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

  public static function getValidArray ($params) {
    $validParams = [];
    if (isset($params['front']) && !is_null($params['front'])) $validParams['front'] = $params['front'];
    if (isset($params['back']) && !is_null($params['back'])) $validParams['back'] = $params['back'];
    if (isset($params['note']) && !is_null($params['note'])) $validParams['note'] = $params['note'];
    if (isset($params['icon']) && !is_null($params['icon'])) $validParams['icon'] = $params['icon'];
    if (isset($params['resourceUrl']) && !is_null($params['resourceUrl'])) $validParams['resource_url'] = $params['resourceUrl'];
    return $validParams;
  }
}