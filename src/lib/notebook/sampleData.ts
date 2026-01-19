import { NotebookRequest, Verse } from "./types";

export const englishSampleData: NotebookRequest = {
  language: "en",
  templateId: "church-standard",
  frontMatter: ["blank", "blank", "cover"],
  sections: [
    {
      title: "MATTHEW",
      pages: [
        {
          paragraphs: [
            "The book of the genealogy of Jesus Christ, the son of David, the son of Abraham.",
            "Abraham was the father of Isaac, and Isaac the father of Jacob, and Jacob the father of Judah and his brothers, and Judah the father of Perez and Zerah by Tamar, and Perez the father of Hezron, and Hezron the father of Ram, and Ram the father of Amminadab, and Amminadab the father of Nahshon, and Nahshon the father of Salmon, and Salmon the father of Boaz by Rahab, and Boaz the father of Obed by Ruth, and Obed the father of Jesse, and Jesse the father of David the king.",
            "And David was the father of Solomon by the wife of Uriah, and Solomon the father of Rehoboam, and Rehoboam the father of Abijah, and Abijah the father of Asaph, and Asaph the father of Jehoshaphat, and Jehoshaphat the father of Joram, and Joram the father of Uzziah, and Uzziah the father of Jotham, and Jotham the father of Ahaz, and Ahaz the father of Hezekiah, and Hezekiah the father of Manasseh, and Manasseh the father of Amos, and Amos the father of Josiah, and Josiah the father of Jechoniah and his brothers, at the time of the deportation to Babylon.",
          ],
        },
        {
          paragraphs: [
            "And after the deportation to Babylon: Jechoniah was the father of Shealtiel, and Shealtiel the father of Zerubbabel, and Zerubbabel the father of Abiud, and Abiud the father of Eliakim, and Eliakim the father of Azor, and Azor the father of Zadok, and Zadok the father of Achim, and Achim the father of Eliud, and Eliud the father of Eleazar, and Eleazar the father of Matthan, and Matthan the father of Jacob, and Jacob the father of Joseph the husband of Mary, of whom Jesus was born, who is called Christ.",
            "So all the generations from Abraham to David were fourteen generations, and from David to the deportation to Babylon fourteen generations, and from the deportation to Babylon to the Christ fourteen generations.",
            "Now the birth of Jesus Christ took place in this way. When his mother Mary had been betrothed to Joseph, before they came together she was found to be with child from the Holy Spirit. And her husband Joseph, being a just man and unwilling to put her to shame, resolved to divorce her quietly.",
          ],
        },
      ],
    },
    {
      title: "GALATIANS",
      pages: [
        {
          paragraphs: [
            "Paul, an apostle—not from men nor through man, but through Jesus Christ and God the Father, who raised him from the dead— and all the brothers who are with me,",
            "To the churches of Galatia:",
            "Grace to you and peace from God our Father and the Lord Jesus Christ, who gave himself for our sins to deliver us from the present evil age, according to the will of our God and Father, to whom be the glory forever and ever. Amen.",
            "I am astonished that you are so quickly deserting him who called you in the grace of Christ and are turning to a different gospel— not that there is another one, but there are some who trouble you and want to distort the gospel of Christ.",
          ],
        },
      ],
    },
  ],
  backMatter: ["blank", "blank"],
};

