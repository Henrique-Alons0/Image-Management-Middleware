# Image Management Middleware API

Uma API desenvolvida com **Nest.js** para upload e processamento de imagens. Esta aplicação permite receber imagens em diversos formatos, redimensioná-las para 3800 x 3000 pixels e retorná-las no formato desejado como uma string em base64. A API foi projetada para atender aos padrões e políticas de recebimento de imagens da empresa.

## Funcionalidades

- **Upload de imagens**: Recebe imagens via endpoint.
- **Redimensionamento automático**: Redimensiona imagens para 3800 x 3000 pixels.
- **Suporte a múltiplos formatos**: Aceita JPEG, PNG, WebP, GIF e TIFF.
- **Resposta em base64**: Retorna a imagem processada como uma string em base64.

## Tecnologias Utilizadas

- [Nest.js](https://nestjs.com/)
- [Sharp](https://sharp.pixelplumbing.com/) (para processamento de imagens)
- [TypeScript](https://www.typescriptlang.org/)

## Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v14 ou superior)
- [npm](https://www.npmjs.com/) (geralmente incluído com o Node.js)

### Passos

1. Clone o repositório:
  ```bash
    git clone https://github.com/Henrique-Alons0/Image-Management-Middleware.git

2. Navegue até o diretório do projeto:
  ```bash
    cd Image-Management-Middleware

3. Instale as dependências:
  ```bash
    npm install

4. Clone o repositório:
  ```bash
    npm run start

## Endpoints

### POST image/upload

- **Descrição**: Recebe uma imagem, processa, redimensiona e devolve a imagem ajustada (3800 x 3000).
- **Corpo da Requisição:**:
  - **Formato:**: multipart/form-data.
  - **Campo:**: file (imagem a ser carregada).
- **Resposta:**:
  ```json
    {
      "message": "Image processed successfully",
      "image": "data:image/jpeg;base64,..."
    }
  ```

# Licença

Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para mais detalhes.

