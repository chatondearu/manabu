<?php

namespace Controllers;

class Cards {
  public static function getAll () {
    return \Models\Card::all();
  }

  public static function getAlltoJson () {
    $cards = \Models\Card::all();
    return $cards->toJson();
  }
}