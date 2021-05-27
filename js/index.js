async function obtenerClientes() {
  const url = 'https://jsonplaceholder.typicode.com/users';

  const response = await fetch(url);
  const clientes = await response.json();

  return clientes;
}

function cargarClientes(clientes) {
  const clientesContainer = document.getElementById('clientes-container');

  let htmlDelSelect = '<select id="select-clientes">';

  for (cliente of clientes) {
    htmlDelSelect += `<option value="${cliente.id}">${cliente.name}</option>`;
  }

  htmlDelSelect += '</select>';

  clientesContainer.innerHTML = htmlDelSelect;

  const selectClientes = document.getElementById('select-clientes');

  selectClientes.addEventListener('change', (event) => {
    const idCliente = event.target.value;

    obtenerCliente(idCliente);
  });
}

async function obtenerCliente(idCliente) {
  const url = `https://jsonplaceholder.typicode.com/users/${idCliente}`;

  const response = await fetch(url);
  const cliente = await response.json();

  mostrarInfoCliente(cliente);
}

function mostrarInfoCliente(cliente) {
  const infoCliente = `<ul>
                            <li>${cliente.name}</li>
                            <li>${cliente.username}</li>
                            <li>${cliente.email}</li>
                       </ul>`;

  const infoClienteContainer = document.getElementById('info-cliente');

  infoClienteContainer.innerHTML = infoCliente;
}

obtenerClientes().then(cargarClientes);
