<?php

namespace Controllers;

class Notes extends Controller {

    protected $attributes = [
        'title',
        'content'
    ];

  public static function getAll () {
    return \Models\Note::all();
  }

  public static function getById ($id) {
    $id = intval($id);
    return \Models\Note::find($id);
  }

  public static function addNewNote ($params) {
    $params = self::getValidArray($params);
    $params['str_id'] = Utils::generateStrId(true);
    $note = \Models\Note::create(self::getValidArray($params));
    return $note;
  }

  public static function updateNote ($id, $params) {
    $note = self::getById($id);
    foreach (self::getValidArray($params) as $key => $value) {
      $note->{$key} = $value;
    }
    $note->save();
    return $note;
  }

  public static function deleteById ($id) {
    $note = self::getById($id);
    $note->delete();
  }
}