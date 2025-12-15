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
        options: ['怎么 (zěnme)', '什么 (shénme)', '哪里 (nǎlǐ)', '为什么 (wèishénme)'],
        correctAnswer: 1,
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
        options: ['S\'il vous plaît, entrez', 'S\'il vous plaît, sortez', 'S\'il vous plaît, attendez', 'S\'il vous plaît, allez'],
        correctAnswer: 0,
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
        options: ['Être intéressé par quelque chose', 'Ne pas être intéressé', 'Demander un intérêt', 'Avoir un intérêt'],
        correctAnswer: 0,
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
        options: ['做运动 (zuò yùndòng)', '去运动 (qù yùndòng)', '来运动 (lái yùndòng)', '看运动 (kàn yùndòng)'],
        correctAnswer: 0,
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
        options: ['玩儿 (wánr)', '工作 (gōngzuò)', '学习 (xuéxí)', '吃饭 (chīfàn)'],
        correctAnswer: 0,
        explanation: '玩儿 (wánr) = s\'amuser, avoir du plaisir'
      },
      {
        question: 'Comment dire "Je vais m\'amuser" ?',
        chinese: '我去玩儿',
        options: ['我去玩儿 (wǒ qù wánr)', '我来玩儿 (wǒ lái wánr)', '我看玩儿 (wǒ kàn wánr)', '我做玩儿 (wǒ zuò wánr)'],
        correctAnswer: 0,
        explanation: '我去玩儿 (wǒ qù wánr) = Je vais m\'amuser'
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
  }
]

