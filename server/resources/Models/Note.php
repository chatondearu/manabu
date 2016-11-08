<?php

namespace Models;

use \Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\SoftDeletes;

class Note extends Model {
  use SoftDeletes;

  public function tags() {
    return $this->belongsToMany('Models\Tag');
  }

  protected $table = 'notes';
  protected $guarded = ['id'];
  protected $dates = ['deleted_at'];

}