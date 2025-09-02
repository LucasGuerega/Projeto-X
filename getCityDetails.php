<?php
    include_once('config.php');

    header('Content-Type: application/json');

    $response = ['status' => 'error', 'message' => 'Nenhum ID de cidade fornecido.'];

    if (isset($_GET['id'])) {
        $idCidade = $_GET['id'];
        $sql = "SELECT * FROM dados WHERE ID = ?";
        $stmt = $conexao->prepare($sql);
        $stmt->bind_param("s", $idCidade);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result && $result->num_rows > 0) {
            $cityData = $result->fetch_assoc();
            $response = [
                'status' => 'success',
                'data' => $cityData,
            ];
        } else {
            $response = ['status' => 'error', 'message' => 'Cidade não encontrada.'];
        }
    }

    echo json_encode($response);
?>