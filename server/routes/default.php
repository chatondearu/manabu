<?php

$app->get('/', function ($request, $response, $args) {
  return $response->withStatus(200)->getBody()->write('Hello World');
});