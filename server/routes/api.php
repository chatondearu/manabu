<?php

$app->group('/v1', function () {

  $this->get('/cards', function ($request, $response, $args) {
    $cards = Controllers\Cards::getAlltoJson();
    return $response->withStatus(200)->getBody()->write($cards); 
  });

  $this->post('/decks', function ($request, $response, $args) {
    var_dump($args);
    return $response->withStatus(200)->getBody()->write('test'); 
  });

});