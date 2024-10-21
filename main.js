const inputEndereco = document.querySelector('#input-endereco');
const inputNumero = document.querySelector('#input-número');
const inputData = document.querySelector('#input-date');
const inputValor = document.querySelector('#input-valor');
const form = document.querySelector('#form');
const tbody = document.querySelector('#t-body');
const totalValorElement = document.querySelector('#total-valor'); // Elemento para mostrar o total
let totalValor = 0; // Variável para armazenar o total dos valores

// Função para formatar a data no padrão brasileiro (DD/MM/YYYY)
function formatarData(data) {
  const partes = data.split('-');
  return `${partes[2]}/${partes[1]}/${partes[0]}`; // Formato: DD/MM/YYYY
}

// Função para salvar os dados no LocalStorage
function salvarDados() {
  const valor = parseFloat(inputValor.value) || 0; // Converte o valor para número

  const dados = {
    endereco: inputEndereco.value,
    numero: inputNumero.value,
    data: formatarData(inputData.value), // Formata a data antes de salvar
    valor: valor
  };

  let listaDados = JSON.parse(localStorage.getItem('dadosForm')) || [];
  listaDados.push(dados);
  localStorage.setItem('dadosForm', JSON.stringify(listaDados));

  // Atualiza o total
  totalValor += valor;
  totalValorElement.textContent = totalValor.toFixed(2); // Atualiza o total exibido
}

// Função para carregar os dados do LocalStorage e renderizar na tabela
function carregarDados() {
  const listaDados = JSON.parse(localStorage.getItem('dadosForm')) || [];
  listaDados.forEach((dados) => {
    adicionarLinhaTabela(dados);
    totalValor += dados.valor; // Atualiza o total dos valores ao carregar os dados
  });
  totalValorElement.textContent = totalValor.toFixed(2); // Atualiza o total exibido
}

// Função para adicionar uma linha na tabela e atualizar o total
function adicionarLinhaTabela(dados) {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${dados.endereco}</td>
    <td>${dados.numero}</td>
    <td>${dados.data}</td>
    <td>${dados.valor.toFixed(2)}</td>
    <td><button class="btn btn-danger" onclick="deletar(this, '${dados.endereco}', '${dados.numero}', ${dados.valor})">Deletar</button></td>
  `;
  tbody.appendChild(newRow);
}

// Função para excluir um item da tabela e do LocalStorage
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function deletar(element, endereco, numero, valor) {
  const row = element.parentNode.parentNode;
  row.remove();

  let listaDados = JSON.parse(localStorage.getItem('dadosForm')) || [];
  listaDados = listaDados.filter((dados) => !(dados.endereco === endereco && dados.numero === numero));
  localStorage.setItem('dadosForm', JSON.stringify(listaDados));

  // Atualiza o total
  totalValor -= valor; // Subtrai o valor excluído
  totalValorElement.textContent = totalValor.toFixed(2); // Atualiza o total exibido
}

// Evento de envio do formulário
form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Verifica se todos os campos estão preenchidos
  if (!inputEndereco.value || !inputNumero.value || !inputData.value || !inputValor.value) {
    alert('Por favor, preencha todos os campos antes de adicionar.');
    return;
  }

  salvarDados(); // Salva os dados no LocalStorage

  // Cria uma nova linha na tabela
  const valor = parseFloat(inputValor.value) || 0; // Converte o valor para número
  adicionarLinhaTabela({
    endereco: inputEndereco.value,
    numero: inputNumero.value,
    data: formatarData(inputData.value),
    valor: valor
  });

  // Limpa os campos do formulário
  form.reset();
});

// Carrega os dados do LocalStorage ao iniciar a página
window.onload = carregarDados;

