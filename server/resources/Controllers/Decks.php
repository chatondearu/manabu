<?php

namespace Controllers;

class Decks extends Controller {
  public static function getAll () {
    return \Models\Deck::all();
  }

  public static function getById ($id) {
    $id = intval($id);
    return \Models\Deck::find($id);
  }

  public static function addNewCard ($id, $params) {
    $deck = self::getById($id);
    $card = new \Models\Card(Cards::getValidArray($params));
    $deck->cards()->save($card);
    return $deck;
  }

  public static function addNewDeck ($params) {
    $deck = \Models\Deck::create(self::getValidArray($params));
    return $deck;
  }

  public static function updateDeck ($id, $params) {
    $deck = self::getById($id);
    foreach (self::getValidArray($params) as $key => $value) {
      $deck->{$key} = $value;
    }
    $deck->save();
    return $deck;
  }

  public static function deleteById ($id) {
    $deck = self::getById($id);
    $deck->cards()->delete();
    $deck->delete();
  }

  public static function getValidArray ($params) {
    $validParams = [];
    if (isset($params['title']) && !is_null($params['title'])) $validParams['title'] = $params['title'];
    if (isset($params['description']) && !is_null($params['description'])) $validParams['description'] = $params['description'];
    if (isset($params['frontSpell']) && !is_null($params['frontSpell'])) $validParams['front_spell'] = $params['frontSpell'];
    if (isset($params['backSpell']) && !is_null($params['backSpell'])) $validParams['back_spell'] = $params['backSpell'];
    return $validParams;
  }
}