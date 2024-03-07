# Lexart Teste FullStack Javascript

### Link do deploy na Vercel: https://cellphone-store-g0ejrp03v-rafaelcunhas.vercel.app/

### Rotas da API:

- `POST /user`: Cria um novo usuário.

- `POST /user/login`: Autenticação do usuário.

- `GET /cellphone`: Retorna uma lista com no máximo 10 celulares, e com opções de filtros e paginação.

  - _category_: Categoria pela qual quer fazer o filtro. Opções: ['brand', 'model', 'name', 'color'].
  - _search_: Palavra pela qual quer filtrar.
  - _sort_: Ordenação pelo preço dos celulares. Opções: ['asc', 'desc']
  - _page_: Página que deseja obter.
  - _size_: Itens a serem retornados. Limite: 10.

- `GET /cellphone/:id`: Retorna um celular pelo seu id.

- `POST /cellphone`: Cria um novo celular.

- `PUT /cellphone`: Atualiza um celular.

- `DELETE /cellphone`: Deleta um celular.