// Stage 2: Long sample data with verses for pagination testing
export const englishLongSampleData: NotebookRequest = {
  language: "en",
  templateId: "church-standard",
  frontMatter: ["blank", "blank", "cover"],
  sections: [
    {
      title: "MATTHEW",
      verses: [
        // Matthew 1:1-25 (full chapter)
        { chapter: 1, verse: 1, text: "The book of the genealogy of Jesus Christ, the son of David, the son of Abraham." },
        { chapter: 1, verse: 2, text: "Abraham was the father of Isaac, and Isaac the father of Jacob, and Jacob the father of Judah and his brothers," },
        { chapter: 1, verse: 3, text: "and Judah the father of Perez and Zerah by Tamar, and Perez the father of Hezron, and Hezron the father of Ram," },
        { chapter: 1, verse: 4, text: "and Ram the father of Amminadab, and Amminadab the father of Nahshon, and Nahshon the father of Salmon," },
        { chapter: 1, verse: 5, text: "and Salmon the father of Boaz by Rahab, and Boaz the father of Obed by Ruth, and Obed the father of Jesse," },
        { chapter: 1, verse: 6, text: "and Jesse the father of David the king. And David was the father of Solomon by the wife of Uriah," },
        { chapter: 1, verse: 7, text: "and Solomon the father of Rehoboam, and Rehoboam the father of Abijah, and Abijah the father of Asaph," },
        { chapter: 1, verse: 8, text: "and Asaph the father of Jehoshaphat, and Jehoshaphat the father of Joram, and Joram the father of Uzziah," },
        { chapter: 1, verse: 9, text: "and Uzziah the father of Jotham, and Jotham the father of Ahaz, and Ahaz the father of Hezekiah," },
        { chapter: 1, verse: 10, text: "and Hezekiah the father of Manasseh, and Manasseh the father of Amos, and Amos the father of Josiah," },
        { chapter: 1, verse: 11, text: "and Josiah the father of Jechoniah and his brothers, at the time of the deportation to Babylon." },
        { chapter: 1, verse: 12, text: "And after the deportation to Babylon: Jechoniah was the father of Shealtiel, and Shealtiel the father of Zerubbabel," },
        { chapter: 1, verse: 13, text: "and Zerubbabel the father of Abiud, and Abiud the father of Eliakim, and Eliakim the father of Azor," },
        { chapter: 1, verse: 14, text: "and Azor the father of Zadok, and Zadok the father of Achim, and Achim the father of Eliud," },
        { chapter: 1, verse: 15, text: "and Eliud the father of Eleazar, and Eleazar the father of Matthan, and Matthan the father of Jacob," },
        { chapter: 1, verse: 16, text: "and Jacob the father of Joseph the husband of Mary, of whom Jesus was born, who is called Christ." },
        { chapter: 1, verse: 17, text: "So all the generations from Abraham to David were fourteen generations, and from David to the deportation to Babylon fourteen generations, and from the deportation to Babylon to the Christ fourteen generations." },
        { chapter: 1, verse: 18, text: "Now the birth of Jesus Christ took place in this way. When his mother Mary had been betrothed to Joseph, before they came together she was found to be with child from the Holy Spirit." },
        { chapter: 1, verse: 19, text: "And her husband Joseph, being a just man and unwilling to put her to shame, resolved to divorce her quietly." },
        { chapter: 1, verse: 20, text: "But as he considered these things, behold, an angel of the Lord appeared to him in a dream, saying, 'Joseph, son of David, do not fear to take Mary as your wife, for that which is conceived in her is from the Holy Spirit.'" },
        { chapter: 1, verse: 21, text: "She will bear a son, and you shall call his name Jesus, for he will save his people from their sins." },
        { chapter: 1, verse: 22, text: "All this took place to fulfill what the Lord had spoken by the prophet:" },
        { chapter: 1, verse: 23, text: "'Behold, the virgin shall conceive and bear a son, and they shall call his name Immanuel' (which means, God with us)." },
        { chapter: 1, verse: 24, text: "When Joseph woke from sleep, he did as the angel of the Lord commanded him: he took his wife," },
        { chapter: 1, verse: 25, text: "but knew her not until she had given birth to a son. And he called his name Jesus." },
        // Matthew 2:1-12 (first half of chapter)
        { chapter: 2, verse: 1, text: "Now after Jesus was born in Bethlehem of Judea in the days of Herod the king, behold, wise men from the east came to Jerusalem," },
        { chapter: 2, verse: 2, text: "saying, 'Where is he who has been born king of the Jews? For we saw his star when it rose and have come to worship him.'" },
        { chapter: 2, verse: 3, text: "When Herod the king heard this, he was troubled, and all Jerusalem with him;" },
        { chapter: 2, verse: 4, text: "and assembling all the chief priests and scribes of the people, he inquired of them where the Christ was to be born." },
        { chapter: 2, verse: 5, text: "They told him, 'In Bethlehem of Judea, for so it is written by the prophet:'" },
        { chapter: 2, verse: 6, text: "'And you, O Bethlehem, in the land of Judah, are by no means least among the rulers of Judah; for from you shall come a ruler who will shepherd my people Israel.'" },
        { chapter: 2, verse: 7, text: "Then Herod summoned the wise men secretly and ascertained from them what time the star had appeared." },
        { chapter: 2, verse: 8, text: "And he sent them to Bethlehem, saying, 'Go and search diligently for the child, and when you have found him, bring me word, that I too may come and worship him.'" },
        { chapter: 2, verse: 9, text: "After listening to the king, they went on their way. And behold, the star that they had seen when it rose went before them until it came to rest over the place where the child was." },
        { chapter: 2, verse: 10, text: "When they saw the star, they rejoiced exceedingly with great joy." },
        { chapter: 2, verse: 11, text: "And going into the house, they saw the child with Mary his mother, and they fell down and worshiped him. Then, opening their treasures, they offered him gifts, gold and frankincense and myrrh." },
        { chapter: 2, verse: 12, text: "And being warned in a dream not to return to Herod, they departed to their own country by another way." },
        // Add more verses to ensure multiple pages
        { chapter: 3, verse: 1, text: "In those days John the Baptist came preaching in the wilderness of Judea," },
        { chapter: 3, verse: 2, text: "'Repent, for the kingdom of heaven is at hand.'" },
        { chapter: 3, verse: 3, text: "For this is he who was spoken of by the prophet Isaiah when he said, 'The voice of one crying in the wilderness: Prepare the way of the Lord; make his paths straight.'" },
        { chapter: 3, verse: 4, text: "Now John wore a garment of camel's hair and a leather belt around his waist, and his food was locusts and wild honey." },
        { chapter: 3, verse: 5, text: "Then Jerusalem and all Judea and all the region about the Jordan were going out to him," },
        { chapter: 3, verse: 6, text: "and they were baptized by him in the river Jordan, confessing their sins." },
        { chapter: 3, verse: 7, text: "But when he saw many of the Pharisees and Sadducees coming to his baptism, he said to them, 'You brood of vipers! Who warned you to flee from the wrath to come?'" },
        { chapter: 3, verse: 8, text: "Bear fruit in keeping with repentance." },
        { chapter: 3, verse: 9, text: "And do not presume to say to yourselves, 'We have Abraham as our father,' for I tell you, God is able from these stones to raise up children for Abraham." },
        { chapter: 3, verse: 10, text: "Even now the axe is laid to the root of the trees. Every tree therefore that does not bear good fruit is cut down and thrown into the fire." },
      ] as Verse[],
    },
    {
      title: "GALATIANS",
      verses: [
        { chapter: 1, verse: 1, text: "Paul, an apostle—not from men nor through man, but through Jesus Christ and God the Father, who raised him from the dead—" },
        { chapter: 1, verse: 2, text: "and all the brothers who are with me, To the churches of Galatia:" },
        { chapter: 1, verse: 3, text: "Grace to you and peace from God our Father and the Lord Jesus Christ," },
        { chapter: 1, verse: 4, text: "who gave himself for our sins to deliver us from the present evil age, according to the will of our God and Father," },
        { chapter: 1, verse: 5, text: "to whom be the glory forever and ever. Amen." },
        { chapter: 1, verse: 6, text: "I am astonished that you are so quickly deserting him who called you in the grace of Christ and are turning to a different gospel—" },
        { chapter: 1, verse: 7, text: "not that there is another one, but there are some who trouble you and want to distort the gospel of Christ." },
        { chapter: 1, verse: 8, text: "But even if we or an angel from heaven should preach to you a gospel contrary to the one we preached to you, let him be accursed." },
        { chapter: 1, verse: 9, text: "As we have said before, so now I say again: If anyone is preaching to you a gospel contrary to the one you received, let him be accursed." },
        { chapter: 1, verse: 10, text: "For am I now seeking the approval of man, or of God? Or am I trying to please man? If I were still trying to please man, I would not be a servant of Christ." },
      ] as Verse[],
    },
  ],
  backMatter: ["blank", "blank"],
};
