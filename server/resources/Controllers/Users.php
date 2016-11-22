<?php

namespace Controllers;

class Users extends Controller {

    protected $attributes = [
        'username'
    ];

    public static function getAll () {
        return \Models\User::all();
    }

    public static function getById ($id) {
        $id = intval($id);
        return \Models\User::find($id);
    }

    public static function login ($username, $password) {

    }

    public static function addNewCard ($params) {
        $params = self::getValidArray($params);
        $params['str_id'] = Utils::generateStrId(true);
        $user = \Models\User::create($params);
        return $user;
    }

    public static function updateUser ($id, $params) {
        $user = self::getById($id);
        foreach (self::getValidArray($params) as $key => $value) {
            $user->{$key} = $value;
        }
        $user->save();
        return $user;
    }

    public static function deleteById ($id) {
        $user = self::getById($id);
        $user->delete();
    }
}