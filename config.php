<?php

    $dbHost = 'Localhost';
    $dbUsername = 'root';
    $dbPassword = 'aluno'/*<--Esse é o local da senha
    Se for usar em outro lugar é só trocar pra senha q está no mysql.*/;
    $dbName = 'scdatajor';
    
    $conexao = new mysqli($dbHost,$dbUsername,$dbPassword,$dbName);
    /*
     if($conexao->connect_errno)
     {
         echo "Erro";
     }
     else
     {
         echo "Conexão efetuada com sucesso";
     }*/
?>