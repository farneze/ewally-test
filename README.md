# Teste da Ewally

### Leitor de Códigos de Boleto e Guias de Arracadação 
--------------

## Como executar o programa:

1. Faça o download dos arquivos para uma pasta
2. Crie um arquivo de nome '.env' na raiz do projeto e adicione o seguinte texto nele:
  ```
  PORT=8080
  ```
3. Abra um command prompt (ou terminal no Linux)na raiz do projeto e digite o comando:
  ```
  npm install
  ```
4. Após o término da execução do comando anterior, digite em seguida:
  ```
  node app.js
  ```
5. Utilizando um programa como o Postman ou Insomnia, utilize o endereço abaixo para testar os diferentes códigos, sendo que o código a ser digitado deve substituir o texto 'xxxxxx':
  ```
  http://localhost:8080/boleto/xxxxxx
  ```
  --------------