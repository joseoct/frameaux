<p align="center">
  <a href="https://unform.dev">
    <img src="https://i.imgur.com/pdGuGwr.png" alt="Frameaux_logo" />
  </a>
</p>

<p align="center">Plataforma para auxiliar o aprendizado de tecnologias multiplataforma para o desenvolvimento de dispositivos móveis.
</p>

## Backend
Aplicação responsável por servir dados para as aplicações web e móvel. 

#### Diagrama de classe do sistema
<img src="https://i.imgur.com/OMRTUIq.png" height="980px" alt="DiagramaClasse" />

Os cargos são definidos por um UUID e nome. São três os nomes de cargos
que são definidos: administrador, criador de conteúdo e estudante.

Os usuários são definidos por um UUID, nome, e-mail e senha. Além disso,
possui uma relação do tipo associação 1:N (um para muitos) com Cargo, ou seja, cada
usuário tem um cargo e um cargo pode ter vários usuários.

Tecnologias são definidas por um UUID, nome e pelo caminho da imagem da
sua logo, salva de forma estática no servidor.

Tópicos são definidos por um UUID, nome, explicação e por uma camada.

Tópicos são relacionados com tecnologias através da composição 1:N (um para
muitos), cada tópico está dentro de uma tecnologia, que no que lhe concerne possui
vários tópicos. Por ser um relacionamento do tipo composição, tópicos só existem se
uma tecnologia existir. Caso alguma tecnologia seja excluída todos os seus
respectivos tópicos também serão excluídos.

Níveis são definidos por um UUID e por uma dificuldade. Estão ligados
diretamente à entidade Tópico por um relacionamento do tipo composição 1:3 (um
para três), ou seja, um nível está atrelado a um tópico, que no que lhe concerne, terá
apenas três níveis com dificuldades de 1 a 3.

Os exercícios são definidos, de forma abstrata, por um UUID, enunciado e
tipo. Possui uma relação do tipo composição 1:N (um para muitos) com Nível, um
exercício está contido dentro de um nível que, em contrapartida, possui zero ou vários
exercícios. Exercícios só existem se relacionados com algum nível, se algum nível é
excluído todos os exercícios relacionados a ela também serão excluídos. Exercícios
são definidos como abstratos, pois podem ser implementados tipos diferentes de
exercícios.

Para implementar um novo tipo de exercício, deve-se definir quais os atributos
do exercício e, em seguida, implementá-lo no backend, frontend e mobile. Foram
implementados exercícios inspirados em dois tipos de exercícios que o Duolingo
emprega em seu aplicativo: “Marque o significado correto”, adaptado para “Exercício
de Alternativa” e “Organize todas as palavras”, adaptado para “Exercício de
Sequência” (DUOLINGO, 2015). Exercícios de alternativas podem ser definidos por
um conjunto de alternativas com uma correta. De modo a padronizar, exercícios de 
alternativas podem conter, em seu conjunto, de duas a quatro alternativas. Exercícios
de sequência são definidos por um conjunto de itens (palavras, frases, números,
expressões numéricas, dentre outros), em ordem, de modo a se formar uma
sequência coerente. Para que a sequência seja coerente deve haver pelo menos dois
itens e que a junção destes itens, na ordem em que forem colocados, faça sentido.
Por exemplo, a expressão 80 + 20 = 100 só fará sentido se os números e símbolos
estiverem exatamente nesta ordem.

Também é definida uma entidade associativa Usuário-Tecnologia que
relaciona usuário com tecnologia e tem por atributo “camada atual”, que se refere a
qual camada o estudante está naquele momento. Há dois casos que esta relação é
empregada no sistema. A primeira é um usuário que tenha o cargo de criador de
conteúdo seja relacionado com alguma tecnologia. Por exemplo, o usuário de nome
João, que tenha o cargo de criador de conteúdo seja relacionado com a tecnologia
React Native, portanto, pode-se afirmar que João é responsável por criar conteúdo de
React Native. Neste relacionamento, a camada atual é recebida com nulo, pois este
atributo só se refere ao progresso de estudantes. Se algum criador de conteúdo
desejar também ser um estudante, ele deverá criar outra conta com um e-mail
diferente para acessar o conteúdo das tecnologias cadastradas como estudante. A
segunda é um usuário com o cargo de estudante tentar acessar conteúdos de alguma
tecnologia, após o primeiro contato do estudante com a tecnologia, o relacionamento
dos dois é registrado e o atributo camada atual é recebido com 1. Por exemplo, o
usuário José, que tenha o cargo de estudante, tenta acessar os conteúdos da
tecnologia React Native. Após o primeiro acesso, José será estudante de React Native
e sua camada atual será 1.

