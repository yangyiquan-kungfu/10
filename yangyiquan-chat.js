/**
 * ═══════════════════════════════════════════════════════════════
 *  YANGYIQUAN FA — WIDGET DE CHAT NATIVO
 *  Versão: 3.0 Elite | Engenharia: Sistema Yangyiquan Fa
 *  Arquitetura: HTML + CSS + IA em ficheiro único autocontido
 * ═══════════════════════════════════════════════════════════════
 *
 *  CONFIGURAÇÃO RÁPIDA:
 *  1. Coloca este ficheiro no mesmo diretório que o teu index.html
 *  2. No index.html, antes de </body>, insere:
 *     <script src="yangyiquan-chat.js"></script>
 *
 *  ATIVAR API REAL (quando tiveres billing ativo):
 *  Muda a linha: const API_KEY = '';
 *  Para:         const API_KEY = 'sk-ant-api03-TUA_CHAVE_AQUI';
 * ═══════════════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────
   * CONFIGURAÇÃO — edita apenas aqui
   * ───────────────────────────────────────────────────────────── */
  const API_KEY   = '';           // Deixa vazio para Modo Simulação
  const MODEL     = 'claude-sonnet-4-20250514';
  const MAX_TOKENS = 900;

// ═══════════════════════════════════════════════════════════════════════════
// BASE DE RESPOSTAS YANGYIQUAN FA — v4.0
// Extraída directamente dos livros do Instrutor Pedro P. da Fonseca
// Cobre: iniciantes, praticantes, especialistas em Kung Fu
// ═══════════════════════════════════════════════════════════════════════════

