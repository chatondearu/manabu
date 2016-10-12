#Api server boilerplate

place the `server/` directory at the racine of your project

## `conposer.json` requirement

```json
{
  "require": {
    "Slim/Slim": "^3.5",
    "php": ">=5.5.0",
    "monolog/monolog": "1.*",
    "illuminate/database": "*"
  },
  "autoload": {
    "psr-0": {
      "Controllers\\": "./server/ressources",
      "Models\\": "./server/ressources",
      "Auth\\": "./server/ressources"
    }
  }
}
```

## server web configuration

if you use nGinx :

```nginx
location ^~ /api {
  alias /usr/local/var/www/manabu/server;
  try_files $uri $uri/ /api/api/index.php?$query_string;

  location ~ \.php$ {
    fastcgi_split_path_info ^(.+\.php)(/.+)$;
    fastcgi_pass   127.0.0.1:9000;
    fastcgi_param SCRIPT_FILENAME $request_filename;
    fastcgi_index index.php;
    include fastcgi_params;
  }
}
```
