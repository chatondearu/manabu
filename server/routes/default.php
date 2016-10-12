<?php

$app->get('/', function ($request, $response) {
    return $response->withStatus(200)->getBody()->write('Hello World');
});

$app->get('/v1', function ($request, $response) {
    return $response->withStatus(200)->getBody()->write('Hello World');
});