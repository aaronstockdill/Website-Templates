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


if (   isset($_POST['email'])
    && isset($_POST['name'])
    && isset($_POST['message'])){
    
    $email = sanitize($_POST['email']);
    $name = sanitize($_POST['name']);
    $message = sanitize($_POST['message']);

    $send_to = "you@yourcompany.com";
    $url = "yourcompany.com";
    $subject = "Form email from ".$_POST['name'];
    
    $message_head = "Message from Web Form at $url by Potato SoftWorks\n".
                    "From: ".$email."\nEmail: ".$email."\n\n";
    $message_foot = "\n\nSent at ".date(DATE_RFC2822).
                    " by Potato SoftWorks email form.";
    $message = $message_head.$message.$message_foot;
    
    $headers = 'From: '.$email_from."\n".
    'Reply-To: '.$email_from."\n" .
    'X-Mailer: PHP/' . phpversion();
    @mail($send_to, $subject, $message, $headers);
    
    done();
    
} else {
    ?>

<!DOCTYPE html>
<html>
    <head>
        <title>Potato SoftWorks</title>
        <link rel="stylesheet" href="Resources/style.css">
        <meta http-equiv="refresh" content="10;<?php echo $url ?>">
    </head>
    <body>
        <header>
            <ul id="menu">
                <li><a href="#company">Company</a></li>
                <li><a href="#about">About</a></li>
                <li class='icon'><img alt='icon' src='Resources/logo.png' /></li>
                <li><a href="#people">People</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </header>
        <div class='section' id="company">
            <h1>Oh no!</h1>
            <br />
            <img src='Resources/potato_hero.png' class='hero'>
            <div class='overlay'>
                <h2>Something went Horribly Wrong!</h2>
                You must have entered some details wrong.<br /><br />
                You'll be redirected in a few moments...
            </div>
        </div>
        <footer>
            Website by <a href='http://www.potatosoftworks.com'>Potato SoftWorks</a>, 2014.
        </footer>
    </body>
    <script src="Resources/script.js"></script>
</html>

<?php
}
function done(){
    ?>
<!DOCTYPE html>
<html>
    <head>
        <title>Potato SoftWorks</title>
        <link rel="stylesheet" href="Resources/style.css">
        <meta http-equiv="refresh" content="10;<?php echo $url ?>">
    </head>
    <body>
        <header>
            <ul id="menu">
                <li><a href="#company">Company</a></li>
                <li><a href="#about">About</a></li>
                <li class='icon'><img alt='icon' src='Resources/logo.png' /></li>
                <li><a href="#people">People</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </header>
        <div class='section' id="company">
            <h1>Thanks!</h1>
            <br />
            <img src='Resources/potato_hero.png' class='hero'>
            <div class='overlay'>
                <h2>We've got your message!</h2>
                Sit tight, and we'll get back to you as fast as we can. Thanks for getting in touch!<br /><br />
                You'll be redirected in a few moments...
            </div>
        </div>
        <footer>
            Website by <a href='http://www.potatosoftworks.com'>Potato SoftWorks</a>, 2014.
        </footer>
    </body>
    <script src="Resources/script.js"></script>
</html>
<?php
}
?>