<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect input data
    $name = $_POST["name"] ?? 'Non renseigné';
    $email = $_POST["email"] ?? 'Non renseigné';
    $message = $_POST["message"] ?? 'Non renseigné';

    // Formspree destination URL (your provided ID)
    $url = "https://formspree.io/f/xbdpldqp";

    // Prepare data for the external API
    $data = [
        "name" => $name,
        "email" => $email,
        "message" => $message
    ];

    // Initialize cURL (PHP Proxy logic)
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Accept: application/json'
    ]);

    // Execute the request
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($http_code == 200 || $http_code == 201) {
        echo json_encode(["status" => "success", "message" => "Merci ! Votre message a été envoyé via PHP."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Un problème est survenu lors de l'envoi via le script PHP."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Méthode non autorisée."]);
}
?>
