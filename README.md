# 🇨🇳 Entraînement Examen Chinois

Application web interactive pour s'entraîner à l'examen de chinois basée sur vos cours et consignes.

## 🚀 Installation

1. Installer les dépendances :
```bash
npm install
```

2. Lancer l'application en mode développement :
```bash
npm run dev
```

3. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📚 Contenu des exercices

L'application couvre tous les points requis pour votre examen :

### Bases
- **Mots interrogatifs** : 什么, 怎么, 哪里, etc.
- **请 (qǐng)** : Utilisation pour être poli
- **对 (duì)** : Affirmer "oui" ou exprimer "être concerné"

### Vocabulaire
- **Lieux de Chine** : Grande Muraille (长城), Temple du Paradis (天坛), Cité Interdite (故宫), Palais d'Été (颐和园), Parc Beihai (北海公园), Parc Xishan (西山公园)
- **同学 (tóngxué)** : Utilisation avec 所有 (pas 都)
- **做 (zuò)** : Verbe "faire"
- **专业 (zhuānyè)** : Spécialité / Domaine d'étude
- **玩儿 (wánr)** : S'amuser, avoir du plaisir

### Temps et Heures
- **Heures et 刻 (kè)** : Lire et écrire les heures, utiliser 刻 (quart d'heure)
- **差 (chà)** : Utiliser pour dire "moins" (ex: 差一刻8点 = 7h45)
- **Questions sur le temps** : 下午你有课吗？现在几点？
- **Mots de séquence** : 先 (d'abord), 然后 (puis), 以后 (après), 最后 (enfin)
- **有时候 (yǒushíhòu)** : Parfois, quelquefois

### Expressions
- **Répondre à 怎么样** : 太好了 (positif) / 对不起，我没有时间 (négatif)
- **跟...见面** : Rencontrer quelqu'un
- **一点儿 (yìdiǎnr)** : Un peu (après le verbe)
- **Numéro de téléphone** : Demander avec 号码 et 多少

## 🎯 Fonctionnalités

### Mode Entraînement
- **Exercices à choix multiples** : Sélectionnez la bonne réponse parmi plusieurs options
- **Exercices de saisie** : Tapez votre réponse en chinois ou pinyin
- **Feedback immédiat** : Recevez une correction et une explication après chaque réponse
- **Suivi du score** : Suivez votre progression en temps réel
- **Barre de progression** : Visualisez votre avancement dans l'exercice

### Mode Examen 📝
Un mode examen complet basé sur le format réel de votre examen avec **9 types de questions** :

1. **一、数字和时间** : Écrire des nombres ou temps en chiffres arabes
2. **二、连线 (mots)** : Relier des mots chinois avec leur traduction
3. **三、连线 (量词)** : Relier des mots de mesure avec des noms
4. **四、动词和宾语** : Choisir des objets appropriés pour des verbes
5. **五、选词填空** : Choisir des mots pour remplir les blancs
6. **六、就划线部分提问** : Faire des questions sur les parties soulignées
7. **七、整理成句子** : Réarranger des mots pour former des phrases
8. **八、完成对话** : Compléter des dialogues
9. **九、读短文回答问题** : Lire un passage et répondre aux questions

**Caractéristiques du mode examen :**
- Plusieurs variantes d'examens disponibles (même format, questions différentes)
- Navigation entre les sections
- Score par section et score total
- Interface similaire à l'examen réel

## 📝 Structure du projet

```
chinese/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Page d'accueil
│   └── globals.css         # Styles globaux
├── components/
│   ├── ExerciseMenu.tsx           # Menu de sélection des exercices
│   ├── MultipleChoiceExercise.tsx # Composant pour QCM
│   └── TextInputExercise.tsx      # Composant pour saisie texte
├── data/
│   └── exercises.ts        # Données de tous les exercices
└── package.json
```

## 🛠️ Technologies utilisées

- **Next.js 14** : Framework React
- **TypeScript** : Typage statique
- **React 18** : Bibliothèque UI

## 📖 Utilisation

### Mode Entraînement
1. Sur la page d'accueil, choisissez une catégorie d'exercices
2. Cliquez sur un exercice pour commencer
3. Répondez aux questions (choix multiples ou saisie)
4. Validez votre réponse pour voir le feedback
5. Passez à la question suivante
6. Consultez votre score final à la fin de l'exercice

### Mode Examen
1. Cliquez sur le bouton **"📝 Mode Examen"** sur la page d'accueil
2. Choisissez un examen parmi les variantes disponibles
3. Complétez chaque section dans l'ordre (ou dans l'ordre de votre choix)
4. Consultez votre score après chaque section
5. Consultez votre score total à la fin de l'examen

## 🎨 Personnalisation

Vous pouvez facilement ajouter de nouveaux exercices en modifiant le fichier `data/exercises.ts`. Chaque exercice suit cette structure :

```typescript
{
  id: 'identifiant-unique',
  title: 'Titre de l\'exercice',
  type: 'multiple-choice' | 'text-input',
  questions: [
    {
      question: 'Question en français',
      chinese: 'Texte en chinois (optionnel)',
      options: ['Option 1', 'Option 2', ...], // Pour QCM
      correctAnswer: 0, // Index ou string
      explanation: 'Explication de la réponse'
    }
  ]
}
```

Bon entraînement ! 加油！(Jiāyóu!)

