<?php

namespace Models;

use \Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\SoftDeletes;

class Deck extends Model {

  use SoftDeletes;

  public function cards() {
    return $this->hasMany('Models\Card');
  }

  public function tags() {
    return $this->belongsToMany('Models\Tag');
  }

  public function getCardsLengthAttribute () {
    return sizeof($this->cards);
  }

  protected $table = 'decks';
  protected $guarded = ['id'];
  protected $dates = ['deleted_at'];
  protected $appends = ['cards_length'];
  protected $casts = [
   'use_spell' => 'boolean',
  ];

}