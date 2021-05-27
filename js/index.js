const tipoVistaClientes = document.getElementById('tipo-vista-clientes');
tipoVistaClientes.addEventListener('change', (event) => {
  const idVista = event.currentTarget.value;

  if (idVista === 'table') {
    obtenerClientes().then(cargarClientesEnTabla);
  } else {
    obtenerClientes().then(cargarClientesEnSelect);
  }
});

async function obtenerClientes() {
  const url = 'https://jsonplaceholder.typicode.com/users';

  const response = await fetch(url);
  const clientes = await response.json();

  return clientes;
}

function cargarClientesEnSelect(clientes) {
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

function cargarClientesEnTabla(clientes) {
  const clientesContainer = document.getElementById('clientes-container');

  const infoCliente = document.getElementById('info-cliente');

  infoCliente.innerHTML = '';

  let htmlDeLaTabla = `<table class="table">
                         <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Usuario</th>
                                <th>E-mail</th>
                            </tr>
                         </thead>
                         <tbody>`;

  for (cliente of clientes) {
    htmlDeLaTabla += `<tr>
                        <td>${cliente.name}</td>
                        <td>${cliente.username}</td>
                        <td>${cliente.email}</td>
                      </tr>`;
  }

  htmlDeLaTabla += '</tbody></table>';

  clientesContainer.innerHTML = htmlDeLaTabla;
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
