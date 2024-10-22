const inputEndereco = document.querySelector('#input-endereco');
const inputNumero = document.querySelector('#input-número');
const inputData = document.querySelector('#input-date');
const inputValor = document.querySelector('#input-valor');
const form = document.querySelector('#form');
const tbody = document.querySelector('#t-body');
const totalValorElement = document.querySelector('#total-valor');
let totalValor = 0;

// Função para formatar a data no padrão brasileiro
function formatarDataBrasileira(data) {
    if (!data) {
        return 'Data inválida'; // Retorna um valor padrão se a data for indefinida
    }

    const partesData = data.split('-');
    if (partesData.length === 3) {
        return `${partesData[2]}/${partesData[1]}/${partesData[0]}`;
    } else {
        return 'Data inválida'; // Caso o formato da data não seja válido
    }
}

// Função para adicionar linha na tabela
function adicionarLinhaTabela(dados) {
    // Verifica se os dados necessários estão definidos
    if (dados.endereco && dados.numero && dados.data && dados.valor !== undefined) {
        const newRow = document.createElement('tr');
        const valorFormatado = dados.valor !== undefined ? dados.valor.toFixed(2) : '0.00';
        
        newRow.innerHTML = `
            <td>${dados.endereco}</td>
            <td>${dados.numero}</td>
            <td>${formatarDataBrasileira(dados.data)}</td>
            <td>${valorFormatado}</td>
            <td><button class="btn btn-danger" onclick="deletar(this, '${dados.endereco}', '${dados.numero}', ${dados.valor})">Excluir</button></td>
        `;
        tbody.appendChild(newRow);
    }
}

// Função para salvar os dados no LocalStorage
function salvarDados() {
    const valor = parseFloat(inputValor.value) || 0;
    const dados = {
        endereco: inputEndereco.value,
        numero: inputNumero.value,
        data: inputData.value,
        valor: valor
    };

    let listaDados = JSON.parse(localStorage.getItem('dadosForm')) || [];
    listaDados.push(dados);
    localStorage.setItem('dadosForm', JSON.stringify(listaDados));

    // Atualiza o total
    totalValor += valor;
    totalValorElement.textContent = totalValor.toFixed(2);

    // Adiciona a nova linha à tabela
    adicionarLinhaTabela(dados);

    console.log('Dados salvos: ', dados);
}

// Função para carregar os dados do LocalStorage
function carregarDados() {
    const listaDados = JSON.parse(localStorage.getItem('dadosForm')) || [];
    console.log('Dados carregados do LocalStorage: ', listaDados);

    totalValor = 0; // Reseta o valor total

    listaDados.forEach((dados) => {
        // Assegura que o valor é um número
        if (dados.valor !== undefined) {
            totalValor += dados.valor; // Atualiza o total ao carregar
        }
        adicionarLinhaTabela(dados); // Adiciona apenas se os dados forem válidos
    });

    totalValorElement.textContent = totalValor.toFixed(2);
}

// Função para deletar uma linha da tabela e do LocalStorage
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function deletar(element, endereco, numero, valor) {
    const row = element.parentNode.parentNode;
    row.remove();

    let listaDados = JSON.parse(localStorage.getItem('dadosForm')) || [];
    listaDados = listaDados.filter(dados => !(dados.endereco === endereco && dados.numero === numero));
    localStorage.setItem('dadosForm', JSON.stringify(listaDados));

    // Atualiza o total
    totalValor -= valor;
    totalValorElement.textContent = totalValor.toFixed(2);

    console.log('Dados após exclusão: ', listaDados);
}

// Evento de submissão do formulário
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const valor = parseFloat(inputValor.value) || 0;
    const dados = {
        endereco: inputEndereco.value,
        numero: inputNumero.value,
        data: inputData.value,
        valor: valor
    };

    // Verifica se todos os campos estão preenchidos
    if (!dados.endereco || !dados.numero || !dados.data || isNaN(valor)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    salvarDados();

    // Limpa os campos do formulário
    inputEndereco.value = '';
    inputNumero.value = '';
    inputData.value = '';
    inputValor.value = '';
});

// Carregar os dados ao carregar a página
window.onload = function() {
    console.log('Carregando dados...');
    carregarDados();
};
