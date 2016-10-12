<?php

return [
    'cookies' => [
        'secret_key' => md5(_MDP_),
    ],
    'settings' => [
        'displayErrorDetails' => DEBUG,
        'viewTemplatesDirectory' => [
            'cache' => (DEBUG)? false : CACHE_DIR
        ]
    ],
    'notFoundHandler' => function ($c) {
        return function ($request, $response) use ($c) {
            $c['response']
                ->withStatus(404)
                ->withHeader('Content-Type', 'text/html');
            return $c->view->render($response, 'errors/404.html');
        };
    },
    'log' => function () {
        $log = new \Monolog\Logger('slim-skeleton');
        $log->pushHandler(new \Monolog\Handler\StreamHandler(LOGS_DIR.'/app.log', \Monolog\Logger::DEBUG));
        return $log;
    }
];