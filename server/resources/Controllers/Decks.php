<?php

namespace Controllers;

class Decks extends Controller {

    protected $attributes = [
        'title',
        'description',
        'use_spell',
        'front_spell',
        'back_spell'
    ];

    public static function getAll () {
        return \Models\Deck::all();
    }

    public static function getById ($id) {
        $id = intval($id);
        return \Models\Deck::find($id);
    }

    public static function addNewCard ($id, $params) {
        $deck = self::getById($id);
        $card = Cards::addNewCard($params);
        $deck->cards()->save($card);
        return $deck;
    }

    public static function addNewDeck ($params) {
        $params = self::getValidArray($params);
        $params['str_id'] = Utils::generateStrId(true);
        $deck = \Models\Deck::create($params);
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
}