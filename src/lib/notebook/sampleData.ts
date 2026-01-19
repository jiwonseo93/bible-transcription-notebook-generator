import { NotebookRequest } from "./types";

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
