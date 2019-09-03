//guides
const guides = [
    //{ name:"", tags: ["",""], res: ["",""], notes: ["",""], link: ""},
    { name: "Bear Tank", tags: ["tank", "pve", "raid", "dungeon", "meele"], res: ["1x Survival of the Fittest (2% all stats)", "1x Survivalist (3% stam)", "1x Endurance Training (2% hp)", "1x Protector of the Pack (3% damage reduction)", "1x Prismatic Cloak (3% damage reduction)", "1x Anticipation (2% dodge chance)", "1x Arctic Winds (2% miss chance)", "3x Ferocity (-2 rage on abilities)", "3x Savage Defense", "3x Blaze Ward", "1x Infected Wounds"], notes: ["Stat Priority: Armor >= Stam > Dodge > Hit/Exp > Agi > Str > Crit = AP > Defense Rating", "Use Leather gear (Bloodfang/Nightslayer) with a 1H weapon and shield", "If low geared, you might want to pick up 2-4% hit from the Enlightened talent (Holy Pally tree)", "Ferocity RE is optional but very nice to have", "Infected Wounds RE is optional but provides the slow which Thunder Clap usually would for some DPS specs", "Abilities you might want to swap out: Frenzied Regeneration, Bloodrage or Enrage, Challenging Roar", "Abilities you might want to swap in: Divine Shield (for resetting debuffs), Cleansing/Tremor/Stoneskin Totem (for raid utility), Disengage (for fights that require mobility)", "You can also swap Blessing of Sanctuary for (improved) Power Word: Fortitude depending on the raid setup"], link: "https://project-ascension.com/development/builds#/talentsandabilities/editor/?hash=:71:168:498:687:697:779:871:1120:2687:5209:5229:5277:5384:5487:6795:6807:13163:16857:19263:22812:22842:25780:29166:62600:148t1:204t2:344t2:794t3:807t2:808t3:822t3:1162t1:1223t3:1244t5:1282t1:1395t1:1431t1:1501t3:1679t1:1703t2:1750t2:1751t3:1794t3:1796t1:1910t1:2138t1:2241t3:2242t3:" },
    { name: "Chain Heal", tags: ["heal", "pve", "raid", "dungeon", "caster"], res: ["3x Improved Chainheal 5%", "3x Purification 2%", "3x Tidal Mastery 2%", "1x Blessing of the Eternals 2%", "1x Divinity", "1x Blessing of the Divines (Legendary RE)"], notes: ["Once comfortable with the build and got above 35% Crit, you can throw in a Rejuvenating Light instead of one Tidal Mastery for some additional 5% healing if done right.", "Circle of Light (start with this if you have Rejuvenating Light RE)>Chainheal>Chainheal>Lifetap>Repeat", "Riptide if you need some instant heals or when you know there is a big hit coming to empower your next Chainheal", "Lesser Healing Wave to heal a single target fast"], link: "https://project-ascension.com/development/builds#/talentsandabilities/editor/?hash=:586:642:1064:1454:1953:2458:2782:5384:6117:8143:8170:19263:20484:29166:45438:51730:52127:404t5:581t3:592t5:611t3:828t5:1697t2:1772t3:1815t1:1846t2:1867t1:1895t3:1916t5:2060t2:2064t1:2083t3:2179t5:2192t1:2211t1:" },
    { name: "Beast Hunter", tags: ["dps", "pve", "raid", "dungeon", "ranged"], res: ["1x Go for the Throat", "3xFerocity", "3x Unleashed Fury", "3x Ferocious Insipration", "3xLongevity", "1x One handed specialisation", "1x Survival of the Fittest", "1x Deadliness", "1x Unrelenting Wrath", "1x Pursuit of Justice", "1x Lightning Reflexes", "1x Killer Instinct"], notes: ["Pet AA->Profit", "Ferocity or Unleashed Fury"], link: "https://project-ascension.com/development/builds#/talentsandabilities/editor/?hash=:642:1130:1510:1953:1978:2458:2842:3044:3045:4987:5384:8017:8075:13165:19263:19801:29166:52127:56641:965200:965202:1303t3:1322t1:1349t3:1361t1:1362t3:1386t1:1397t3:1702t3:1711t2:1800t3:1802t5:1803t1:1806t3:1812t2:2130t3:2132t3:2135t1:2138t1:2139t1:2140t3:2191t2:2228t3:" },
    { name: "Slam Spam", tags: ["dps", "pve", "raid", "dungeon", "meele"], res: ["3x Unending Fury (Green)", "1x Cut to the Chase (Epic)", "3x Poleaxe Specialization (Green)", "1x In For The Kill (Legendary)", "1x Crusade (Epic)", "1x Killer Instinct (Epic)", "1x Survival of the Fittest (Epic)", "1x Deadliness (Epic)"], notes: ["Recommended Weapon: Blackrock Slicer", "Keep Slice and Dice, Hunger for Blood and Rend up at all times during a boss fight", "Use Heroic Strike if you're above 60 rage", "Use Bloodthirst only if you have to move and can't cast a slam", "Use Whirlwind if there are 2-3 or more targets", "Slam, Slam, Slam, Slam!"], link: "https://project-ascension.com/development/builds#/talentsandabilities/editor/?hash=:78:100:527:586:642:772:1454:1464:1680:1752:1953:2098:2457:5171:5308:5384:7384:8232:13161:19263:19740:21084:45438:57994:121t3:124t3:131t2:156t3:157t5:165t1:167t1:602t3:662t2:1657t3:1661t1:1664t2:1702t3:1860t2:1863t1:2071t1:2185t3:2231t3:2232t3:2233t2:2250t3:2283t1:" },
    { name: "Wild Quiver Hunter", tags: ["dps", "pve", "raid", "dungeon", "ranged"], res: ["3x Improved aspect of the hawk 3%.", "3x Wild quiver 4%.", "3x Marked for death 3%.", "1x 2% Increased dmg when one handers are equiped.", "1x 2% Crit or you could do 3% spell dmg and 3% spell dmg recived(depending how much uptime you have on your clearcasting from shaman tree)"], notes: ["Serpent Sting> Explosive Shot> Chimera Shot> Steady Shot till explosive is off cd, same with Chimera, have Black Arrow used all the time.", "Pet: Wolf cuz of the atp buff", "Shaman clearcasting: this is a super talent combined with Elemental Oath, when it triggers from Chimera Shot you'll gain increased 10% nature, fire and frost dmg which will increase your poisons, serpent sting, wild quiver & explosive shot.", "Enveloping shadows: alot of the counters in BWL atleast are AOE dmg related, so to give the healers a little more slack we should all be using this for future raiding."], link: "https://project-ascension.com/development/builds#/talentsandabilities/editor/?hash=:1130:1454:1953:1978:2842:3045:4987:5384:8017:8075:13165:19263:19882:56641:965200:965202:87t1:268t5:521t1:574t1:682t3:1322t1:1361t1:1362t3:1382t5:1386t1:1659t1:1702t3:1711t3:1802t5:1803t1:1806t3:1812t1:1818t1:2049t2:2071t1:2132t3:2135t1:2139t1:2145t1:" },
    { name: "Ebola Tank-Dot Spec", tags: ["dps", "pvp", "caster"], res: ["3x Demonic Resilience 6%", "3x Blaze Ward", "3x Healing Swarm ", "1x Protector of the Pack 3%", "1x Spell Warding 3%", "1x Endless Agony", "3x Improved Curse of Agony"], notes: [], link:"https://project-ascension.com/development/builds#/talentsandabilities/editor/?hash=:17:71:139:168:172:633:774:781:980:1120:1126:1454:1953:2484:6789:7294:8024:25780:57994:71t1:788t1:1061t1:1201t3:1223t3:1242t3:1244t5:1263t3:1282t1:1284t2:1431t1:1501t3:1634t2:1650t2:1652t2:1672t1:1676t1:1679t1:1680t3:1751t2:1783t2:1848t2:1910t1:1926t1:2064t1:2204t2:2235t1:"},
    { name: "Cat leveling", tags: ["dps", "pve", "solo", "leveling", "meele"], res: ["not required, take everything that boosts your dmg/deff", "always good for lvling: Renewed Energy (20%mana on kill)"], notes: ["Requires level 20 (Cat Form)"], link: "https://project-ascension.com/development/builds#/talentsandabilities/editor/?hash=:168:687:768:1082:1126:1850:5217:5221:8033:8936:13161:19740:20165:20719:22568:270t5:616t3:796t5:798t3:801t2:802t2:803t3:805t2:807t2:809t1:821t2:822t3:1361t1:1702t3:1794t3:1796t1:1798t2:1914t2:1920t3:1921t3:" },
    { name: "Nature Hybrid PVP", tags: ["dps", "pvp", "meele"], res: ["3x Elemental Weapons", "3x Focused Fire", "3x Lightning Overload", "3x Static Shock", "1x One-Handed Weapon Specialization", "1x Divine Purpose", "1x Body and Soul", "1x Spell Slinger", "1x Reckoning", "1x Blade Twisting"], notes: ["If we know that fight incoming we want to buff up with both absorbs, riptide and put the sp totem.", "Our main damage comes from melee attacks because they proc all our chance on hit effects, due to this our main burst comes when we do first contact with target because we do x2 autos and x2 attacks from stormstrike that gives us 4 flametongue procs + other chance on hit effects, because of that we want to prepop cds before first contact in most cases.", "That is why we are using shadowstep instead of intercept and shadowstep macro allows us to avoid dodges/parries/blocks and hit with full force on cds usually with that button you delete about 40-60% of targets hp.", "Shadowstep macro is linked with spell lock because we want to prevent our target to blink from our poped cds.", "If possible we want to use earth shock and lightning bolts after stormstrike for 20% dmg inc.", "Full details: https://docs.google.com/document/d/1_zc1sxA52adcf0DVvH1nQaLDXePcHT0Bm-IJXxfBVNo/edit#heading=h.19t4ttlf4sk5"], link: "https://project-ascension.com/development/builds#/talentsandabilities/editor/?hash=:17:100:324:403:527:642:691:1044:1120:1454:1490:1953:5277:6789:8024:8042:18499:20164:71t1:75t3:87t1:562t1:565t5:574t1:616t3:901t1:1426t3:1676t1:1686t3:1687t1:1691t5:1714t1:1725t2:1757t1:1865t2:1908t1:1926t1:2049t2:2054t2:2055t3:2057t3:2064t1:2249t1:2262t2:" },
    { name: "Multilate Hybrid PVP", tags: ["dps", "pvp", "meele"], res: ["3x Static Shock", "3x Vitality", "3x Improved Shields", "3x Lightning Overload", "2x Fiery Weapon (Ench on Weapon only)", "1x Divine Purpose", "1x Body and Soul", "1x Spell Slinger", "1x One-Handed Weapon Specialization", "1x Shattered Barrier", "1x Swift Strikes"], notes: ["Core mechanic of this builds is to increase amount of chance on hit procs due to this we use mutilate spam with fast daggers.", "Our frostbrand unlike flametongue don’t scale with weapon speed and it can proc from any physical attacks( melee swings or spells )  that why it makes this build possible.", "But honestly this build highly rely on random and sometimes it performs not that stable as for example nature hybrid build with flametongue, I wouldn't recommend this build to new players.", "Also it has very good potential as pve build with haste stacking.", "Full details: https://docs.google.com/document/d/1F15p2P5IkC4MpTJf7KEL50gLJC4tka0n8A263TFR2f8/edit#heading=h.2ayhnsg9z9en"], link: "https://project-ascension.com/development/builds#/talentsandabilities/editor/?hash=:17:78:100:324:403:408:527:642:691:1044:1120:1454:1490:1953:5171:6789:8033:18499:20164:68t3:71t1:75t3:87t1:565t5:574t1:607t3:616t3:788t1:901t1:1502t1:1686t3:1687t1:1691t5:1714t1:1719t1:1725t2:1757t1:1774t1:1825t3:1908t1:1926t1:2049t2:2055t3:2057t3:" },
    { name: "Holy Nova PVP", tags: ["dps", "pvp", "caster", "solo"], res: ["3x Searing Light", "3x Twin Disciplines", "3x Master Conjuror", "1x One-Handed Weapon Specialization", "1x Playing with Fire", "1x Kindred Spirits", "1x Holy Power", "1x Crusade", "1x Fel Synergy", "1x Body and Soul", "1x Divine Purpose", "1x Blessing of the Divines"], notes: ["We want Copious Power and Borrowed time buffs to be up as long as possible so after they fell from you, you can buff your pet and they will re-apply on you this way we get them 90% uptime.", "We want to buff ourselves with Beacon of Light for 25% healing increase because of healing pet with holy nova.", "Full deatils: https://docs.google.com/document/d/1N4CU8Gu8EhBYXxkhhOk4Bc6f0k7CcWNDaM_rn2upfWM/edit#heading=h.z5u9kabzzwgt"], link: "https://project-ascension.com/development/builds#/talentsandabilities/editor/?hash=:17:589:642:1044:1120:1243:1454:1490:1953:2362:2944:3034:7294:15237:18499:20217:22812:29166:52127:75t3:87t1:322t1:401t5:403t5:1202t5:1261t2:1263t3:1402t3:1672t1:1676t1:1687t1:1725t2:1729t1:1756t1:1757t1:1771t2:1772t3:1898t5:1910t1:1926t1:2049t2:2192t1:" }
];

