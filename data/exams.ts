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
          { id: 'n1', text: '衣服', pinyin: 'yīfu' },
          { id: 'n2', text: '鱼', pinyin: 'yú' },
          { id: 'n3', text: '车', pinyin: 'chē' },
          { id: 'n4', text: '笔', pinyin: 'bǐ' }
        ],
        correctPairs: [['m1', 'n1'], ['m2', 'n2'], ['m3', 'n3'], ['m4', 'n4']]
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
          { id: 'r1', text: 'classmate' },
          { id: 'r2', text: 'classroom' },
          { id: 'r3', text: 'dormitory' },
          { id: 'r4', text: 'cafeteria' },
          { id: 'r5', text: 'exercise' }
        ],
        correctPairs: [['l1', 'r1'], ['l2', 'r2'], ['l3', 'r3'], ['l4', 'r4'], ['l5', 'r5']]
      },
      measureWordMatching: {
        leftItems: [
          { id: 'm1', text: '块', pinyin: 'kuài' },
          { id: 'm2', text: '把', pinyin: 'bǎ' },
          { id: 'm3', text: '台', pinyin: 'tái' },
          { id: 'm4', text: '双', pinyin: 'shuāng' }
        ],
        rightItems: [
          { id: 'n1', text: '钱', pinyin: 'qián' },
          { id: 'n2', text: '椅子', pinyin: 'yǐzi' },
          { id: 'n3', text: '电脑', pinyin: 'diànnǎo' },
          { id: 'n4', text: '鞋', pinyin: 'xié' }
        ],
        correctPairs: [['m1', 'n1'], ['m2', 'n2'], ['m3', 'n3'], ['m4', 'n4']]
      },
      verbObject: {
        verbs: [
          { id: 'v1', verb: '学', pinyin: 'xué' },
          { id: 'v2', verb: '教', pinyin: 'jiāo' },
          { id: 'v3', verb: '玩', pinyin: 'wán' },
          { id: 'v4', verb: '住', pinyin: 'zhù' }
        ],
        objects: [
          { id: 'o1', object: '汉语', pinyin: 'hànyǔ' },
          { id: 'o2', object: '学生', pinyin: 'xuésheng' },
          { id: 'o3', object: '游戏', pinyin: 'yóuxì' },
          { id: 'o4', object: '宿舍', pinyin: 'sùshè' }
        ],
        correctPairs: [['v1', 'o1'], ['v2', 'o2'], ['v3', 'o3'], ['v4', 'o4']]
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
  }
]

