<?php

$app->get('/', function ($request, $response) {
  return $response->withStatus(200)->getBody()->write('Hello World');
});