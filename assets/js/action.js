let setorInfo = {};
const infoBox = document.getElementById('info-box');
const setoresClicaveis = document.querySelectorAll('.setor-clicavel');
let selectedSetor = null;

// Função para formatar os detalhes da cidade (sem alterações)
function formatCityDetails(cityData) {
    if (!cityData) {
        return 'Nenhuma informação detalhada disponível.';
    }
    let html = '';
    for (const key in cityData) {
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
        const response = await fetch('./assets/json/info.json');
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        setorInfo = await response.json();
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
        const idCidade = setor.id;
        const detalhesCidade = setorInfo[idCidade];

        // Evento de Clique (com a lógica de toggle)
        setor.addEventListener('click', function() {
            // Se o setor clicado já estiver selecionado, nós o desmarcamos
            if (selectedSetor === this) {
                this.classList.remove("selecionado");
                selectedSetor = null;
                // Volta o estado inicial da caixa de info
                infoBox.innerHTML = 'Passe o mouse sobre uma cidade ou clique nela para ver os detalhes.';
            } else {
                // Remove a seleção de qualquer outro setor
                setoresClicaveis.forEach(s => s.classList.remove("selecionado"));
                
                // Marca o setor clicado como selecionado
                this.classList.add("selecionado");
                selectedSetor = this;
                
                // Exibe os detalhes completos
                infoBox.innerHTML = formatCityDetails(detalhesCidade);
            }
        });

        // Evento de Mouse Enter (hover)
        setor.addEventListener('mouseenter', function() {
            // O hover só acontece se não houver um setor selecionado ou se o setor atual for o selecionado
            if (!selectedSetor || selectedSetor === this) {
                infoBox.innerHTML = `<strong>Cidade:</strong> ${detalhesCidade?.Cidade || idCidade}
                    <br><strong>Região:</strong> ${detalhesCidade?.Região || 'N/A'}
                    <br><strong>Nome do curso:</strong> ${detalhesCidade?.Nome_Do_Curso || 'N/A'}
                    <br><strong>Turno:</strong> ${detalhesCidade?.Turno || 'N/A'}
                    <br><strong>Site:</strong> ${detalhesCidade?.Site || 'N/A'}
                    <br><strong>Modalidade:</strong> ${detalhesCidade?.Modalidade || 'N/A'}
                    <br><strong>Categoria Administrativa Da IES:</strong> ${detalhesCidade?.Categoria_Administrativa_Da_IES || 'N/A'}`;
            }
        });

        // Evento de Mouse Leave (hover)
        setor.addEventListener('mouseleave', function() {
            // O conteúdo da caixa de info só é alterado se não houver um setor selecionado
            if (!selectedSetor) {
                infoBox.innerHTML = 'Passe o mouse sobre uma cidade ou clique nela para ver os detalhes.';
            }
        });
    });
}

loadSectorInfo();