<?php

$this->group('/users', function () {

});

$this->post('/login', function ($request, $response, $args) {
    $password = $request->getParam('password');
    $username = $request->getParam('username');
    if (!is_null($password) && !is_null($username)) {
        $user = Models\User::where('username', '=', $username)->get()->first();
        $passwordHash = sha1($password);

        if (!is_null($user) && $passwordHash === $user->password) {
            $authClient = new Auth\AuthClientToken();
            $token = $authClient->getClientToken($username);

            $response->getBody()->write(json_encode(array(
                'token' => $token,
                'profile' => $user->toArray(),
                'message' => $authClient -> message
            )));
        } else {
            throw new Exception('wrong username or password.');
        }
    }
    throw new Exception('no username or password.');
});

$this->get('/profile', function () {

})->add(new AuthMidleware());