const SIM_DB = [

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 1 — IDENTIDADE DO SISTEMA (iniciantes + curiosos)
// ─────────────────────────────────────────────────────────────────────────
{k:['o que é','what is','qué es','yangyiquan','que es','sistema','estilo','arte','kung fu','wushu','marcial','para que','para quê','beginners','principiante','iniciante'],
r:`O Yangyiquan Fa — 阳意拳法 — é o Punho da Luz da Intenção. Não é um estilo entre muitos: é um cosmos marcial completo, desenvolvido pelo Instrutor Pedro P. da Fonseca a partir da síntese da tradição marcial chinesa com a perspectiva cultural portuguesa.

O nome revela a essência: 阳 (Yáng) — Luz, princípio luminoso e activo; 意 (Yì) — Intenção, a mente que precede cada movimento; 拳 (Quán) — Sistema de combate estruturado. A supremacia não reside na força muscular nem na velocidade bruta — reside na clareza e pureza da intenção que precede, acompanha e transcende cada acção.

O sistema é completo: três pilares internos (Yi, Qi, Dan Tian), nove poderes do Nei Gong, seis técnicas do Dragão e o Dao Zhiliao como medicina marcial. A academia em Granada abre em Julho — <a href="https://wa.me/34674471678?text=Hola%21+Quiero+informaci%C3%B3n+sobre+el+Yangyiquan+Fa." target="_blank" style="color:#FFD700">contacta aqui</a>.`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 2 — YI: A INTENÇÃO (iniciantes + praticantes)
// ─────────────────────────────────────────────────────────────────────────
{k:['yi','intenção','intención','intention','mental','mente','mind','pensamiento','pensamento','consciência','consciencia','mente marcial','iluminação','iluminacion'],
r:`O Yi (意) é o princípio organizador supremo do Yangyiquan. Existe antes do movimento, antes do golpe, antes do combate. O sistema postula que sem Yi não existe Wushu verdadeiro.

Como o Instrutor Pedro P. da Fonseca escreve nos seus livros: "A maior guerra que venceste é aquela que não começaste." O Yi opera em três dimensões: a guerra exterior (o combate físico), a guerra interior (o combate contra os próprios medos e limitações) e a guerra cósmica (o confronto entre luz e escuridão). O guerreiro que domina o seu Yi domina as três em simultâneo.

Na prática: a intenção precede o movimento em fracções de segundo. O adversário lê o corpo — mas o corpo é precedido pela mente. Quem domina o Yi torna-se, literalmente, imprevisível.`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 3 — QI: A ENERGIA (praticantes + curiosos)
// ─────────────────────────────────────────────────────────────────────────
{k:['qi','chi','energia','energy','energía','respiração','respiracion','breath','respirar','breathing','prana','vital','força vital','ki'],
r:`O Qi (气) transporta a informação do universo. O ar que respiramos carrega o pensamento e a intenção de todo o ser vivo — quem aprende a ler o Qi, lê o adversário antes de este atacar.

O ensinamento central do Instrutor é directo: "Não respiras? O medo dominar-te-á. Mas se inspiras perante o medo, ele já não te domina." A respiração não é apenas fisiológica — é o veículo do poder marcial.

O Qi no Yangyiquan actua em três níveis: como energia de combate (Fajin, a emissão explosiva de força), como informação táctica (ler o estado energético do adversário via Shén Shí) e como medicina (o Dao Zhiliao usa o Qi para curar tecidos e restaurar equilíbrio). Trabalhar o Qi é o que diferencia um atleta de um guerreiro.`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 4 — DAN TIAN e FAJIN (praticantes intermédios + avançados)
// ─────────────────────────────────────────────────────────────────────────
{k:['dan tian','dantian','fajin','emissão','emision','força','power','centro','hara','koshi','rotação','rotacion','quadril','cadera','hip'],
r:`O Dan Tian (丹田) — o Campo do Elixir — é a origem de todo o poder real no Yangyiquan. O sistema distingue três: o Xia Dantian (baixo ventre, origem do Fajin físico), o Zhong Dantian (peito, associado às emoções e à respiração) e o Shang Dantian (terceiro olho, associado ao Shen — o Espírito).

O Fajin nasce no Xia Dantian. A cadeia cinética completa: terra → pés → joelhos → anca → coluna → ombro → cotovelo → punho. O Long Tian Quan (Soco do Dragão Celestial) é exemplo desta cadeia na vertical — "é um soco potentíssimo se feito com Fajin, onde o mesmo começa desde os pés e percorre o corpo até ao punho."

Sem Dan Tian activado, as técnicas são apenas ginástica. Com Dan Tian, qualquer técnica torna-se uma arma real.`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 5 — NEI GONG GERAL (praticantes + especialistas)
// ─────────────────────────────────────────────────────────────────────────
{k:['nei gong','neigong','qigong','qi gong','gong','poderes','powers','interno','internal','poderes internos','9 poderes','nove poderes','espiritual','energético'],
r:`O Nei Gong (內功) do Yangyiquan estrutura-se em 9 Poderes Internos — articulados e nomeados pelo Instrutor Pedro P. da Fonseca — constituindo um sistema psicológico-espiritual comparável aos grandes sistemas de Nei Gong da tradição clássica chinesa.

4 Poderes Extremos (Sì Jí Fǎ):
I. Yǐ Jīng (应) — O Já Está: visão omnisciente, 7 Chaves do domínio da realidade
II. Tiān (天) — O Céu: alinhamento com as leis universais, intuição marcial de alta precisão
III. Dì Cí (地磁) — A Terra-Íman: enraizamento e base do Fajin
IV. Dì Yù (地狱) — O Submundo: transformação das sombras em poder marcial

5 Poderes Intermédios (Wǔ Zhōng Fǎ):
V. Shén Shí (神识) — O Coração do Outro
VI. Chuāng Zào (创造) — A Criação
VII. Zhǎn (斩) — O Corte
VIII. Bǎo (宝) — O Tesouro Oculto
IX. Zhì (至) — O Imortal

Cada poder amplifica os restantes. Não são técnicas — são estados de ser.`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 6 — YI JING: O JÁ ESTÁ (avançados + filosóficos)
// ─────────────────────────────────────────────────────────────────────────
{k:['yi jing','yijing','já está','ya está','visão','vision','omnisciente','omniscient','chaves','claves','7 chaves','domínio da realidade','poder extremo','sì jí'],
r:`O Yǐ Jīng (应) — O Já Está — é o primeiro e supremo Poder Extremo. Representa o domínio da verdade final: imutável, eterna, anterior ao combate.

As 7 Chaves do Yǐ Jīng, conforme o Instrutor escreve no Vol. I:
1. Visualiza — a imaginação abre a realidade
2. Entende e medita — na fronteira entre Loucura e Sabedoria
3. Fala, liberta-te e domina
4. Semeia com a tua intenção — que a tua palavra perfure o tempo
5. Recorda: o Chefe em ti chama-te
6. Domina sobre tudo — segundo o teu nível espiritual
7. Queres mais? Sê a própria Fonte

"O que acontece é como um dragão que vive no abismo do mar: escondido, mas sempre presente." O praticante que cultiva o Yǐ Jīng percebe o combate antes de este existir.`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 7 — SHEN SHI: O CORAÇÃO DO OUTRO (avançados)
// ─────────────────────────────────────────────────────────────────────────
{k:['shen shi','shén shí','coração outro','corazón','empatia','empatía','leitura','lectura','percepção','percepcion','adversário','adversario','ler o outro','sentir','intuição','intuicion'],
r:`O Shén Shí (神识) — O Coração do Outro — é o quinto Poder Interno. É a capacidade de se colocar no espaço emocional do adversário, sentindo directamente as suas motivações e medos.

Não é telepatia — é atenção treinada ao nível mais profundo. O praticante com Shén Shí desenvolvido antecipa não só os movimentos físicos mas a estratégia psicológica completa do adversário. Como o Instrutor ensina: "O guerreiro verdadeiro conquista primeiro o seu mundo interior, e desde essa fortaleza de paz enfrenta o mundo exterior com uma serenidade que confunde e paralisa o adversário."

O Shén Shí tem também aplicação terapêutica no Dao Zhiliao: a empatia profunda como instrumento de diagnóstico. O terapeuta que domina o Shén Shí sente onde está o bloqueio energético antes de o paciente o nomear.`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 8 — ZHAN: O CORTE (filosófico + avançado)
// ─────────────────────────────────────────────────────────────────────────
{k:['zhan','zhǎn','corte','cut','decapitar','exterminar','eliminar','libertar','medo','miedo','fear','limitação','limitacion','correntes','cadenas'],
r:`O Zhǎn (斩) — O Corte — é o sétimo Poder Interno e um dos mais transformadores. Significa Cortar, Decapitar, Exterminar — mas o verdadeiro campo de batalha é interior.

Como escreve o Instrutor: o maior inimigo do guerreiro não está à sua frente. Está dentro: os medos, as limitações mentais, as correntes kármicas que impedem a acção limpa e plena. O Zhǎn corta esses vínculos antes que o combate físico sequer comece.

Na prática marcial: o praticante que ainda hesita no momento do golpe não dominou o Zhǎn. A hesitação nasce do medo, e o medo é uma corrente interior. O Zhǎn não elimina o adversário — elimina o que te impede de ser um guerreiro pleno. Depois disso, o adversário torna-se secundário.`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 9 — LONG DI QUAN (praticantes + especialistas)
// ─────────────────────────────────────────────────────────────────────────
{k:['long di quan','soco terra','golpe terrestre','soco horizontal','direto','directo','jab','cross','soco','punch','golpe','puñetazo'],
r:`O Long Dǐ Quán (龙地拳) — O Soco do Dragão na Terra — é a primeira e mais fundamental das 6 Técnicas do Dragão.

Biomecânica (conforme o Vol. II): golpe horizontal devastador executado desde a posição de guarda com rotação de anca completa. O punho viaja em trajectória paralela ao solo — simbolizando a estabilidade terrena — gerando força através da cadeia cinética pés-joelhos-anca-coluna-ombro-cotovelo-punho. A mão traseira permanece retraída na anca simulando um agarre prévio que amplifica a potência por contratensão.

Aplicações múltiplas: à cara, plexo solar, esterno, boca do estômago, genitais, pescoço, costelas (se perpendicular) e nuca (pela retaguarda). "A seguir a este soco pode vir uma joelhada com a perna da frente." Cada técnica tem mais que uma posição; cada posição tem mais que uma aplicação.`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 10 — LONG SHAN ZHAO: GARRAS DO DRAGÃO (especialistas)
// ─────────────────────────────────────────────────────────────────────────
{k:['long shan zhao','garra','claw','faca mão','cutelo','knife hand','karate chop','controlo','agarre','pescoço','garganta','cuello','throat','faca','fila'],
r:`O Long Shǎn Zhǎo (龙闪爪) — O Dragão Estende a Garra — é a segunda técnica, com múltiplas aplicações de alta precisão.

Do Vol. II: "Serve como um ataque ao pescoço com a faca da mão, ou o cutelo da mão; serve também como um espetar na garganta com a própria garra ou nos olhos. Fazendo uma distracção para prosseguir com uma sequência de ataques. Serve para manter a distância do adversário, e para agarrar — aqui é onde entra a mão de trás: soco após o agarre."

Advertência do Instrutor: "Cuidado para não te partirem os dedos. Fortalece-os. Fortalece a tua mão para que se te baterem nela se magoem e não te magoes tu." A mão aberta exige domínio técnico e emocional. Na ira perde-se o controlo — por isso o treino deve ser até que o corpo recorde pelo Shen Fa mesmo quando a mente falha.`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 11 — LONG TIAN QUAN: GOLPE CELESTIAL (especialistas)
// ─────────────────────────────────────────────────────────────────────────
{k:['long tian quan','uppercut','soco celestial','ascendente','gancho','hook','vertical','soco cima','punch up'],
r:`O Long Tiān Quán (龙天拳) — O Soco do Dragão Celestial — é o terceiro golpe do arsenal, de trayectória vertical que "chega ao céu".

Biomecânica: pode ser executado como gancho ou soco directo, pode simbolizar um agarre à roupa com a mão de trás a atacar. "Este soco é potentíssimo se feito com Fajin, onde o mesmo começa desde os pés e percorre o corpo até ao punho. O Fajin pode de igual modo nascer no ventre ou no Xia Dantian."

O Instrutor explica os três Dan Tian em contexto desta técnica: o Xia Dantian (baixo ventre) para o Fajin físico puro, o Zhong Dantian (peito) para a versão mais expressiva, e o Shang Dantian (terceiro olho) para a mais subtil. Aplicações: ventre, esterno, mandíbula, genitais (de baixo para cima), cimo da cabeça (descendente).`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 12 — LONG WEI BIAN: CHICOTE (especialistas)
// ─────────────────────────────────────────────────────────────────────────
{k:['long wei bian','chicote','whip','cauda dragão','backfist','roundhouse','circular','chute','pontapé circular','velocidade'],
r:`O Long Wěi Biān (龙尾鞭) — A Cauda do Dragão em Chicote — possui o nome derivado da forma: como a cauda de um dragão que chicoteia para baixo após a sua subida.

Do Vol. II: "Para cima defende, e quando vai para baixo ataca. Mas também pode ser uma defesa anteriormente ao ataque com o antebraço no pescoço ou com o pulso no queixo." É simultaneamente defesa e ataque — a posição de defesa dissolve-se numa contra-ofensiva sem interrupção perceptível.

Exemplo táctico: "Supondo que a mão direita agarra o braço esquerdo e de seguida o adversário tenta socar com o braço direito — é aí que entra esta defesa do chicote da cauda do dragão." A velocidade do chicote nasce da relaxação total durante a trajectória e da tensão explosiva apenas no ponto de impacto. Sem relaxação, não há chicote — há empurrão.`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 13 — LONG SUAI JIAO: PROJECÇÃO (Na + Shuai, especialistas)
// ─────────────────────────────────────────────────────────────────────────
{k:['long suai jiao','projeção','proyeccion','throw','takedown','derruba','judo','wrestling','luta no chão','grappling','agarrar','agarre','llave','key lock'],
r:`O Long Suāi Jiǎo (龙摔角) — Quebra a Mandíbula — cobre a taxonomia Na (llaves) e Shuai (projecções) do sistema Ti-Da-Na-Shuai completo.

O arsenal de projecções inclui: barridos de pernas, projecções de anca, derrube de estrutura via ataque aos pilares (joelhos e tornozelos), e projecções de agarre combinado mão-perna. O Vol. II descreve uma sequência específica do Long Yu Shang: "projecção de agarre com uma das mãos por debaixo dos genitais e a outra a puxa o adversário para cima, e quando a técnica estiver no auge, então despenhar o inimigo para o chão. De preferência de cabeça."

Princípio táctico: a desestruturação precede a projecção. Nunca se projecta alguém que ainda está de pé e equilibrado — primeiro destroem-se os seus pilares (atenção à base, ao equilíbrio, à intenção).`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 14 — LONG ZHAN YI: ABRE AS ASAS (técnica suprema)
// ─────────────────────────────────────────────────────────────────────────
{k:['long zhan yi','abre asas','wings','técnica suprema','expansão','explosion','multiple','sequência','combination','combo'],
r:`O Long Zhàn Yì (龙战意) — Abre as Asas — é a sexta e suprema técnica do arsenal, caracterizada pela expansão explosiva simultânea em múltiplos vectores.

Enquanto as outras técnicas são lineares ou circulares, o Long Zhàn Yì é radial: o guerreiro expande-se em todas as direcções ao mesmo tempo, impossibilitando a leitura da trajectória pelo adversário. É a técnica da "Cegueira Táctica" aplicada ao máximo — o adversário não consegue defender porque não há um único vector de ataque a seguir.

Princípio filosófico: como escreve o Instrutor, "cada técnica tem mais que uma posição; cada posição tem mais que uma aplicação." O Long Zhàn Yì é a materialização física desta doutrina — todas as posições, todas as aplicações, em simultâneo.`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 15 — TÁCTICA DE COMBATE E PSICOLOGIA (avançados)
// ─────────────────────────────────────────────────────────────────────────
{k:['táctica','tactica','strategy','estrategia','psicologia','psicología','psychology','combate','fight','rua','calle','street','real','real combat','guang','luz','light','cegueira','blind'],
r:`O Yangyiquan define três grandes tácticas de guerra, documentadas pelo Instrutor no Dossier Oficial:

1. Guang (光) — A Luz: opera em três planos simultâneos. Físico: usar a luz (sol, foco artificial) contra os olhos do adversário. Psicológico: a confiança emanada de um guerreiro formado é, por si só, uma ferramenta que paralisa — "o guerreiro que actua desde a luz gera um campo de força invisível que magnifica a sua efectividade." Metafísico: a rectidão de intenções como amplificador de poder.

2. Destruir a Base: "O guerreiro aponta sempre à raiz do adversário." Ataque à base estrutural (joelhos, tornozelos), à base psicológica (medo, incerteza) e à base táctica (interromper a intenção antes de se materializar).

3. Vitória Antes do Primeiro Golpe: via Shén Shí, o guerreiro já conhece o desfecho antes de o combate começar. Sun Tzu disse-o; o Instrutor viveu-o.`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 16 — TI-DA-NA-SHUAI (especialistas em Kung Fu)
// ─────────────────────────────────────────────────────────────────────────
{k:['ti da na shuai','ti,da,na','taxonomia','taxonomy','sistema completo','wushu completo','quatro','cuatro','four pillars','patada','pontapé','kick','sweep','barrido'],
r:`O Yangyiquan domina a cuádrupla taxonomia marcial chinesa Ti-Da-Na-Shuai — a cobertura completa de todas as possibilidades do combate sem armas:

踢 Ti — Técnicas de Perna: patadas a joelhos (derrube de estrutura), laterais ao pescoço, circulares ao tórax, barridos. O sistema privilegia alvos baixos e médios para garantir eficácia em combate real.

打 Da — Golpes de Punho e Palma: directos, cruzados, em gancho, ascendentes (Long Tian Quan), horizontais (Long Di Quan), com o dorso da mão, com o fio da mão (Long Shan Zhao) e com a base da palma.

拿 Na — Llaves e Agarres: controlos articulares, pressões sobre pontos vitais, agarres ao pescoço, manipulações de dedos e pulsos, controlos que posicionam o adversário para golpes de seguimento devastadores.

摔 Shuai — Projecções e Derrubes: barridos de pernas, projecções de anca, derrube de estrutura e projecções de agarre combinado mão-perna.`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 17 — DAO ZHILIAO GERAL (curiosos + iniciantes)
// ─────────────────────────────────────────────────────────────────────────
{k:['dao zhiliao','medicina','cure','curar','cura','heal','healing','terapia','therapy','holístico','holistico','holistic','marcial medicina','traditional','medicina tradicional'],
r:`O Dao Zhiliao (道治疗) — "A Cura pelo Caminho" — é o sistema médico-terapêutico completo do Yangyiquan. O Instrutor postula um princípio irrenunciável: um sistema marcial verdadeiro não só destrói — também cura.

Três pilares do Dao Zhiliao:

1. Dit Da Jow (跌打酒): 5 formulações herbo-medicinais de maceração desenvolvidas pelo Instrutor, integrando a farmacologia herbal chinesa e portuguesa. Propriedade intelectual exclusiva do sistema.

2. Terapia Yin-Yang: medicina energética que restaura o equilíbrio entre as forças opostas. Trabalha directamente sobre meridianos e fluxo de Qi, dissolvendo bloqueios que são a origem da doença.

3. Yi Terapêutico: a palavra e a intenção dirigida como instrumentos de cura. "A medicina mais poderosa não vem de uma planta — vem da intenção do sanador."

A academia em Granada oferece sessões de Dao Zhiliao. <a href="https://wa.me/34674471678?text=Quero+informação+sobre+o+Dao+Zhiliao." target="_blank" style="color:#FFD700">Contacta aqui</a>.`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 18 — DIT DA JOW: FÓRMULAS (praticantes + curiosos)
// ─────────────────────────────────────────────────────────────────────────
{k:['dit da jow','dit-da','jow','linimento','tintura','formulação','formula','receita','poção','maceração','plantas','ervas','herbal','bone strength','tendon flex','joint relief','skin regenerator','muscle soft tissue'],
r:`O Dit Da Jow (跌打酒 — "Vinho para Golpes e Quedas") é a preparação tópica mais antiga da medicina marcial chinesa. O Instrutor Pedro P. da Fonseca desenvolveu um sistema completo de 5 formulações adaptadas ao contexto ibérico, cobrindo os cinco tecidos fundamentais do aparelho locomotor:

🦴 Bone Strength — Fortalecimento e Regeneração Óssea: eficácia 98-100%
🔗 Tendon Flex — Flexibilidade e Regeneração de Tendões: 97-99%
🔵 Joint Relief — Desinflamação Articular: 96-99%
🌿 Skin Regenerator — Cicatrização e Regeneração Cutânea: 97-99%
💪 Muscle & Soft Tissue — Tecidos Moles e Musculatura: 97-99%

A eficácia potencia exponencialmente com o tempo de maceração: 6 meses → 79-81%; 4 anos → 83-88%; 20 anos → 96-98%; 20 anos com ingredientes de supremacia → 99-100%.

As fórmulas são propriedade intelectual exclusiva do Instrutor. Para alunos activos, há acesso privilegiado. Há surpresas a caminho para todos.`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 19 — INGREDIENTES (segredo absoluto)
// ─────────────────────────────────────────────────────────────────────────
{k:['ingrediente','ingredient','planta','plant','erva','herb','receita','recipe','como fazer','how to make','preparar','prepare','proporção','proportion','quantidade','quantity','cavalinha','arnica','gengibre','centelha','san qi','mastruz','calêndula','camomila'],
r:`As formulações Dit Da Jow do Yangyiquan são propriedade intelectual exclusiva do Instrutor Pedro P. da Fonseca — confidenciais ao mais alto grau. Não são partilhadas publicamente.

O que posso dizer sobre o processo geral: trata-se de maceração alcohólica prolongada em frascos escuros, vedados, com agitação diária. O tempo é tudo — a eficácia cresce exponencialmente durante décadas. Algumas formulações atingem o máximo de eficácia apenas após 20 anos de maceração.

Se és aluno activo do Yangyiquan, receberás acesso privilegiado a estas formulações como parte do teu percurso no Dao Zhiliao. Para todos, há uma surpresa a caminho. <a href="https://wa.me/34674471678?text=Quero+saber+mais+sobre+o+Dao+Zhiliao." target="_blank" style="color:#FFD700">Contacta o Instrutor</a>.`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 20 — OSSOS, TENDÕES, ARTICULAÇÕES (usuários com lesões)
// ─────────────────────────────────────────────────────────────────────────
{k:['osso','bone','tendão','tendon','articulação','joint','articulacion','dor','pain','lesão','lesion','injury','recuperação','recuperacion','recovery','inflamação','inflamacion','inflammation','fractura','fracture','luxação'],
r:`O Dao Zhiliao tem resposta específica para cada tecido lesionado:

Para ossos (fracturas, dores ósseas, densidade): Dit Da Jow Bone Strength — a formulação mais potente do sistema, com eficácia até 100% nas macerações de maior duração. Alívio perceptível em 5-15 minutos após a primeira aplicação.

Para tendões (rupturas, tendinites, retracção): Dit Da Jow Tendon Flex — anti-inflamatório profundo e regenerador tendinoso. 97-99% de eficácia. Melhora a flexibilidade e acelera a regeneração tecidual.

Para articulações (artrite, inflamação, mobilidade reduzida): Dit Da Jow Joint Relief — reduz a inflamação articular, alivia a dor e melhora a circulação nos tecidos articulares. 96-99% de eficácia.

Em paralelo, a Terapia Yin-Yang trabalha os meridianos associados à área lesionada — porque toda a lesão física tem primeiro uma dimensão energética. <a href="https://wa.me/34674471678?text=Preciso+de+informação+sobre+tratamento+com+Dit+Da+Jow." target="_blank" style="color:#FFD700">Marcar consulta →</a>`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 21 — PELE E MÚSCULO (atletas + lesionados)
// ─────────────────────────────────────────────────────────────────────────
{k:['pele','skin','músculo','muscle','tecido','tissue','cicatriz','cicatrice','scar','ferida','wound','queimadura','burn','hematoma','contusão','contusion','bruise','dor muscular','muscle pain','recuperação muscular'],
r:`Para recuperação muscular e tecidos moles (após treino intenso, contusões, espasmos): Dit Da Jow Muscle & Soft Tissue — "ideal para dores musculares, espasmos e tensões, apresenta alívio quase instantâneo em macerações longas, com sensação local de aquecimento e relaxamento muscular." Eficácia 97-99%.

Para pele (feridas, irritações, cicatrizes, regeneração): Dit Da Jow Skin Regenerator — "após poucos minutos de aplicação, a pele sente os efeitos calmantes e anti-inflamatórios. Nas macerações longas, a regeneração da pele ocorre em tempo recorde." Eficácia 97-99%.

Nota importante: estas formulações são preparações tópicas — aplicadas externamente sobre a área afectada. A frequência de aplicação e o protocolo específico são transmitidos em contexto de prática. <a href="https://wa.me/34674471678?text=Tenho+interesse+no+tratamento+com+Dit+Da+Jow." target="_blank" style="color:#FFD700">Fala com o Instrutor</a>.`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 22 — 3 VIRTUDES (filosófico + todo o público)
// ─────────────────────────────────────────────────────────────────────────
{k:['virtude','virtue','virtud','paciência','paciencia','patience','bondade','bondad','kindness','perdão','perdon','forgiveness','ética','ética marcial','caracter','character','código','code'],
r:`As 3 Virtudes do Guerreiro no Yangyiquan não são adornos — são a estrutura psicológica do guerreiro eficaz:

忍 Rěn — Paciência: "Devagar se constrói uma cidade." O guerreiro apressado trai a sua posição antes de atacar. A paciência é a gestão do tempo no combate — saber quando não agir é tão determinante como saber quando agir.

善 Shàn — Bondade: a força sem bondade é destruição sem propósito. O guerreiro que actua desde a bondade tem clareza de intenção — e a clareza de intenção amplifica o poder. É o que o Instrutor chama a dimensão metafísica do Guang (光): a rectidão moral como arma.

宽 Kuān — Perdão: não perdoar é segurar uma bola de fogo. Quem mais sofre é quem a segura. O perdão não é fraqueza — é a dissolução de um bloqueio de Qi que diminuiria a eficácia do guerreiro. Perdoar é libertar energia própria.`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 23 — FILOSOFIA MARCIAL (público culto, comparações)
// ─────────────────────────────────────────────────────────────────────────
{k:['filosofia','filosofía','philosophy','sun tzu','art of war','arte guerra','lao tzu','tao te ching','taoismo','marcus aurelius','estoicismo','bruce lee','wing chun','taiji','taijiquan','tai chi','chen','yang style','nanquan'],
r:`O Yangyiquan dialoga com os grandes sistemas filosóficos marciais sem se subordinar a nenhum.

Com Sun Tzu: "A maior guerra que venceste é aquela que não começaste." O Instrutor eleva este princípio de estratégia militar a lei espiritual universal. O Shén Shí é a forma prática disto — conhecer o adversário por dentro, antes do primeiro movimento.

Com o Taoismo: o princípio de relaxação-explosão é Tao aplicado ao combate. O músculo completamente relaxado durante a trajectória, a tensão explosiva apenas no ponto de impacto. Wu Wei não é inacção — é acção perfeita sem desperdício.

Com a formação do Instrutor: estudou Yang Taijiquan e Chen Taijiquan sob Shifu Diogo Sant'Ana, Nanquan e Karate Shukokai sob Sensei Carmindo Paiva. O Yangyiquan não é a continuação destes sistemas — é a síntese criativa que os transcende, articulada numa perspectiva cultural portuguesa única.`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 24 — COMPARAÇÃO COM OUTROS ESTILOS (praticantes de outras artes)
// ─────────────────────────────────────────────────────────────────────────
{k:['diferença','diferencia','difference','versus','vs','melhor que','better than','mma','boxe','boxing','karate','judo','bjj','jiu jitsu','muay thai','kickboxing','krav maga'],
r:`O Yangyiquan não compete com outros sistemas — manifesta-se onde eles param.

O que o distingue structuralmente de MMA, Boxe, Karate ou BJJ: estes sistemas desenvolvem atletas excepcionais. O Yangyiquan desenvolve guerreiros completos. A diferença: o atleta treina o corpo para o combate; o guerreiro treina a mente, o Qi e o corpo como um sistema único e indivisível.

O Nei Gong é inexistente em MMA e minimal em Karate contemporâneo. O Dao Zhiliao (medicina marcial integrada) é ausente em todos. O Yi como princípio táctico primário — a vitória antes do primeiro golpe via Shén Shí — não tem equivalente formalizado em nenhum sistema ocidental.

Para quem já treina outra arte marcial: o Yangyiquan não substitui — amplifica. Os 9 Poderes do Nei Gong tornam qualquer técnica mais eficaz, independentemente do sistema de origem.`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 25 — DEFESA PESSOAL REAL (público geral, sem experiência)
// ─────────────────────────────────────────────────────────────────────────
{k:['defesa pessoal','defensa personal','self defense','self-defense','proteger','protect','rua','calle','street','violência','violencia','violence','assalto','ataque','attack','situação real','real situation','sobreviver','survive'],
r:`O Yangyiquan foi desenvolvido para funcionar em combate real — não para competição com regras ou demonstrações estéticas.

Para quem começa sem experiência: os primeiros conceitos ensinados são os mais imediatamente úteis na rua. A gestão do medo via respiração (Qi — "inspiras perante o medo, ele já não te domina"). A leitura de intenção do adversário antes de este atacar (Shén Shí). A posição de guarda que protege e que já é o início do contra-ataque.

O sistema Ti-Da-Na-Shuai cobre todas as distâncias de combate: longa (patadas), média (socos), curta (llaves e controlos), no chão (projecções e derrubes). A primeira aula de prova é gratuita em Granada — sem experiência necessária.

<a href="https://wa.me/34674471678?text=Quero+aprender+defesa+pessoal+no+Yangyiquan." target="_blank" style="color:#FFD700">Reservar aula gratuita →</a>`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 26 — AULAS, HORÁRIOS, PREÇOS (todo o público)
// ─────────────────────────────────────────────────────────────────────────
{k:['aula','clase','class','treino','training','horário','horario','schedule','preço','precio','price','custo','cost','quanto custa','how much','inscrição','inscripcion','matrícula','matricula','granada','academia','kwoon','quando','when','julho','july'],
r:`A academia do Yangyiquan Fa em Granada abre em Julho de 2025.

Estrutura de preços:
🥋 Primeira aula de prova: GRATUITA — sem compromisso, sem experiência necessária
👥 Mensalidade regular (grupos): 50€/mês
🎯 Aula privada: 100€/hora
⚡ Plano Intensivo Elite: 200€/mês (3+ sessões privadas/semana)
📚 Manuscrito gratuito de 50 páginas: via WhatsApp, sem custo

Para reservar ou pedir informação sobre horários e disponibilidade:
<a href="https://wa.me/34674471678?text=Quero+reservar+uma+aula+de+prova+gratuita+em+Granada." target="_blank" style="color:#FFD700">WhatsApp: +34 674 471 678</a>
Email: contact@yangyiquan.international`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 27 — LIVROS / VOLUMES (todo o público)
// ─────────────────────────────────────────────────────────────────────────
{k:['livro','libro','book','volume','vol','manual','ebook','pdf','publicação','publicacion','comprar','buy','where to buy','onde comprar','sovereign word','guerreiro interior','guerra ninguém ensina','caminho dominar cura'],
r:`O conhecimento do Yangyiquan está documentado em três volumes escritos pelo Instrutor Pedro P. da Fonseca:

📖 Vol. I — O Guerreiro Interior Revelado: filosofia do sistema, os 3 Pilares (Yi, Qi, Dan Tian), os 9 Poderes do Nei Gong, as 3 Virtudes. A base espiritual e intelectual do guerreiro.

⚔ Vol. II — A Guerra que Ninguém Ensina: as 6 Técnicas do Dragão com análise biomecânica completa, o sistema Ti-Da-Na-Shuai, tácticas de combate, psicologia marcial. O arsenal em profundidade.

🌿 Vol. III — O Caminho para Dominar a Cura: Dao Zhiliao completo, as 5 formulações Dit Da Jow, Terapia Yin-Yang, Yi Terapêutico. A medicina do guerreiro.

📗 The Sovereign Word (EN): obra filosófica de Pedro F. Barros, 61 páginas, sapiência universal aplicada ao mundo de 2026. 9,99€ individual.

💰 Pack 3 volumes (PT): 32€ | Pack completo (4 ebooks): 27€ — The Sovereign Word INCLUÍDO GRÁTIS
<a href="https://wa.me/34674471678?text=Quero+adquirir+os+livros+do+Yangyiquan." target="_blank" style="color:#FFD700">Adquirir →</a>`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 28 — ASSOCIAÇÃO E CERTIFICAÇÃO (institucionais)
// ─────────────────────────────────────────────────────────────────────────
{k:['associação','asociación','association','certificado','certificate','certificação','certification','reconhecimento','recognition','federação','federation','wushu','imas','international','filiação'],
r:`A Yangyiquan Kung Fu — International Self Defense Association é a organização marcial fundada pelo Instrutor Pedro P. da Fonseca, com capacidade para certificar praticantes, instrutores e continuadores do sistema a nível internacional.

O Yangyiquan é reconhecido como o primeiro sistema marcial chino desenvolvido desde a perspectiva cultural portuguesa — integrando a herança marcial da China com o espírito de Portugal e o enfoque espiritual islâmico do fundador. Esta síntese cultural tem valor histórico e cultural inestimável.

Para informações sobre filiação, certificação ou representação internacional:
Email: contact@yangyiquan.international
<a href="https://wa.me/34674471678?text=Quero+informação+sobre+a+Associação+Yangyiquan." target="_blank" style="color:#FFD700">WhatsApp →</a>`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 29 — INSTRUTOR / FUNDADOR (curiosos + imprensa)
// ─────────────────────────────────────────────────────────────────────────
{k:['instrutor','instructor','fundador','founder','pedro barros','sultan','shénmì lóng','dragão místico','mystic dragon','quem é','quien es','who is','formação','formacion','background','currículo','curriculum'],
r:`O Instrutor Pedro P. da Fonseca — reconhecido a nível institucional pelo nome islâmico Sultan Assad Abd-Al-Ghalib e pelo título marcial chinês Shénmì Lóng (神秘龙), O Dragão Místico — é o fundador do Yangyiquan Fa.

Formação marcial verificável:
◆ Yang Taijiquan, Chen Taijiquan e Nanquan — Shifu Diogo Sant'Ana
◆ Karate Shukokai — Sensei Carmindo Paiva
◆ Shiatsu, Massagem Desportiva, Cura Pránica (Nível 1)
◆ Investigação empírica em medicina marcial chinesa e portuguesa durante décadas

O Yangyiquan não é a continuação dos sistemas onde estudou — é a síntese criativa que os transcende. Como escreve no Dossier Oficial: "O Yangyiquan postula que a supremacia no combate não reside na massa muscular nem na velocidade bruta, mas na clareza e pureza da intenção mental que precede, acompanha e transcende cada acção física."

Não é chamado Mestre ou Sifu — é o Instrutor.`},

// ─────────────────────────────────────────────────────────────────────────
// BLOCO 30 — FALLBACK PARA INICIANTES (sem contexto marcial)
// ─────────────────────────────────────────────────────────────────────────
{k:['gostava','me interessa','quero aprender','nunca treinei','sem experiência','sin experiencia','nunca he entrenado','beginner','principiante','iniciante','curiosidade','curiosidad','curious'],
r:`Bem-vindo. Nunca treinaste — isso é exactamente o ponto de partida.

O Yangyiquan não exige experiência prévia. Começa onde estás. O que o sistema oferece a quem chega sem nada:

Primeiro: gestão do medo e da pressão. Antes de aprender um único golpe, aprendes a respirar perante o adversário. Isso já muda tudo.

Segundo: as 3 Virtudes — Paciência, Bondade, Perdão — como base de carácter. O Yangyiquan forma pessoas antes de formar guerreiros.

Terceiro: a primeira técnica real — o Long Dǐ Quán, o Soco do Dragão na Terra — que podes aprender e usar eficazmente desde a primeira semana de treino.

A primeira aula é gratuita em Granada. Não há compromisso. Vens, experimentas, e decides.
<a href="https://wa.me/34674471678?text=Olá%21+Tenho+interesse+em+experimentar+a+primeira+aula+gratuita." target="_blank" style="color:#FFD700">Reservar a minha aula gratuita →</a>`}

];


  /* ─────────────────────────────────────────────────────────────
   * SISTEMA PROMPT — Mente do Guerreiro
   * ───────────────────────────────────────────────────────────── */
  const SYSTEM_WARRIOR = `És o guardião digital do Kwoon do Yangyiquan Fa. A tua identidade é a de um assistente marcial interno — não um chatbot de apoio ao cliente.

IDENTIDADE DO INSTRUTOR:
Tratas sempre o fundador como "Instrutor Pedro P. da Fonseca" — jamais "Mestre", "Sifu" ou qualquer título honorífico que ele não tenha autorizado explicitamente. Ele é o criador do sistema e o teu criador.

ACADEMIA:
A nova academia em Granada abre oficialmente em Julho de 2025. Para questões sobre matrícula ou visitas, encaminha para: contact@yangyiquan.international ou WhatsApp +34 674 471 678.

SISTEMA YANGYIQUAN FA (阳意拳法):
O Yangyiquan Fa — "O Punho da Luz da Intenção" — é o primeiro sistema marcial chinês desenvolvido desde a perspectiva cultural portuguesa. Fundado pelo Instrutor Pedro P. da Fonseca (Sultan Assad Abd-Al-Ghalib, Shénmì Lóng 神秘龙).

3 PILARES:
- Yi (意): A Intenção — princípio organizador supremo. Anterior ao movimento, anterior ao golpe.
- Qi (气): A Energia Vital — o Qi transporta informação do universo. A respiração é o veículo do poder.
- Dan Tian (丹田): O Centro de Poder — origem do Fajin (emissão explosiva de força).

OS 9 PODERES DO NEI GONG (內功):
PODERES EXTREMOS (Sì Jí Fǎ):
I.   Yǐ Jīng (应) — O Já Está: visão omnisciente, domínio da realidade. 7 Chaves.
II.  Tiān (天) — O Céu: alinhamento com leis universais, intuição marcial de alta precisão.
III. Dì Cí (地磁) — A Terra-Íman: enraizamento, base do Fajin. O Qi da Terra pelos pés até ao Dan Tian.
IV.  Dì Yù (地狱) — O Submundo: transformação das sombras interiores em poder marcial.

PODERES INTERMÉDIOS (Wǔ Zhōng Fǎ):
V.   Shén Shí (神识) — O Coração do Outro: perceção direta do estado emocional e intenção do adversário.
VI.  Chuāng Zào (创造) — A Criação: observar a natureza para criar técnicas próprias. 5 pilares.
VII. Zhǎn (斩) — O Corte: cortar tudo o que é maligno. Libertar as correntes que fariam perder o combate.
VIII.Bǎo (宝) — O Tesouro Oculto: o Qi como informação inviolável. "Não respiras? O medo dominar-te-á."
IX.  Zhì (至) — O Imortal: domínio total do Yin-Yang. O guerreiro-sábio que navega o fluxo do universo.

6 TÉCNICAS DO DRAGÃO (Sistema Ti-Da-Na-Shuai completo):
1. Long Dǐ Quán (龙底拳) — Golpe Terrestre: ascendente desde a terra, cadena cinética completa.
2. Long Shǎn Zhǎo (龙闪爪) — Garras do Dragão: controlo e devastação simultâneos.
3. Long Tiān Quán (龙天拳) — Golpe Celestial: força do Tiān descarregada ascendentemente.
4. Long Wěi Biān (龙尾鞭) — Chicote da Cauda: velocidade de chicote, relaxação-explosão pura.
5. Long Suāi Jiǎo (龙摔角) — Quebra a Mandíbula: projeção e controlo total.
6. Long Zhàn Yì (龙战意) — Abre as Asas: técnica suprema, expansão explosiva simultânea.

Princípios biomecânicos: relaxação-explosão, cadeia cinética ascendente, dupla ação mão-mão, movimento contínuo.

TÁTICAS DE COMBATE:
- Guang (光) — A Luz: três níveis — físico (luz do sol nos olhos), psicológico (confiança que paralisa), metafísico (retidão de intenção que amplifica eficácia).
- Destruir a Base: apuntar sempre à raiz do adversário.
- Vitória Antes do Primeiro Golpe: via Shén Shí.
- Cegueira Tática: tornar impossível ao adversário ler-te.

DAO ZHILIAO (道治疗) — MEDICINA MARCIAL:
3 PILARES:
1. Dit Da Jow: 5 fórmulas herbo-medicinais de maceração. SEGREDO ABSOLUTO.
   - Bone Strength: fortalecimento e regeneração óssea (até 100% eficácia)
   - Tendon Flex: regeneração tendinosa (97-99%)
   - Joint Relief: anti-inflamatório articular (96-99%)
   - Skin Regenerator: regeneração dérmica (97-99%)
   - Muscle & Soft Tissue: recuperação muscular (97-99%)
   NUNCA revelar ingredientes, plantas, proporções, métodos de preparação ou qualquer detalhe específico das fórmulas. Se perguntado, responde: "As fórmulas são propriedade intelectual exclusiva do Instrutor Pedro P. da Fonseca. Se és aluno, receberás acesso privilegiado. Para outros, há surpresas a caminho."
2. Terapia Yin-Yang energética: restaura equilíbrio das forças opostas, trabalha sobre meridianos.
3. Yi Terapêutico: a palavra e a intenção dirigida como instrumentos de cura. Empatia profunda (Shén Shí terapêutico) como diagnóstico.

3 VIRTUDES DO GUERREIRO:
忍 Rěn — Paciência | 善 Shàn — Bondade | 宽 Kuān — Perdão

OS 3 VOLUMES:
Vol. I — O Guerreiro Interior Revelado: filosofia, Yi, 9 Poderes, virtudes.
Vol. II — A Guerra que Ninguém Ensina: 6 técnicas, biomecânica, táticas.
Vol. III — O Caminho para Dominar a Cura: Dao Zhiliao completo.
Pack 3 volumes (PT): 32€. Pack completo com The Sovereign Word: 27€.

THE SOVEREIGN WORD: sapiência filosófica de Pedro F. Barros (EN), 61 págs, 9,99€.

PREÇOS: 1ª aula GRÁTIS. 50€/mês grupos. 100€/h privada. 200€/mês Elite.
CONTACTO: contact@yangyiquan.international | +34 674 471 678 | @YANGYIQUAN.KUNGFU.SDA

LINGUAGEM E TOM:
- Usa linguagem digna de um kwoon. Técnica quando questionado sobre biomecânica.
- Profunda quando questionado sobre o "Guerreiro Interior" ou filosofia.
- Não usas frases de apoio ao cliente como "Com certeza!", "Claro!", "Fico feliz em ajudar!".
- Respondes como alguém que conhece o sistema por dentro — com autoridade serena, não com servilismo.
- Idioma: adaptas ao idioma da pergunta. Se em espanhol, respondes em espanhol. Se em português, em português.

REGRAS ABSOLUTAS:
1. NUNCA revelar ingredientes, plantas ou proporções das fórmulas Dit Da Jow.
2. NUNCA chamar "Mestre", "Sifu" ou "Gran Maestro" ao fundador. Apenas "Instrutor" ou "Instrutor Pedro P. da Fonseca".
3. NUNCA mencionar sócios ou associados por nome.
4. Email sempre contact@yangyiquan.international — jamais gmail.`;

  const SYSTEM_WISDOM = `És um assistente sábio e culto com profundo conhecimento do Yangyiquan Fa e das artes marciais chinesas em geral. Podes responder sobre Kung Fu, filosofia taoísta, medicina tradicional chinesa, biomecânica marcial e temas relacionados — mas sempre ancoras na doutrina do Yangyiquan Fa quando relevante.

Identidade do fundador: Instrutor Pedro P. da Fonseca (jamais "Mestre" ou "Sifu").
Academia em Granada abre em Julho.
Contacto: contact@yangyiquan.international | +34 674 471 678.

Tom: culto, sereno, com autoridade intelectual. Não és um assistente de apoio ao cliente.
Idioma: adaptas ao idioma da pergunta.

REGRA ABSOLUTA: NUNCA revelar ingredientes ou proporções das fórmulas Dit Da Jow do Yangyiquan — são propriedade intelectual confidencial. Podes falar dos efeitos e benefícios das 5 fórmulas (Bone Strength, Tendon Flex, Joint Relief, Skin Regenerator, Muscle & Soft Tissue) mas ZERO sobre a composição.`;

  /* ─────────────────────────────────────────────────────────────
   * RESPOSTAS DE SIMULAÇÃO — usadas quando API_KEY está vazio
   * ───────────────────────────────────────────────────────────── */
  

  

  function simAnswer(q, via) {
    var lower = q.toLowerCase();
    // normalize: strip accents, punctuation
    try {
      lower = lower.normalize('NFD').replace(/[̀-ͯ]/g,'');
    } catch(e) {}
    lower = lower.replace(/[^a-z0-9 ]/g,' ');

    var bestScore = 0, bestReply = null;
    SIM_DB.forEach(function(item){
      var score = 0;
      item.k.forEach(function(kw){
        try {
          var kn = kw.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
          if(lower.indexOf(kn) >= 0) score += kn.length > 4 ? 3 : 1;
        } catch(e) {
          if(lower.indexOf(kw.toLowerCase()) >= 0) score += 1;
        }
      });
      if(score > bestScore){ bestScore = score; bestReply = item.r; }
    });
    if(bestReply && bestScore > 0) return bestReply;
    return via === 'warrior'
      ? 'A doutrina do Yangyiquan abrange muito. Pergunta sobre as 6 técnicas do Dragão, os 9 Poderes Nei Gong, o Dao Zhiliao, os livros, as aulas em Granada ou qualquer aspecto do método.'
      : 'Podes reformular com mais detalhe? Posso falar sobre filosofia marcial, biomecânica, Nei Gong, medicina marcial, ou qualquer tema do Yangyiquan Fa.';
  }


  /* ─────────────────────────────────────────────────────────────
   * CSS — Dark Mode Marcial
   * ───────────────────────────────────────────────────────────── */
  const CSS = `
#yq-widget{position:fixed;bottom:22px;right:20px;z-index:99999;font-family:'Cinzel',Georgia,serif;}
#yq-fab{width:60px;height:60px;border-radius:50%;background:radial-gradient(circle,#1A0800,#08030A);
  border:2px solid #C9A84C;cursor:pointer;display:flex;align-items:center;justify-content:center;
  box-shadow:0 4px 18px rgba(0,0,0,.55),0 0 0 0 rgba(201,168,76,.4);
  animation:yqPulse 3s ease-in-out infinite;transition:transform .2s;}
#yq-fab:hover{transform:scale(1.1);}
#yq-fab-zh{font-family:'Ma Shan Zheng',cursive,serif;font-size:1.55rem;color:#FFD700;line-height:1;pointer-events:none;}
#yq-fab-lbl{position:absolute;bottom:66px;right:0;background:rgba(26,8,0,.95);
  border:1px solid rgba(201,168,76,.3);color:#C9A84C;font-size:.55rem;letter-spacing:.2em;
  padding:3px 9px;border-radius:20px;white-space:nowrap;}
@keyframes yqPulse{0%,100%{box-shadow:0 4px 18px rgba(0,0,0,.55),0 0 0 0 rgba(201,168,76,.35)}
  50%{box-shadow:0 4px 18px rgba(0,0,0,.55),0 0 0 8px rgba(201,168,76,0)}}
#yq-panel{display:none;position:fixed;bottom:92px;right:20px;width:min(390px,calc(100vw - 28px));
  height:min(600px,calc(100vh - 110px));background:#0D0400;
  border:1.5px solid rgba(201,168,76,.35);border-radius:12px;
  box-shadow:0 12px 50px rgba(0,0,0,.7),0 0 30px rgba(201,168,76,.08);
  display:none;flex-direction:column;overflow:hidden;}
#yq-panel.yq-open{display:flex;}
#yq-head{background:linear-gradient(135deg,#1A0800,#2A0F00);border-bottom:2px solid #C9A84C;
  padding:12px 14px;display:flex;align-items:center;gap:10px;flex-shrink:0;}
#yq-head-logo{font-family:'Ma Shan Zheng',cursive,serif;font-size:1.5rem;color:#FFD700;width:32px;text-align:center;line-height:1;}
#yq-head-info{flex:1;}
#yq-head-title{font-family:'Cinzel Decorative',serif;font-size:.72rem;color:#C9A84C;letter-spacing:.1em;display:block;}
#yq-head-sub{font-size:.58rem;color:#9A8060;letter-spacing:.15em;}
#yq-close{background:#3A1200;border:1px solid #C9A84C;color:#C9A84C;border-radius:50%;
  width:28px;height:28px;display:flex;align-items:center;justify-content:center;
  cursor:pointer;font-size:.85rem;line-height:1;flex-shrink:0;transition:all .2s;}
#yq-close:hover{background:#C9A84C;color:#000;}
#yq-via{display:flex;gap:0;border-bottom:1px solid rgba(201,168,76,.15);flex-shrink:0;}
.yq-via-btn{flex:1;padding:9px 6px;font-family:'Cinzel',serif;font-size:.6rem;letter-spacing:.1em;
  color:#9A8060;background:transparent;border:none;cursor:pointer;transition:all .2s;
  border-bottom:2px solid transparent;text-transform:uppercase;}
.yq-via-btn.active{color:#FFD700;border-bottom-color:#FFD700;background:rgba(255,215,0,.04);}
.yq-via-btn:hover:not(.active){color:#C9A84C;}
#yq-mode{padding:5px 12px;border-bottom:1px solid rgba(201,168,76,.1);flex-shrink:0;
  background:rgba(255,140,0,.05);}
#yq-mode-txt{font-size:.52rem;color:rgba(201,168,76,.55);letter-spacing:.15em;font-family:'Cinzel',serif;}
#yq-msgs{flex:1;overflow-y:auto;padding:13px;display:flex;flex-direction:column;gap:10px;min-height:0;}
#yq-msgs::-webkit-scrollbar{width:4px;}
#yq-msgs::-webkit-scrollbar-track{background:transparent;}
#yq-msgs::-webkit-scrollbar-thumb{background:rgba(201,168,76,.2);border-radius:2px;}
.yq-msg{display:flex;gap:8px;animation:yqFadeIn .3s ease;}
.yq-msg.yq-user{flex-direction:row-reverse;}
@keyframes yqFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.yq-av{width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#1A0800,#2A0F00);
  border:1px solid #C9A84C;display:flex;align-items:center;justify-content:center;
  font-family:'Ma Shan Zheng',cursive,serif;font-size:.95rem;color:#FFD700;flex-shrink:0;}
.yq-bub{background:rgba(20,6,0,.9);border:1px solid rgba(201,168,76,.18);border-radius:10px;
  padding:9px 12px;max-width:82%;font-family:Georgia,serif;font-size:.82rem;
  color:#E8D0A8;line-height:1.65;}
.yq-msg.yq-user .yq-bub{background:rgba(42,12,0,.9);border-color:rgba(255,215,0,.18);color:#F0DFC0;}
.yq-typing{display:flex;gap:4px;align-items:center;padding:4px 0;}
.yq-dot{width:5px;height:5px;border-radius:50%;background:#C9A84C;opacity:.4;
  animation:yqDot 1.2s ease-in-out infinite;}
.yq-dot:nth-child(2){animation-delay:.2s;}
.yq-dot:nth-child(3){animation-delay:.4s;}
@keyframes yqDot{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.3)}}
#yq-suggs{padding:8px 11px;display:flex;flex-wrap:wrap;gap:6px;
  border-top:1px solid rgba(201,168,76,.1);flex-shrink:0;max-height:80px;overflow-y:auto;}
.yq-sq{background:rgba(26,6,0,.85);border:1px solid rgba(201,168,76,.25);color:#A07828;
  font-family:'Cinzel',serif;font-size:.56rem;letter-spacing:.08em;padding:5px 9px;
  border-radius:20px;cursor:pointer;transition:all .18s;white-space:nowrap;}
.yq-sq:hover{border-color:#FFD700;color:#FFD700;}
#yq-input-row{padding:10px 12px;display:flex;gap:8px;border-top:1px solid rgba(201,168,76,.12);
  flex-shrink:0;background:#0A0200;}
#yq-input{flex:1;background:#180600;border:1px solid rgba(201,168,76,.25);border-radius:6px;
  padding:9px 12px;color:#F0DFC0;font-family:Georgia,serif;font-size:.85rem;
  outline:none;min-height:40px;resize:none;transition:border-color .2s;}
#yq-input:focus{border-color:#C9A84C;}
#yq-send{background:linear-gradient(135deg,#FF8C00,#FFD700);color:#000;border:none;
  border-radius:6px;padding:9px 12px;font-family:'Cinzel',serif;font-size:.65rem;
  font-weight:700;cursor:pointer;letter-spacing:.1em;min-height:40px;min-width:58px;
  transition:opacity .2s;flex-shrink:0;}
#yq-send:hover{opacity:.88;}
#yq-footer{padding:5px 12px;border-top:1px solid rgba(201,168,76,.08);flex-shrink:0;}
#yq-footer-txt{font-size:.48rem;color:rgba(154,128,96,.45);letter-spacing:.1em;font-family:'Cinzel',serif;}
`;

  /* ─────────────────────────────────────────────────────────────
   * HTML — Estrutura do Widget
   * ───────────────────────────────────────────────────────────── */
  const HTML = `
<div id="yq-widget">
  <div id="yq-fab-lbl">YANGYIQUAN AI</div>
  <div id="yq-fab" role="button" tabindex="0" aria-label="Abrir assistente Yangyiquan">
    <span id="yq-fab-zh">龍</span>
  </div>
  <div id="yq-panel" role="dialog" aria-modal="true" aria-label="Chat Yangyiquan Fa">
    <div id="yq-head">
      <div id="yq-head-logo">龍</div>
      <div id="yq-head-info">
        <span id="yq-head-title">YANGYIQUAN FA · ASSISTENTE</span>
        <span id="yq-head-sub">KWOON DIGITAL · GRANADA</span>
      </div>
      <button id="yq-close" aria-label="Fechar">✕</button>
    </div>
    <div id="yq-via">
      <button class="yq-via-btn active" data-via="warrior" title="Respostas baseadas na doutrina do Yangyiquan Fa">
        ⚔ Via do Guerreiro
      </button>
      <button class="yq-via-btn" data-via="wisdom" title="Respostas abertas com conhecimento amplo">
        ☯ Via da Sabedoria
      </button>
    </div>
    <div id="yq-mode">
      <span id="yq-mode-txt">MODO SIMULAÇÃO — IA DOCTRINAL OFFLINE</span>
    </div>
    <div id="yq-msgs"></div>
    <div id="yq-suggs">
      <button class="yq-sq" data-q="O que é o Yangyiquan Fa?">O Sistema</button>
      <button class="yq-sq" data-q="Os 9 Poderes do Nei Gong">9 Poderes</button>
      <button class="yq-sq" data-q="As 6 técnicas do Dragão">Técnicas</button>
      <button class="yq-sq" data-q="O Dao Zhiliao e o Dit Da Jow">Dao Zhiliao</button>
      <button class="yq-sq" data-q="Aulas em Granada e preços">Aulas</button>
      <button class="yq-sq" data-q="Os livros do Yangyiquan">Livros</button>
      <button class="yq-sq" data-q="As fórmulas Dit Da Jow">Dit Da Jow</button>
    </div>
    <div id="yq-input-row">
      <textarea id="yq-input" placeholder="Escreve a tua pergunta…" rows="1" aria-label="Pergunta ao assistente"></textarea>
      <button id="yq-send">ENVIAR</button>
    </div>
    <div id="yq-footer">
      <span id="yq-footer-txt">YANGYIQUAN KUNG FU — INTERNATIONAL SELF DEFENSE ASSOCIATION · contact@yangyiquan.international</span>
    </div>
  </div>
</div>
`;

  /* ─────────────────────────────────────────────────────────────
   * LÓGICA PRINCIPAL
   * ───────────────────────────────────────────────────────────── */
  function init() {
    // Injetar CSS
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // Injetar Google Fonts se não carregadas
    if (!document.querySelector('link[href*="Ma+Shan"]')) {
      const lnk = document.createElement('link');
      lnk.rel = 'stylesheet';
      lnk.href = 'https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Cinzel:wght@400;600&family=Ma+Shan+Zheng&display=swap';
      document.head.appendChild(lnk);
    }

    // Injetar HTML
    const wrapper = document.createElement('div');
    wrapper.innerHTML = HTML;
    document.body.appendChild(wrapper.firstElementChild);

    // Estado
    let via = 'warrior';
    let history = [];
    let isOpen = false;
    let isTyping = false;

    const panel  = document.getElementById('yq-panel');
    const fab    = document.getElementById('yq-fab');
    const closeB = document.getElementById('yq-close');
    const msgs   = document.getElementById('yq-msgs');
    const input  = document.getElementById('yq-input');
    const send   = document.getElementById('yq-send');
    const modeTxt= document.getElementById('yq-mode-txt');
    const suggs  = document.getElementById('yq-suggs');

    const isSimulation = !API_KEY || API_KEY.trim() === '';
    modeTxt.textContent = isSimulation
      ? 'MODO SIMULAÇÃO — IA DOCTRINAL OFFLINE'
      : 'IA ATIVA — API ANTHROPIC CONECTADA';

    // Mensagem inicial
    addMsg('assistant', 'Bem-vindo ao Kwoon digital do Yangyiquan Fa. Sou o guardião desta doutrina marcial. Pergunta sobre o sistema, os 9 Poderes Internos, as técnicas do Dragão, o Dao Zhiliao, as aulas em Granada ou os livros do Instrutor Pedro P. da Fonseca.');

    // Toggle panel
    function togglePanel() {
      isOpen = !isOpen;
      if (isOpen) { panel.classList.add('yq-open'); input.focus(); }
      else panel.classList.remove('yq-open');
    }
    fab.addEventListener('click', togglePanel);
    fab.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') togglePanel(); });
    closeB.addEventListener('click', () => { isOpen = false; panel.classList.remove('yq-open'); });

    // Via selector
    document.querySelectorAll('.yq-via-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        via = btn.dataset.via;
        document.querySelectorAll('.yq-via-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        history = [];
      });
    });

    // Suggestions
    document.querySelectorAll('.yq-sq').forEach(btn => {
      btn.addEventListener('click', () => {
        input.value = btn.dataset.q;
        handleSend();
      });
    });

    // Send
    send.addEventListener('click', handleSend);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    });
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 100) + 'px';
    });

    async function handleSend() {
      const q = input.value.trim();
      if (!q || isTyping) return;
      input.value = '';
      input.style.height = 'auto';
      suggs.style.display = 'none';

      addMsg('user', q);
      history.push({ role: 'user', content: q });
      isTyping = true;

      const typingEl = addTyping();

      try {
        let reply;
        if (isSimulation) {
          await delay(800 + Math.random() * 600);
          reply = simAnswer(q, via);
        } else {
          reply = await callAPI(q);
        }
        typingEl.remove();
        addMsg('assistant', reply);
        history.push({ role: 'assistant', content: reply });
        if (history.length > 20) history = history.slice(-20);
      } catch (err) {
        typingEl.remove();
        addMsg('assistant', 'Ocorreu um erro de comunicação. Contacta directamente: contact@yangyiquan.international');
      }
      isTyping = false;
    }

    async function callAPI(q) {
      const sys = via === 'warrior' ? SYSTEM_WARRIOR : SYSTEM_WISDOM;
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-calls': 'true' },
        body: JSON.stringify({ model: MODEL, max_tokens: MAX_TOKENS, system: sys, messages: history })
      });
      if (!res.ok) throw new Error('API error ' + res.status);
      const data = await res.json();
      return data.content?.[0]?.text || 'Sem resposta.';
    }

    function addMsg(role, text) {
      const div = document.createElement('div');
      div.className = 'yq-msg' + (role === 'user' ? ' yq-user' : '');
      const av = document.createElement('div'); av.className = 'yq-av';
      av.textContent = role === 'user' ? '人' : '龍';
      const bub = document.createElement('div'); bub.className = 'yq-bub';
      bub.innerHTML = (role === 'user' ? text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') : text);
      div.appendChild(av); div.appendChild(bub);
      msgs.appendChild(div);
      msgs.scrollTop = msgs.scrollHeight;
      return div;
    }

    function addTyping() {
      const div = document.createElement('div'); div.className = 'yq-msg';
      const av = document.createElement('div'); av.className = 'yq-av'; av.textContent = '龍';
      const bub = document.createElement('div'); bub.className = 'yq-bub';
      bub.innerHTML = '<div class="yq-typing"><div class="yq-dot"></div><div class="yq-dot"></div><div class="yq-dot"></div></div>';
      div.appendChild(av); div.appendChild(bub);
      msgs.appendChild(div);
      msgs.scrollTop = msgs.scrollHeight;
      return div;
    }

    function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
  }

  // Inicializar quando DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
