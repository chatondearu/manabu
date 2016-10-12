# Manabu project

> A Vue.js (>=2.0) project with Slim framework (PHP >=5.6) for API and database Models.
 
Manabu was a deck of card manager. Learn all you want with a simply User Interface where you want and when you want.

## Build the App - Setup

``` bash

# install dependencies
npm install

# serve with hot reload at localhost:8888
npm run dev

# build for production with minification
npm run build

```

## Build the Server - Installation

```bash

# install composer --> https://getcomposer.org/
curl -sS https://getcomposer.org/installer | php

# install dependencies
php composer.phar install

```

## Nginx configuration

```nginx
server {
  listen       80;
  server_name  localhost;

  root        /var/www/manabu/public;

  index index.html;
  charset utf-8;

  location ^~ /api {
      alias /var/www/manabu/server;

      ## duplicate the alias is hack with nginx to prevent bugs
      try_files $uri $uri/ /api/api/index.php?$query_string; 

      location ~ \.php$ {
          fastcgi_split_path_info ^(.+\.php)(/.+)$;
          fastcgi_pass   127.0.0.1:9000;
          fastcgi_param SCRIPT_FILENAME $request_filename;
          fastcgi_index index.php;
          include fastcgi_params;
      }
  }

  location / {
    try_files $uri $uri/ /index.html;
  }

  access_log "/var/log/nginx/manabu_access.log" combined;
  error_log "/var/log/nginx/manabu_errors.log" debug;
}
```
