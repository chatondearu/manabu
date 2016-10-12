<?php

$app->group('/v1', function () {

  $this->get('/cards', function ($request, $response) {
    $cards = Controllers\Cards::getAlltoJson();
    return $response->withStatus(200)->getBody()->write($cards); 
  });

});