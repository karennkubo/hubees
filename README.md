# Teste Netpark/Hubees Backend:

[Documentação](https://documenter.getpostman.com/view/20352445/UzJPMajp)

### A API a seguir foi desenvolvida com Typescript utilizando Express que realiza as operações simples de CRUD (Create, Read, Update e Delete) de um estabelecimento que vende bicicletas e retorna, se bem sucedido, características do(s) produto(s). Uma bicicleta possui os seguintes atributos:

<li>Cor</li>
<li>Número de marchas</li>
<li>Marca</li>
<li>Modelo</li>
<li>Preço</li>

### As rotas da API possuem as seguintes funções:

<strong>ADICIONAR UMA BICICLETA</strong>
</br>
<em>Ao se adicionar o descritivo da bicicleta no corpo da requisição, um usuário consegue postar o produto no catálogo da empresa. É importante ressaltar que se o produto já existir nessa base de dados, ele não pode ser inserido novamente a menos que seja vendido.</em>
</br>
<strong>VENDER UMA BICICLETA</strong>
</br>
<em>Para vender uma bicicleta, o usuário deve informar no corpo da requisição o id desse produto (assim, ele também será removido da base dados).</em>
</br>
<strong>ATUALIZAR O PREÇO DE UM PRODUTO</strong>
</br>
<em>Para vender uma bicicleta, o usuário deve informar como parâmetro o id desse produto (no link) e ele deve estar armazenado no banco de dados e no corpo da requisição deve-se ser inserido o novo preço.</em>
</br>
<strong>SELECIONAR OS PRODUTOS</strong>
</br>
<em>Ao ser utilizado, esse endpoint retorna todos os produtos cadastrados no catálogo, porém, podem ser adicionados filtros e ordenações nessa funcionalidade - através da query: (OBS.: Ambas as funcionalidades a seguir podem ser utilizadas concomitantemente de acordo com a necessidade do usuário.)
<li><strong>Color</strong>: Filtra os produtos selecionados de acordo com a cor que o usuário selecionou.</li>
<li><strong>Order</strong>: Ordena os produtos selecionados de acordo com o preço - podendo ser "asc" (ascendente) ou "desc" (decrescente).</li>
