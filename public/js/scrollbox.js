function statusMessageObject(p,d) {
   this.msg= MESSAGE;
   this.out= " ";
   this.pos= POSITION;
   this.delay = DELAY;
   this.i = 0;
   this.reset = clearMessage
}
function clearMessage() {
   this.pos = POSITION;
}
// ***************************
var POSITION = 120;
var DELAY = 60;
var MESSAGE = "Weit hinten, hinter den Wortbergen, fern der Länder Vokalien und Konsonantien leben die Blindtexte. Abgeschieden wohnen Sie in Buchstabhausen an der Küste des Semantik, eines großen Sprachozeans. Ein kleines Bächlein namens Duden fließt durch ihren Ort und versorgt sie mit den nötigen Regelialien. Es ist ein paradiesmatisches Land, in dem einem gebratene Satzteile in den Mund fliegen. Nicht einmal von der allmächtigen Interpunktion werden die Blindtexte beherrscht – ein geradezu unorthographisches Leben. Eines Tages aber beschloß eine kleine Zeile Blindtext, ihr Name war Lorem Ipsum, hinaus zu gehen in die weite Grammatik. Der große Oxmox riet ihr davon ab, da es dort wimmele von bösen Kommata, wilden Fragezeichen und hinterhältigen Semikoli, doch das Blindtextchen ließ sich nicht beirren. Es packte seine sieben Versalien, schob sich sein Initial in den Gürtel und machte sich auf den Weg. Als es die ersten Hügel des Kursivgebirges erklommen hatte, warf es einen letzten Blick zurück auf die Skyline seiner Heimatstadt Buchstabhausen, die Headline von Alphabetdorf und die Subline seiner eigenen Straße, der Zeilengasse. Wehmütig lief ihm eine rethorische Frage über die Wange, dann setzte es seinen Weg fort. Unterwegs traf es eine Copy. Die Copy warnte das Blindtextchen, da, wo sie herkäme wäre sie zigmal umgeschrieben worden und alles, was von ihrem Ursprung noch übrig wäre, sei das Wort „und“ und das Blindtextchen solle umkehren und wieder in sein eigenes, sicheres Land zurückkehren. Doch alles Gutzureden konnte es nicht überzeugen und so dauerte es nicht lange, bis ihm ein paar heimtückische Werbetexter auflauerten, es mit Longe und Parole betrunken machten und es dann in ihre Agentur schleppten, wo sie es für ihre Projekte wieder und wieder mißbrauchten. Und wenn es nicht umgeschrieben wurde, dann benutzen Sie es immernoch.";
// ***************************

var scroll = new statusMessageObject();
function scroller() {
   for (scroll.i=0; scroll.i<scroll.pos; scroll.i++) {
      scroll.out += " "
   }
   if (scroll.pos >= 0 ) {
      scroll.out += scroll.msg;
   } else
      scroll.out = scroll.msg.substring(-scroll.pos,scroll.msg.length);
 
   document.scrollform.scrollbox.value = scroll.out;
   scroll.out = " ";
   scroll.pos--;
   if ( scroll.pos < -(scroll.msg.length) ) {
      scroll.reset();
   }
   setTimeout('scroller()',scroll.delay);
}
