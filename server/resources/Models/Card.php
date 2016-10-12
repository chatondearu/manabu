<?php

namespace Models;

use \Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\SoftDeletes;

class Card extends Model {

  use SoftDeletes;

  public function deck()
  {
    return $this->hasOne('Models\Deck');
  }

  protected $table = 'cards';
  protected $guarded = ['id'];
  protected $dates = ['deleted_at'];

}