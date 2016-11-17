<?php namespace Auth;

class AuthSession {

    private static $appId;
    private static $appRoofSecret;
    private static $SessionName = 'app_session';

    private $apps_clients_secrets = array(
        'seaunicornAPI' => 'le petit lapin blanc'
    );

    public $request_timestamp = 0;
    public $message = 'no message';
    public $errorId = 0;

    /**
     * AuthSession::__construct
     */
    public function __construct() {
        if (session_status() == PHP_SESSION_NONE) {
            session_cache_limiter(false);
            session_start();
        }
    }

    /**
     * AuthSession::setDefaultSession
     * @param (String) $appId
     * @param (String) $roofSecret
     */
    public static function setDefaultSession($appId, $roofSecret) {
        self::$appId = $appId;
        self::$appRoofSecret = $roofSecret;
    }

    public function authorized($appid) {
        if (isset($_SESSION[self::$SessionName])
            && $_SESSION[self::$SessionName] == $appid) {
            return true;
        } return false;
    }

    public function generateServerRoof($appid, $requestTimestamp) {
        $roof = sha1($appid);
        $roof .= $this->getSecret($appid);
        $roof = sha1($roof);
        $roof .= $requestTimestamp;
        $roof = sha1($roof);
        return $roof;
    }

    private function getSecret($appId) {
        $secret = '';
        if (array_key_exists($appId, $this->apps_clients_secrets)) {
            $secret = $this->apps_clients_secrets[$appId];
        } else {
            $this->message = 'no secret key founded';
        }
        return $secret;
    }

    private function checkRoof($appid, $roof, $requestTimestamp) {
        if (isset($appid) && $appid != null) {
            if (isset($roof) && $roof != null) {
                if (isset($requestTimestamp) && is_numeric($requestTimestamp)) {
                    //roof = secret + appid + timestamp (from request);
                    if ($roof == $this->generateServerRoof($appid, $requestTimestamp)) {
                        //is ok
                        return true;
                    } else {
                        $this->message = 'your secret key is corrupted';
                    }
                } else {
                    $this->message = 'no timestamp';
                }
            } else {
                $this->message = 'no roof';
            }
        } else {
            $this->message = 'no api ID';
        }
        return false;
    }

    public function getSession($appid, $roof, $requestTimestamp) {
        if($this->checkRoof($appid, $roof, $requestTimestamp)) {
            $_SESSION[self::$SessionName] = $appid;
            return $appid;
        }
        return false;
    }
}