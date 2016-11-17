<?php namespace Auth;

class AuthClientToken {
    const TOKEN_SESSION_NAME = 'client_token';
    const USER_SESSION_NAME = 'user_id';

    private $limit = '15';
    private $token = null;
    private $timestamp = null;

    public $request_timestamp = 0;
    public $message = '';
    public $errorId = 0;

    public function __construct() {
        if (session_status() == PHP_SESSION_NONE) {
            session_cache_limiter(false);
            session_start();
        }

        $savedToken = $this -> getSavedToken();
        if (!is_null($savedToken)) {
            $this -> token = $this -> retrieveToken($savedToken);
            $this -> timestamp = $this -> retrieveTimestamp($savedToken);
        }
    }

    public function getClientToken($userId) {
        if (!is_null($this -> token)) {
            $client_token = $this -> getSavedToken();
            if ($this->checkToken($client_token)) {
                return $client_token;
            }
            $this->message = null;
        }

        if ($this -> checkUser($userId)) {
            $this -> generateToken();
            $this -> setSavedToken();
            return $this -> getSavedToken();
        } else {
            return false;
        }
    }

    public function getUserId () {
        $userid = (isset($_SESSION[static::USER_SESSION_NAME])
            && $_SESSION[static::USER_SESSION_NAME] != NULL)? $_SESSION[static::USER_SESSION_NAME]: null;
        return $userid;
    }

    public function Authorized($client_token) {
        return $this->checkToken($client_token);
    }

    private function checkUser($userId) {
        $_SESSION[static::USER_SESSION_NAME] = $userId;
        return true;
    }

    private function checkToken($client_token) {
        //if token is Valid
        // -> present but no valid
        // -> present and valid but not in time limit
        // -> present and valid and in time limit
        // -> not present
        if (!is_null($this -> token)) {

            $token = $this -> retrieveToken($client_token);
            if ($this -> token === $token) {

                $timestamp = $this -> retrieveTimestamp($client_token);
                if ($this->checkTimestamp($timestamp)) {
                    return true;
                } else {
                    $this->message = 'token is outdated'.$timestamp;
                }
            } else {
                $this->message = 'token is not valid';
            }
        } else {
            $this->message = 'no session openned';
        } return false;
    }

    private function setSavedToken() {
        //save token in session
        $_SESSION[static::TOKEN_SESSION_NAME] = $this -> generateClientToken();
    }

    private function getSavedToken() {
        $savedToken = (isset($_SESSION[static::TOKEN_SESSION_NAME])
            && $_SESSION[static::TOKEN_SESSION_NAME] != NULL)? $_SESSION[static::TOKEN_SESSION_NAME]: null;
        return $savedToken ;
    }

    private function generateToken() {
        $this -> token = bin2hex(openssl_random_pseudo_bytes(16));
        return $this -> token;
    }

    private function generateClientToken() {
        return $this -> token.'//'.time();
    }

    private function retrieveToken($client_token = null) {
        return substr($client_token, 0, strpos($client_token, '//'));
    }

    private function retrieveTimestamp($client_token = null) {
        return substr($client_token, strpos($client_token, '//') + 2);
    }

    private function checkTimestamp($timestamp) {
        $diff = abs(time() - $timestamp);

        $tmp = $diff;
        $s = $tmp % 60;
        $tmp = floor( ($tmp - $s) /60 );
        $m = $tmp % 60;

        if($m > $this->limit) {
            return false;
        } return true;
    }
}
