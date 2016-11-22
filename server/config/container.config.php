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
    'errorHandler' => function ($c) {
        return function ($request, $response, $exception) use ($c) {
            return $c['response']->withStatus(500)
                ->withHeader('Content-Type', 'text/html')
                ->write('Something went wrong: '. $exception->getMessage());
        };
    },
    'notFoundHandler' => function ($c) {
        return function ($request, $response) use ($c) {
            return $c['response']
                ->withStatus(404)
                ->withHeader('Content-Type', 'text/html')
                ->write('Manabu - 404 - Page not found');
        };
    },
    'log' => function () {
        $log = new \Monolog\Logger('slim-skeleton');
        $log->pushHandler(new \Monolog\Handler\StreamHandler(LOGS_DIR.'/app.log', \Monolog\Logger::DEBUG));
        return $log;
    }
];