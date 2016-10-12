<?php

namespace Models;

use \Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\SoftDeletes;

class Tag extends Model {

  use SoftDeletes;

  public function decks()
  {
    return $this->belongsToMany('Models\Deck');
  }

  protected $table = 'tags';
  protected $guarded = ['id'];
  protected $dates = ['deleted_at'];

}