<?php

namespace Models;

use \Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\SoftDeletes;

class User extends Model {

  use SoftDeletes;

  public function decks()
  {
    return $this->hasMany('Models\Deck');
  }

  protected $table = 'users';
  protected $guarded = ['id', 'password'];
  protected $dates = ['deleted_at'];

}