        let setorInfo = {}; // Variável para armazenar os dados do JSON
        const infoBox = document.getElementById('info-box');
        const setoresClicaveis = document.querySelectorAll('.setor-clicavel');

        // Função para formatar os detalhes da cidade
        function formatCityDetails(cityData) {
            if (!cityData) {
                return 'Nenhuma informação detalhada disponível.';
            }
            let html = '';
            for (const key in cityData) {
                // Para o campo "Site", criamos um link clicável
                if (key === "Site" && cityData[key].trim() !== "") {
                    html += `<p><strong>${key}:</strong> <a href="${cityData[key]}" target="_blank">${cityData[key]}</a></p>`;
                } else {
                    html += `<p><strong>${key}:</strong> ${cityData[key]}</p>`;
                }
            }
            return html;
        }

        async function loadSectorInfo() {
            try {
                const response = await fetch('./assets/json/info.json'); // Faz a requisição ao arquivo info.json
                if (!response.ok) {
                    throw new Error(`Erro HTTP! Status: ${response.status}`);
                }
                setorInfo = await response.json(); // Converte a resposta para JSON
                console.log('Informações das cidades carregadas:', setorInfo);
                infoBox.innerHTML = 'Passe o mouse sobre uma cidade ou clique nela para ver os detalhes.';
                
                addEventListenersToSectors();

            } catch (error) {
                console.error('Erro ao carregar o arquivo JSON:', error);
                infoBox.innerHTML = '<p style="color: red;">Erro ao carregar informações. Verifique o console do navegador e se o servidor local está rodando.</p>';
            }
        }

        function addEventListenersToSectors() {
            setoresClicaveis.forEach(setor => {
                const idCidade = setor.id; // O ID do setor é o nome da cidade
                const detalhesCidade = setorInfo[idCidade];

                // Evento de Clique
                setor.addEventListener('click', function() {
                    console.log(`Cidade clicada: ${idCidade}`);
                    infoBox.innerHTML = formatCityDetails(detalhesCidade);
                });

                // Evento de Mouse Enter (hover)
                setor.addEventListener('mouseenter', function() {
                    // Ao passar o mouse, mostramos um resumo ou o nome da cidade
                    infoBox.innerHTML = 
                    `<strong>Cidade:</strong> ${detalhesCidade?.Cidade || idCidade}
                    <br><strong>Região:</strong> ${detalhesCidade?.Região || 'N/A'}
                    <br><strong>Nome do curso:</strong> ${detalhesCidade?.Nome_Do_Curso || 'N/A'}
                    <br><strong>Região:</strong> ${detalhesCidade?.Turno || 'N/A'}
                    <br><strong>Site:</strong> ${detalhesCidade?.Site || 'N/A'}
                    <br><strong>Modalidade:</strong> ${detalhesCidade?.Modalidade || 'N/A'}
                    <br><strong>Categoria Administrativa Da IES:</strong> ${detalhesCidade?.Categoria_Administrativa_Da_IES || 'N/A'}
                    `;
                });

                // Evento de Mouse Leave (hover)
                setor.addEventListener('mouseleave', function() {
                    infoBox.innerHTML = 'Passe o mouse sobre uma cidade ou clique nela para ver os detalhes.';
                });
            });
        }

        // Inicia o carregamento das informações quando a página é carregada
        loadSectorInfo();