//function calls
listGuides("none");

//functions
//display specific guide
function showGuide(nummer) {
    let guide = guides[nummer];
    let target = document.getElementById("guide_content");
    let html_guide_title = "<h3>" + guide.name + "</h3>";
    let html_guide_link = "<p><a href='" + guide.link + "' target='_blank'>Build-Link</a></p>";
    let showhide = "<div id='showhide' onclick='showEmbed();' style='width:100px; margin-left:auto; margin-right: auto; cursor:pointer;'>Show Talents</div>";
    let embed = "<p><embed id='embed' src='" + guide.link + "' width='100%' height='100%' style='display:none; object-position: 0px 200px'></p>";
    let html_guide_res = "<p><h5>RE's:</h5>";
    for (var i = 0; i < guide.res.length; i++) {
        html_guide_res += guide.res[i]+"<br>";
    }
    html_guide_res += "</p>";
    let html_guide_notes = "<p><h5>Notes:</h5>";
    for (var i = 0; i < guide.notes.length; i++) {
        html_guide_notes += guide.notes[i] + "<br>";
    }
    html_guide_notes += "</p>";
    target.innerHTML = "<div style='float:right;' onclick='listGuides();'>Back</div><br>"
    target.innerHTML += html_guide_title;
    target.innerHTML += html_guide_link;
    target.innerHTML += showhide;
    target.innerHTML += embed;
    target.innerHTML += html_guide_res;
    target.innerHTML += html_guide_notes;
    document.getElementById("guide_box").style.display = "none";
    document.getElementById("selectbox").style.display = "none";
    target.style.display = "";
}
//show guides
function listGuides(filter) {
    let target = document.getElementById("guide_box");
    document.getElementById("guide_content").style.display = "none";
    document.getElementById("guide_box").style.display = "";
    document.getElementById("selectbox").style.display = "";
    target.innerHTML = "";
    for (var i = 0; i < guides.length; i++) {
        if (guides[i].tags.includes(filter) || filter == "none" || filter == undefined) {
            tags = "";
            for (var v = 0; v < guides[i].tags.length; v++) {
                tags += guides[i].tags[v];
                if (v < guides[i].tags.length-1) tags += ", ";
            }

            target.innerHTML += "<div class='guide_block' onclick='showGuide(" + i + ");'>" + guides[i].name + " [" + tags + "] </div>";
        }
        else {
            if (filter == "all") {
                tags = "";
                for (var v = 0; v < guides[i].tags.length; v++) {
                    tags += guides[i].tags[v];
                    if (v < guides[i].tags.length - 1) tags += ", ";
                }
                target.innerHTML += "<div class='guide_block' onclick='showGuide(" + i + ");'>" + guides[i].name + " [" + tags + "] </div>";
            }
        }
    }
}

//filter displayed guides by tag
function filterGuides() {
    let filter = document.getElementById("selectbox").value;
    listGuides(filter);
}

function showEmbed() {
    
    let targetEmbed = document.getElementById("embed");
    console.log(targetEmbed.style.display);
    let button = document.getElementById("showhide");
    if (targetEmbed.style.display == "none") {
        targetEmbed.style.display = "";
        button.innerHTML = "Hide Talents";
    }
    else {
        targetEmbed.style.display = "none";
        button.innerHTML = "Show Talents";
    }
}