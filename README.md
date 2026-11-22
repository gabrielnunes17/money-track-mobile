# Money Track Mobile

Aplicativo mobile de controle financeiro para consultar, cadastrar, editar e
remover despesas.

## Requisitos

- Node.js e npm
- Expo Go em um dispositivo Android ou iOS, ou um emulador/simulador
- API de despesas em execução e acessível pela rede

## Instalação

Na raiz do projeto, instale as dependências:

```bash
npm install
```

## Configuração da API

O aplicativo consome a API REST de despesas. Antes de iniciar, abra
[`src/services/api.js`](src/services/api.js) e ajuste `API_URL` para o endereço
da API em execução, incluindo o prefixo `/api` (por exemplo,
`http://192.168.1.25:3000/api`).

Em um dispositivo físico, use o endereço IP da máquina que executa a API e
conecte o celular e a máquina à mesma rede Wi-Fi. O endereço `localhost` no
celular aponta para o próprio celular, não para o computador. Verifique também
se a porta da API está liberada no firewall.

A API deve disponibilizar estes endpoints:

| Método | Endpoint | Operação |
| --- | --- | --- |
| `GET` | `/despesas` | Listar despesas |
| `GET` | `/despesas/:id` | Consultar uma despesa |
| `POST` | `/despesas` | Cadastrar uma despesa |
| `PUT` | `/despesas/:id` | Atualizar uma despesa |
| `DELETE` | `/despesas/:id` | Remover uma despesa |

O cadastro envia `descricao`, `valor`, `categoria`, `data` e `observacao`.

## Executar o aplicativo

Inicie o servidor de desenvolvimento Expo:

```bash
npm start
```

Escaneie o QR code exibido no terminal com o Expo Go. O computador e o
dispositivo devem estar na mesma rede.

Para iniciar diretamente em um dispositivo ou emulador conectado:

```bash
npm run android
npm run ios
```

O comando para iOS requer macOS com simulador configurado; em um iPhone, use o
Expo Go e o QR code.
