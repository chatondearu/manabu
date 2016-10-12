<?php

/*
 * To pass the environment into DEV you need to create the file server/config/config.env.php
 * with the next lines :
 * 
 * <?php
 * define('ENV', 'local'); // 'dev' || 'prod' || 'local'
 * define('DEBUG', true);
 * define('ISOFFLINE', false);
 */
if (file_exists(__DIR__.'/config.env.php')) {
  require_once('config.env.php');
}

/*
 * To set your database connection constant you need to create the file server/config/config.database.php
 * with the next lines (replace the good values with yours):
 * 
 * <?php
 * define('BDD_USERNAME', 'root');
 * define('BDD_PASSWORD', 'toor');
 * define('BDD_NAME', 'bdd_name');
 */
if (file_exists(__DIR__.'/config.database.php')) {
  require_once('config.database.php');
}

/*
 * By default the environment was in production
 */
if (!defined('ENV')) {
    define('DEBUG','false');
    define('ENV','prod'); // 'local' || 'dev' || 'prod'
}

/*
 * BDD config
 * @security_caution replace "****" with the good values only if you don't want to use the config.database.php file
 */
if (!defined('BDD_NAME')) {
  define('BDD_USERNAME', '****');
  define('BDD_PASSWORD', '****');
  define('BDD_NAME', '****');
}

/*
 * DIR Config
 */
define('ROOT_DIR', __DIR__.'/../..');
define('LOGS_DIR', ROOT_DIR.'/server/logs');
define('CACHE_DIR', ROOT_DIR.'/server/cache');


//set Globals
if (isset($_SERVER['HTTP_HOST'])) {
    define('HOST', $_SERVER['HTTP_HOST']);
} else {
    define('HOST', null);
}
define('TLD', substr(HOST, strrpos(HOST, '.')+1));

if (ENV === 'local') {
    define('URI', 'http://local.domine.tld');
    define('APP_ORIGIN', URI.':8888');
} elseif (ENV === 'dev') {
    define('URI', 'http://dev.domine.tld');
    define('APP_ORIGIN', URI);
} else {
    define('URI', 'http://domine.tld');
    define('APP_ORIGIN', URI);
}

/*
 * Other config Constant
 */
define('MSQL_DATE_FORMAT', 'Y-m-d H:i:s');
define('_MDP_','%%lapin blanc 1243%%');
