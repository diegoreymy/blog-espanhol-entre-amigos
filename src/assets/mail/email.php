<?php
    header('Content-type: application/json');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    $request = json_decode(file_get_contents("php://input"));
    $from_email = "contato@espanholentreamigos.com.br";

    $message = "Welcome.";

    $from_name = "your name goes here";

    $to_email = "espanolentreamigos@gmail.com";

    $contact = "<p><strong>Nombre:</strong>$from_name</p><p><strong>Email:</strong> $from_email</p>";

    $email_subject = "Nuevo mensaje de $from_name desde el blog";

    $email_body = '<html><body>';
    $email_body .= "$<p><strong>Nombre:</strong>$from_name</p><p><strong>Email:</strong> $from_email</p>
                    <p>$message</p>";
    $email_body .= '</body></html>';

    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
    $headers .= "From: $from_email\n";
    $headers .= "Reply-To: $from_email";



    mail($to_email,$email_subject,$email_body,$headers);

    // $response_array['status'] = 'success';
    // $response_array['from'] = $from_email;

    echo json_encode($request);
    // echo json_encode($from_email);
    // header($response_array);
    // return $from_email;
?>