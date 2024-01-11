---
layout: ../../layouts/PublicationLayout.astro
title: Lançada versão 3.20 do Zod, com .pipe(), .coerce() e mais
date: 2022-12-14
author: Pablo Dinella
description: Nova versao do Zod traz diversas novidades e melhorias de qualidade de vida, entre elas o .pipe(), .coerce(), .datetime() e mais. Confira!
--- 


# Lançada versão 3.20 do Zod, com .pipe(), .coerce() e mais

No dia 12 de dezembro de 2022 foi lançada a nova versão do [Zod](https://zod.dev/), a [3.20](https://github.com/colinhacks/zod/releases/tag/v3.20). Zod é uma lib de parsing e validação de dados para Typescript. Sua principal característica é ser Typescript-first, o que faz com que ela tenha uma ótima integração e compatibilidade com o TS, além de seguir a filosofia de ["parse, don't validate"](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/), o que faz com que o aproveitamento do sitema de tipos do TS ser ainda maior. Há um [vídeo no meu canal](https://youtu.be/RCXa_Ofus1Q) com uma introdução ao Zod caso queira ver como funciona na prática.

Não há "breaking changes" nesta versão, exceto pelo fato de que agora só é suportado o TypeScript 4.5 para cima. Mas o que chama a atenção mesmo são as novas features:

## .pipe()

Agora temos um novo método `.pipe()`, que serve para "encadear" schemas. Tipicamente será usado com `.transform()`:

```typescript
z.string()
  .transform(val => val.length)
  .pipe(z.number().min(5))
``` 

Neste caso, primeiro o schema validará se o valor é uma string, depois transforma para a quantidade de caracteres que tem no valor, e por último valida se essa quantidade é de no mínimo 5.

Em outras palavras o código acima está validando se o valor é uma string de no mínimo 5 caracteres. Obviamente há outras formas de se validar isso, mas o `.pipe()` habilitará schemas mais complexos, sem necessidade de um código com uso de  `.refine()` por exemplo.

## .coerce()

O `.coerce()` é outro utilitário muito conveniente, que serve para converter valores de forma muito mais fácil, exemplo: 

```typescript
const schema = z.coerce.string();
schema.parse("tuna"); // => "tuna"
schema.parse(12); // => "12"
schema.parse(true); // => "true"
```

Todos os tipos primitivos são suportados: string, number, boolean, bigint, date.

## .catch()

Agora temos uma forma de "fallback", caso uma validação falhe. Exemplo: 

```typescript
const schema = z.string().catch("name");

schema.parse("kate"); // => "kate"
schema.parse(4); // => "name"
```

Perceba que `4` não é uma string válida, mas o schema não lançou um erro, no lugar disso, retornou o valor definido como fallback, "name".

## .datetime()

Agora é possível validar strings que contenham datas, exemplo: 

```typescript
const dt = z.string().datetime();
dt.parse("2020-01-01T00:00:00Z");
dt.parse("2020-01-01T00:00:00.123Z");
dt.parse("2020-01-01T00:00:00.123456Z");
```

Este método só funciona com datas dentro de strings, e que sejam UTC, ou seja, que terminam com `Z`, sem definição de timezone.

## Conclusão

Outras mudanças incluem suporte ao símbolos (`Symbol`), de acordo com as notas de release, uma feature muito aguardada (e que foi [implementada por um brasileiro](https://github.com/santosmarco-caribou)!), restrição para valores finitos, entre outros. Leia as [notas de release completa aqui](https://github.com/colinhacks/zod/releases/tag/v3.20).

E você, o que achou dessas novidades?