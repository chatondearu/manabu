<?php

class APIHeaderMiddleware {
  public function __invoke($request, $response, $next) {
    $response->withHeader('Access-Control-Allow-Origin', APP_ORIGIN);
    // $response->withHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Requested-With, X-PINGOTHER, X-File-Name, Cache-Control');
    // if we use Auth Module
    $response->withHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Requested-With, X-PINGOTHER, X-File-Name, Cache-Control, APP-ID, TOKEN');
    $response->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTION');
    $response->withHeader('Access-Control-Allow-Credentials', 'true');
    $response->withHeader('X-Requested-With', 'XMLHttpRequest');
    $response->withHeader('Content-Type', 'application/json');

    return $next($request, $response);
  }
}

class Maintenance {
  public function __invoke($request, $response, $next) {
    if (ISOFFLINE && $request->getUri()->getPath() !== '/offline') {
      return $response->withStatus(302)->withHeader('Location', '/offline');
    }
    return $next($request, $response);
  }
}

class JsonResponseMiddleware {
  public function __invoke($request, $response, $next) {
    $response = $response->withHeader('Content-Type', 'application/json');
    $response->getBody()->write(')]}\',\n');
    return $next($request, $response);
  }
}