Para demarcar o progresso do estudante em determinado tópico é definida a
entidade associativa Usuário-Tópico que tem como atributos atenção e “dificuldade
atual”, que se refere a que dificuldade o estudante está no tópico. Ao primeiro acesso
do estudante em algum tópico a relação dos dois é concretizada e o atributo
dificuldade atual é recebida com 1.

As classes foram implementadas no backend e seus dados são manipulados
através de chamadas às rotas, que são associações entre um método HTTP, uma
URL e um método de um controlador responsável por processar a requisição e gerar
uma resposta às aplicações clientes.

table {
    width:100%;
}

#### Rotas do backend
Tipo | Rota | Cargos | Descrição
--- | --- | --- | --- 
GET | 1. `/dashboard` | Administrador | Retorna número de tecnologias, criadores de conteúdo e estudantes
POST | 2. `/content-creators` | Administrador | Cria um criador de conteúdo
GET | 3. `/content-creators` | Administrador | Lista criadores de conteúdoe tecnologias em que foram alocados.
POST | 4. `/students` | - | Cria um estudante
GET | 5. `/profile` | Administrador, criador de conteúdo, estudante | Retorna informações do usuário, incluindo seu cargo
POST | 6. `/sessions` | Administrador, criador de conteúdo, estudante | Envia as credenciais de conexão, se forem validadas, retorna informações do usuário e um JWT válido
POST | 7. `/content-creators-technologies` | Administrador | Cria uma tecnologia e aloca criadores de conteúdo à tecnologia criadaGET8. /content-creators-technologiesAdministradorLista todas as tecnologias e seus criadores de conteúdo responsáveis
DELETE | 9. `/technologies/:technology_id` | Administrador | Deleta a tecnologia informada na rota e a relação com todos os usuários
GET | 10. `/user/technologies` | Criador de conteúdo, estudante | Lista todas as tecnologias que fazem relação com o usuário
POST | 11. `/technologies/:technology_id` | Criador de conteúdo | Cria um tópico que faz relação à tecnologia informada na rota
GET | 12. `/technologies/:technology_id/topics` | Criador de conteúdo, estudante | Lista todos os tópicos que fazem relação à tecnologia informada na rota
PUT | 13. `/topics/:topic_id` | Criador de conteúdo | Atualiza o tópico informado na rota
DELETE | 14. `/topics/:topic_id` | Criador de conteúdo | Deleta o tópico informado na rota
GET | 15. `/technologies/topics/:topic_id/levels` | Criador de conteúdo | Lista todos os níveis que fazem relação ao tópico informado na rota, incluindo a listagem de todos os exercícios por nível
POST | 16. `/technologies/topics/levels/`<br>`:level_id/alternative-exercise` | Criador de conteúdo | Cria um exercício de alternativas que faz relação ao nível informado na rota
POST | 17. `/technologies/topics/levels/`<br>`:level_id/sequency-exercise` | Criador de conteúdo | Cria um exercício de sequência que faz relação ao nível informado na rota
DELETE | 18. `/exercises/:exercise_id` | Criador de conteúdo | Deleta o exercício informado na rota
GET | 19. `/technologies` | Estudante | Lista todas as tecnologias
POST | 20. `/students-technologies/:technology_id` | Estudante | Cria a relação do estudante com a tecnologia informada na rota e define sua camada atual como 1
GET | 21. `/technologies/:technology_id/test` | Estudante | Retorna os exercícios do teste da tecnologia informada na rota
PATCH | 22. `/students-technologies/`<br>`:technology_id/:currentExercise.layer` | Estudante | Atualiza a camada atual do estudante na tecnologia informada na rota conforme seu desempenho no teste
GET | 23. `/students-technologies/:technology_id` | Estudante | Retorna a camada atual e as coroas do estudante em relação à tecnologia informada na rota. Além disso retorna as coroas totais da tecnologia
GET | 24. `/technologies/topics/`<br>`:topic_id/:difficulty` | Estudante | Retorna todos os exercícios do nível cuja dificuldade é passada na e que é relacionado ao tópico informado
POST | 25. `/students-topics/:topic_id` | Estudante | Cria a relação do estudante com o tópico informado na rota e define sua dificuldade atual como 1
PATCH | 26. `/students-topics/:topic_id` | Estudante | Atualiza a dificuldade atual do estudante em relação ao tópico informado na rota conforme seu desempenho ao realizar exercícios de algum nível
















