<?php

error_reporting(E_ALL);
ini_set("display_errors", "On");
ini_set("display_startup_errors", "On");
date_default_timezone_set("Europe/Paris");

if (session_status() == PHP_SESSION_NONE) {
  session_cache_limiter(false);
  session_start();
}

// Autoload
require_once '../vendor/autoload.php';

// Script Included
include_once 'config/const.php';
include_once 'config/database.php';
include_once 'middleware.php';

// Prepare app
$app = new \Slim\App(
    new \Slim\Container(
        include 'config/container.config.php'
    )
);

// set Global Middleware
$app->add(new APIHeaderMiddleware());

include_once 'routes.php';

// Run app
$app->run();