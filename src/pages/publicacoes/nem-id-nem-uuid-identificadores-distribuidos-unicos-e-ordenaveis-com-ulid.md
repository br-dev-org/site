---
layout: ../../layouts/PublicationLayout.astro
title: >
    Nem ID nem UUID: identificadores distribuídos, únicos e ordenáveis com ULID
date: 2022-12-22
author: Pablo Dinella
description: Enquanto UUIDs são uma boa alternativa aos IDs sequenciais, ULIDs oferecem vantagens mais interessante, unindo o melhor dos dois mundos
--- 


## Nem ID nem UUID: identificadores distribuídos, únicos e ordenáveis com ULID 

Se você trabalha com desenvolvimento web provavelmente já deve saber que IDs sequenciais não são muito recomendados por alguns motivos. O UUIDv4 é uma alternativa bastante utilizada para gerar identificadores únicos aleatórios, porém não passa muito disso.

Uma nova alternativa mais interessante existe no mercado há algum tempo: ULIDs. É parecido com o UUID, porém com algumas vantagens bem interessantes:

- São lexicograficamente ordenáveis! 
Ou seja, tem a mesma característica de sequencialidade dos IDs
- Geração de identificadores distribuídos
Se você gerar um ULID em 2 lugares diferentes, eles serão únicos e ordenáveis entre si
- Possui 26 caracteres
Em vez dos 36 caracteres dos UUIDs, o que os tornam mais acessíveis para utilização em URLs por exemplo
- São case insensitive
Não tem diferença entre maiúsculas e minúsculas
- Sem caracteres especiais
Seguros para usar em URLs
- Não utiliza as letras I, L, O, e U
Isso evita confusões e fraudes em URLs por exemplo

Interessante, não? Vale lembrar no entanto, que a especificação do ULID não tem evoluído recentemente, [algumas discussões](https://news.ycombinator.com/item?id=31716140) têm apontado alguns problemas. Uma iniciativa mais recente em [novas versões do UUID](https://www.ietf.org/archive/id/draft-peabody-dispatch-new-uuid-format-04.html) que atende a necessidade de identificadores únicos distribuídos parece estar agradando mais os desenvolvedores, com a expectativa de que seja uma spec mais rígida e bem mantida a longo prazo, porém sem muitas implementações sólidas ainda.
