export interface Exam {
  id: string
  title: string
  sections: {
    numberTime?: {
      questions: Array<{
        chinese: string
        pinyin: string
        correctAnswer: string
      }>
    }
    wordMatching?: {
      leftItems: Array<{ id: string; text: string; pinyin?: string }>
      rightItems: Array<{ id: string; text: string; pinyin?: string }>
      correctPairs: Array<[string, string]>
    }
    measureWordMatching?: {
      leftItems: Array<{ id: string; text: string; pinyin?: string }>
      rightItems: Array<{ id: string; text: string; pinyin?: string }>
      correctPairs: Array<[string, string]>
    }
    verbObject?: {
      verbs: Array<{ id: string; verb: string; pinyin: string }>
      objects: Array<{ id: string; object: string; pinyin: string }>
      correctPairs: Array<[string, string]>
    }
    fillInBlanks?: {
      sentences: Array<{
        id: string
        sentence: string
        pinyin?: string
        blanks: Array<{ position: number; correctAnswer: string }>
      }>
      wordBank: Array<{ id: string; word: string; pinyin: string }>
    }
    questionFormation?: {
      questions: Array<{
        id: string
        sentence: string
        pinyin: string
        underlinedPart: string
        correctQuestion: string
        correctPinyin: string
      }>
    }
    rearrange?: {
      questions: Array<{
        id: string
        words: Array<{ word: string; pinyin: string }>
        correctOrder: number[]
        correctSentence: string
        correctPinyin: string
      }>
    }
    dialogue?: {
      dialogues: Array<{
        id: string
        context?: string
        parts: Array<{
          speaker: 'A' | 'B'
          text?: string
          pinyin?: string
          isBlank: boolean
          correctAnswer?: string
          correctPinyin?: string
        }>
      }>
    }
    readingComprehension?: {
      passage: {
        text: string
        pinyin: string
      }
      questions: Array<{
        id: string
        question: string
        pinyin: string
        correctAnswer: string
        correctPinyin?: string
      }>
    }
  }
}

