<?php

function cleanInput($input) {
    $search = array(
        '@<script[^>]*?>.*?</script>@si',   // Strip out javascript
        '@<[\/\!]*?[^<>]*?>@si',            // Strip out HTML tags
        '@<style[^>]*?>.*?</style>@siU',    // Strip style tags properly
        '@<![\s\S]*?--[ \t\n\r]*>@'         // Strip multi-line comments
    );

    $output = preg_replace($search, '', $input);
    return $output;
}

function sanitize($input) {
    if (is_array($input)) {
        foreach($input as $var=>$val) {
            $output[$var] = sanitize($val);
        }
    }
    else {
        if (get_magic_quotes_gpc()) {
            $input = stripslashes($input);
        }
        $output  = cleanInput($input);
    }
    $output = str_replace("'", "&#39;", $output);
    $output = str_replace("\n", "<br />", $output);
    return $output;
}

function make_return($status)
{
    header('Content-Type: application/javascript; charset=utf8');
    header('Access-Control-Allow-Origin: http://developer.potatosoftworks.com/');
    header('Access-Control-Max-Age: 3628800');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    return "{\"result\" : \"".$status."\"}";
}


if (   isset($_POST['email'])
    && isset($_POST['name'])
    && isset($_POST['message'])){
    
    $email = sanitize($_POST['email']);
    $name = sanitize($_POST['name']);
    $message = sanitize($_POST['message']);

    $send_to = "you@yourcompany.com";
    $url = "yourcompany.com";
    $subject = $_POST['name']."emailed via form.";
    
    $message_head = "Message from Web Form at $url by Potato Softworks\n".
                    "Email: ".$email."\n\n";
    $message_foot = "\n\nSent at ".date(DATE_RFC2822).
                    " by Potato Softworks email form.";
    $message = $message_head.$message.$message_foot;
    
    $headers = 'From: '.$email_from."\n".
    'Reply-To: '.$email_from."\n" .
    'X-Mailer: PHP/' . phpversion();
    try {
        mail($send_to, $subject, $message, $headers);
        echo make_return('success');
    } catch (Exception $e){
        echo make_return("failure");
    }
    
} else {
    echo make_return('failure');
}
?>