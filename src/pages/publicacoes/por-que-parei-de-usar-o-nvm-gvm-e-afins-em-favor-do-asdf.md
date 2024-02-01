---
layout: ../../layouts/PublicationLayout.astro
title: Por que parei de usar o nvm, gvm e afins em favor do asdf
date: 2024-01-22
author: Pablo Dinella
description: "O asdf substitui o nvm, gvm, rsvm, rvm e outros, com uma UX muito consistente e funcional"
--- 

# Por que parei de usar o nvm, gvm e afins em favor do asdf

Lembro que quando o Ruby e Node ficaram muito populares há alguns anos, logo começou a surgir um problema que era o gerenciamento de versões diferentes do ruby e node. Rapidamente também a comunidade desenvolveu diferentes técnicas para lidar com isso, e uma das que ficou mais popular até hoje são as ferramentas `ruby version manager` ([rvm](https://rvm.io/)) e `node version manager` ([nvm](https://github.com/nvm-sh/nvm)), no caso do ruby e node, respectivamente. 

Hoje em dia também temos gerenciadores de versão para Rust, Golang, Python, e tantas outras linguagens. O problema é que nem todas elas se comportam da mesma maneira, e inclusive com shells diferentes, como o [fish](https://fishshell.com/), é necessário usar wrappers de terceiros para que tudo funcione bem.

Pois bem, desde que conheci o [asdf](https://asdf-vm.com/) (creio que a primeira vez que ouvi falar foi através do [@RaphaelDevs](https://twitter.com/RaphaelDevs)), meu setup de um novo ambiente de trabalho ficou muito mais legal de fazer. A sintaxe é muito consistente e intuitiva, e gerencia versões para muitas linguagens (eu estou usando para node, golang e rust),

## Instalação

Para instalar você precisa ter o `curl`e `git` instalados, e caso prefira instalar via homebrew ou pacman por exemplo, há instrução para cada método aqui: [https://asdf-vm.com/guide/getting-started.html](https://asdf-vm.com/guide/getting-started.html).

Depois, para cada linguagem que você usa precisará instalar um plugin, por exemplo:

- Node: `asdf plugin-add nodejs`
- Golang: `asdf plugin-add golang`
- Rust: `asdf plugin-add rust`

Daí, basta instalar as versões que precisa, por exemplo:

- Node: `asdf install nodejs 20.8.1`  
- Golang: `asdf install golang 1.18.10`
- Rust: `asdf install rust 1.75.0`

Depois, defina as versões que quer usar de cada linguagem, globalmente:

- Node: `asdf global nodejs 20.8.1`  
- Golang: `asdf global golang 1.18.10`
- Rust: `asdf global rust 1.75.0`

Com o asdf, as versões devem ser sempre explícitas, não basta digitar `asdf install nodejs 20` por exemplo. É necessário especificar a versão por completo: `20.8.1`. Isso pode parecer chato, mas isto torna a ferramenta simples e com a usabilidade consistente.

Para ver as versões disponíveis pra baixar de uma linguagem, use `asdf list all nodejs`, trocando `nodejs` por sua linguagem. Você também pode colocar um prefixo no final, para listar todas as versões que começam com aquele número, por exemplo: `asdf list all nodejs 16`. Para listar apenas as instaladas, remova o termo `all`.

Percebeu como a UX é consistente? Os comandos seguem sempre a mesma lógica, só precisa mudar a linguagem.

## Definir versão por projeto

Bônus: se você tem um ou alguns projetos que usam uma versão diferente, você pode rodar `asdf local nodejs 16.20.2` no diretório do projeto, e o asdf automaticamente criará um arquivo `.tool-versions` dentro do diretório, e toda vez que entrar nele o seu node já estará na versão 16.20.2, enquanto o resto do sistema continuará usando o node global definido anteriormente. Prático né? Esse arquivo também pode ser comitado no seu git.

E aí, o que achou?
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIwNzI0Mzg1NV19
-->
