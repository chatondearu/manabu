<?php

$app->group('/v1', function () {

    include_once 'notes.php';
    include_once 'decks.php';
    include_once 'users.php';

});