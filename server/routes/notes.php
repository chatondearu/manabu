<?php

$this->group('/notes', function () {
    $this->get('', function () {
        $notes = Controllers\Notes::getAll();
        $json = Controllers\Notes::toJson($notes);
        return $response->withStatus(200)->getBody()->write($notes);
    });

    $this->post('', function ($request, $response) {
        $note = Controllers\Notes::addNewNote([
            'title' => $request->getParam('title'),
            'content' => $request->getParam('content')
        ]);
        $notes = Controllers\Notes::getAll();
        $json = Controllers\Notes::toJson($notes);
        return $response->withStatus(201)->getBody()->write($json);
    });

    $this->get('/{noteId}', function ($request, $response, $args) {
        $note = Controllers\Notes::getById($request->getAttribute('noteId'));
        $json = Controllers\Notes::toJson($note);
        return $response->withStatus(200)->getBody()->write($json);
    });

    $this->put('/{noteId}', function ($request, $response) {
        $note = Controllers\Notes::updateDeck($request->getAttribute('noteId') ,[
            'title' => $request->getParam('title'),
            'content' => $request->getParam('content')
        ]);
        $notes = Controllers\Notes::getAll();
        $json = Controllers\Notes::toJson($notes);
        return $response->withStatus(201)->getBody()->write($json);
    });
});