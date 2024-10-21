const inputEndereco = document.querySelector('#input-endereco');
const inputNumero = document.querySelector('#input-número');
const inputData = document.querySelector('#input-date');
const inputValor = document.querySelector('#input-valor');
const form = document.querySelector('#form');
const tbody = document.querySelector('#t-body');

// Função para salvar os dados no LocalStorage
function salvarDados() {
  const dados = {
    endereco: inputEndereco.value,
    numero: inputNumero.value,
    data: inputData.value,
    valor: inputValor.value
  };

  let listaDados = JSON.parse(localStorage.getItem('dadosForm')) || [];
  listaDados.push(dados);
  localStorage.setItem('dadosForm', JSON.stringify(listaDados));
}

// Função para carregar os dados do LocalStorage e renderizar na tabela
function carregarDados() {
  const listaDados = JSON.parse(localStorage.getItem('dadosForm')) || [];
  listaDados.forEach((dados) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${dados.endereco}</td>
      <td>${dados.numero}</td>
      <td>${dados.data}</td>
      <td>${dados.valor}</td>
      <td><button class="btn btn-danger" onclick="deletar(this, '${dados.endereco}', '${dados.numero}')">Deletar</button></td>
    `;
    tbody.appendChild(newRow);
  });
}

// Função para excluir um item da tabela e do LocalStorage
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function deletar(element, endereco, numero) {
  const row = element.parentNode.parentNode;
  row.remove();

  let listaDados = JSON.parse(localStorage.getItem('dadosForm')) || [];
  listaDados = listaDados.filter((dados) => !(dados.endereco === endereco && dados.numero === numero));
  localStorage.setItem('dadosForm', JSON.stringify(listaDados));
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
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${inputEndereco.value}</td>
    <td>${inputNumero.value}</td>
    <td>${inputData.value}</td>
    <td>${inputValor.value}</td>
    <td><button class="btn btn-danger" onclick="deletar(this, '${inputEndereco.value}', '${inputNumero.value}')">Deletar</button></td>
  `;
  tbody.appendChild(newRow);

  // Limpa os campos do formulário
  form.reset();
});

// Carrega os dados do LocalStorage ao iniciar a página
window.onload = carregarDados;





