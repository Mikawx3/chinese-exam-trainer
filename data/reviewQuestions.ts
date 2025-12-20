export interface ReviewQuestion {
  id: string
  number: number
  question: string
  pinyin: string
  correctAnswer?: string // Réponse suggérée ou exemple
  correctPinyin?: string
}

export const reviewQuestions: ReviewQuestion[] = [
  {
    id: 'q1',
    number: 1,
    question: '你叫什么名字？',
    pinyin: 'nǐ jiào shénme míngzì',
    correctAnswer: '我叫林娜。',
    correctPinyin: 'wǒ jiào lín nà.'
  },
  {
    id: 'q2',
    number: 2,
    question: '你姓什么？',
    pinyin: 'nǐ xìng shénme',
    correctAnswer: '我姓王。',
    correctPinyin: 'wǒ xìng wáng.'
  },
  {
    id: 'q3',
    number: 3,
    question: '你是哪国人？',
    pinyin: 'nǐ shì nǎ guó rén',
    correctAnswer: '我是法国人。',
    correctPinyin: 'wǒ shì fǎguó rén.'
  },
  {
    id: 'q4',
    number: 4,
    question: '你是留学生吗？',
    pinyin: 'nǐ shì liú xuéshēng ma',
    correctAnswer: '是，我是留学生。/ 不是，我不是留学生。',
    correctPinyin: 'shì, wǒ shì liú xuéshēng. / bù shì, wǒ bù shì liú xuéshēng.'
  },
  {
    id: 'q5',
    number: 5,
    question: '你学习什么？',
    pinyin: 'nǐ xuéxí shénme',
    correctAnswer: '我学习汉语。',
    correctPinyin: 'wǒ xuéxí hànyǔ.'
  },
  {
    id: 'q6',
    number: 6,
    question: '你说汉语吗？',
    pinyin: 'nǐ shuō hànyǔ ma',
    correctAnswer: '我说汉语。/ 我不说汉语。',
    correctPinyin: 'wǒ shuō hànyǔ. / wǒ bù shuō hànyǔ.'
  },
  {
    id: 'q7',
    number: 7,
    question: '你学习英语吗？',
    pinyin: 'nǐ xuéxí yīngyǔ ma',
    correctAnswer: '我学习英语。/ 我不学习英语。',
    correctPinyin: 'wǒ xuéxí yīngyǔ. / wǒ bù xuéxí yīngyǔ.'
  },
  {
    id: 'q8',
    number: 8,
    question: '你的同屋是谁？',
    pinyin: 'nǐ de tóngwū shì shuí',
    correctAnswer: '我的同屋是马丁。',
    correctPinyin: 'wǒ de tóngwū shì mǎdīng.'
  },
  {
    id: 'q9',
    number: 9,
    question: '你的同屋也学习汉语吗？',
    pinyin: 'nǐ de tóngwū yě xuéxí hànyǔ ma',
    correctAnswer: '是，他也学习汉语。/ 不是，他不学习汉语。',
    correctPinyin: 'shì, tā yě xuéxí hànyǔ. / bù shì, tā bù xuéxí hànyǔ.'
  },
  {
    id: 'q10',
    number: 10,
    question: '你们都是北航的学生吗？',
    pinyin: 'nǐmen dōu shì běiháng de xuéshēng ma',
    correctAnswer: '是，我们都是北航的学生。',
    correctPinyin: 'shì, wǒmen dōu shì běiháng de xuéshēng.'
  },
  {
    id: 'q11',
    number: 11,
    question: '你认识董老师吗？',
    pinyin: 'nǐ rènshí dǒng lǎoshī ma',
    correctAnswer: '我认识董老师。/ 我不认识董老师。',
    correctPinyin: 'wǒ rènshí dǒng lǎoshī. / wǒ bù rènshí dǒng lǎoshī.'
  },
  {
    id: 'q12',
    number: 12,
    question: '你们班谁是法国人？',
    pinyin: 'nǐmen bān shuí shì fǎguó rén',
    correctAnswer: '林娜是法国人。',
    correctPinyin: 'lín nà shì fǎguó rén.'
  },
  {
    id: 'q13',
    number: 13,
    question: '你家有几口人？',
    pinyin: 'nǐ jiā yǒu jǐ kǒu rén',
    correctAnswer: '我家有四口人。',
    correctPinyin: 'wǒ jiā yǒu sì kǒu rén.'
  },
  {
    id: 'q14',
    number: 14,
    question: '你家有什么人？',
    pinyin: 'nǐ jiā yǒu shénme rén',
    correctAnswer: '我家有爸爸、妈妈和我。',
    correctPinyin: 'wǒ jiā yǒu bàba, māma hé wǒ.'
  },
  {
    id: 'q15',
    number: 15,
    question: '你爸爸做什么工作？',
    pinyin: 'nǐ bàba zuò shénme gōngzuò',
    correctAnswer: '我爸爸是老师。',
    correctPinyin: 'wǒ bàba shì lǎoshī.'
  },
  {
    id: 'q16',
    number: 16,
    question: '你们班有多少个学生？',
    pinyin: 'nǐmen bān yǒu duōshǎo gè xuéshēng',
    correctAnswer: '我们班有二十个学生。',
    correctPinyin: 'wǒmen bān yǒu èrshí gè xuéshēng.'
  },
  {
    id: 'q17',
    number: 17,
    question: '你们班有几个法国人？',
    pinyin: 'nǐmen bān yǒu jǐ gè fǎguó rén',
    correctAnswer: '我们班有三个法国人。',
    correctPinyin: 'wǒmen bān yǒu sān gè fǎguó rén.'
  },
  {
    id: 'q18',
    number: 18,
    question: '你爸爸多大？',
    pinyin: 'nǐ bàba duō dà',
    correctAnswer: '我爸爸五十岁。',
    correctPinyin: 'wǒ bàba wǔshí suì.'
  },
  {
    id: 'q19',
    number: 19,
    question: '你妈妈多大？',
    pinyin: 'nǐ māma duō dà',
    correctAnswer: '我妈妈四十五岁。',
    correctPinyin: 'wǒ māma sìshíwǔ suì.'
  },
  {
    id: 'q20',
    number: 20,
    question: '你多大？',
    pinyin: 'nǐ duō dà',
    correctAnswer: '我二十岁。',
    correctPinyin: 'wǒ èrshí suì.'
  },
  {
    id: 'q21',
    number: 21,
    question: '今天星期几？',
    pinyin: 'jīntiān xīngqī jǐ',
    correctAnswer: '今天星期一。',
    correctPinyin: 'jīntiān xīngqīyī.'
  },
  {
    id: 'q22',
    number: 22,
    question: '今天几号？',
    pinyin: 'jīntiān jǐ hào',
    correctAnswer: '今天十五号。',
    correctPinyin: 'jīntiān shíwǔ hào.'
  },
  {
    id: 'q23',
    number: 23,
    question: '昨天星期几？',
    pinyin: 'zuótiān xīngqī jǐ',
    correctAnswer: '昨天星期日。',
    correctPinyin: 'zuótiān xīngqīrì.'
  },
  {
    id: 'q24',
    number: 24,
    question: '明天星期几？',
    pinyin: 'míngtiān xīngqī jǐ',
    correctAnswer: '明天星期二。',
    correctPinyin: 'míngtiān xīngqīèr.'
  },
  {
    id: 'q25',
    number: 25,
    question: '你星期几有汉语课？',
    pinyin: 'nǐ xīngqī jǐ yǒu hànyǔ kè',
    correctAnswer: '我星期一、三、五有汉语课。',
    correctPinyin: 'wǒ xīngqīyī, sān, wǔ yǒu hànyǔ kè.'
  },
  {
    id: 'q26',
    number: 26,
    question: '你星期几没有课？',
    pinyin: 'nǐ xīngqī jǐ méiyǒu kè',
    correctAnswer: '我星期六、日没有课。',
    correctPinyin: 'wǒ xīngqīliù, rì méiyǒu kè.'
  },
  {
    id: 'q27',
    number: 27,
    question: '你星期几去图书馆？',
    pinyin: 'nǐ xīngqī jǐ qù túshūguǎn',
    correctAnswer: '我星期二、四去图书馆。',
    correctPinyin: 'wǒ xīngqīèr, sì qù túshūguǎn.'
  },
  {
    id: 'q28',
    number: 28,
    question: '你星期几跟朋友见面？',
    pinyin: 'nǐ xīngqī jǐ gēn péngyǒu jiànmiàn',
    correctAnswer: '我星期六跟朋友见面。',
    correctPinyin: 'wǒ xīngqīliù gēn péngyǒu jiànmiàn.'
  },
  {
    id: 'q29',
    number: 29,
    question: '你星期几休息？',
    pinyin: 'nǐ xīngqī jǐ xiūxí',
    correctAnswer: '我星期日休息。',
    correctPinyin: 'wǒ xīngqīrì xiūxí.'
  },
  {
    id: 'q30',
    number: 30,
    question: '你星期几最忙？',
    pinyin: 'nǐ xīngqī jǐ zuì máng',
    correctAnswer: '我星期一最忙。',
    correctPinyin: 'wǒ xīngqīyī zuì máng.'
  },
  {
    id: 'q31',
    number: 31,
    question: '你星期几最不忙？',
    pinyin: 'nǐ xīngqī jǐ zuì bù máng',
    correctAnswer: '我星期日最不忙。',
    correctPinyin: 'wǒ xīngqīrì zuì bù máng.'
  },
  {
    id: 'q32',
    number: 32,
    question: '你星期几常常去食堂？',
    pinyin: 'nǐ xīngqī jǐ chángcháng qù shítáng',
    correctAnswer: '我星期一、二、三、四、五常常去食堂。',
    correctPinyin: 'wǒ xīngqīyī, èr, sān, sì, wǔ chángcháng qù shítáng.'
  },
  {
    id: 'q33',
    number: 33,
    question: '你星期几常常上网？',
    pinyin: 'nǐ xīngqī jǐ chángcháng shàngwǎng',
    correctAnswer: '我每天晚上常常上网。',
    correctPinyin: 'wǒ měitiān wǎnshàng chángcháng shàngwǎng.'
  },
  {
    id: 'q34',
    number: 34,
    question: '你星期几常常睡觉？',
    pinyin: 'nǐ xīngqī jǐ chángcháng shuìjiào',
    correctAnswer: '我每天晚上十一点常常睡觉。',
    correctPinyin: 'wǒ měitiān wǎnshàng shíyī diǎn chángcháng shuìjiào.'
  },
  {
    id: 'q35',
    number: 35,
    question: '你星期几常常聊天儿？',
    pinyin: 'nǐ xīngqī jǐ chángcháng liáotiānr',
    correctAnswer: '我星期六、日常常聊天儿。',
    correctPinyin: 'wǒ xīngqīliù, rì chángcháng liáotiānr.'
  },
  {
    id: 'q36',
    number: 36,
    question: '你星期几常常工作？',
    pinyin: 'nǐ xīngqī jǐ chángcháng gōngzuò',
    correctAnswer: '我星期一、二、三、四、五常常工作。',
    correctPinyin: 'wǒ xīngqīyī, èr, sān, sì, wǔ chángcháng gōngzuò.'
  },
  {
    id: 'q37',
    number: 37,
    question: '你星期几常常起床？',
    pinyin: 'nǐ xīngqī jǐ chángcháng qǐchuáng',
    correctAnswer: '我每天七点常常起床。',
    correctPinyin: 'wǒ měitiān qī diǎn chángcháng qǐchuáng.'
  },
  {
    id: 'q38',
    number: 38,
    question: '你星期几常常洗澡？',
    pinyin: 'nǐ xīngqī jǐ chángcháng xǐzǎo',
    correctAnswer: '我每天晚上常常洗澡。',
    correctPinyin: 'wǒ měitiān wǎnshàng chángcháng xǐzǎo.'
  },
  {
    id: 'q39',
    number: 39,
    question: '你星期几常常收拾房间？',
    pinyin: 'nǐ xīngqī jǐ chángcháng shōushi fángjiān',
    correctAnswer: '我星期六常常收拾房间。',
    correctPinyin: 'wǒ xīngqīliù chángcháng shōushi fángjiān.'
  },
  {
    id: 'q40',
    number: 40,
    question: '你星期几常常踢足球？',
    pinyin: 'nǐ xīngqī jǐ chángcháng tī zúqiú',
    correctAnswer: '我星期六、日常常踢足球。',
    correctPinyin: 'wǒ xīngqīliù, rì chángcháng tī zúqiú.'
  },
  {
    id: 'q41',
    number: 41,
    question: '你星期几常常画画儿？',
    pinyin: 'nǐ xīngqī jǐ chángcháng huàhuàr',
    correctAnswer: '我星期日下午常常画画儿。',
    correctPinyin: 'wǒ xīngqīrì xiàwǔ chángcháng huàhuàr.'
  },
  {
    id: 'q42',
    number: 42,
    question: '你星期几常常爬长城？',
    pinyin: 'nǐ xīngqī jǐ chángcháng pá chángchéng',
    correctAnswer: '我星期六常常爬长城。',
    correctPinyin: 'wǒ xīngqīliù chángcháng pá chángchéng.'
  },
  {
    id: 'q43',
    number: 43,
    question: '你星期几常常骑自行车？',
    pinyin: 'nǐ xīngqī jǐ chángcháng qí zìxíngchē',
    correctAnswer: '我每天下午常常骑自行车。',
    correctPinyin: 'wǒ měitiān xiàwǔ chángcháng qí zìxíngchē.'
  },
  {
    id: 'q44',
    number: 44,
    question: '你星期几常常打篮球？',
    pinyin: 'nǐ xīngqī jǐ chángcháng dǎ lánqiú',
    correctAnswer: '我星期二、四常常打篮球。',
    correctPinyin: 'wǒ xīngqīèr, sì chángcháng dǎ lánqiú.'
  },
  {
    id: 'q45',
    number: 45,
    question: '星期六我们一起去三里屯玩儿，怎么样？',
    pinyin: 'xīngqīliù wǒmen yìqǐ qù sānlǐtún wánr, zěnmeyàng',
    correctAnswer: '好，星期六我们一起去三里屯玩儿。/ 好的，星期六我们一起去三里屯玩儿。',
    correctPinyin: 'hǎo, xīngqīliù wǒmen yìqǐ qù sānlǐtún wánr. / hǎo de, xīngqīliù wǒmen yìqǐ qù sānlǐtún wánr.'
  },
  {
    id: 'q46',
    number: 46,
    question: '明天你有时间吗？',
    pinyin: 'míngtiān nǐ yǒu shíjiān ma',
    correctAnswer: '有，我明天有时间。/ 没有，我明天没有时间。',
    correctPinyin: 'yǒu, wǒ míngtiān yǒu shíjiān. / méiyǒu, wǒ míngtiān méiyǒu shíjiān.'
  },
  {
    id: 'q47',
    number: 47,
    question: '现在几点？',
    pinyin: 'xiànzài jǐ diǎn',
    correctAnswer: '现在八点三十分。',
    correctPinyin: 'xiànzài bā diǎn sānshí fēn.'
  },
  {
    id: 'q48',
    number: 48,
    question: '平时你几点起床？',
    pinyin: 'píngshí nǐ jǐ diǎn qǐchuáng',
    correctAnswer: '平时我七点起床。',
    correctPinyin: 'píngshí wǒ qī diǎn qǐchuáng.'
  },
  {
    id: 'q49',
    number: 49,
    question: '起床以后你先做什么，然后做什么？',
    pinyin: 'qǐchuáng yǐhòu nǐ xiān zuò shénme, ránhòu zuò shénme',
    correctAnswer: '起床以后我先刷牙，然后吃早饭。',
    correctPinyin: 'qǐchuáng yǐhòu wǒ xiān shuāyá, ránhòu chī zǎofàn.'
  },
  {
    id: 'q50',
    number: 50,
    question: '你几点开始上课？',
    pinyin: 'nǐ jǐ diǎn kāishǐ shàngkè',
    correctAnswer: '我八点开始上课。',
    correctPinyin: 'wǒ bā diǎn kāishǐ shàngkè.'
  },
  {
    id: 'q51',
    number: 51,
    question: '你常常去哪儿吃饭？',
    pinyin: 'nǐ chángcháng qù nǎr chīfàn',
    correctAnswer: '我常常去食堂吃饭。',
    correctPinyin: 'wǒ chángcháng qù shítáng chīfàn.'
  },
  {
    id: 'q52',
    number: 52,
    question: '你每天都做作业吗？',
    pinyin: 'nǐ měitiān dōu zuò zuòyè ma',
    correctAnswer: '是，我每天都做作业。/ 不是，我不每天都做作业。',
    correctPinyin: 'shì, wǒ měitiān dōu zuò zuòyè. / bù shì, wǒ bù měitiān dōu zuò zuòyè.'
  },
  {
    id: 'q53',
    number: 53,
    question: '你什么时候上网？',
    pinyin: 'nǐ shénme shíhòu shàngwǎng',
    correctAnswer: '我晚上时候上网。',
    correctPinyin: 'wǒ wǎnshàng shíhòu shàngwǎng.'
  },
  {
    id: 'q54',
    number: 54,
    question: '晚上你做什么？（有时候）',
    pinyin: 'wǎnshàng nǐ zuò shénme (yǒushíhòu)',
    correctAnswer: '晚上我有时候看电视，有时候做作业。',
    correctPinyin: 'wǎnshàng wǒ yǒushíhòu kàn diànshì, yǒushíhòu zuò zuòyè.'
  },
  {
    id: 'q55',
    number: 55,
    question: '今天你有事吗？你有什么事儿？',
    pinyin: 'jīntiān nǐ yǒu shì ma? nǐ yǒu shénme shìr',
    correctAnswer: '有，我有汉语课。/ 没有事。',
    correctPinyin: 'yǒu, wǒ yǒu hànyǔ kè. / méiyǒu shì.'
  },
  {
    id: 'q56',
    number: 56,
    question: '银行几点开门？几点关门？',
    pinyin: 'yínháng jǐ diǎn kāimén? jǐ diǎn guānmén',
    correctAnswer: '银行九点开门，五点关门。',
    correctPinyin: 'yínháng jiǔ diǎn kāimén, wǔ diǎn guānmén.'
  },
  {
    id: 'q57',
    number: 57,
    question: '你明天有安排吗？你有什么安排？',
    pinyin: 'nǐ míngtiān yǒu ānpái ma? nǐ yǒu shénme ānpái',
    correctAnswer: '有，我明天有汉语课。',
    correctPinyin: 'yǒu, wǒ míngtiān yǒu hànyǔ kè.'
  },
  {
    id: 'q58',
    number: 58,
    question: '你明天几点、在哪儿跟朋友见面？',
    pinyin: 'nǐ míngtiān jǐ diǎn, zài nǎr gēn péngyǒu jiànmiàn',
    correctAnswer: '我明天下午三点在图书馆跟朋友见面。',
    correctPinyin: 'wǒ míngtiān xiàwǔ sān diǎn zài túshūguǎn gēn péngyǒu jiànmiàn.'
  },
  {
    id: 'q59',
    number: 59,
    question: '电影几点开始？（2:00pm---3:50pm）',
    pinyin: 'diànyǐng jǐ diǎn kāishǐ',
    correctAnswer: '电影下午两点开始。',
    correctPinyin: 'diànyǐng xiàwǔ liǎng diǎn kāishǐ.'
  },
  {
    id: 'q60',
    number: 60,
    question: '昨天你忙吗？',
    pinyin: 'zuótiān nǐ máng ma',
    correctAnswer: '忙，昨天我很忙。/ 不忙，昨天我不忙。',
    correctPinyin: 'máng, zuótiān wǒ hěn máng. / bù máng, zuótiān wǒ bù máng.'
  },
  {
    id: 'q61',
    number: 61,
    question: '现在你困不困？（很）',
    pinyin: 'xiànzài nǐ kùn bù kùn (hěn)',
    correctAnswer: '困，现在我很困。/ 不困，现在我不困。',
    correctPinyin: 'kùn, xiànzài wǒ hěn kùn. / bù kùn, xiànzài wǒ bù kùn.'
  },
  {
    id: 'q62',
    number: 62,
    question: '北京什么地方最漂亮？',
    pinyin: 'běijīng shénme dìfāng zuì piàoliàng',
    correctAnswer: '北京天安门最漂亮。',
    correctPinyin: 'běijīng tiānānmén zuì piàoliàng.'
  },
  {
    id: 'q63',
    number: 63,
    question: '北京的人多不多？（非常）',
    pinyin: 'běijīng de rén duō bù duō (fēicháng)',
    correctAnswer: '多，北京的人很多。/ 不多，北京的人不多。/ 非常多，北京的人非常多。',
    correctPinyin: 'duō, běijīng de rén hěn duō. / bù duō, běijīng de rén bù duō. / fēicháng duō, běijīng de rén fēicháng duō.'
  },
  {
    id: 'q64',
    number: 64,
    question: '你去不去五道口玩儿？',
    pinyin: 'nǐ qù bù qù wǔdàokǒu wánr',
    correctAnswer: '去，我去五道口玩儿。/ 不去，我不去五道口玩儿。',
    correctPinyin: 'qù, wǒ qù wǔdàokǒu wánr. / bù qù, wǒ bù qù wǔdàokǒu wánr.'
  },
  {
    id: 'q65',
    number: 65,
    question: '你喝不喝茶？',
    pinyin: 'nǐ hē bù hē chá',
    correctAnswer: '喝，我喝茶。/ 不喝，我不喝茶。',
    correctPinyin: 'hē, wǒ hē chá. / bù hē, wǒ bù hē chá.'
  },
  {
    id: 'q66',
    number: 66,
    question: '你妈妈工作不工作？',
    pinyin: 'nǐ māma gōngzuò bù gōngzuò',
    correctAnswer: '工作，我妈妈工作。/ 不工作，我妈妈不工作。',
    correctPinyin: 'gōngzuò, wǒ māma gōngzuò. / bù gōngzuò, wǒ māma bù gōngzuò.'
  },
  {
    id: 'q67',
    number: 67,
    question: '杯子里有水吗？（一点儿）',
    pinyin: 'bēizi lǐ yǒu shuǐ ma (yìdiǎnr)',
    correctAnswer: '有，有一点儿水。/ 没有水。',
    correctPinyin: 'yǒu, yǒu yìdiǎnr shuǐ. / méiyǒu shuǐ.'
  },
  {
    id: 'q68',
    number: 68,
    question: '我看一下你的书，好吗？',
    pinyin: 'wǒ kàn yíxià nǐ de shū, hǎo ma',
    correctAnswer: '好，你可以看我的书。/ 可以，你可以看我的书。/ 好的，你可以看我的书。',
    correctPinyin: 'hǎo, nǐ kěyǐ kàn wǒ de shū. / kěyǐ, nǐ kěyǐ kàn wǒ de shū. / hǎo de, nǐ kěyǐ kàn wǒ de shū.'
  },
  {
    id: 'q69',
    number: 69,
    question: '你从几点到几点有汉语课？',
    pinyin: 'nǐ cóng jǐ diǎn dào jǐ diǎn yǒu hànyǔ kè',
    correctAnswer: '我从八点到十点有汉语课。',
    correctPinyin: 'wǒ cóng bā diǎn dào shí diǎn yǒu hànyǔ kè.'
  },
  {
    id: 'q70',
    number: 70,
    question: '你平时几点睡觉？',
    pinyin: 'nǐ píngshí jǐ diǎn shuìjiào',
    correctAnswer: '我平时十一点睡觉。',
    correctPinyin: 'wǒ píngshí shíyī diǎn shuìjiào.'
  },
  {
    id: 'q71',
    number: 71,
    question: '北航这个学校大不大？',
    pinyin: 'běiháng zhège xuéxiào dà bù dà',
    correctAnswer: '大，北航这个学校很大。/ 不大，北航这个学校不大。',
    correctPinyin: 'dà, běiháng zhège xuéxiào hěn dà. / bù dà, běiháng zhège xuéxiào bù dà.'
  },
  {
    id: 'q72',
    number: 72,
    question: '上课的时候，谁看手机？',
    pinyin: 'shàngkè de shíhòu, shuí kàn shǒujī',
    correctAnswer: '学生看手机。',
    correctPinyin: 'xuéshēng kàn shǒujī.'
  },
  {
    id: 'q73',
    number: 73,
    question: '周末的时候，你做什么？',
    pinyin: 'zhōumò de shíhòu, nǐ zuò shénme',
    correctAnswer: '周末的时候，我休息。',
    correctPinyin: 'zhōumò de shíhòu, wǒ xiūxí.'
  },
  {
    id: 'q74',
    number: 74,
    question: '你和朋友见面的时候，你们做什么？',
    pinyin: 'nǐ hé péngyǒu jiànmiàn de shíhòu, nǐmen zuò shénme',
    correctAnswer: '我和朋友见面的时候，我们聊天儿。',
    correctPinyin: 'wǒ hé péngyǒu jiànmiàn de shíhòu, wǒmen liáotiānr.'
  },
  {
    id: 'q75',
    number: 75,
    question: '你喜欢和谁聊天？',
    pinyin: 'nǐ xǐhuan hé shuí liáotiān',
    correctAnswer: '我喜欢和朋友聊天。',
    correctPinyin: 'wǒ xǐhuan hé péngyǒu liáotiān.'
  },
  {
    id: 'q76',
    number: 76,
    question: '你的手机号码是多少？',
    pinyin: 'nǐ de shǒujī hàomǎ shì duōshǎo',
    correctAnswer: '我的手机号码是13812345678。',
    correctPinyin: 'wǒ de shǒujī hàomǎ shì yāosānbā yāoèrsānsì wǔliùqībā.'
  },
  {
    id: 'q77',
    number: 77,
    question: '你的房间号（码）是多少？',
    pinyin: 'nǐ de fángjiān hào(mǎ) shì duōshǎo',
    correctAnswer: '我的房间号是305。',
    correctPinyin: 'wǒ de fángjiān hào shì sānlíngwǔ.'
  },
  {
    id: 'q78',
    number: 78,
    question: '你一般几点吃早饭？',
    pinyin: 'nǐ yìbān jǐ diǎn chī zǎofàn',
    correctAnswer: '我一般七点半吃早饭。',
    correctPinyin: 'wǒ yìbān qī diǎn bàn chī zǎofàn.'
  },
  {
    id: 'q79',
    number: 79,
    question: '你喜欢听中国音乐吗？',
    pinyin: 'nǐ xǐhuan tīng zhōngguó yīnyuè ma',
    correctAnswer: '喜欢，我喜欢听中国音乐。/ 不喜欢，我不喜欢听中国音乐。',
    correctPinyin: 'xǐhuan, wǒ xǐhuan tīng zhōngguó yīnyuè. / bù xǐhuan, wǒ bù xǐhuan tīng zhōngguó yīnyuè.'
  },
  {
    id: 'q80',
    number: 80,
    question: '中国的咖啡好喝吗？',
    pinyin: 'zhōngguó de kāfēi hǎo hē ma',
    correctAnswer: '好喝，中国的咖啡很好喝。/ 不好喝，中国的咖啡不好喝。',
    correctPinyin: 'hǎo hē, zhōngguó de kāfēi hěn hǎo hē. / bù hǎo hē, zhōngguó de kāfēi bù hǎo hē.'
  },
  {
    id: 'q81',
    number: 81,
    question: '谁收拾你的房间？',
    pinyin: 'shuí shōushi nǐ de fángjiān',
    correctAnswer: '我收拾我的房间。',
    correctPinyin: 'wǒ shōushi wǒ de fángjiān.'
  },
  {
    id: 'q82',
    number: 82,
    question: '你最喜欢什么运动？',
    pinyin: 'nǐ zuì xǐhuan shénme yùndòng',
    correctAnswer: '我最喜欢打篮球。',
    correctPinyin: 'wǒ zuì xǐhuan dǎ lánqiú.'
  },
  {
    id: 'q83',
    number: 83,
    question: '你对什么感兴趣？',
    pinyin: 'nǐ duì shénme gǎn xìngqù',
    correctAnswer: '我对汉语感兴趣。',
    correctPinyin: 'wǒ duì hànyǔ gǎn xìngqù.'
  },
  {
    id: 'q84',
    number: 84,
    question: '跑步对身体好吗？',
    pinyin: 'pǎobù duì shēntǐ hǎo ma',
    correctAnswer: '好，跑步对身体很好。/ 不好，跑步对身体不好。',
    correctPinyin: 'hǎo, pǎobù duì shēntǐ hěn hǎo. / bù hǎo, pǎobù duì shēntǐ bù hǎo.'
  },
  {
    id: 'q85',
    number: 85,
    question: '你的爱好是什么？',
    pinyin: 'nǐ de àihào shì shénme',
    correctAnswer: '我的爱好是运动。',
    correctPinyin: 'wǒ de àihào shì yùndòng.'
  },
  {
    id: 'q86',
    number: 86,
    question: '你是老师还是学生？',
    pinyin: 'nǐ shì lǎoshī háishì xuéshēng',
    correctAnswer: '我是老师。/ 我是学生。',
    correctPinyin: 'wǒ shì lǎoshī. / wǒ shì xuéshēng.'
  },
  {
    id: 'q87',
    number: 87,
    question: '你喜欢喝茶还是喝咖啡？',
    pinyin: 'nǐ xǐhuan hē chá háishì hē kāfēi',
    correctAnswer: '我喜欢喝茶。/ 我喜欢喝咖啡。',
    correctPinyin: 'wǒ xǐhuan hē chá. / wǒ xǐhuan hē kāfēi.'
  },
  {
    id: 'q88',
    number: 88,
    question: '你喜欢苹果还是香蕉？',
    pinyin: 'nǐ xǐhuan píngguǒ háishì xiāngjiāo',
    correctAnswer: '我喜欢苹果。/ 我喜欢香蕉。',
    correctPinyin: 'wǒ xǐhuan píngguǒ. / wǒ xǐhuan xiāngjiāo.'
  },
  {
    id: 'q89',
    number: 89,
    question: '你的手机和老师的手机一样吗？',
    pinyin: 'nǐ de shǒujī hé lǎoshī de shǒujī yíyàng ma',
    correctAnswer: '一样，我的手机和老师的手机一样。/ 不一样，我的手机和老师的手机不一样。',
    correctPinyin: 'yíyàng, wǒ de shǒujī hé lǎoshī de shǒujī yíyàng. / bù yíyàng, wǒ de shǒujī hé lǎoshī de shǒujī bù yíyàng.'
  },
  {
    id: 'q90',
    number: 90,
    question: '北京怎么样？',
    pinyin: 'běijīng zěnmeyàng',
    correctAnswer: '北京很漂亮。',
    correctPinyin: 'běijīng hěn piàoliàng.'
  },
  {
    id: 'q91',
    number: 91,
    question: '哪个教室是你们的教室？',
    pinyin: 'nǎge jiàoshì shì nǐmen de jiàoshì',
    correctAnswer: '305教室是我们的教室。',
    correctPinyin: 'sānlíngwǔ jiàoshì shì wǒmen de jiàoshì.'
  },
  {
    id: 'q92',
    number: 92,
    question: '你从什么时候到什么时候在北航学习？',
    pinyin: 'nǐ cóng shénme shíhòu dào shénme shíhòu zài běiháng xuéxí',
    correctAnswer: '我从九月到十二月在北航学习。',
    correctPinyin: 'wǒ cóng jiǔyuè dào shíèryuè zài běiháng xuéxí.'
  },
  {
    id: 'q93',
    number: 93,
    question: '你什么时候回国？',
    pinyin: 'nǐ shénme shíhòu huí guó',
    correctAnswer: '我十二月时候回国。',
    correctPinyin: 'wǒ shíèryuè shíhòu huí guó.'
  }
]

