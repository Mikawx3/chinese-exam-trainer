export interface Exercise {
  id: string
  title: string
  type: 'multiple-choice' | 'text-input'
  questions: Array<{
    question: string
    chinese?: string
    options?: string[]
    correctAnswer: number | string | string[]
    explanation?: string
    hint?: string
  }>
}

export interface ExerciseCategory {
  id: string
  title: string
  exercises: Array<{
    id: string
    title: string
    type: 'multiple-choice' | 'text-input'
    description: string
  }>
}

export const exerciseData: Record<string, Exercise> = {
  // Mots interrogatifs
  'interrogatifs-1': {
    id: 'interrogatifs-1',
    title: 'Mots interrogatifs',
    type: 'multiple-choice',
    questions: [
      {
        question: 'Quel mot interrogatif utilise-t-on pour demander "comment" ?',
        chinese: 'Comment allez-vous ?',
        options: ['什么 (shénme)', '怎么 (zěnme)', '哪里 (nǎlǐ)', '谁 (shéi)'],
        correctAnswer: 1,
        explanation: '怎么 (zěnme) signifie "comment" et est utilisé pour demander la manière.'
      },
      {
        question: 'Quel mot interrogatif utilise-t-on pour demander "quoi" ?',
        chinese: '这是什么？',
        options: ['怎么 (zěnme)', '哪里 (nǎlǐ)', '什么 (shénme)', '为什么 (wèishénme)'],
        correctAnswer: 2,
        explanation: '什么 (shénme) signifie "quoi" ou "quel".'
      },
      {
        question: 'Quel mot interrogatif utilise-t-on pour demander "où" ?',
        chinese: '你在哪里？',
        options: ['什么 (shénme)', '怎么 (zěnme)', '哪里 (nǎlǐ)', '谁 (shéi)'],
        correctAnswer: 2,
        explanation: '哪里 (nǎlǐ) signifie "où".'
      }
    ]
  },

  // Qing 请
  'qing-1': {
    id: 'qing-1',
    title: 'Utilisation de 请 (qǐng)',
    type: 'multiple-choice',
    questions: [
      {
        question: 'Que signifie 请 (qǐng) ?',
        options: ['Merci', 'S\'il vous plaît', 'Excusez-moi', 'Bonjour'],
        correctAnswer: 1,
        explanation: '请 (qǐng) signifie "s\'il vous plaît" et est utilisé pour être poli.'
      },
      {
        question: 'Comment dire "S\'il vous plaît, asseyez-vous" ?',
        chinese: '请坐',
        options: ['请坐 (qǐng zuò)', '请站 (qǐng zhàn)', '请走 (qǐng zǒu)', '请来 (qǐng lái)'],
        correctAnswer: 0,
        explanation: '请坐 (qǐng zuò) = S\'il vous plaît, asseyez-vous'
      },
      {
        question: 'Traduisez : "请进"',
        options: ['S\'il vous plaît, sortez', 'S\'il vous plaît, attendez', 'S\'il vous plaît, entrez', 'S\'il vous plaît, allez'],
        correctAnswer: 2,
        explanation: '请进 (qǐng jìn) = S\'il vous plaît, entrez'
      }
    ]
  },

  // Dui 对
  'dui-1': {
    id: 'dui-1',
    title: 'Utilisation de 对 (duì)',
    type: 'multiple-choice',
    questions: [
      {
        question: 'Comment utiliser 对 (duì) pour affirmer "oui" ?',
        chinese: '对，我是学生',
        options: ['对 (duì) = oui, c\'est correct', '对 (duì) = non', '对 (duì) = peut-être', '对 (duì) = je ne sais pas'],
        correctAnswer: 0,
        explanation: '对 (duì) peut signifier "oui" ou "correct" pour confirmer quelque chose.'
      },
      {
        question: 'Comment dire "Oui, c\'est ça" en utilisant 对 ?',
        options: ['对 (duì)', '不对 (bù duì)', '对，是 (duì, shì)', '对，对 (duì, duì)'],
        correctAnswer: 2,
        explanation: '对，是 (duì, shì) = Oui, c\'est ça'
      },
      {
        question: 'Traduisez : "对什么感兴趣"',
        options: ['Ne pas être intéressé', 'Demander un intérêt', 'Être intéressé par quelque chose', 'Avoir un intérêt'],
        correctAnswer: 2,
        explanation: '对...感兴趣 (duì...gǎn xìngqù) = être intéressé par...'
      }
    ]
  },

  // Lieux de Chine
  'lieux-1': {
    id: 'lieux-1',
    title: 'Lieux célèbres de Chine',
    type: 'text-input',
    questions: [
      {
        question: 'Comment dit-on "Grande Muraille de Chine" en chinois ?',
        correctAnswer: '长城',
        explanation: '长城 (Chángchéng) = Grande Muraille de Chine'
      },
      {
        question: 'Comment dit-on "Temple du Paradis" en chinois ?',
        correctAnswer: '天坛',
        explanation: '天坛 (Tiāntán) = Temple du Paradis'
      },
      {
        question: 'Comment dit-on "Cité Interdite" en chinois ?',
        correctAnswer: '故宫',
        explanation: '故宫 (Gùgōng) = Cité Interdite'
      },
      {
        question: 'Comment dit-on "Palais d\'Été" en chinois ?',
        correctAnswer: '颐和园',
        explanation: '颐和园 (Yíhéyuán) = Palais d\'Été (Summer Palace)'
      },
      {
        question: 'Comment dit-on "Parc Beihai" en chinois ?',
        correctAnswer: '北海公园',
        explanation: '北海公园 (Běihǎi Gōngyuán) = Parc Beihai'
      },
      {
        question: 'Comment dit-on "Parc Xishan" en chinois ?',
        correctAnswer: '西山公园',
        explanation: '西山公园 (Xīshān Gōngyuán) = Parc Xishan'
      }
    ]
  },

  // Réponse à 怎么样
  'zenmeyang-1': {
    id: 'zenmeyang-1',
    title: 'Répondre à 怎么样 (zěnme yàng)',
    type: 'text-input',
    questions: [
      {
        question: 'Comment répondre positivement à "怎么样？" (Comment c\'est ?)',
        correctAnswer: '太好了',
        explanation: '太好了 (tài hǎo le) = C\'est très bien / Parfait (réponse positive)'
      },
      {
        question: 'Comment répondre négativement à "怎么样？" en disant "Désolé, je n\'ai pas le temps" ?',
        correctAnswer: '对不起，我没有时间',
        explanation: '对不起，我没有时间 (duì bu qǐ, wǒ méi yǒu shíjiān) = Désolé, je n\'ai pas le temps (réponse négative)'
      },
      {
        question: 'Écrivez la réponse négative complète avec "对不起，我没有..."',
        correctAnswer: '对不起，我没有时间',
        explanation: '对不起，我没有时间 (duì bu qǐ, wǒ méi yǒu shíjiān) = Désolé, je n\'ai pas le temps'
      }
    ]
  },

  // Tongxue 同学
  'tongxue-1': {
    id: 'tongxue-1',
    title: 'Utilisation de 同学 (tóngxué)',
    type: 'multiple-choice',
    questions: [
      {
        question: 'Comment dire "tous mes camarades de classe" en utilisant 同学 (et pas 都) ?',
        chinese: '我所有的同学',
        options: ['我所有的同学 (wǒ suǒyǒu de tóngxué)', '我都同学 (wǒ dōu tóngxué)', '我同学都 (wǒ tóngxué dōu)', '同学我 (tóngxué wǒ)'],
        correctAnswer: 0,
        explanation: '我所有的同学 (wǒ suǒyǒu de tóngxué) = tous mes camarades de classe. On utilise 所有 (suǒyǒu) et non 都 (dōu).'
      },
      {
        question: 'Quel est le mot spécifique pour dire "tous" avec 同学 ?',
        options: ['都 (dōu)', '所有 (suǒyǒu)', '全部 (quánbù)', '每个 (měi gè)'],
        correctAnswer: 1,
        explanation: '所有 (suǒyǒu) = tous, tout. On utilise 所有的同学 (suǒyǒu de tóngxué) pour "tous les camarades".'
      }
    ]
  },

  // Xian, ranhou, yihou, zuihou
  'sequence-1': {
    id: 'sequence-1',
    title: 'Mots de séquence : 先, 然后, 以后, 最后',
    type: 'text-input',
    questions: [
      {
        question: 'Comment dire "d\'abord" en chinois ?',
        correctAnswer: '先',
        explanation: '先 (xiān) = d\'abord, premièrement'
      },
      {
        question: 'Comment dire "puis" ou "ensuite" en chinois ?',
        correctAnswer: '然后',
        explanation: '然后 (ránhòu) = puis, ensuite'
      },
      {
        question: 'Comment dire "après" en chinois ?',
        correctAnswer: '以后',
        explanation: '以后 (yǐhòu) = après, plus tard'
      },
      {
        question: 'Comment dire "enfin" ou "finalement" en chinois ?',
        correctAnswer: '最后',
        explanation: '最后 (zuìhòu) = enfin, finalement'
      },
      {
        question: 'Formez une phrase avec : 先...然后...最后 (d\'abord...puis...enfin)',
        hint: 'Exemple : 我先吃饭，然后学习，最后睡觉',
        correctAnswer: ['我先吃饭，然后学习，最后睡觉', '先吃饭，然后学习，最后睡觉'],
        explanation: 'Structure : 先 + action 1，然后 + action 2，最后 + action 3'
      }
    ]
  },

  // Temps et heures
  'temps-1': {
    id: 'temps-1',
    title: 'Temps et heures - 刻 (kè)',
    type: 'text-input',
    questions: [
      {
        question: 'Que signifie 刻 (kè) ?',
        correctAnswer: '刻',
        explanation: '刻 (kè) = un quart d\'heure (15 minutes)'
      },
      {
        question: 'Comment écrire "8h15" en chiffres arabes avec 刻 ?',
        correctAnswer: '8点15分',
        explanation: '8点15分 (bā diǎn shíwǔ fēn) = 8h15. On peut aussi dire 8点1刻 (bā diǎn yī kè) = 8h15 (un quart)'
      },
      {
        question: 'Comment écrire "8h30" en chinois ?',
        correctAnswer: '8点30分',
        explanation: '8点30分 (bā diǎn sānshí fēn) = 8h30'
      },
      {
        question: 'Comment écrire "8h45" en chinois ?',
        correctAnswer: '8点45分',
        explanation: '8点45分 (bā diǎn sìshíwǔ fēn) = 8h45. On peut aussi dire 8点3刻 (bā diǎn sān kè) = 8h45 (trois quarts)'
      },
      {
        question: 'Comment dire "Il est 8h15" en utilisant 刻 ?',
        correctAnswer: '8点1刻',
        explanation: '8点1刻 (bā diǎn yī kè) = 8h15 (un quart)'
      }
    ]
  },

  // Cha 差
  'cha-1': {
    id: 'cha-1',
    title: 'Utilisation de 差 (chà) pour le temps',
    type: 'text-input',
    questions: [
      {
        question: 'Comment dire "Il est 8h moins le quart" (7h45) en utilisant 差 ?',
        correctAnswer: '差一刻8点',
        explanation: '差一刻8点 (chà yī kè bā diǎn) = Il est 8h moins le quart (7h45)'
      },
      {
        question: 'Traduisez : "差一刻8点"',
        correctAnswer: '差一刻8点',
        explanation: '差一刻8点 (chà yī kè bā diǎn) = 7h45 (8h moins un quart)'
      },
      {
        question: 'Comment dire "Il est 8h moins 5 minutes" en utilisant 差 ?',
        correctAnswer: '差5分8点',
        explanation: '差5分8点 (chà wǔ fēn bā diǎn) = 7h55 (8h moins 5 minutes)'
      }
    ]
  },

  // Questions avec 下午 et 现在
  'questions-temps-1': {
    id: 'questions-temps-1',
    title: 'Poser des questions sur le temps',
    type: 'text-input',
    questions: [
      {
        question: 'Comment demander "Avez-vous cours cet après-midi ?"',
        correctAnswer: '下午你有课吗',
        explanation: '下午你有课吗？(xiàwǔ nǐ yǒu kè ma?) = Avez-vous cours cet après-midi ?'
      },
      {
        question: 'Comment demander "Quelle heure est-il maintenant ?"',
        correctAnswer: '现在几点',
        explanation: '现在几点？(xiànzài jǐ diǎn?) = Quelle heure est-il maintenant ?'
      },
      {
        question: 'Écrivez la question complète avec le point d\'interrogation',
        correctAnswer: '现在几点？',
        explanation: '现在几点？(xiànzài jǐ diǎn?) = Quelle heure est-il maintenant ?'
      }
    ]
  },

  // Youshihou 有时候
  'youshihou-1': {
    id: 'youshihou-1',
    title: '有时候 (yǒushíhòu) - Parfois',
    type: 'multiple-choice',
    questions: [
      {
        question: 'Que signifie 有时候 (yǒushíhòu) ?',
        options: ['Toujours', 'Parfois', 'Jamais', 'Souvent'],
        correctAnswer: 1,
        explanation: '有时候 (yǒushíhòu) = parfois, quelquefois'
      },
      {
        question: 'Comment dire "Parfois je vais au parc" ?',
        chinese: '有时候我去公园',
        options: ['有时候我去公园 (yǒushíhòu wǒ qù gōngyuán)', '总是我去公园 (zǒngshì wǒ qù gōngyuán)', '从来我去公园 (cónglái wǒ qù gōngyuán)', '经常我去公园 (jīngcháng wǒ qù gōngyuán)'],
        correctAnswer: 0,
        explanation: '有时候我去公园 (yǒushíhòu wǒ qù gōngyuán) = Parfois je vais au parc'
      }
    ]
  },

  // Gen...jian mian
  'jianmian-1': {
    id: 'jianmian-1',
    title: '跟...见面 (gēn...jiànmiàn)',
    type: 'text-input',
    questions: [
      {
        question: 'Comment dire "rencontrer un ami" en utilisant 跟...见面 ?',
        correctAnswer: '跟朋友见面',
        explanation: '跟朋友见面 (gēn péngyou jiànmiàn) = rencontrer un ami'
      },
      {
        question: 'Traduisez : "我跟朋友见面"',
        correctAnswer: '我跟朋友见面',
        explanation: '我跟朋友见面 (wǒ gēn péngyou jiànmiàn) = Je rencontre un ami / Je rencontre avec un ami'
      },
      {
        question: 'Comment dire "Je rencontre mon camarade de classe" ?',
        correctAnswer: '我跟同学见面',
        explanation: '我跟同学见面 (wǒ gēn tóngxué jiànmiàn) = Je rencontre mon camarade de classe'
      }
    ]
  },

  // Zuo 做
  'zuo-1': {
    id: 'zuo-1',
    title: '做 (zuò) - Faire',
    type: 'multiple-choice',
    questions: [
      {
        question: 'Que signifie 做 (zuò) ?',
        options: ['Aller', 'Faire', 'Venir', 'Voir'],
        correctAnswer: 1,
        explanation: '做 (zuò) = faire'
      },
      {
        question: 'Comment dire "faire ses devoirs" ?',
        chinese: '做作业',
        options: ['做作业 (zuò zuòyè)', '去作业 (qù zuòyè)', '来作业 (lái zuòyè)', '看作业 (kàn zuòyè)'],
        correctAnswer: 0,
        explanation: '做作业 (zuò zuòyè) = faire ses devoirs'
      },
      {
        question: 'Comment dire "faire du sport" ?',
        chinese: '做运动',
        options: ['去运动 (qù yùndòng)', '来运动 (lái yùndòng)', '看运动 (kàn yùndòng)', '做运动 (zuò yùndòng)'],
        correctAnswer: 3,
        explanation: '做运动 (zuò yùndòng) = faire du sport'
      }
    ]
  },

  // Yidianr 一点儿
  'yidianr-1': {
    id: 'yidianr-1',
    title: '一点儿 (yìdiǎnr) après le verbe',
    type: 'text-input',
    questions: [
      {
        question: 'Comment dire "manger un peu" en utilisant 一点儿 après le verbe ?',
        correctAnswer: '吃一点儿',
        explanation: '吃一点儿 (chī yìdiǎnr) = manger un peu. 一点儿 se place après le verbe.'
      },
      {
        question: 'Comment dire "boire un peu" ?',
        correctAnswer: '喝一点儿',
        explanation: '喝一点儿 (hē yìdiǎnr) = boire un peu'
      },
      {
        question: 'Comment dire "lire un peu" ?',
        correctAnswer: '读一点儿',
        explanation: '读一点儿 (dú yìdiǎnr) = lire un peu'
      },
      {
        question: 'Formez une phrase : "Je veux manger un peu"',
        correctAnswer: '我想吃一点儿',
        explanation: '我想吃一点儿 (wǒ xiǎng chī yìdiǎnr) = Je veux manger un peu'
      }
    ]
  },

  // Numéro de téléphone
  'telephone-1': {
    id: 'telephone-1',
    title: 'Demander le numéro de téléphone',
    type: 'text-input',
    questions: [
      {
        question: 'Comment demander "Quel est votre numéro de téléphone ?" en utilisant 号码 et 多少 ?',
        correctAnswer: '你的电话号码是多少',
        explanation: '你的电话号码是多少？(nǐ de diànhuà hàomǎ shì duōshao?) = Quel est votre numéro de téléphone ?'
      },
      {
        question: 'Écrivez la question complète avec le point d\'interrogation',
        correctAnswer: '你的电话号码是多少？',
        explanation: '你的电话号码是多少？(nǐ de diànhuà hàomǎ shì duōshao?) = Quel est votre numéro de téléphone ?'
      },
      {
        question: 'Quel mot signifie "numéro" dans "numéro de téléphone" ?',
        correctAnswer: '号码',
        explanation: '号码 (hàomǎ) = numéro'
      },
      {
        question: 'Quel mot signifie "combien" dans la question sur le téléphone ?',
        correctAnswer: '多少',
        explanation: '多少 (duōshao) = combien'
      }
    ]
  },

  // Zhuanye 专业
  'zhuanye-1': {
    id: 'zhuanye-1',
    title: '专业 (zhuānyè) - Spécialité',
    type: 'multiple-choice',
    questions: [
      {
        question: 'Que signifie 专业 (zhuānyè) ?',
        options: ['École', 'Cours', 'Spécialité / Domaine d\'étude', 'Livre'],
        correctAnswer: 2,
        explanation: '专业 (zhuānyè) = spécialité, domaine d\'étude, majeure'
      },
      {
        question: 'Comment dire "Quelle est votre spécialité ?" ?',
        chinese: '你的专业是什么？',
        options: ['你的专业是什么？(nǐ de zhuānyè shì shénme?)', '你的学校是什么？(nǐ de xuéxiào shì shénme?)', '你的课程是什么？(nǐ de kèchéng shì shénme?)', '你的书是什么？(nǐ de shū shì shénme?)'],
        correctAnswer: 0,
        explanation: '你的专业是什么？(nǐ de zhuānyè shì shénme?) = Quelle est votre spécialité ?'
      }
    ]
  },

  // Wanyr 玩儿
  'wanyr-1': {
    id: 'wanyr-1',
    title: '玩儿 (wánr) - S\'amuser',
    type: 'multiple-choice',
    questions: [
      {
        question: 'Que signifie 玩儿 (wánr) ?',
        options: ['Travailler', 'Étudier', 'S\'amuser / Jouer', 'Manger'],
        correctAnswer: 2,
        explanation: '玩儿 (wánr) = s\'amuser, jouer'
      },
      {
        question: 'Comment dire "s\'amuser" ou "avoir du plaisir" ?',
        chinese: '玩儿',
        options: ['工作 (gōngzuò)', '学习 (xuéxí)', '吃饭 (chīfàn)', '玩儿 (wánr)'],
        correctAnswer: 3,
        explanation: '玩儿 (wánr) = s\'amuser, avoir du plaisir'
      },
      {
        question: 'Comment dire "Je vais m\'amuser" ?',
        chinese: '我去玩儿',
        options: ['我来玩儿 (wǒ lái wánr)', '我看玩儿 (wǒ kàn wánr)', '我做玩儿 (wǒ zuò wánr)', '我去玩儿 (wǒ qù wánr)'],
        correctAnswer: 3,
        explanation: '我去玩儿 (wǒ qù wánr) = Je vais m\'amuser'
      }
    ]
  },

  // Classificateurs - Partie 1 : Les plus courants
  'classificateurs-1': {
    id: 'classificateurs-1',
    title: 'Classificateurs (量词) - Partie 1 : Les plus courants',
    type: 'multiple-choice',
    questions: [
      {
        question: 'Quel classificateur utilise-t-on pour "书" (livre) ?',
        options: ['张 (zhāng)', '支 (zhī)', '本 (běn)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '本 (běn) est utilisé pour les livres, magazines, cahiers et autres objets reliés. C\'est parce que 本 signifie à l\'origine "racine" ou "base", et les livres sont considérés comme des objets avec une "base" solide. Exemple : 一本书 (yì běn shū) = un livre.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "纸" (papier) ?',
        options: ['片 (piàn)', '个 (gè)', '本 (běn)', '张 (zhāng)'],
        correctAnswer: 3,
        explanation: '张 (zhāng) est utilisé pour les objets plats et rectangulaires comme le papier, les tables, les photos, les cartes, les lits. 张 signifie à l\'origine "étendre", donc il s\'applique aux objets qui peuvent être "étendus". Exemple : 一张纸 (yì zhāng zhǐ) = une feuille de papier.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "人" (personne) ?',
        options: ['位 (wèi)', '名 (míng)', '张 (zhāng)', '个 (gè)'],
        correctAnswer: 3,
        explanation: '个 (gè) est le classificateur le plus général et polyvalent. Il peut être utilisé pour presque tout, y compris les personnes. C\'est le classificateur "par défaut" quand on ne sait pas lequel utiliser. Exemple : 一个人 (yí gè rén) = une personne. Note : 位 (wèi) est plus poli pour les personnes, mais 个 est plus courant.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "水" (eau) dans un verre ?',
        options: ['瓶 (píng)', '碗 (wǎn)', '杯 (bēi)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '杯 (bēi) signifie "tasse" ou "verre", donc il est utilisé pour les boissons servies dans une tasse ou un verre. Exemple : 一杯水 (yì bēi shuǐ) = un verre d\'eau. Note : 瓶 (píng) = bouteille, 碗 (wǎn) = bol.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "衣服" (vêtement) ?',
        options: ['套 (tào)', '条 (tiáo)', '件 (jiàn)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '件 (jiàn) est utilisé pour les vêtements individuels (chemises, manteaux, etc.) et les choses abstraites ou concrètes qui sont "complètes" en elles-mêmes. 件 signifie "pièce" ou "article". Exemple : 一件衣服 (yí jiàn yīfu) = un vêtement.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "鱼" (poisson) ?',
        options: ['只 (zhī)', '头 (tóu)', '条 (tiáo)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '条 (tiáo) est utilisé pour les objets longs et flexibles : poissons, pantalons, routes, rivières, serpents, etc. 条 signifie à l\'origine "bande" ou "lanière". Exemple : 一条鱼 (yì tiáo yú) = un poisson.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "车" (voiture) ?',
        options: ['台 (tái)', '部 (bù)', '辆 (liàng)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '辆 (liàng) est spécifiquement utilisé pour les véhicules à roues : voitures, vélos, motos, bus, etc. C\'est un classificateur spécialisé pour les moyens de transport terrestres. Exemple : 一辆车 (yí liàng chē) = une voiture.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "笔" (stylo) ?',
        options: ['根 (gēn)', '条 (tiáo)', '支 (zhī)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '支 (zhī) est utilisé pour les objets longs, fins et rigides : stylos, cigarettes, flûtes, bougies, etc. 支 signifie "branche" ou "tige". Exemple : 一支笔 (yì zhī bǐ) = un stylo.'
      }
    ]
  },

  // Classificateurs - Partie 2 : Animaux et objets spécifiques
  'classificateurs-2': {
    id: 'classificateurs-2',
    title: 'Classificateurs (量词) - Partie 2 : Animaux et objets spécifiques',
    type: 'multiple-choice',
    questions: [
      {
        question: 'Quel classificateur utilise-t-on pour "猫" (chat) ?',
        options: ['头 (tóu)', '条 (tiáo)', '只 (zhī)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '只 (zhī) est utilisé pour la plupart des animaux de petite et moyenne taille : chats, chiens, oiseaux, lapins, etc. C\'est le classificateur standard pour les animaux. Exemple : 一只猫 (yì zhī māo) = un chat.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "牛" (vache) ?',
        options: ['只 (zhī)', '头 (tóu)', '匹 (pǐ)', '个 (gè)'],
        correctAnswer: 1,
        explanation: '头 (tóu) signifie "tête" et est utilisé pour les gros animaux domestiques : vaches, porcs, moutons, éléphants. Ces animaux sont comptés par leur "tête". Exemple : 一头牛 (yì tóu niú) = une vache.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "马" (cheval) ?',
        options: ['头 (tóu)', '个 (gè)', '只 (zhī)', '匹 (pǐ)'],
        correctAnswer: 3,
        explanation: '匹 (pǐ) est spécifiquement utilisé pour les chevaux. C\'est un classificateur ancien et spécialisé. Exemple : 一匹马 (yì pǐ mǎ) = un cheval.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "树" (arbre) ?',
        options: ['株 (zhū)', '根 (gēn)', '棵 (kē)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '棵 (kē) est utilisé pour les arbres et les plantes en général. C\'est le classificateur standard pour la végétation. Exemple : 一棵树 (yì kē shù) = un arbre.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "山" (montagne) ?',
        options: ['条 (tiáo)', '峰 (fēng)', '座 (zuò)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '座 (zuò) est utilisé pour les objets grands, solides et fixes : montagnes, bâtiments, ponts, statues. 座 signifie "siège" ou "base", donc il s\'applique aux structures imposantes. Exemple : 一座山 (yí zuò shān) = une montagne.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "鞋" (chaussure) en paire ?',
        options: ['只 (zhī)', '对 (duì)', '双 (shuāng)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '双 (shuāng) signifie "paire" et est utilisé pour les objets qui vont par deux : chaussures, gants, chaussettes, lunettes. Exemple : 一双鞋 (yì shuāng xié) = une paire de chaussures. Note : 只 (zhī) peut être utilisé pour une seule chaussure : 一只鞋.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "椅子" (chaise) ?',
        options: ['张 (zhāng)', '座 (zuò)', '把 (bǎ)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '把 (bǎ) signifie "poignée" et est utilisé pour les objets avec une poignée : chaises, parapluies, couteaux, clés, brosses. Exemple : 一把椅子 (yì bǎ yǐzi) = une chaise.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "电脑" (ordinateur) ?',
        options: ['部 (bù)', '架 (jià)', '台 (tái)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '台 (tái) signifie "plateforme" ou "support" et est utilisé pour les machines et appareils : ordinateurs, télévisions, machines à laver, etc. Exemple : 一台电脑 (yì tái diànnǎo) = un ordinateur.'
      }
    ]
  },

  // Classificateurs - Partie 3 : Objets abstraits et cas spéciaux
  'classificateurs-3': {
    id: 'classificateurs-3',
    title: 'Classificateurs (量词) - Partie 3 : Objets abstraits et cas spéciaux',
    type: 'multiple-choice',
    questions: [
      {
        question: 'Quel classificateur utilise-t-on pour "钱" (argent) en pièces ?',
        options: ['元 (yuán)', '块 (kuài)', '张 (zhāng)', '个 (gè)'],
        correctAnswer: 1,
        explanation: '块 (kuài) signifie "morceau" et est utilisé pour : 1) les pièces de monnaie (一块钱 = un yuan), 2) les morceaux de quelque chose (一块蛋糕 = un morceau de gâteau), 3) les terrains (一块地). Exemple : 一块钱 (yí kuài qián) = un yuan (pièce).'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "电影" (film) ?',
        options: ['场 (chǎng)', '集 (jí)', '部 (bù)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '部 (bù) est utilisé pour les œuvres complètes : films, romans, séries télévisées, machines. 部 signifie "partie" ou "section". Exemple : 一部电影 (yí bù diànyǐng) = un film.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "课" (cours) ?',
        options: ['堂 (táng)', '门 (mén)', '节 (jié)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '节 (jié) signifie "section" ou "segment" et est utilisé pour les cours, les leçons, les chapitres. Exemple : 一节课 (yì jié kè) = un cours. Note : 门 (mén) est utilisé pour une matière complète : 一门课 = une matière.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "事情" (chose, affaire) ?',
        options: ['桩 (zhuāng)', '项 (xiàng)', '件 (jiàn)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '件 (jiàn) est utilisé pour les choses abstraites ou concrètes qui sont "complètes" : affaires, événements, vêtements. Exemple : 一件事情 (yí jiàn shìqing) = une affaire/une chose.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "门" (porte) ?',
        options: ['道 (dào)', '张 (zhāng)', '扇 (shàn)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '扇 (shàn) signifie "battant" et est utilisé pour les portes et les fenêtres qui s\'ouvrent. Exemple : 一扇门 (yí shàn mén) = une porte.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "花" (fleur) ?',
        options: ['枝 (zhī)', '棵 (kē)', '朵 (duǒ)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '朵 (duǒ) est spécifiquement utilisé pour les fleurs. C\'est un classificateur poétique et spécialisé. Exemple : 一朵花 (yì duǒ huā) = une fleur.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "桥" (pont) ?',
        options: ['条 (tiáo)', '道 (dào)', '座 (zuò)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '座 (zuò) est utilisé pour les structures grandes et fixes : ponts, bâtiments, montagnes. Exemple : 一座桥 (yí zuò qiáo) = un pont.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "裤子" (pantalon) ?',
        options: ['件 (jiàn)', '套 (tào)', '条 (tiáo)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '条 (tiáo) est utilisé pour les objets longs et flexibles, y compris les pantalons car ils ont des "jambes" longues. Exemple : 一条裤子 (yì tiáo kùzi) = un pantalon.'
      }
    ]
  },

  // Classificateurs - Partie 4 : Cas complexes et exceptions
  'classificateurs-4': {
    id: 'classificateurs-4',
    title: 'Classificateurs (量词) - Partie 4 : Cas complexes et exceptions',
    type: 'multiple-choice',
    questions: [
      {
        question: 'Quel classificateur utilise-t-on pour "老师" (professeur) de manière polie ?',
        options: ['名 (míng)', '位 (wèi)', '员 (yuán)', '个 (gè)'],
        correctAnswer: 1,
        explanation: '位 (wèi) est la forme polie pour compter les personnes. Il montre du respect. 个 (gè) est neutre, tandis que 位 est plus formel et respectueux. Exemple : 一位老师 (yí wèi lǎoshī) = un professeur (poli).'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "学生" (étudiant) de manière formelle ?',
        options: ['位 (wèi)', '员 (yuán)', '名 (míng)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '名 (míng) signifie "nom" et est utilisé de manière formelle pour compter les personnes dans des contextes officiels : étudiants, employés, membres. Exemple : 一名学生 (yì míng xuésheng) = un étudiant (formel).'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "照片" (photo) ?',
        options: ['幅 (fú)', '片 (piàn)', '张 (zhāng)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '张 (zhāng) est utilisé pour les objets plats : photos, cartes, tables, lits. Les photos sont plates et rectangulaires, donc 张 est approprié. Exemple : 一张照片 (yì zhāng zhàopiàn) = une photo.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "画" (tableau, peinture) ?',
        options: ['张 (zhāng)', '件 (jiàn)', '幅 (fú)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '幅 (fú) est spécifiquement utilisé pour les peintures, tableaux et œuvres d\'art accrochées. C\'est plus spécialisé que 张. Exemple : 一幅画 (yì fú huà) = un tableau.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "房子" (maison) ?',
        options: ['间 (jiān)', '栋 (dòng)', '座 (zuò)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '座 (zuò) est utilisé pour les bâtiments complets : maisons, immeubles, palais. 间 (jiān) est utilisé pour les pièces à l\'intérieur. Exemple : 一座房子 (yí zuò fángzi) = une maison.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "房间" (chambre, pièce) ?',
        options: ['座 (zuò)', '套 (tào)', '间 (jiān)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '间 (jiān) signifie "espace entre" et est utilisé pour les pièces, chambres, salles. C\'est le classificateur pour les espaces intérieurs. Exemple : 一间房间 (yì jiān fángjiān) = une chambre.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "飞机" (avion) ?',
        options: ['台 (tái)', '辆 (liàng)', '架 (jià)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '架 (jià) signifie "support" ou "cadre" et est utilisé pour les avions, hélicoptères, et autres aéronefs. Exemple : 一架飞机 (yí jià fēijī) = un avion.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "船" (bateau) ?',
        options: ['条 (tiáo)', '只 (zhī)', '艘 (sōu)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '艘 (sōu) est spécifiquement utilisé pour les bateaux et navires. C\'est un classificateur spécialisé pour les embarcations. Exemple : 一艘船 (yì sōu chuán) = un bateau.'
      }
    ]
  },

  // Classificateurs - Partie 5 : Pratique avancée
  'classificateurs-5': {
    id: 'classificateurs-5',
    title: 'Classificateurs (量词) - Partie 5 : Pratique avancée',
    type: 'multiple-choice',
    questions: [
      {
        question: 'Quel classificateur utilise-t-on pour "苹果" (pomme) ?',
        options: ['颗 (kē)', '粒 (lì)', '只 (zhī)', '个 (gè)'],
        correctAnswer: 3,
        explanation: '个 (gè) est le classificateur le plus général et peut être utilisé pour les fruits ronds. Cependant, 颗 (kē) est aussi utilisé pour les petits objets ronds comme les perles, les grains. Pour les pommes, 个 est le plus courant. Exemple : 一个苹果 (yí gè píngguǒ) = une pomme.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "米" (riz, grain) ?',
        options: ['颗 (kē)', '只 (zhī)', '粒 (lì)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '粒 (lì) signifie "grain" et est utilisé pour les petits objets ronds et durs : grains de riz, perles, pilules. Exemple : 一粒米 (yí lì mǐ) = un grain de riz.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "眼镜" (lunettes) ?',
        options: ['双 (shuāng)', '对 (duì)', '副 (fù)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '副 (fù) signifie "paire" ou "jeu" et est utilisé pour les objets qui vont ensemble : lunettes, cartes à jouer, échecs. Exemple : 一副眼镜 (yí fù yǎnjìng) = une paire de lunettes.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "筷子" (baguettes) ?',
        options: ['根 (gēn)', '支 (zhī)', '双 (shuāng)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '双 (shuāng) signifie "paire" et est utilisé pour les baguettes car elles sont utilisées par deux. Exemple : 一双筷子 (yì shuāng kuàizi) = une paire de baguettes.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "头发" (cheveu) ?',
        options: ['条 (tiáo)', '丝 (sī)', '根 (gēn)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '根 (gēn) signifie "racine" et est utilisé pour les objets longs et fins : cheveux, fils, cordes, bâtons. Exemple : 一根头发 (yì gēn tóufa) = un cheveu.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "灯" (lampe) ?',
        options: ['台 (tái)', '支 (zhī)', '盏 (zhǎn)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '盏 (zhǎn) est spécifiquement utilisé pour les lampes et les lanternes. C\'est un classificateur ancien et spécialisé. Exemple : 一盏灯 (yì zhǎn dēng) = une lampe.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "衣服" (vêtement) en ensemble ?',
        options: ['件 (jiàn)', '身 (shēn)', '套 (tào)', '个 (gè)'],
        correctAnswer: 2,
        explanation: '套 (tào) signifie "ensemble" ou "série" et est utilisé pour les vêtements complets (haut + bas), les meubles en ensemble, les livres en série. Exemple : 一套衣服 (yí tào yīfu) = un ensemble de vêtements.'
      },
      {
        question: 'Quel classificateur utilise-t-on pour "问题" (question, problème) ?',
        options: ['件 (jiàn)', '项 (xiàng)', '个 (gè)', '道 (dào)'],
        correctAnswer: 2,
        explanation: '个 (gè) est le classificateur le plus général et peut être utilisé pour les questions et problèmes. 道 (dào) est aussi utilisé pour les questions dans certains contextes formels. Exemple : 一个问题 (yí gè wèntí) = une question.'
      }
    ]
  }
}

export const exerciseCategories: ExerciseCategory[] = [
  {
    id: 'basics',
    title: 'Bases',
    exercises: [
      {
        id: 'interrogatifs-1',
        title: 'Mots interrogatifs',
        type: 'multiple-choice',
        description: 'Apprenez les mots interrogatifs : 什么, 怎么, 哪里, etc.'
      },
      {
        id: 'qing-1',
        title: '请 (qǐng) - S\'il vous plaît',
        type: 'multiple-choice',
        description: 'Utilisation de 请 pour être poli'
      },
      {
        id: 'dui-1',
        title: '对 (duì) - Affirmer',
        type: 'multiple-choice',
        description: 'Utilisation de 对 pour dire "oui" ou "être concerné"'
      }
    ]
  },
  {
    id: 'vocabulary',
    title: 'Vocabulaire',
    exercises: [
      {
        id: 'lieux-1',
        title: 'Lieux de Chine',
        type: 'text-input',
        description: 'Grande Muraille, Temple du Paradis, Cité Interdite, etc.'
      },
      {
        id: 'tongxue-1',
        title: '同学 (tóngxué)',
        type: 'multiple-choice',
        description: 'Utilisation de 同学 avec 所有 (pas 都)'
      },
      {
        id: 'zuo-1',
        title: '做 (zuò) - Faire',
        type: 'multiple-choice',
        description: 'Utilisation du verbe 做'
      },
      {
        id: 'zhuanye-1',
        title: '专业 (zhuānyè)',
        type: 'multiple-choice',
        description: 'Spécialité / Domaine d\'étude'
      },
      {
        id: 'wanyr-1',
        title: '玩儿 (wánr)',
        type: 'multiple-choice',
        description: 'S\'amuser, avoir du plaisir'
      }
    ]
  },
  {
    id: 'time',
    title: 'Temps et Heures',
    exercises: [
      {
        id: 'temps-1',
        title: 'Heures et 刻 (kè)',
        type: 'text-input',
        description: 'Lire et écrire les heures, utiliser 刻 (quart d\'heure)'
      },
      {
        id: 'cha-1',
        title: '差 (chà) - Moins',
        type: 'text-input',
        description: 'Utiliser 差 pour dire "moins" (ex: 差一刻8点)'
      },
      {
        id: 'questions-temps-1',
        title: 'Questions sur le temps',
        type: 'text-input',
        description: '下午你有课吗？现在几点？'
      },
      {
        id: 'sequence-1',
        title: 'Mots de séquence',
        type: 'text-input',
        description: '先, 然后, 以后, 最后'
      },
      {
        id: 'youshihou-1',
        title: '有时候 (yǒushíhòu)',
        type: 'multiple-choice',
        description: 'Parfois, quelquefois'
      }
    ]
  },
  {
    id: 'expressions',
    title: 'Expressions',
    exercises: [
      {
        id: 'zenmeyang-1',
        title: 'Répondre à 怎么样',
        type: 'text-input',
        description: '太好了 (positif) / 对不起，我没有时间 (négatif)'
      },
      {
        id: 'jianmian-1',
        title: '跟...见面',
        type: 'text-input',
        description: 'Rencontrer quelqu\'un'
      },
      {
        id: 'yidianr-1',
        title: '一点儿 (yìdiǎnr)',
        type: 'text-input',
        description: 'Un peu (après le verbe)'
      },
      {
        id: 'telephone-1',
        title: 'Numéro de téléphone',
        type: 'text-input',
        description: 'Demander avec 号码 et 多少'
      }
    ]
  },
  {
    id: 'classificateurs',
    title: 'Classificateurs (量词)',
    exercises: [
      {
        id: 'classificateurs-1',
        title: 'Classificateurs - Partie 1',
        type: 'multiple-choice',
        description: 'Les plus courants : 个, 本, 张, 杯, 件, 条, 辆, 支'
      },
      {
        id: 'classificateurs-2',
        title: 'Classificateurs - Partie 2',
        type: 'multiple-choice',
        description: 'Animaux et objets spécifiques : 只, 头, 匹, 棵, 座, 双, 把, 台'
      },
      {
        id: 'classificateurs-3',
        title: 'Classificateurs - Partie 3',
        type: 'multiple-choice',
        description: 'Objets abstraits et cas spéciaux : 块, 部, 节, 扇, 朵'
      },
      {
        id: 'classificateurs-4',
        title: 'Classificateurs - Partie 4',
        type: 'multiple-choice',
        description: 'Cas complexes et exceptions : 位, 名, 幅, 间, 架, 艘'
      },
      {
        id: 'classificateurs-5',
        title: 'Classificateurs - Partie 5',
        type: 'multiple-choice',
        description: 'Pratique avancée : 粒, 副, 根, 盏, 套'
      }
    ]
  }
]