export const exams: Exam[] = [
  {
    id: 'exam-1',
    title: 'Examen Type 1',
    sections: {
      numberTime: {
        questions: [
          { chinese: '八点十五分', pinyin: 'bā diǎn shíwǔ fēn', correctAnswer: '8:15' },
          { chinese: '九点三十分', pinyin: 'jiǔ diǎn sānshí fēn', correctAnswer: '9:30' },
          { chinese: '十点四十五分', pinyin: 'shí diǎn sìshíwǔ fēn', correctAnswer: '10:45' },
          { chinese: '一百二十三', pinyin: 'yībǎi èrshísān', correctAnswer: '123' }
        ]
      },
      wordMatching: {
        leftItems: [
          { id: 'l1', text: '学生', pinyin: 'xuésheng' },
          { id: 'l2', text: '老师', pinyin: 'lǎoshī' },
          { id: 'l3', text: '朋友', pinyin: 'péngyou' },
          { id: 'l4', text: '学校', pinyin: 'xuéxiào' },
          { id: 'l5', text: '图书馆', pinyin: 'túshūguǎn' }
        ],
        rightItems: [
          { id: 'r1', text: 'teacher' },
          { id: 'r2', text: 'student' },
          { id: 'r3', text: 'friend' },
          { id: 'r4', text: 'school' },
          { id: 'r5', text: 'library' }
        ],
        correctPairs: [['l1', 'r2'], ['l2', 'r1'], ['l3', 'r3'], ['l4', 'r4'], ['l5', 'r5']]
      },
      measureWordMatching: {
        leftItems: [
          { id: 'm1', text: '个', pinyin: 'gè' },
          { id: 'm2', text: '本', pinyin: 'běn' },
          { id: 'm3', text: '张', pinyin: 'zhāng' },
          { id: 'm4', text: '杯', pinyin: 'bēi' }
        ],
        rightItems: [
          { id: 'n1', text: '书', pinyin: 'shū' },
          { id: 'n2', text: '人', pinyin: 'rén' },
          { id: 'n3', text: '纸', pinyin: 'zhǐ' },
          { id: 'n4', text: '水', pinyin: 'shuǐ' }
        ],
        correctPairs: [['m1', 'n2'], ['m2', 'n1'], ['m3', 'n3'], ['m4', 'n4']]
      },
      verbObject: {
        verbs: [
          { id: 'v1', verb: '看', pinyin: 'kàn' },
          { id: 'v2', verb: '吃', pinyin: 'chī' },
          { id: 'v3', verb: '喝', pinyin: 'hē' },
          { id: 'v4', verb: '做', pinyin: 'zuò' }
        ],
        objects: [
          { id: 'o1', object: '饭', pinyin: 'fàn' },
          { id: 'o2', object: '水', pinyin: 'shuǐ' },
          { id: 'o3', object: '作业', pinyin: 'zuòyè' },
          { id: 'o4', object: '电视', pinyin: 'diànshì' }
        ],
        correctPairs: [['v1', 'o4'], ['v2', 'o1'], ['v3', 'o2'], ['v4', 'o3']]
      },
      fillInBlanks: {
        sentences: [
          {
            id: 's1',
            sentence: '我___去图书馆。',
            blanks: [{ position: 1, correctAnswer: '想' }]
          },
          {
            id: 's2',
            sentence: '他___学习汉语。',
            blanks: [{ position: 1, correctAnswer: '在' }]
          }
        ],
        wordBank: [
          { id: 'w1', word: '想', pinyin: 'xiǎng' },
          { id: 'w2', word: '在', pinyin: 'zài' },
          { id: 'w3', word: '很', pinyin: 'hěn' },
          { id: 'w4', word: '也', pinyin: 'yě' }
        ]
      },
      questionFormation: {
        questions: [
          {
            id: 'q1',
            sentence: '这本书是我的。',
            pinyin: 'zhè běn shū shì wǒ de',
            underlinedPart: '我的',
            correctQuestion: '这是谁的书？',
            correctPinyin: 'zhè shì shéi de shū?'
          },
          {
            id: 'q2',
            sentence: '我叫林娜。',
            pinyin: 'wǒ jiào lín nà',
            underlinedPart: '林娜',
            correctQuestion: '你叫什么名字？',
            correctPinyin: 'nǐ jiào shénme míngzì?'
          }
        ]
      },
      rearrange: {
        questions: [
          {
            id: 'r1',
            words: [
              { word: '食堂', pinyin: 'shítáng' },
              { word: '有', pinyin: 'yǒu' },
              { word: '超市', pinyin: 'chāoshì' },
              { word: '一个', pinyin: 'yí gè' },
              { word: '前面', pinyin: 'qiánmiàn' }
            ],
            correctOrder: [3, 0, 1, 4, 2],
            correctSentence: '食堂前面有一个超市',
            correctPinyin: 'shítáng qiánmiàn yǒu yí gè chāoshì'
          }
        ]
      },
      dialogue: {
        dialogues: [
          {
            id: 'd1',
            parts: [
              { speaker: 'A', text: '你叫什么名字？', pinyin: 'nǐ jiào shénme míngzì?', isBlank: false },
              { speaker: 'B', text: '我叫林娜。', pinyin: 'wǒ jiào lín nà', isBlank: false },
              { speaker: 'A', isBlank: true, correctAnswer: '你叫什么名字？', correctPinyin: 'nǐ jiào shénme míngzì?' },
              { speaker: 'B', text: '我叫马丁。', pinyin: 'wǒ jiào mǎdīng', isBlank: false }
            ]
          }
        ]
      },
      readingComprehension: {
        passage: {
          text: '林娜和朱云是好朋友，她们经常见面。有时候朱云辅导林娜学习汉语，有时候她们一起聊天儿。她们还一起去参加了一个朋友的生日晚会。朱云喜欢运动，林娜喜欢画画儿。',
          pinyin: 'lín nà hé zhū yún shì hǎo péngyǒu, tāmen jīngcháng jiànmiàn. yǒushíhòu zhū yún fǔdǎo lín nà xuéxí hànyǔ, yǒushíhòu tāmen yìqǐ liáotiānr. tāmen hái yìqǐ qù cānjiā le yí gè péngyǒu de shēngrì wǎnhuì. zhū yún xǐhuan yùndòng, lín nà xǐhuan huàhuàr.'
        },
        questions: [
          {
            id: 'rc1',
            question: '林娜和谁是好朋友？',
            pinyin: 'lín nà hé shéi shì hǎo péngyǒu?',
            correctAnswer: '朱云',
            correctPinyin: 'zhū yún'
          },
          {
            id: 'rc2',
            question: '见面的时候，她们做什么？',
            pinyin: 'jiànmiàn de shíhòu, tāmen zuò shénme?',
            correctAnswer: '朱云辅导林娜学习汉语，或者她们一起聊天儿',
            correctPinyin: 'zhū yún fǔdǎo lín nà xuéxí hànyǔ, huòzhě tāmen yìqǐ liáotiānr'
          },
          {
            id: 'rc3',
            question: '上周末，她们一起做什么？',
            pinyin: 'shàng zhōumò, tāmen yìqǐ zuò shénme?',
            correctAnswer: '参加了一个朋友的生日晚会',
            correctPinyin: 'cānjiā le yí gè péngyǒu de shēngrì wǎnhuì'
          },
          {
            id: 'rc4',
            question: '林娜的爱好是什么？',
            pinyin: 'lín nà de àihào shì shénme?',
            correctAnswer: '画画儿',
            correctPinyin: 'huàhuàr'
          }
        ]
      }
    }
  },
  {
    id: 'exam-2',
    title: 'Examen Type 2',
    sections: {
      numberTime: {
        questions: [
          { chinese: '七点三十分', pinyin: 'qī diǎn sānshí fēn', correctAnswer: '7:30' },
          { chinese: '十一点一刻', pinyin: 'shíyī diǎn yī kè', correctAnswer: '11:15' },
          { chinese: '差一刻八点', pinyin: 'chà yī kè bā diǎn', correctAnswer: '7:45' },
          { chinese: '五百六十七', pinyin: 'wǔbǎi liùshíqī', correctAnswer: '567' }
        ]
      },
      wordMatching: {
        leftItems: [
          { id: 'l1', text: '医生', pinyin: 'yīshēng' },
          { id: 'l2', text: '医院', pinyin: 'yīyuàn' },
          { id: 'l3', text: '商店', pinyin: 'shāngdiàn' },
          { id: 'l4', text: '银行', pinyin: 'yínháng' },
          { id: 'l5', text: '饭店', pinyin: 'fàndiàn' }
        ],
        rightItems: [
          { id: 'r1', text: 'restaurant' },
          { id: 'r2', text: 'doctor' },
          { id: 'r3', text: 'hospital' },
          { id: 'r4', text: 'shop' },
          { id: 'r5', text: 'bank' }
        ],
        correctPairs: [['l1', 'r2'], ['l2', 'r3'], ['l3', 'r4'], ['l4', 'r5'], ['l5', 'r1']]
      },
      measureWordMatching: {
        leftItems: [
          { id: 'm1', text: '件', pinyin: 'jiàn' },
          { id: 'm2', text: '条', pinyin: 'tiáo' },
          { id: 'm3', text: '辆', pinyin: 'liàng' },
          { id: 'm4', text: '支', pinyin: 'zhī' }
        ],
        rightItems: [
          { id: 'n1', text: '鱼', pinyin: 'yú' },
          { id: 'n2', text: '车', pinyin: 'chē' },
          { id: 'n3', text: '衣服', pinyin: 'yīfu' },
          { id: 'n4', text: '笔', pinyin: 'bǐ' }
        ],
        correctPairs: [['m1', 'n3'], ['m2', 'n1'], ['m3', 'n2'], ['m4', 'n4']]
      },
      verbObject: {
        verbs: [
          { id: 'v1', verb: '买', pinyin: 'mǎi' },
          { id: 'v2', verb: '写', pinyin: 'xiě' },
          { id: 'v3', verb: '说', pinyin: 'shuō' },
          { id: 'v4', verb: '听', pinyin: 'tīng' }
        ],
        objects: [
          { id: 'o1', object: '字', pinyin: 'zì' },
          { id: 'o2', object: '东西', pinyin: 'dōngxi' },
          { id: 'o3', object: '汉语', pinyin: 'hànyǔ' },
          { id: 'o4', object: '音乐', pinyin: 'yīnyuè' }
        ],
        correctPairs: [['v1', 'o2'], ['v2', 'o1'], ['v3', 'o3'], ['v4', 'o4']]
      },
      fillInBlanks: {
        sentences: [
          {
            id: 's1',
            sentence: '我___喜欢学习。',
            blanks: [{ position: 1, correctAnswer: '很' }]
          },
          {
            id: 's2',
            sentence: '他___是学生。',
            blanks: [{ position: 1, correctAnswer: '也' }]
          }
        ],
        wordBank: [
          { id: 'w1', word: '很', pinyin: 'hěn' },
          { id: 'w2', word: '也', pinyin: 'yě' },
          { id: 'w3', word: '都', pinyin: 'dōu' },
          { id: 'w4', word: '还', pinyin: 'hái' }
        ]
      },
      questionFormation: {
        questions: [
          {
            id: 'q1',
            sentence: '现在八点。',
            pinyin: 'xiànzài bā diǎn',
            underlinedPart: '八点',
            correctQuestion: '现在几点？',
            correctPinyin: 'xiànzài jǐ diǎn?'
          },
          {
            id: 'q2',
            sentence: '我在图书馆学习。',
            pinyin: 'wǒ zài túshūguǎn xuéxí',
            underlinedPart: '图书馆',
            correctQuestion: '你在哪里学习？',
            correctPinyin: 'nǐ zài nǎlǐ xuéxí?'
          }
        ]
      },
      rearrange: {
        questions: [
          {
            id: 'r1',
            words: [
              { word: '我', pinyin: 'wǒ' },
              { word: '去', pinyin: 'qù' },
              { word: '想', pinyin: 'xiǎng' },
              { word: '公园', pinyin: 'gōngyuán' }
            ],
            correctOrder: [0, 2, 1, 3],
            correctSentence: '我想去公园',
            correctPinyin: 'wǒ xiǎng qù gōngyuán'
          }
        ]
      },
      dialogue: {
        dialogues: [
          {
            id: 'd1',
            parts: [
              { speaker: 'A', text: '下午你有课吗？', pinyin: 'xiàwǔ nǐ yǒu kè ma?', isBlank: false },
              { speaker: 'B', text: '有，我下午有汉语课。', pinyin: 'yǒu, wǒ xiàwǔ yǒu hànyǔ kè', isBlank: false },
              { speaker: 'A', isBlank: true, correctAnswer: '你下午有什么课？', correctPinyin: 'nǐ xiàwǔ yǒu shénme kè?' },
              { speaker: 'B', text: '汉语课。', pinyin: 'hànyǔ kè', isBlank: false }
            ]
          }
        ]
      },
      readingComprehension: {
        passage: {
          text: '今天是星期天，我和朋友一起去公园。天气很好，我们很高兴。我们先在公园里散步，然后坐在椅子上聊天儿。最后，我们一起吃了午饭。',
          pinyin: 'jīntiān shì xīngqītiān, wǒ hé péngyǒu yìqǐ qù gōngyuán. tiānqì hěn hǎo, wǒmen hěn gāoxìng. wǒmen xiān zài gōngyuán lǐ sànbù, ránhòu zuò zài yǐzi shàng liáotiānr. zuìhòu, wǒmen yìqǐ chī le wǔfàn.'
        },
        questions: [
          {
            id: 'rc1',
            question: '今天是星期几？',
            pinyin: 'jīntiān shì xīngqī jǐ?',
            correctAnswer: '星期天',
            correctPinyin: 'xīngqītiān'
          },
          {
            id: 'rc2',
            question: '他们先做什么？',
            pinyin: 'tāmen xiān zuò shénme?',
            correctAnswer: '在公园里散步',
            correctPinyin: 'zài gōngyuán lǐ sànbù'
          },
          {
            id: 'rc3',
            question: '然后他们做什么？',
            pinyin: 'ránhòu tāmen zuò shénme?',
            correctAnswer: '坐在椅子上聊天儿',
            correctPinyin: 'zuò zài yǐzi shàng liáotiānr'
          }
        ]
      }
    }
  },
  {
    id: 'exam-3',
    title: 'Examen Type 3',
    sections: {
      numberTime: {
        questions: [
          { chinese: '十二点四十五分', pinyin: 'shíèr diǎn sìshíwǔ fēn', correctAnswer: '12:45' },
          { chinese: '三点一刻', pinyin: 'sān diǎn yī kè', correctAnswer: '3:15' },
          { chinese: '差五分九点', pinyin: 'chà wǔ fēn jiǔ diǎn', correctAnswer: '8:55' },
          { chinese: '九百九十九', pinyin: 'jiǔbǎi jiǔshíjiǔ', correctAnswer: '999' }
        ]
      },
      wordMatching: {
        leftItems: [
          { id: 'l1', text: '同学', pinyin: 'tóngxué' },
          { id: 'l2', text: '教室', pinyin: 'jiàoshì' },
          { id: 'l3', text: '宿舍', pinyin: 'sùshè' },
          { id: 'l4', text: '食堂', pinyin: 'shítáng' },
          { id: 'l5', text: '运动', pinyin: 'yùndòng' }
        ],
        rightItems: [
          { id: 'r1', text: 'classroom' },
          { id: 'r2', text: 'dormitory' },
          { id: 'r3', text: 'classmate' },
          { id: 'r4', text: 'exercise' },
          { id: 'r5', text: 'cafeteria' }
        ],
        correctPairs: [['l1', 'r3'], ['l2', 'r1'], ['l3', 'r2'], ['l4', 'r5'], ['l5', 'r4']]
      },
      measureWordMatching: {
        leftItems: [
          { id: 'm1', text: '块', pinyin: 'kuài' },
          { id: 'm2', text: '把', pinyin: 'bǎ' },
          { id: 'm3', text: '台', pinyin: 'tái' },
          { id: 'm4', text: '双', pinyin: 'shuāng' }
        ],
        rightItems: [
          { id: 'n1', text: '椅子', pinyin: 'yǐzi' },
          { id: 'n2', text: '电脑', pinyin: 'diànnǎo' },
          { id: 'n3', text: '钱', pinyin: 'qián' },
          { id: 'n4', text: '鞋', pinyin: 'xié' }
        ],
        correctPairs: [['m1', 'n3'], ['m2', 'n1'], ['m3', 'n2'], ['m4', 'n4']]
      },
      verbObject: {
        verbs: [
          { id: 'v1', verb: '学', pinyin: 'xué' },
          { id: 'v2', verb: '教', pinyin: 'jiāo' },
          { id: 'v3', verb: '玩', pinyin: 'wán' },
          { id: 'v4', verb: '住', pinyin: 'zhù' }
        ],
        objects: [
          { id: 'o1', object: '学生', pinyin: 'xuésheng' },
          { id: 'o2', object: '游戏', pinyin: 'yóuxì' },
          { id: 'o3', object: '汉语', pinyin: 'hànyǔ' },
          { id: 'o4', object: '宿舍', pinyin: 'sùshè' }
        ],
        correctPairs: [['v1', 'o3'], ['v2', 'o1'], ['v3', 'o2'], ['v4', 'o4']]
      },
      fillInBlanks: {
        sentences: [
          {
            id: 's1',
            sentence: '我___跟朋友见面。',
            blanks: [{ position: 1, correctAnswer: '想' }]
          },
          {
            id: 's2',
            sentence: '他___在图书馆。',
            blanks: [{ position: 1, correctAnswer: '也' }]
          }
        ],
        wordBank: [
          { id: 'w1', word: '想', pinyin: 'xiǎng' },
          { id: 'w2', word: '也', pinyin: 'yě' },
          { id: 'w3', word: '都', pinyin: 'dōu' },
          { id: 'w4', word: '还', pinyin: 'hái' }
        ]
      },
      questionFormation: {
        questions: [
          {
            id: 'q1',
            sentence: '我喜欢运动。',
            pinyin: 'wǒ xǐhuan yùndòng',
            underlinedPart: '运动',
            correctQuestion: '你喜欢什么？',
            correctPinyin: 'nǐ xǐhuan shénme?'
          },
          {
            id: 'q2',
            sentence: '我下午有课。',
            pinyin: 'wǒ xiàwǔ yǒu kè',
            underlinedPart: '下午',
            correctQuestion: '你什么时候有课？',
            correctPinyin: 'nǐ shénme shíhòu yǒu kè?'
          }
        ]
      },
      rearrange: {
        questions: [
          {
            id: 'r1',
            words: [
              { word: '我', pinyin: 'wǒ' },
              { word: '跟', pinyin: 'gēn' },
              { word: '见面', pinyin: 'jiànmiàn' },
              { word: '朋友', pinyin: 'péngyǒu' }
            ],
            correctOrder: [0, 1, 3, 2],
            correctSentence: '我跟朋友见面',
            correctPinyin: 'wǒ gēn péngyǒu jiànmiàn'
          }
        ]
      },
      dialogue: {
        dialogues: [
          {
            id: 'd1',
            parts: [
              { speaker: 'A', text: '现在几点？', pinyin: 'xiànzài jǐ diǎn?', isBlank: false },
              { speaker: 'B', text: '现在八点半。', pinyin: 'xiànzài bā diǎn bàn', isBlank: false },
              { speaker: 'A', isBlank: true, correctAnswer: '现在几点？', correctPinyin: 'xiànzài jǐ diǎn?' },
              { speaker: 'B', text: '差一刻九点。', pinyin: 'chà yī kè jiǔ diǎn', isBlank: false }
            ]
          }
        ]
      },
      readingComprehension: {
        passage: {
          text: '我每天七点起床，然后吃早饭。八点我去学校上课。中午我在食堂吃饭。下午有时候我有课，有时候我没有课。晚上我复习功课，然后睡觉。',
          pinyin: 'wǒ měitiān qī diǎn qǐchuáng, ránhòu chī zǎofàn. bā diǎn wǒ qù xuéxiào shàngkè. zhōngwǔ wǒ zài shítáng chīfàn. xiàwǔ yǒushíhòu wǒ yǒu kè, yǒushíhòu wǒ méiyǒu kè. wǎnshàng wǒ fùxí gōngkè, ránhòu shuìjiào.'
        },
        questions: [
          {
            id: 'rc1',
            question: '他几点起床？',
            pinyin: 'tā jǐ diǎn qǐchuáng?',
            correctAnswer: '七点',
            correctPinyin: 'qī diǎn'
          },
          {
            id: 'rc2',
            question: '中午他在哪里吃饭？',
            pinyin: 'zhōngwǔ tā zài nǎlǐ chīfàn?',
            correctAnswer: '食堂',
            correctPinyin: 'shítáng'
          },
          {
            id: 'rc3',
            question: '下午他做什么？',
            pinyin: 'xiàwǔ tā zuò shénme?',
            correctAnswer: '有时候有课，有时候没有课',
            correctPinyin: 'yǒushíhòu yǒu kè, yǒushíhòu méiyǒu kè'
          }
        ]
      }
    }
  },
  {
    id: 'exam-4',
    title: 'Examen 4 - Vocabulaire de base',
    sections: {
      numberTime: {
        questions: [
          { chinese: '十点一刻', pinyin: 'shí diǎn yí kè', correctAnswer: '10:15' },
          { chinese: '差一刻六点', pinyin: 'chà yí kè liù diǎn', correctAnswer: '5:45' },
          { chinese: '下午两点半', pinyin: 'xiàwǔ liǎng diǎn bàn', correctAnswer: '14:30' },
          { chinese: '三百四十五', pinyin: 'sānbǎi sìshíwǔ', correctAnswer: '345' }
        ]
      },
      wordMatching: {
        leftItems: [
          { id: 'l1', text: '同学', pinyin: 'tóngxué' },
          { id: 'l2', text: '专业', pinyin: 'zhuānyè' },
          { id: 'l3', text: '有时候', pinyin: 'yǒushíhòu' },
          { id: 'l4', text: '先', pinyin: 'xiān' },
          { id: 'l5', text: '然后', pinyin: 'ránhòu' },
          { id: 'l6', text: '对', pinyin: 'duì' },
          { id: 'l7', text: '怎么样', pinyin: 'zěnmeyàng' },
          { id: 'l8', text: '多少', pinyin: 'duōshao' },
          { id: 'l9', text: '跟', pinyin: 'gēn' },
          { id: 'l10', text: '一点儿', pinyin: 'yìdiǎnr' }
        ],
        rightItems: [
          { id: 'r1', text: 'spécialité' },
          { id: 'r2', text: 'camarade de classe' },
          { id: 'r3', text: 'parfois' },
          { id: 'r4', text: 'd\'abord' },
          { id: 'r5', text: 'ensuite' },
          { id: 'r6', text: 'correct / oui' },
          { id: 'r7', text: 'comment c\'est' },
          { id: 'r8', text: 'combien' },
          { id: 'r9', text: 'avec' },
          { id: 'r10', text: 'un peu' }
        ],
        correctPairs: [['l1', 'r2'], ['l2', 'r1'], ['l3', 'r3'], ['l4', 'r4'], ['l5', 'r5'], ['l6', 'r6'], ['l7', 'r7'], ['l8', 'r8'], ['l9', 'r9'], ['l10', 'r10']]
      },
      measureWordMatching: {
        leftItems: [
          { id: 'm1', text: '本', pinyin: 'běn' },
          { id: 'm2', text: '张', pinyin: 'zhāng' },
          { id: 'm3', text: '杯', pinyin: 'bēi' },
          { id: 'm4', text: '件', pinyin: 'jiàn' },
          { id: 'm5', text: '条', pinyin: 'tiáo' },
          { id: 'm6', text: '位', pinyin: 'wèi' },
          { id: 'm7', text: '只', pinyin: 'zhī' },
          { id: 'm8', text: '辆', pinyin: 'liàng' }
        ],
        rightItems: [
          { id: 'n1', text: '裤子', pinyin: 'kùzi' },
          { id: 'n2', text: '老师', pinyin: 'lǎoshī' },
          { id: 'n3', text: '茶', pinyin: 'chá' },
          { id: 'n4', text: '书', pinyin: 'shū' },
          { id: 'n5', text: '纸', pinyin: 'zhǐ' },
          { id: 'n6', text: '衣服', pinyin: 'yīfu' },
          { id: 'n7', text: '狗', pinyin: 'gǒu' },
          { id: 'n8', text: '车', pinyin: 'chē' }
        ],
        correctPairs: [['m1', 'n4'], ['m2', 'n5'], ['m3', 'n3'], ['m4', 'n6'], ['m5', 'n1'], ['m6', 'n2'], ['m7', 'n7'], ['m8', 'n8']]
      },
      verbObject: {
        verbs: [
          { id: 'v1', verb: '做', pinyin: 'zuò' },
          { id: 'v2', verb: '学', pinyin: 'xué' },
          { id: 'v3', verb: '喝', pinyin: 'hē' },
          { id: 'v4', verb: '看', pinyin: 'kàn' },
          { id: 'v5', verb: '去', pinyin: 'qù' },
          { id: 'v6', verb: '买', pinyin: 'mǎi' },
          { id: 'v7', verb: '打', pinyin: 'dǎ' },
          { id: 'v8', verb: '吃', pinyin: 'chī' },
          { id: 'v9', verb: '问', pinyin: 'wèn' },
          { id: 'v10', verb: '见', pinyin: 'jiàn' }
        ],
        objects: [
          { id: 'o1', object: '作业', pinyin: 'zuòyè' },
          { id: 'o2', object: '汉语', pinyin: 'hànyǔ' },
          { id: 'o3', object: '水', pinyin: 'shuǐ' },
          { id: 'o4', object: '电视', pinyin: 'diànshì' },
          { id: 'o5', object: '商店', pinyin: 'shāngdiàn' },
          { id: 'o6', object: '东西', pinyin: 'dōngxi' },
          { id: 'o7', object: '电话', pinyin: 'diànhuà' },
          { id: 'o8', object: '晚饭', pinyin: 'wǎnfàn' },
          { id: 'o9', object: '老师', pinyin: 'lǎoshī' },
          { id: 'o10', object: '朋友', pinyin: 'péngyou' }
        ],
        correctPairs: [['v1', 'o1'], ['v2', 'o2'], ['v3', 'o3'], ['v4', 'o4'], ['v5', 'o5'], ['v6', 'o6'], ['v7', 'o7'], ['v8', 'o8'], ['v9', 'o9'], ['v10', 'o10']]
      },
      fillInBlanks: {
        sentences: [
          {
            id: 's1',
            sentence: '你现在 ______ 课吗？',
            pinyin: 'nǐ xiànzài ______ kè ma?',
            blanks: [{ position: 2, correctAnswer: '有' }]
          },
          {
            id: 's2',
            sentence: '下午你 ______ 上课吗？',
            pinyin: 'xiàwǔ nǐ ______ shàngkè ma?',
            blanks: [{ position: 2, correctAnswer: '要' }]
          },
          {
            id: 's3',
            sentence: '我 ______ 学习，______ 休息。',
            pinyin: 'wǒ ______ xuéxí, ______ xiūxí.',
            blanks: [{ position: 1, correctAnswer: '先' }, { position: 3, correctAnswer: '然后' }]
          },
          {
            id: 's4',
            sentence: '我 ______ 喝水。',
            pinyin: 'wǒ ______ hē shuǐ.',
            blanks: [{ position: 1, correctAnswer: '要' }]
          },
          {
            id: 's5',
            sentence: '你 ______ 朋友见面吗？',
            pinyin: 'nǐ ______ péngyou jiànmiàn ma?',
            blanks: [{ position: 1, correctAnswer: '跟' }]
          },
          {
            id: 's6',
            sentence: '你的 ______ 是什么？',
            pinyin: 'nǐ de ______ shì shénme?',
            blanks: [{ position: 2, correctAnswer: '专业' }]
          },
          {
            id: 's7',
            sentence: '______ 个人在教室？',
            pinyin: '______ gè rén zài jiàoshì?',
            blanks: [{ position: 0, correctAnswer: '多少' }]
          },
          {
            id: 's8',
            sentence: '______ 是你的老师？',
            pinyin: '______ shì nǐ de lǎoshī?',
            blanks: [{ position: 0, correctAnswer: '谁' }]
          },
          {
            id: 's9',
            sentence: '现在 ______ ？',
            pinyin: 'xiànzài ______ ?',
            blanks: [{ position: 1, correctAnswer: '几点' }]
          },
          {
            id: 's10',
            sentence: '我 ______ 很忙。',
            pinyin: 'wǒ ______ hěn máng.',
            blanks: [{ position: 1, correctAnswer: '有时候' }]
          },
          {
            id: 's11',
            sentence: '这个答案 ______。',
            pinyin: 'zhège dá\'àn ______.',
            blanks: [{ position: 2, correctAnswer: '对' }]
          },
          {
            id: 's12',
            sentence: '喝 ______ 水。',
            pinyin: 'hē ______ shuǐ.',
            blanks: [{ position: 1, correctAnswer: '一点儿' }]
          }
        ],
        wordBank: [
          { id: 'w1', word: '对', pinyin: 'duì' },
          { id: 'w2', word: '有', pinyin: 'yǒu' },
          { id: 'w3', word: '要', pinyin: 'yào' },
          { id: 'w4', word: '先', pinyin: 'xiān' },
          { id: 'w5', word: '然后', pinyin: 'ránhòu' },
          { id: 'w6', word: '有时候', pinyin: 'yǒushíhòu' },
          { id: 'w7', word: '一点儿', pinyin: 'yìdiǎnr' },
          { id: 'w8', word: '跟', pinyin: 'gēn' },
          { id: 'w9', word: '专业', pinyin: 'zhuānyè' },
          { id: 'w10', word: '多少', pinyin: 'duōshao' },
          { id: 'w11', word: '几点', pinyin: 'jǐ diǎn' },
          { id: 'w12', word: '谁', pinyin: 'shéi' }
        ]
      },
      questionFormation: {
        questions: [
          {
            id: 'q1',
            sentence: '这本书是 我的。',
            pinyin: 'zhè běn shū shì wǒ de',
            underlinedPart: '我的',
            correctQuestion: '这是谁的书？',
            correctPinyin: 'zhè shì shéi de shū?'
          },
          {
            id: 'q2',
            sentence: '我 下午三点半 上课。',
            pinyin: 'wǒ xiàwǔ sān diǎn bàn shàngkè',
            underlinedPart: '下午三点半',
            correctQuestion: '你下午几点上课？',
            correctPinyin: 'nǐ xiàwǔ jǐ diǎn shàngkè?'
          },
          {
            id: 'q3',
            sentence: '我 跟朋友 见面。',
            pinyin: 'wǒ gēn péngyou jiànmiàn',
            underlinedPart: '跟朋友',
            correctQuestion: '你跟谁见面？',
            correctPinyin: 'nǐ gēn shéi jiànmiàn?'
          },
          {
            id: 'q4',
            sentence: '我 学汉语。',
            pinyin: 'wǒ xué hànyǔ',
            underlinedPart: '汉语',
            correctQuestion: '你学什么？',
            correctPinyin: 'nǐ xué shénme?'
          },
          {
            id: 'q5',
            sentence: '我 有时候 去商店。',
            pinyin: 'wǒ yǒushíhòu qù shāngdiàn',
            underlinedPart: '有时候',
            correctQuestion: '你什么时候去商店？',
            correctPinyin: 'nǐ shénme shíhòu qù shāngdiàn?'
          }
        ]
      },
      rearrange: {
        questions: [
          {
            id: 'r1',
            words: [
              { word: '图书馆', pinyin: 'túshūguǎn' },
              { word: '前面', pinyin: 'qiánmiàn' },
              { word: '有', pinyin: 'yǒu' },
              { word: '一个', pinyin: 'yí gè' },
              { word: '超市', pinyin: 'chāoshì' }
            ],
            correctOrder: [0, 1, 2, 3, 4],
            correctSentence: '图书馆前面有一个超市',
            correctPinyin: 'túshūguǎn qiánmiàn yǒu yí gè chāoshì'
          },
          {
            id: 'r2',
            words: [
              { word: '我', pinyin: 'wǒ' },
              { word: '先', pinyin: 'xiān' },
              { word: '作业', pinyin: 'zuòyè' },
              { word: '做', pinyin: 'zuò' },
              { word: '然后', pinyin: 'ránhòu' },
              { word: '休息', pinyin: 'xiūxí' }
            ],
            correctOrder: [0, 1, 2, 3, 4, 5],
            correctSentence: '我先做作业然后休息',
            correctPinyin: 'wǒ xiān zuò zuòyè ránhòu xiūxí'
          },
          {
            id: 'r3',
            words: [
              { word: '下午', pinyin: 'xiàwǔ' },
              { word: '你', pinyin: 'nǐ' },
              { word: '课', pinyin: 'kè' },
              { word: '有', pinyin: 'yǒu' },
              { word: '吗', pinyin: 'ma' }
            ],
            correctOrder: [0, 1, 2, 3, 4],
            correctSentence: '下午你有课吗？',
            correctPinyin: 'xiàwǔ nǐ yǒu kè ma?'
          },
          {
            id: 'r4',
            words: [
              { word: '我们', pinyin: 'wǒmen' },
              { word: '八点', pinyin: 'bā diǎn' },
              { word: '一刻', pinyin: 'yí kè' },
              { word: '见面', pinyin: 'jiànmiàn' }
            ],
            correctOrder: [0, 1, 2, 3],
            correctSentence: '我们八点一刻见面',
            correctPinyin: 'wǒmen bā diǎn yí kè jiànmiàn'
          },
          {
            id: 'r5',
            words: [
              { word: '她', pinyin: 'tā' },
              { word: '专业', pinyin: 'zhuānyè' },
              { word: '是', pinyin: 'shì' },
              { word: '什么', pinyin: 'shénme' }
            ],
            correctOrder: [0, 1, 2, 3],
            correctSentence: '她专业是什么',
            correctPinyin: 'tā zhuānyè shì shénme'
          }
        ]
      },
      dialogue: {
        dialogues: [
          {
            id: 'd1',
            parts: [
              { speaker: 'A', text: '你叫什么名字？', pinyin: 'nǐ jiào shénme míngzì?', isBlank: false },
              { speaker: 'B', text: '我叫林娜。', pinyin: 'wǒ jiào lín nà', isBlank: false },
              { speaker: 'A', isBlank: true, correctAnswer: '你的专业是什么？', correctPinyin: 'nǐ de zhuānyè shì shénme?' },
              { speaker: 'B', text: '我的专业是汉语。', pinyin: 'wǒ de zhuānyè shì hànyǔ', isBlank: false }
            ]
          },
          {
            id: 'd2',
            parts: [
              { speaker: 'A', text: '现在几点？', pinyin: 'xiànzài jǐ diǎn?', isBlank: false },
              { speaker: 'B', isBlank: true, correctAnswer: '现在八点半', correctPinyin: 'xiànzài bā diǎn bàn' },
              { speaker: 'A', text: '下午你有课吗？', pinyin: 'xiàwǔ nǐ yǒu kè ma?', isBlank: false },
              { speaker: 'B', text: '有，我下午有汉语课。', pinyin: 'yǒu, wǒ xiàwǔ yǒu hànyǔ kè', isBlank: false }
            ]
          }
        ]
      },
      readingComprehension: {
        passage: {
          text: '我叫王明，是大学生。我每天七点起床，然后吃早饭。八点我去学校上课。中午我在食堂吃饭。下午有时候我有课，有时候我没有课。没有课的时候，我去图书馆学习。晚上我复习功课，然后十点睡觉。周末我喜欢跟朋友一起玩儿。',
          pinyin: 'wǒ jiào wáng míng, shì dàxuéshēng. wǒ měitiān qī diǎn qǐchuáng, ránhòu chī zǎofàn. bā diǎn wǒ qù xuéxiào shàngkè. zhōngwǔ wǒ zài shítáng chīfàn. xiàwǔ yǒushíhòu wǒ yǒu kè, yǒushíhòu wǒ méiyǒu kè. méiyǒu kè de shíhòu, wǒ qù túshūguǎn xuéxí. wǎnshàng wǒ fùxí gōngkè, ránhòu shí diǎn shuìjiào. zhōumò wǒ xǐhuan gēn péngyou yìqǐ wánr.'
        },
        questions: [
          {
            id: 'rc1',
            question: '王明几点起床？',
            pinyin: 'wáng míng jǐ diǎn qǐchuáng?',
            correctAnswer: '七点',
            correctPinyin: 'qī diǎn'
          },
          {
            id: 'rc2',
            question: '中午他在哪里吃饭？',
            pinyin: 'zhōngwǔ tā zài nǎlǐ chīfàn?',
            correctAnswer: '食堂',
            correctPinyin: 'shítáng'
          },
          {
            id: 'rc3',
            question: '下午没有课的时候，他做什么？',
            pinyin: 'xiàwǔ méiyǒu kè de shíhòu, tā zuò shénme?',
            correctAnswer: '去图书馆学习',
            correctPinyin: 'qù túshūguǎn xuéxí'
          },
          {
            id: 'rc4',
            question: '他几点睡觉？',
            pinyin: 'tā jǐ diǎn shuìjiào?',
            correctAnswer: '十点',
            correctPinyin: 'shí diǎn'
          },
          {
            id: 'rc5',
            question: '周末他喜欢做什么？',
            pinyin: 'zhōumò tā xǐhuan zuò shénme?',
            correctAnswer: '跟朋友一起玩儿',
            correctPinyin: 'gēn péngyou yìqǐ wánr'
          }
        ]
      }
    }
  },
  {
    id: 'exam-5',
    title: 'Examen 5 - Vocabulaire avancé (Leçons 7-12)',
    sections: {
      numberTime: {
        questions: [
          { chinese: '差一刻十二点', pinyin: 'chà yí kè shí\'èr diǎn', correctAnswer: '11:45' },
          { chinese: '下午四点三刻', pinyin: 'xiàwǔ sì diǎn sān kè', correctAnswer: '16:45' },
          { chinese: '上午八点半', pinyin: 'shàngwǔ bā diǎn bàn', correctAnswer: '8:30' },
          { chinese: '六千七百三十', pinyin: 'liùqiān qībǎi sānshí', correctAnswer: '6730' }
        ]
      },
      wordMatching: {
        leftItems: [
          { id: 'l1', text: '认识', pinyin: 'rènshi' },
          { id: 'l2', text: '知道', pinyin: 'zhīdào' },
          { id: 'l3', text: '准备', pinyin: 'zhǔnbèi' },
          { id: 'l4', text: '觉得', pinyin: 'juéde' },
          { id: 'l5', text: '听说', pinyin: 'tīngshuō' },
          { id: 'l6', text: '收拾', pinyin: 'shōushi' },
          { id: 'l7', text: '开始', pinyin: 'kāishǐ' },
          { id: 'l8', text: '聊天儿', pinyin: 'liáotiānr' },
          { id: 'l9', text: '工作', pinyin: 'gōngzuò' },
          { id: 'l10', text: '上网', pinyin: 'shàngwǎng' }
        ],
        rightItems: [
          { id: 'r1', text: 'préparer' },
          { id: 'r2', text: 'penser / trouver que' },
          { id: 'r3', text: 'connaître (une personne)' },
          { id: 'r4', text: 'savoir / connaître' },
          { id: 'r5', text: 'entendre dire' },
          { id: 'r6', text: 'ranger / nettoyer' },
          { id: 'r7', text: 'commencer' },
          { id: 'r8', text: 'bavarder' },
          { id: 'r9', text: 'travailler' },
          { id: 'r10', text: 'surfer sur internet' }
        ],
        correctPairs: [['l1', 'r3'], ['l2', 'r4'], ['l3', 'r1'], ['l4', 'r2'], ['l5', 'r5'], ['l6', 'r6'], ['l7', 'r7'], ['l8', 'r8'], ['l9', 'r9'], ['l10', 'r10']]
      },
      measureWordMatching: {
        leftItems: [
          { id: 'm1', text: '条', pinyin: 'tiáo' },
          { id: 'm2', text: '本', pinyin: 'běn' },
          { id: 'm3', text: '位', pinyin: 'wèi' },
          { id: 'm4', text: '张', pinyin: 'zhāng' },
          { id: 'm5', text: '只', pinyin: 'zhī' },
          { id: 'm6', text: '杯', pinyin: 'bēi' },
          { id: 'm7', text: '件', pinyin: 'jiàn' },
          { id: 'm8', text: '个', pinyin: 'gè' }
        ],
        rightItems: [
          { id: 'n1', text: '老师', pinyin: 'lǎoshī' },
          { id: 'n2', text: '猫', pinyin: 'māo' },
          { id: 'n3', text: '裤子', pinyin: 'kùzi' },
          { id: 'n4', text: '人', pinyin: 'rén' },
          { id: 'n5', text: '茶', pinyin: 'chá' },
          { id: 'n6', text: '纸', pinyin: 'zhǐ' },
          { id: 'n7', text: '衣服', pinyin: 'yīfu' },
          { id: 'n8', text: '书', pinyin: 'shū' }
        ],
        correctPairs: [['m1', 'n3'], ['m2', 'n8'], ['m3', 'n1'], ['m4', 'n6'], ['m5', 'n2'], ['m6', 'n5'], ['m7', 'n7'], ['m8', 'n4']]
      },
      verbObject: {
        verbs: [
          { id: 'v1', verb: '买', pinyin: 'mǎi' },
          { id: 'v2', verb: '做', pinyin: 'zuò' },
          { id: 'v3', verb: '学', pinyin: 'xué' },
          { id: 'v4', verb: '喝', pinyin: 'hē' },
          { id: 'v5', verb: '看', pinyin: 'kàn' },
          { id: 'v6', verb: '去', pinyin: 'qù' },
          { id: 'v7', verb: '打', pinyin: 'dǎ' },
          { id: 'v8', verb: '吃', pinyin: 'chī' },
          { id: 'v9', verb: '见', pinyin: 'jiàn' },
          { id: 'v10', verb: '问', pinyin: 'wèn' }
        ],
        objects: [
          { id: 'o1', object: '朋友', pinyin: 'péngyou' },
          { id: 'o2', object: '老师', pinyin: 'lǎoshī' },
          { id: 'o3', object: '晚饭', pinyin: 'wǎnfàn' },
          { id: 'o4', object: '电话', pinyin: 'diànhuà' },
          { id: 'o5', object: '商店', pinyin: 'shāngdiàn' },
          { id: 'o6', object: '电视', pinyin: 'diànshì' },
          { id: 'o7', object: '水', pinyin: 'shuǐ' },
          { id: 'o8', object: '汉语', pinyin: 'hànyǔ' },
          { id: 'o9', object: '作业', pinyin: 'zuòyè' },
          { id: 'o10', object: '东西', pinyin: 'dōngxi' }
        ],
        correctPairs: [['v1', 'o10'], ['v2', 'o9'], ['v3', 'o8'], ['v4', 'o7'], ['v5', 'o6'], ['v6', 'o5'], ['v7', 'o4'], ['v8', 'o3'], ['v9', 'o1'], ['v10', 'o2']]
      },
      fillInBlanks: {
        sentences: [
          {
            id: 's1',
            sentence: '我 ______ 去商店买东西。',
            pinyin: 'wǒ ______ qù shāngdiàn mǎi dōngxi.',
            blanks: [{ position: 1, correctAnswer: '想' }]
          },
          {
            id: 's2',
            sentence: '你 ______ 课吗？',
            pinyin: 'nǐ ______ kè ma?',
            blanks: [{ position: 1, correctAnswer: '有' }]
          },
          {
            id: 's3',
            sentence: '我 ______ 做作业，______ 看电视。',
            pinyin: 'wǒ ______ zuò zuòyè, ______ kàn diànshì.',
            blanks: [{ position: 1, correctAnswer: '先' }, { position: 3, correctAnswer: '然后' }]
          },
          {
            id: 's4',
            sentence: '他 ______ 吃水果。',
            pinyin: 'tā ______ chī shuǐguǒ.',
            blanks: [{ position: 1, correctAnswer: '要' }]
          },
          {
            id: 's5',
            sentence: '她 ______ 朋友一起去公园。',
            pinyin: 'tā ______ péngyou yìqǐ qù gōngyuán.',
            blanks: [{ position: 1, correctAnswer: '跟' }]
          },
          {
            id: 's6',
            sentence: '他的 ______ 是数学。',
            pinyin: 'tā de ______ shì shùxué.',
            blanks: [{ position: 2, correctAnswer: '专业' }]
          },
          {
            id: 's7',
            sentence: '______ 个学生在教室？',
            pinyin: '______ gè xuésheng zài jiàoshì?',
            blanks: [{ position: 0, correctAnswer: '多少' }]
          },
          {
            id: 's8',
            sentence: '你 ______ 去学校？',
            pinyin: 'nǐ ______ qù xuéxiào?',
            blanks: [{ position: 1, correctAnswer: '几点' }]
          },
          {
            id: 's9',
            sentence: '你在 ______ 学习？',
            pinyin: 'nǐ zài ______ xuéxí?',
            blanks: [{ position: 2, correctAnswer: '哪里' }]
          },
          {
            id: 's10',
            sentence: '我 ______ 很困。',
            pinyin: 'wǒ ______ hěn kùn.',
            blanks: [{ position: 1, correctAnswer: '有时候' }]
          },
          {
            id: 's11',
            sentence: '喝 ______ 咖啡。',
            pinyin: 'hē ______ kāfēi.',
            blanks: [{ position: 1, correctAnswer: '一点儿' }]
          },
          {
            id: 's12',
            sentence: '吃 ______ 饭。',
            pinyin: 'chī ______ fàn.',
            blanks: [{ position: 1, correctAnswer: '一点儿' }]
          }
        ],
        wordBank: [
          { id: 'w1', word: '想', pinyin: 'xiǎng' },
          { id: 'w2', word: '有', pinyin: 'yǒu' },
          { id: 'w3', word: '要', pinyin: 'yào' },
          { id: 'w4', word: '先', pinyin: 'xiān' },
          { id: 'w5', word: '然后', pinyin: 'ránhòu' },
          { id: 'w6', word: '有时候', pinyin: 'yǒushíhòu' },
          { id: 'w7', word: '一点儿', pinyin: 'yìdiǎnr' },
          { id: 'w8', word: '跟', pinyin: 'gēn' },
          { id: 'w9', word: '专业', pinyin: 'zhuānyè' },
          { id: 'w10', word: '多少', pinyin: 'duōshao' },
          { id: 'w11', word: '几点', pinyin: 'jǐ diǎn' },
          { id: 'w12', word: '哪里', pinyin: 'nǎlǐ' }
        ]
      },
      questionFormation: {
        questions: [
          {
            id: 'q1',
            sentence: '这是 他的 书。',
            pinyin: 'zhè shì tā de shū',
            underlinedPart: '他的',
            correctQuestion: '这是谁的书？',
            correctPinyin: 'zhè shì shéi de shū?'
          },
          {
            id: 'q2',
            sentence: '我 晚上八点 睡觉。',
            pinyin: 'wǒ wǎnshàng bā diǎn shuìjiào',
            underlinedPart: '晚上八点',
            correctQuestion: '你晚上几点睡觉？',
            correctPinyin: 'nǐ wǎnshàng jǐ diǎn shuìjiào?'
          },
          {
            id: 'q3',
            sentence: '我 跟老师 见面。',
            pinyin: 'wǒ gēn lǎoshī jiànmiàn',
            underlinedPart: '跟老师',
            correctQuestion: '你跟谁见面？',
            correctPinyin: 'nǐ gēn shéi jiànmiàn?'
          },
          {
            id: 'q4',
            sentence: '我 学数学。',
            pinyin: 'wǒ xué shùxué',
            underlinedPart: '数学',
            correctQuestion: '你学什么？',
            correctPinyin: 'nǐ xué shénme?'
          },
          {
            id: 'q5',
            sentence: '我 有时候 去图书馆。',
            pinyin: 'wǒ yǒushíhòu qù túshūguǎn',
            underlinedPart: '有时候',
            correctQuestion: '你什么时候去图书馆？',
            correctPinyin: 'nǐ shénme shíhòu qù túshūguǎn?'
          }
        ]
      },
      rearrange: {
        questions: [
          {
            id: 'r1',
            words: [
              { word: '宿舍', pinyin: 'sùshè' },
              { word: '旁边', pinyin: 'pángbiān' },
              { word: '有', pinyin: 'yǒu' },
              { word: '一个', pinyin: 'yí gè' },
              { word: '食堂', pinyin: 'shítáng' }
            ],
            correctOrder: [0, 1, 2, 3, 4],
            correctSentence: '宿舍旁边有一个食堂',
            correctPinyin: 'sùshè pángbiān yǒu yí gè shítáng'
          },
          {
            id: 'r2',
            words: [
              { word: '我', pinyin: 'wǒ' },
              { word: '先', pinyin: 'xiān' },
              { word: '运动', pinyin: 'yùndòng' },
              { word: '做', pinyin: 'zuò' },
              { word: '然后', pinyin: 'ránhòu' },
              { word: '洗澡', pinyin: 'xǐzǎo' }
            ],
            correctOrder: [0, 1, 2, 3, 4, 5],
            correctSentence: '我先做运动然后洗澡',
            correctPinyin: 'wǒ xiān zuò yùndòng ránhòu xǐzǎo'
          },
          {
            id: 'r3',
            words: [
              { word: '晚上', pinyin: 'wǎnshàng' },
              { word: '你', pinyin: 'nǐ' },
              { word: '课', pinyin: 'kè' },
              { word: '有', pinyin: 'yǒu' },
              { word: '吗', pinyin: 'ma' }
            ],
            correctOrder: [0, 1, 2, 3, 4],
            correctSentence: '晚上你有课吗？',
            correctPinyin: 'wǎnshàng nǐ yǒu kè ma?'
          },
          {
            id: 'r4',
            words: [
              { word: '我们', pinyin: 'wǒmen' },
              { word: '七点', pinyin: 'qī diǎn' },
              { word: '三刻', pinyin: 'sān kè' },
              { word: '见面', pinyin: 'jiànmiàn' }
            ],
            correctOrder: [0, 1, 2, 3],
            correctSentence: '我们七点三刻见面',
            correctPinyin: 'wǒmen qī diǎn sān kè jiànmiàn'
          },
          {
            id: 'r5',
            words: [
              { word: '你', pinyin: 'nǐ' },
              { word: '专业', pinyin: 'zhuānyè' },
              { word: '是', pinyin: 'shì' },
              { word: '什么', pinyin: 'shénme' }
            ],
            correctOrder: [0, 1, 2, 3],
            correctSentence: '你专业是什么',
            correctPinyin: 'nǐ zhuānyè shì shénme'
          }
        ]
      },
      dialogue: {
        dialogues: [
          {
            id: 'd1',
            parts: [
              { speaker: 'A', text: '你认识王老师吗？', pinyin: 'nǐ rènshi wáng lǎoshī ma?', isBlank: false },
              { speaker: 'B', text: '认识，他是我的汉语老师。', pinyin: 'rènshi, tā shì wǒ de hànyǔ lǎoshī', isBlank: false },
              { speaker: 'A', isBlank: true, correctAnswer: '你觉得他怎么样？', correctPinyin: 'nǐ juéde tā zěnmeyàng?' },
              { speaker: 'B', text: '我觉得他很好。', pinyin: 'wǒ juéde tā hěn hǎo', isBlank: false }
            ]
          },
          {
            id: 'd2',
            parts: [
              { speaker: 'A', text: '你一般几点上网？', pinyin: 'nǐ yìbān jǐ diǎn shàngwǎng?', isBlank: false },
              { speaker: 'B', text: '我一般晚上八点上网。', pinyin: 'wǒ yìbān wǎnshàng bā diǎn shàngwǎng', isBlank: false },
              { speaker: 'A', isBlank: true, correctAnswer: '你上网做什么？', correctPinyin: 'nǐ shàngwǎng zuò shénme?' },
              { speaker: 'B', text: '我上网看新闻，有时候也聊天儿。', pinyin: 'wǒ shàngwǎng kàn xīnwén, yǒushíhòu yě liáotiānr', isBlank: false }
            ]
          }
        ]
      },
      readingComprehension: {
        passage: {
          text: '我叫刘明，是北航的大学生。我的专业是计算机。我每天早上六点半起床，然后刷牙洗脸。七点我吃早饭。八点我去教室上课。中午十二点我在食堂吃饭。下午有时候我有课，有时候我没有课。没有课的时候，我常常去图书馆准备考试或者跟同学一起聊天儿。晚上我在宿舍收拾房间，然后上网看新闻。我一般十一点睡觉。周末我喜欢跟朋友一起去爬山，有时候我们也去商店买东西。我觉得大学生活非常有意思。',
          pinyin: 'wǒ jiào liú míng, shì běiháng de dàxuéshēng. wǒ de zhuānyè shì jìsuànjī. wǒ měitiān zǎoshang liù diǎn bàn qǐchuáng, ránhòu shuāyá xǐliǎn. qī diǎn wǒ chī zǎofàn. bā diǎn wǒ qù jiàoshì shàngkè. zhōngwǔ shí\'èr diǎn wǒ zài shítáng chīfàn. xiàwǔ yǒushíhòu wǒ yǒu kè, yǒushíhòu wǒ méiyǒu kè. méiyǒu kè de shíhòu, wǒ chángcháng qù túshūguǎn zhǔnbèi kǎoshì huòzhě gēn tóngxué yìqǐ liáotiānr. wǎnshàng wǒ zài sùshè shōushi fángjiān, ránhòu shàngwǎng kàn xīnwén. wǒ yìbān shíyī diǎn shuìjiào. zhōumò wǒ xǐhuan gēn péngyou yìqǐ qù páshān, yǒushíhòu wǒmen yě qù shāngdiàn mǎi dōngxi. wǒ juéde dàxuéshēnghuó fēicháng yǒuyìsi.'
        },
        questions: [
          {
            id: 'rc1',
            question: '刘明的专业是什么？',
            pinyin: 'liú míng de zhuānyè shì shénme?',
            correctAnswer: '计算机',
            correctPinyin: 'jìsuànjī'
          },
          {
            id: 'rc2',
            question: '他几点起床？',
            pinyin: 'tā jǐ diǎn qǐchuáng?',
            correctAnswer: '六点半',
            correctPinyin: 'liù diǎn bàn'
          },
          {
            id: 'rc3',
            question: '下午没有课的时候，他做什么？',
            pinyin: 'xiàwǔ méiyǒu kè de shíhòu, tā zuò shénme?',
            correctAnswer: '去图书馆准备考试或者跟同学一起聊天儿',
            correctPinyin: 'qù túshūguǎn zhǔnbèi kǎoshì huòzhě gēn tóngxué yìqǐ liáotiānr'
          },
          {
            id: 'rc4',
            question: '他一般几点睡觉？',
            pinyin: 'tā yìbān jǐ diǎn shuìjiào?',
            correctAnswer: '十一点',
            correctPinyin: 'shíyī diǎn'
          },
          {
            id: 'rc5',
            question: '他觉得大学生活怎么样？',
            pinyin: 'tā juéde dàxuéshēnghuó zěnmeyàng?',
            correctAnswer: '非常有意思',
            correctPinyin: 'fēicháng yǒuyìsi'
          }
        ]
      }
    }
  },
  {
    id: 'exam-6',
    title: 'Examen 6 - Vocabulaire varié (Adjectifs et verbes avancés)',
    sections: {
      numberTime: {
        questions: [
          { chinese: '差十分两点', pinyin: 'chà shí fēn liǎng diǎn', correctAnswer: '1:50' },
          { chinese: '下午五点一刻', pinyin: 'xiàwǔ wǔ diǎn yí kè', correctAnswer: '17:15' },
          { chinese: '七千八百九十二', pinyin: 'qīqiān bābǎi jiǔshí\'èr', correctAnswer: '7892' },
          { chinese: '九千零五十', pinyin: 'jiǔqiān líng wǔshí', correctAnswer: '9050' }
        ]
      },
      wordMatching: {
        leftItems: [
          { id: 'l1', text: '新鲜', pinyin: 'xīnxiān' },
          { id: 'l2', text: '贵', pinyin: 'guì' },
          { id: 'l3', text: '累', pinyin: 'lèi' },
          { id: 'l4', text: '高兴', pinyin: 'gāoxìng' },
          { id: 'l5', text: '忙', pinyin: 'máng' },
          { id: 'l6', text: '漂亮', pinyin: 'piàoliàng' },
          { id: 'l7', text: '少', pinyin: 'shǎo' },
          { id: 'l8', text: '大', pinyin: 'dà' },
          { id: 'l9', text: '小', pinyin: 'xiǎo' },
          { id: 'l10', text: '好', pinyin: 'hǎo' }
        ],
        rightItems: [
          { id: 'r1', text: 'cher / coûteux' },
          { id: 'r2', text: 'fatigué' },
          { id: 'r3', text: 'heureux' },
          { id: 'r4', text: 'occupé' },
          { id: 'r5', text: 'beau / joli' },
          { id: 'r6', text: 'peu / peu nombreux' },
          { id: 'r7', text: 'grand' },
          { id: 'r8', text: 'petit' },
          { id: 'r9', text: 'bon / bien' },
          { id: 'r10', text: 'frais' }
        ],
        correctPairs: [['l1', 'r10'], ['l2', 'r1'], ['l3', 'r2'], ['l4', 'r3'], ['l5', 'r4'], ['l6', 'r5'], ['l7', 'r6'], ['l8', 'r7'], ['l9', 'r8'], ['l10', 'r9']]
      },
      measureWordMatching: {
        leftItems: [
          { id: 'm1', text: '斤', pinyin: 'jīn' },
          { id: 'm2', text: '种', pinyin: 'zhǒng' },
          { id: 'm3', text: '家', pinyin: 'jiā' },
          { id: 'm4', text: '台', pinyin: 'tái' },
          { id: 'm5', text: '块', pinyin: 'kuài' },
          { id: 'm6', text: '瓶', pinyin: 'píng' },
          { id: 'm7', text: '支', pinyin: 'zhī' },
          { id: 'm8', text: '本', pinyin: 'běn' }
        ],
        rightItems: [
          { id: 'n1', text: '水果', pinyin: 'shuǐguǒ' },
          { id: 'n2', text: '商店', pinyin: 'shāngdiàn' },
          { id: 'n3', text: '电脑', pinyin: 'diànnǎo' },
          { id: 'n4', text: '钱', pinyin: 'qián' },
          { id: 'n5', text: '水', pinyin: 'shuǐ' },
          { id: 'n6', text: '笔', pinyin: 'bǐ' },
          { id: 'n7', text: '书', pinyin: 'shū' },
          { id: 'n8', text: '苹果', pinyin: 'píngguǒ' }
        ],
        correctPairs: [['m1', 'n8'], ['m2', 'n1'], ['m3', 'n2'], ['m4', 'n3'], ['m5', 'n4'], ['m6', 'n5'], ['m7', 'n6'], ['m8', 'n7']]
      },
      verbObject: {
        verbs: [
          { id: 'v1', verb: '爱', pinyin: 'ài' },
          { id: 'v2', verb: '喜欢', pinyin: 'xǐhuan' },
          { id: 'v3', verb: '骑', pinyin: 'qí' },
          { id: 'v4', verb: '踢', pinyin: 'tī' },
          { id: 'v5', verb: '画', pinyin: 'huà' },
          { id: 'v6', verb: '爬', pinyin: 'pá' },
          { id: 'v7', verb: '打', pinyin: 'dǎ' },
          { id: 'v8', verb: '住', pinyin: 'zhù' },
          { id: 'v9', verb: '祝', pinyin: 'zhù' },
          { id: 'v10', verb: '找', pinyin: 'zhǎo' }
        ],
        objects: [
          { id: 'o1', object: '运动', pinyin: 'yùndòng' },
          { id: 'o2', object: '自行车', pinyin: 'zìxíngchē' },
          { id: 'o3', object: '画', pinyin: 'huà' },
          { id: 'o4', object: '足球', pinyin: 'zúqiú' },
          { id: 'o5', object: '山', pinyin: 'shān' },
          { id: 'o6', object: '篮球', pinyin: 'lánqiú' },
          { id: 'o7', object: '宿舍', pinyin: 'sùshè' },
          { id: 'o8', object: '你', pinyin: 'nǐ' },
          { id: 'o9', object: '朋友', pinyin: 'péngyou' },
          { id: 'o10', object: '音乐', pinyin: 'yīnyuè' }
        ],
        correctPairs: [['v1', 'o1'], ['v2', 'o10'], ['v3', 'o2'], ['v4', 'o4'], ['v5', 'o3'], ['v6', 'o5'], ['v7', 'o6'], ['v8', 'o7'], ['v9', 'o8'], ['v10', 'o9']]
      },
      fillInBlanks: {
        sentences: [
          {
            id: 's1',
            sentence: '我 ______ 喜欢听音乐。',
            pinyin: 'wǒ ______ xǐhuan tīng yīnyuè.',
            blanks: [{ position: 1, correctAnswer: '很' }]
          },
          {
            id: 's2',
            sentence: '他 ______ 去图书馆。',
            pinyin: 'tā ______ qù túshūguǎn.',
            blanks: [{ position: 1, correctAnswer: '常常' }]
          },
          {
            id: 's3',
            sentence: '我 ______ 八点起床。',
            pinyin: 'wǒ ______ bā diǎn qǐchuáng.',
            blanks: [{ position: 1, correctAnswer: '一般' }]
          },
          {
            id: 's4',
            sentence: '这个苹果 ______ 新鲜。',
            pinyin: 'zhège píngguǒ ______ xīnxiān.',
            blanks: [{ position: 2, correctAnswer: '很' }]
          },
          {
            id: 's5',
            sentence: '你 ______ 喜欢喝茶 ______ 喝咖啡？',
            pinyin: 'nǐ ______ xǐhuan hē chá ______ hē kāfēi?',
            blanks: [{ position: 1, correctAnswer: '还是' }, { position: 3, correctAnswer: '还是' }]
          },
          {
            id: 's6',
            sentence: '北京 ______ 漂亮。',
            pinyin: 'běijīng ______ piàoliàng.',
            blanks: [{ position: 1, correctAnswer: '最' }]
          },
          {
            id: 's7',
            sentence: '我们 ______ 去公园玩儿。',
            pinyin: 'wǒmen ______ qù gōngyuán wánr.',
            blanks: [{ position: 1, correctAnswer: '一起' }]
          },
          {
            id: 's8',
            sentence: '他们 ______ 是学生。',
            pinyin: 'tāmen ______ shì xuésheng.',
            blanks: [{ position: 1, correctAnswer: '都' }]
          },
          {
            id: 's9',
            sentence: '我想去，______ 我没有时间。',
            pinyin: 'wǒ xiǎng qù, ______ wǒ méiyǒu shíjiān.',
            blanks: [{ position: 2, correctAnswer: '可是' }]
          },
          {
            id: 's10',
            sentence: '我 ______ 想喝水。',
            pinyin: 'wǒ ______ xiǎng hē shuǐ.',
            blanks: [{ position: 1, correctAnswer: '非常' }]
          },
          {
            id: 's11',
            sentence: '我 ______ 八点 ______ 十点有课。',
            pinyin: 'wǒ ______ bā diǎn ______ shí diǎn yǒu kè.',
            blanks: [{ position: 1, correctAnswer: '从' }, { position: 3, correctAnswer: '到' }]
          },
          {
            id: 's12',
            sentence: '我的手机 ______ 老师的手机一样。',
            pinyin: 'wǒ de shǒujī ______ lǎoshī de shǒujī yíyàng.',
            blanks: [{ position: 2, correctAnswer: '和' }]
          }
        ],
        wordBank: [
          { id: 'w1', word: '从', pinyin: 'cóng' },
          { id: 'w2', word: '到', pinyin: 'dào' },
          { id: 'w3', word: '和', pinyin: 'hé' },
          { id: 'w4', word: '还是', pinyin: 'háishì' },
          { id: 'w5', word: '可是', pinyin: 'kěshì' },
          { id: 'w6', word: '非常', pinyin: 'fēicháng' },
          { id: 'w7', word: '最', pinyin: 'zuì' },
          { id: 'w8', word: '一般', pinyin: 'yìbān' },
          { id: 'w9', word: '常常', pinyin: 'chángcháng' },
          { id: 'w10', word: '一起', pinyin: 'yìqǐ' },
          { id: 'w11', word: '都', pinyin: 'dōu' },
          { id: 'w12', word: '很', pinyin: 'hěn' }
        ]
      },
      questionFormation: {
        questions: [
          {
            id: 'q1',
            sentence: '我认识 王老师。',
            pinyin: 'wǒ rènshi wáng lǎoshī',
            underlinedPart: '王老师',
            correctQuestion: '你认识谁？',
            correctPinyin: 'nǐ rènshi shéi?'
          },
          {
            id: 'q2',
            sentence: '我 早上七点 起床。',
            pinyin: 'wǒ zǎoshang qī diǎn qǐchuáng',
            underlinedPart: '早上七点',
            correctQuestion: '你早上几点起床？',
            correctPinyin: 'nǐ zǎoshang jǐ diǎn qǐchuáng?'
          },
          {
            id: 'q3',
            sentence: '我 准备考试。',
            pinyin: 'wǒ zhǔnbèi kǎoshì',
            underlinedPart: '考试',
            correctQuestion: '你准备什么？',
            correctPinyin: 'nǐ zhǔnbèi shénme?'
          },
          {
            id: 'q4',
            sentence: '我 觉得 很累。',
            pinyin: 'wǒ juéde hěn lèi',
            underlinedPart: '很累',
            correctQuestion: '你觉得怎么样？',
            correctPinyin: 'nǐ juéde zěnmeyàng?'
          },
          {
            id: 'q5',
            sentence: '我 常常 去图书馆。',
            pinyin: 'wǒ chángcháng qù túshūguǎn',
            underlinedPart: '常常',
            correctQuestion: '你什么时候去图书馆？',
            correctPinyin: 'nǐ shénme shíhòu qù túshūguǎn?'
          }
        ]
      },
      rearrange: {
        questions: [
          {
            id: 'r1',
            words: [
              { word: '我', pinyin: 'wǒ' },
              { word: '准备', pinyin: 'zhǔnbèi' },
              { word: '考试', pinyin: 'kǎoshì' },
              { word: '在', pinyin: 'zài' },
              { word: '图书馆', pinyin: 'túshūguǎn' }
            ],
            correctOrder: [0, 3, 4, 1, 2],
            correctSentence: '我在图书馆准备考试',
            correctPinyin: 'wǒ zài túshūguǎn zhǔnbèi kǎoshì'
          },
          {
            id: 'r2',
            words: [
              { word: '他', pinyin: 'tā' },
              { word: '常常', pinyin: 'chángcháng' },
              { word: '跟', pinyin: 'gēn' },
              { word: '朋友', pinyin: 'péngyou' },
              { word: '一起', pinyin: 'yìqǐ' },
              { word: '聊天儿', pinyin: 'liáotiānr' }
            ],
            correctOrder: [0, 1, 2, 3, 4, 5],
            correctSentence: '他常常跟朋友一起聊天儿',
            correctPinyin: 'tā chángcháng gēn péngyou yìqǐ liáotiānr'
          },
          {
            id: 'r3',
            words: [
              { word: '你', pinyin: 'nǐ' },
              { word: '一般', pinyin: 'yìbān' },
              { word: '几点', pinyin: 'jǐ diǎn' },
              { word: '上网', pinyin: 'shàngwǎng' }
            ],
            correctOrder: [0, 1, 2, 3],
            correctSentence: '你一般几点上网',
            correctPinyin: 'nǐ yìbān jǐ diǎn shàngwǎng'
          },
          {
            id: 'r4',
            words: [
              { word: '我们', pinyin: 'wǒmen' },
              { word: '周末', pinyin: 'zhōumò' },
              { word: '去', pinyin: 'qù' },
              { word: '想', pinyin: 'xiǎng' },
              { word: '爬山', pinyin: 'páshān' }
            ],
            correctOrder: [0, 3, 1, 2, 4],
            correctSentence: '我们周末想去爬山',
            correctPinyin: 'wǒmen zhōumò xiǎng qù páshān'
          },
          {
            id: 'r5',
            words: [
              { word: '她', pinyin: 'tā' },
              { word: '收拾', pinyin: 'shōushi' },
              { word: '房间', pinyin: 'fángjiān' },
              { word: '在', pinyin: 'zài' },
              { word: '晚上', pinyin: 'wǎnshàng' }
            ],
            correctOrder: [0, 4, 1, 2],
            correctSentence: '她晚上收拾房间',
            correctPinyin: 'tā wǎnshàng shōushi fángjiān'
          }
        ]
      },
      dialogue: {
        dialogues: [
          {
            id: 'd1',
            parts: [
              { speaker: 'A', text: '你认识王老师吗？', pinyin: 'nǐ rènshi wáng lǎoshī ma?', isBlank: false },
              { speaker: 'B', text: '认识，他是我的汉语老师。', pinyin: 'rènshi, tā shì wǒ de hànyǔ lǎoshī', isBlank: false },
              { speaker: 'A', isBlank: true, correctAnswer: '你觉得他怎么样？', correctPinyin: 'nǐ juéde tā zěnmeyàng?' },
              { speaker: 'B', text: '我觉得他很好。', pinyin: 'wǒ juéde tā hěn hǎo', isBlank: false }
            ]
          },
          {
            id: 'd2',
            parts: [
              { speaker: 'A', text: '你一般几点上网？', pinyin: 'nǐ yìbān jǐ diǎn shàngwǎng?', isBlank: false },
              { speaker: 'B', text: '我一般晚上八点上网。', pinyin: 'wǒ yìbān wǎnshàng bā diǎn shàngwǎng', isBlank: false },
              { speaker: 'A', isBlank: true, correctAnswer: '你上网做什么？', correctPinyin: 'nǐ shàngwǎng zuò shénme?' },
              { speaker: 'B', text: '我上网看新闻，有时候也聊天儿。', pinyin: 'wǒ shàngwǎng kàn xīnwén, yǒushíhòu yě liáotiānr', isBlank: false }
            ]
          }
        ]
      },
      readingComprehension: {
        passage: {
          text: '我叫李华，是北航的大学生。我的专业是经济。我每天早上六点起床，然后刷牙洗脸。七点我吃早饭。八点我去教室上课。中午十二点我在食堂吃饭。下午有时候我有课，有时候我没有课。没有课的时候，我常常去图书馆准备考试或者跟同学一起聊天儿。晚上我在宿舍收拾房间，然后上网看新闻。我一般十一点睡觉。周末我喜欢跟朋友一起去爬山，有时候我们也去商店买东西。我觉得大学生活非常有意思。',
          pinyin: 'wǒ jiào lǐ huá, shì běiháng de dàxuéshēng. wǒ de zhuānyè shì jīngjì. wǒ měitiān zǎoshang liù diǎn qǐchuáng, ránhòu shuāyá xǐliǎn. qī diǎn wǒ chī zǎofàn. bā diǎn wǒ qù jiàoshì shàngkè. zhōngwǔ shí\'èr diǎn wǒ zài shítáng chīfàn. xiàwǔ yǒushíhòu wǒ yǒu kè, yǒushíhòu wǒ méiyǒu kè. méiyǒu kè de shíhòu, wǒ chángcháng qù túshūguǎn zhǔnbèi kǎoshì huòzhě gēn tóngxué yìqǐ liáotiānr. wǎnshàng wǒ zài sùshè shōushi fángjiān, ránhòu shàngwǎng kàn xīnwén. wǒ yìbān shíyī diǎn shuìjiào. zhōumò wǒ xǐhuan gēn péngyou yìqǐ qù páshān, yǒushíhòu wǒmen yě qù shāngdiàn mǎi dōngxi. wǒ juéde dàxuéshēnghuó fēicháng yǒuyìsi.'
        },
        questions: [
          {
            id: 'rc1',
            question: '李华的专业是什么？',
            pinyin: 'lǐ huá de zhuānyè shì shénme?',
            correctAnswer: '经济',
            correctPinyin: 'jīngjì'
          },
          {
            id: 'rc2',
            question: '他几点起床？',
            pinyin: 'tā jǐ diǎn qǐchuáng?',
            correctAnswer: '六点',
            correctPinyin: 'liù diǎn'
          },
          {
            id: 'rc3',
            question: '下午没有课的时候，他做什么？',
            pinyin: 'xiàwǔ méiyǒu kè de shíhòu, tā zuò shénme?',
            correctAnswer: '去图书馆准备考试或者跟同学一起聊天儿',
            correctPinyin: 'qù túshūguǎn zhǔnbèi kǎoshì huòzhě gēn tóngxué yìqǐ liáotiānr'
          },
          {
            id: 'rc4',
            question: '他一般几点睡觉？',
            pinyin: 'tā yìbān jǐ diǎn shuìjiào?',
            correctAnswer: '十一点',
            correctPinyin: 'shíyī diǎn'
          },
          {
            id: 'rc5',
            question: '他觉得大学生活怎么样？',
            pinyin: 'tā juéde dàxuéshēnghuó zěnmeyàng?',
            correctAnswer: '非常有意思',
            correctPinyin: 'fēicháng yǒuyìsi'
          }
        ]
      }
    }
  }
]

