/* Miyabi Matcha — i18n (EN default · NL · JA · FR)
   sample by _ziyad._ @ code-caffeine

   Markup contract:
     data-i18n="key"        -> sets textContent
     data-i18n-html="key"   -> sets innerHTML (for copy with <em>/<strong>)
     data-i18n-aria="key"   -> sets aria-label
   English text stays in the HTML as the source of truth / no-JS fallback,
   so the EN dictionary only needs entries where useful. */

(function () {
  'use strict';

  const LANGS = {
    en: { label: 'English',  short: 'EN' },
    nl: { label: 'Nederlands', short: 'NL' },
    ja: { label: '日本語',     short: 'JA' },
    fr: { label: 'Français',  short: 'FR' }
  };
  const DEFAULT = 'en';
  const STORE_KEY = 'miyabi-lang';

  /* ---------------- Dictionary ---------------- */
  const T = {
    /* ---- shared: nav + footer ---- */
    'nav.home':   { en: 'Home',       nl: 'Home',       ja: 'ホーム',     fr: 'Accueil' },
    'nav.menu':   { en: 'Menu',       nl: 'Menu',       ja: 'メニュー',   fr: 'Carte' },
    'nav.matcha': { en: 'Our Matcha', nl: 'Onze Matcha',ja: '抹茶について',fr: 'Notre Matcha' },
    'nav.about':  { en: 'About',      nl: 'Over ons',   ja: '私たちについて', fr: 'À propos' },
    'nav.visit':  { en: 'Visit',      nl: 'Bezoek',     ja: 'アクセス',   fr: 'Visiter' },
    'nav.openMenu':   { en: 'Open menu',  nl: 'Menu openen', ja: 'メニューを開く', fr: 'Ouvrir le menu' },
    'nav.closeMenu':  { en: 'Close menu', nl: 'Menu sluiten', ja: 'メニューを閉じる', fr: 'Fermer le menu' },
    'nav.language':   { en: 'Language',   nl: 'Taal',     ja: '言語',       fr: 'Langue' },

    'footer.brandText': {
      en: 'Miyabi Matcha — bringing the authentic taste of Japan to your cup, from Paris to Amsterdam.',
      nl: 'Miyabi Matcha — de authentieke smaak van Japan in jouw kopje, van Parijs tot Amsterdam.',
      ja: 'Miyabi Matcha — 本場日本の味わいを一杯に。パリからアムステルダムへ。',
      fr: 'Miyabi Matcha — le goût authentique du Japon dans votre tasse, de Paris à Amsterdam.'
    },
    'footer.explore':   { en: 'Explore', nl: 'Ontdek',  ja: 'メニュー一覧', fr: 'Explorer' },
    'footer.visit':     { en: 'Visit',   nl: 'Bezoek',  ja: 'アクセス',  fr: 'Visiter' },
    'footer.hours':     { en: 'Daily · 10:00 – 22:00', nl: 'Dagelijks · 10:00 – 22:00', ja: '毎日 · 10:00 – 22:00', fr: 'Tous les jours · 10:00 – 22:00' },
    'footer.rights':    { en: '© <span id="year">2026</span> Miyabi Matcha Amsterdam. All rights reserved.',
                          nl: '© <span id="year">2026</span> Miyabi Matcha Amsterdam. Alle rechten voorbehouden.',
                          ja: '© <span id="year">2026</span> Miyabi Matcha Amsterdam. 無断転載を禁じます。',
                          fr: '© <span id="year">2026</span> Miyabi Matcha Amsterdam. Tous droits réservés.' },

    /* ---- index: hero ---- */
    'hero.h1': {
      en: 'Bringing the authentic taste of <em>Japan</em> to your cup.',
      nl: 'De authentieke smaak van <em>Japan</em> in jouw kopje.',
      ja: '本場<em>日本</em>の味わいを、あなたの一杯に。',
      fr: 'Le goût authentique du <em>Japon</em> dans votre tasse.'
    },
    'hero.sub': {
      en: 'Carefully sourced from trusted tea farms in Japan and served fresh in the heart of Amsterdam.',
      nl: 'Zorgvuldig geselecteerd bij vertrouwde theeboerderijen in Japan en vers geserveerd in het hart van Amsterdam.',
      ja: '日本の信頼できる茶園から厳選し、アムステルダムの中心で淹れたてをお届けします。',
      fr: 'Soigneusement sélectionné auprès de fermes de thé de confiance au Japon et servi frais au cœur d’Amsterdam.'
    },
    'hero.viewMenu': { en: 'View the Menu', nl: 'Bekijk de Menukaart', ja: 'メニューを見る', fr: 'Voir la Carte' },
    'hero.findUs':   { en: 'Find Us', nl: 'Vind ons', ja: 'アクセス', fr: 'Nous trouver' },
    'hero.scroll':   { en: 'Scroll', nl: 'Scroll', ja: 'スクロール', fr: 'Défiler' },

    /* ---- index: intro ---- */
    'intro.eyebrow': { en: 'From Japan, with care', nl: 'Uit Japan, met zorg', ja: '日本から、真心を込めて', fr: 'Du Japon, avec soin' },
    'intro.h2': {
      en: 'The essence of matcha, brought to Europe.',
      nl: 'De essentie van matcha, naar Europa gebracht.',
      ja: '抹茶の本質を、ヨーロッパへ。',
      fr: 'L’essence du matcha, apportée en Europe.'
    },
    'intro.lead': {
      en: 'Our matcha is carefully sourced from trusted tea farms in Japan and delivered to matcha lovers across Europe. Born in Paris, now pouring in Amsterdam.',
      nl: 'Onze matcha wordt zorgvuldig geselecteerd bij vertrouwde theeboerderijen in Japan en geleverd aan matchaliefhebbers in heel Europa. Geboren in Parijs, nu geschonken in Amsterdam.',
      ja: '当店の抹茶は日本の信頼できる茶園から厳選し、ヨーロッパ中の抹茶ファンへお届けしています。パリで生まれ、今アムステルダムで。',
      fr: 'Notre matcha est soigneusement sélectionné auprès de fermes de thé de confiance au Japon et livré aux amateurs de matcha de toute l’Europe. Né à Paris, désormais servi à Amsterdam.'
    },

    /* ---- index: reviews ---- */
    'rev.1': { en: '“The best matcha I’ve had outside of Japan — smooth, vivid and never bitter.”',
               nl: '“De beste matcha buiten Japan — zacht, levendig en nooit bitter.”',
               ja: '「日本以外で味わった中で最高の抹茶。まろやかで鮮やか、苦味は一切なし。」',
               fr: '“Le meilleur matcha hors du Japon — doux, vif et jamais amer.”' },
    'rev.2': { en: '“A little pocket of calm on the Zeedijk. The ceremonial bowl is the real deal.”',
               nl: '“Een klein oase van rust aan de Zeedijk. De ceremoniële kom is het echte werk.”',
               ja: '「ゼーダイクにある小さな安らぎの場所。本格的な茶碗は本物です。」',
               fr: '“Une petite bulle de calme sur le Zeedijk. Le bol cérémonial est authentique.”' },
    'rev.3': { en: '“Their strawberry matcha is unreal. I come back every single week.”',
               nl: '“Hun aardbeienmatcha is ongelofelijk. Ik kom elke week terug.”',
               ja: '「ここのストロベリー抹茶は最高。毎週通っています。」',
               fr: '“Leur matcha à la fraise est incroyable. J’y retourne chaque semaine.”' },
    'rev.4': { en: '“You can taste the quality — clearly sourced with real care.”',
               nl: '“Je proeft de kwaliteit — duidelijk met echte zorg geselecteerd.”',
               ja: '「品質が味で分かります。本当に丁寧に選ばれています。」',
               fr: '“On goûte la qualité — visiblement sélectionné avec un vrai soin.”' },
    'rev.5': { en: '“Beautiful space, beautiful tea. The brown sugar matcha is my new addiction.”',
               nl: '“Prachtige ruimte, prachtige thee. De bruine suiker matcha is mijn nieuwe verslaving.”',
               ja: '「美しい空間、美しいお茶。黒糖抹茶にすっかりハマっています。」',
               fr: '“Bel espace, beau thé. Le matcha au sucre brun est ma nouvelle addiction.”' },
    'rev.6': { en: '“Finally, authentic matcha in Amsterdam. Felt like Kyoto for a moment.”',
               nl: '“Eindelijk authentieke matcha in Amsterdam. Heel even leek het Kyoto.”',
               ja: '「ついにアムステルダムで本格的な抹茶に出会えました。一瞬、京都にいるよう。」',
               fr: '“Enfin du matcha authentique à Amsterdam. On se serait cru à Kyoto un instant.”' },
    'rev.7': { en: '“The staff are lovely and clearly passionate about what they pour.”',
               nl: '“Het personeel is hartelijk en duidelijk gepassioneerd over wat ze schenken.”',
               ja: '「スタッフは温かく、淹れる一杯への情熱が伝わってきます。」',
               fr: '“Le personnel est adorable et visiblement passionné par ce qu’il sert.”' },
    'rev.8': { en: '“The hojicha latte is warm, nutty perfection on a grey day.”',
               nl: '“De hojicha latte is warme, nootachtige perfectie op een grijze dag.”',
               ja: '「ほうじ茶ラテは、曇りの日にぴったりの香ばしく温かな一杯。」',
               fr: '“Le latte hojicha, chaud et noisetté, est parfait par temps gris.”' },
    'rev.9': { en: '“From Paris to Amsterdam — so glad they made the move. Magnifique.”',
               nl: '“Van Parijs naar Amsterdam — zo blij dat ze de stap hebben gezet. Magnifique.”',
               ja: '「パリからアムステルダムへ。来てくれて本当に嬉しい。マニフィック。」',
               fr: '“De Paris à Amsterdam — si heureux qu’ils aient franchi le pas. Magnifique.”' },
    'rev.10': { en: '“Every cup feels a little more special. Exactly as they promise.”',
                nl: '“Elk kopje voelt net iets specialer. Precies zoals beloofd.”',
                ja: '「一杯ごとに少し特別な気分に。まさに約束どおりです。」',
                fr: '“Chaque tasse semble un peu plus spéciale. Exactement comme promis.”' },
    'rev.label': { en: 'Customer reviews', nl: 'Klantbeoordelingen', ja: 'お客様の声', fr: 'Avis clients' },

    /* ---- index: featured ---- */
    'feat.tag':  { en: 'Featured', nl: 'Uitgelicht', ja: 'おすすめ', fr: 'À la une' },
    'feat.num':  { en: 'From the bar', nl: 'Van de bar', ja: 'バーより', fr: 'Du comptoir' },
    'feat.h2':   { en: 'A few of our favourites', nl: 'Enkele van onze favorieten', ja: '私たちのお気に入り', fr: 'Quelques-uns de nos favoris' },
    'feat.p1': {
      en: 'Whisked fresh to order from the same ceremonial-grade leaves we source in Japan — from a pure bowl of matcha to our beloved iced lattes.',
      nl: 'Vers geklopt op bestelling van dezelfde ceremoniële bladeren die we in Japan selecteren — van een pure kom matcha tot onze geliefde ijslattes.',
      ja: '日本から仕入れる同じ茶葉を使い、ご注文ごとに点てます。純粋な一碗の抹茶から人気のアイスラテまで。',
      fr: 'Fouetté à la commande à partir des mêmes feuilles de qualité cérémoniale que nous sélectionnons au Japon — d’un bol de matcha pur à nos lattes glacés adorés.'
    },
    'feat.p2': {
      en: 'There’s a whole menu waiting: matcha, hojicha, coffee, cloud & cream drinks, fruit teas and crêpes.',
      nl: 'Er wacht een hele kaart: matcha, hojicha, koffie, cloud- & creamdranken, fruitthee en crêpes.',
      ja: 'メニューは充実。抹茶、ほうじ茶、コーヒー、クラウド＆クリームドリンク、フルーツティー、クレープまで。',
      fr: 'Toute une carte vous attend : matcha, hojicha, café, boissons cloud & cream, thés aux fruits et crêpes.'
    },
    'feat.cta':  { en: 'View the full menu', nl: 'Bekijk de hele kaart', ja: '全メニューを見る', fr: 'Voir toute la carte' },

    /* ---- index: chinatown ---- */
    'cn.num': { en: 'Now open', nl: 'Nu open', ja: 'オープン', fr: 'Désormais ouvert' },
    'cn.h2':  { en: 'Find us in Chinatown', nl: 'Vind ons in Chinatown', ja: 'チャイナタウンにて', fr: 'Retrouvez-nous à Chinatown' },
    'cn.p1': {
      en: 'Located in Chinatown, <strong>Miyabi Matcha from Paris</strong> is now here in Amsterdam. Step in from the Zeedijk for a freshly whisked bowl, an iced latte, or a moment of calm.',
      nl: 'Gevestigd in Chinatown is <strong>Miyabi Matcha uit Parijs</strong> nu hier in Amsterdam. Loop binnen vanaf de Zeedijk voor een versgeklopte kom, een ijslatte of een moment van rust.',
      ja: 'チャイナタウンに位置する<strong>パリ発の Miyabi Matcha</strong> がアムステルダムにオープン。ゼーダイクから一歩入れば、点てたての一碗、アイスラテ、そして静かなひとときを。',
      fr: 'Situé à Chinatown, <strong>Miyabi Matcha de Paris</strong> est désormais à Amsterdam. Entrez depuis le Zeedijk pour un bol fraîchement fouetté, un latte glacé ou un moment de calme.'
    },
    'cn.hours': { en: 'Open daily · 10:00 – 22:00', nl: 'Dagelijks open · 10:00 – 22:00', ja: '毎日営業 · 10:00 – 22:00', fr: 'Ouvert tous les jours · 10:00 – 22:00' },
    'cn.cta':   { en: 'Plan your visit', nl: 'Plan je bezoek', ja: 'ご来店の計画', fr: 'Planifier votre visite' },

    /* ---- index: philosophy ---- */
    'phil.eyebrow': { en: '雅 · Miyabi — elegance', nl: '雅 · Miyabi — elegantie', ja: '雅 · みやび — 上品さ', fr: '雅 · Miyabi — élégance' },
    'phil.quote': {
      en: '“We cherish the beauty that lives in quiet moments.”',
      nl: '“Wij koesteren de schoonheid die in stille momenten leeft.”',
      ja: '「静かな瞬間に宿る美しさを大切にします。」',
      fr: '“Nous chérissons la beauté qui vit dans les instants paisibles.”'
    },
    'phil.body': {
      en: 'Our tea is more than a drink — it’s a moment to restore the mind and spirit. In the rush of everyday life, we offer a quiet pause, a gentle breath.',
      nl: 'Onze thee is meer dan een drankje — het is een moment om geest en ziel te herstellen. In de drukte van alledag bieden wij een stille pauze, een zachte ademhaling.',
      ja: '私たちのお茶は単なる飲み物ではなく、心と精神を整えるひととき。慌ただしい日常の中に、静かな間（ま）とやさしい呼吸を。',
      fr: 'Notre thé est plus qu’une boisson — c’est un moment pour restaurer l’esprit. Dans l’agitation du quotidien, nous offrons une pause paisible, une douce respiration.'
    },
    'phil.cta': { en: 'Our story', nl: 'Ons verhaal', ja: '私たちの物語', fr: 'Notre histoire' },

    /* ---- index: diy ---- */
    'diy.eyebrow': { en: 'Do it yourself?', nl: 'Zelf maken?', ja: 'おうちで？', fr: 'À faire soi-même ?' },
    'diy.h2':      { en: 'Make Miyabi at home', nl: 'Maak Miyabi thuis', ja: 'おうちで Miyabi を', fr: 'Préparez Miyabi chez vous' },
    'diy.lead':    { en: 'Take home the same ceremonial matcha we whisk in store.', nl: 'Neem dezelfde ceremoniële matcha mee die wij in de winkel kloppen.', ja: '店舗で点てるのと同じ抹茶をご自宅へ。', fr: 'Emportez le même matcha cérémonial que nous fouettons en boutique.' },
    'diy.cta':     { en: 'Our matcha', nl: 'Onze matcha', ja: '抹茶について', fr: 'Notre matcha' },

    /* ---- index: visit ---- */
    'visit.eyebrow': { en: 'Visit us', nl: 'Bezoek ons', ja: 'ご来店', fr: 'Visitez-nous' },
    'visit.h2':      { en: 'Find us on the Zeedijk', nl: 'Vind ons aan de Zeedijk', ja: 'ゼーダイクにて', fr: 'Retrouvez-nous sur le Zeedijk' },
    'visit.openLabel': { en: 'Open daily', nl: 'Dagelijks open', ja: '毎日営業', fr: 'Ouvert tous les jours' },
    'visit.helloLabel':{ en: 'Say hello', nl: 'Zeg hallo', ja: 'お問い合わせ', fr: 'Dites bonjour' },
    'visit.directions':{ en: '◹ Directions', nl: '◹ Routebeschrijving', ja: '◹ 道順', fr: '◹ Itinéraire' },

    /* ---- menu page ---- */
    'menu.eyebrow': { en: 'Café · Zeedijk 127', nl: 'Café · Zeedijk 127', ja: 'カフェ · Zeedijk 127', fr: 'Café · Zeedijk 127' },
    'menu.h1':      { en: 'The Menu', nl: 'De Menukaart', ja: 'メニュー', fr: 'La Carte' },
    'menu.lead':    { en: 'Whisked fresh to order. Every cup begins with the same ceremonial-grade matcha we source from Japan.',
                      nl: 'Vers geklopt op bestelling. Elk kopje begint met dezelfde ceremoniële matcha die we uit Japan halen.',
                      ja: 'ご注文ごとに点てます。すべての一杯は、日本から仕入れる同じ抹茶から始まります。',
                      fr: 'Fouetté à la commande. Chaque tasse commence avec le même matcha de qualité cérémoniale venu du Japon.' },
    'menu.tea':    { en: 'Tea', nl: 'Thee', ja: 'お茶', fr: 'Thé' },
    'menu.coffee': { en: 'Coffee', nl: 'Koffie', ja: 'コーヒー', fr: 'Café' },
    'menu.cloud':  { en: 'Cloud', nl: 'Cloud', ja: 'クラウド', fr: 'Cloud' },
    'menu.cream':  { en: 'Cream', nl: 'Cream', ja: 'クリーム', fr: 'Cream' },
    'menu.fruits': { en: 'Fruits', nl: 'Fruit', ja: 'フルーツ', fr: 'Fruits' },
    'menu.crepe':  { en: 'Crêpe', nl: 'Crêpe', ja: 'クレープ', fr: 'Crêpe' },
    'menu.pure':       { en: 'Pure', nl: 'Puur', ja: 'ピュア', fr: 'Pur' },
    'menu.pureDesc':   { en: 'Matcha · Hojicha · Genmaicha — whisked, nothing added.',
                         nl: 'Matcha · Hojicha · Genmaicha — geklopt, niets toegevoegd.',
                         ja: '抹茶 · ほうじ茶 · 玄米茶 — 点てたて、何も加えず。',
                         fr: 'Matcha · Hojicha · Genmaicha — fouetté, rien ajouté.' },
    'menu.latteDesc':  { en: 'Matcha · Hojicha · Genmaicha, hot or iced.',
                         nl: 'Matcha · Hojicha · Genmaicha, warm of ijskoud.',
                         ja: '抹茶 · ほうじ茶 · 玄米茶、ホットまたはアイス。',
                         fr: 'Matcha · Hojicha · Genmaicha, chaud ou glacé.' },
    'menu.brownDesc':  { en: 'Matcha · Hojicha · Genmaicha with caramelised brown sugar.',
                         nl: 'Matcha · Hojicha · Genmaicha met gekarameliseerde bruine suiker.',
                         ja: '抹茶 · ほうじ茶 · 玄米茶、キャラメル黒糖入り。',
                         fr: 'Matcha · Hojicha · Genmaicha au sucre brun caramélisé.' },
    'menu.earlDesc':   { en: 'Matcha · Hojicha · Genmaicha, infused with bergamot.',
                         nl: 'Matcha · Hojicha · Genmaicha, op smaak met bergamot.',
                         ja: '抹茶 · ほうじ茶 · 玄米茶、ベルガモットの香り。',
                         fr: 'Matcha · Hojicha · Genmaicha, infusé à la bergamote.' },
    'menu.cloudMatchaDesc': { en: 'Airy whipped cloud over a matcha base.', nl: 'Luchtige opgeklopte cloud op een matchabasis.', ja: '抹茶ベースにふんわりホイップのクラウド。', fr: 'Nuage fouetté aérien sur une base de matcha.' },
    'menu.cloudSesameDesc': { en: 'Nutty, toasty black sesame under a soft cloud.', nl: 'Nootachtige, geroosterde zwarte sesam onder een zachte cloud.', ja: '香ばしい黒ごまをやわらかなクラウドで。', fr: 'Sésame noir grillé et noisetté sous un nuage moelleux.' },
    'menu.creamStrawDesc':  { en: 'Fresh strawberry, milk and matcha — our most-loved cup.', nl: 'Verse aardbei, melk en matcha — ons meest geliefde kopje.', ja: 'フレッシュいちご、ミルク、抹茶 — 一番人気の一杯。', fr: 'Fraise fraîche, lait et matcha — notre tasse la plus aimée.' },
    'menu.note': { en: 'Oat, soy & coconut milk available · Prices include VAT · Menu may vary with the season.',
                   nl: 'Haver-, soja- & kokosmelk beschikbaar · Prijzen incl. btw · Menu kan per seizoen variëren.',
                   ja: 'オーツ・ソイ・ココナッツミルク対応 · 価格は税込 · メニューは季節により変わる場合があります。',
                   fr: 'Lait d’avoine, de soja & de coco disponibles · Prix TTC · La carte peut varier selon la saison.' },
    'tag.bestseller': { en: 'Bestseller', nl: 'Bestseller', ja: '人気No.1', fr: 'Best-seller' },
    'tag.signature':  { en: 'Signature', nl: 'Specialiteit', ja: '看板メニュー', fr: 'Signature' },

    'menu.cta.eyebrow': { en: 'Prefer to brew your own?', nl: 'Liever zelf zetten?', ja: 'ご自宅で淹れたい方へ', fr: 'Vous préférez préparer le vôtre ?' },
    'menu.cta.h2':      { en: 'Take Miyabi matcha home', nl: 'Neem Miyabi matcha mee naar huis', ja: 'Miyabi の抹茶をおうちへ', fr: 'Emportez le matcha Miyabi chez vous' },
    'menu.cta.btn':     { en: 'Our matcha', nl: 'Onze matcha', ja: '抹茶について', fr: 'Notre matcha' },

    /* ---- matcha page ---- */
    'mat.eyebrow': { en: 'Our Matcha', nl: 'Onze Matcha', ja: '抹茶について', fr: 'Notre Matcha' },
    'mat.h1':      { en: 'Single origin, sourced with care', nl: 'Single origin, met zorg geselecteerd', ja: 'シングルオリジン、丁寧に厳選', fr: 'Origine unique, sélectionné avec soin' },
    'mat.num':     { en: 'From Japan', nl: 'Uit Japan', ja: '日本から', fr: 'Du Japon' },
    'mat.h2':      { en: 'What makes it special', nl: 'Wat het bijzonder maakt', ja: '特別な理由', fr: 'Ce qui le rend spécial' },
    'mat.p1': {
      en: 'Our matcha comes from trusted farms in Japan — shade-grown for weeks before harvest, then stone-milled into a fine, vivid powder. The result is smooth, naturally sweet and never bitter.',
      nl: 'Onze matcha komt van vertrouwde boerderijen in Japan — wekenlang in de schaduw gekweekt vóór de oogst en daarna steengemalen tot een fijn, levendig poeder. Het resultaat is zacht, van nature zoet en nooit bitter.',
      ja: '当店の抹茶は日本の信頼できる農園から。収穫前に数週間覆い下で育て、石臼で鮮やかな微粉に挽きます。まろやかで自然な甘み、苦味はありません。',
      fr: 'Notre matcha provient de fermes de confiance au Japon — cultivé à l’ombre pendant des semaines avant la récolte, puis moulu à la pierre en une poudre fine et vive. Le résultat est doux, naturellement sucré et jamais amer.'
    },
    'mat.p2': {
      en: 'It’s the same matcha we whisk at the bar, and it’s what makes your daily cup feel a little more special.',
      nl: 'Het is dezelfde matcha die we aan de bar kloppen, en die jouw dagelijkse kopje net iets specialer maakt.',
      ja: 'バーで点てるのと同じ抹茶。毎日の一杯を少し特別にしてくれます。',
      fr: 'C’est le même matcha que nous fouettons au comptoir, et c’est ce qui rend votre tasse quotidienne un peu plus spéciale.'
    },
    'mat.diy':     { en: 'Do it yourself?', nl: 'Zelf maken?', ja: 'おうちで？', fr: 'À faire soi-même ?' },
    'mat.prodH3':  { en: 'Miyabi Ceremonial Matcha', nl: 'Miyabi Ceremoniële Matcha', ja: 'Miyabi 抹茶（セレモニアル）', fr: 'Matcha Cérémonial Miyabi' },
    'mat.price':   { en: '€28 · 30g tin', nl: '€28 · blik van 30 g', ja: '€28 · 30g 缶', fr: '€28 · boîte de 30 g' },
    'mat.prodP': {
      en: 'Want to try our matcha at home? Take home our ceremonial-grade tin — enough for roughly 15 bowls of the good stuff.',
      nl: 'Wil je onze matcha thuis proberen? Neem ons ceremoniële blik mee — genoeg voor zo’n 15 kommen van het goede spul.',
      ja: 'おうちで試したい方へ。セレモニアルグレードの缶をどうぞ。約15杯分の本格抹茶です。',
      fr: 'Envie d’essayer notre matcha chez vous ? Emportez notre boîte de qualité cérémoniale — de quoi préparer environ 15 bols du bon.'
    },
    'mat.getYours':{ en: 'Get yours', nl: 'Haal de jouwe', ja: '購入する', fr: 'Obtenez le vôtre' },
    'mat.note': {
      en: 'Available at our Zeedijk café · Online ordering coming soon — follow us for the launch.',
      nl: 'Verkrijgbaar in ons café aan de Zeedijk · Online bestellen komt eraan — volg ons voor de lancering.',
      ja: 'ゼーダイクのカフェで販売中 · オンライン注文は近日開始 — 最新情報はSNSで。',
      fr: 'Disponible à notre café du Zeedijk · Commande en ligne bientôt — suivez-nous pour le lancement.'
    },

    /* ---- about page ---- */
    'ab.eyebrow': { en: '雅 · Miyabi', nl: '雅 · Miyabi', ja: '雅 · みやび', fr: '雅 · Miyabi' },
    'ab.h1':      { en: 'Our Story', nl: 'Ons Verhaal', ja: '私たちの物語', fr: 'Notre Histoire' },
    'ab.lead':    { en: 'Rooted in Japanese tradition and attuned to modern life.', nl: 'Geworteld in de Japanse traditie en afgestemd op het moderne leven.', ja: '日本の伝統に根ざし、現代の暮らしに寄り添って。', fr: 'Ancré dans la tradition japonaise et en phase avec la vie moderne.' },
    'ab.quote':   { en: 'We cherish the beauty that lives in quiet moments.', nl: 'Wij koesteren de schoonheid die in stille momenten leeft.', ja: '静かな瞬間に宿る美しさを大切にします。', fr: 'Nous chérissons la beauté qui vit dans les instants paisibles.' },
    'ab.farmEyebrow': { en: 'From farm to cup', nl: 'Van boerderij tot kopje', ja: '農園から一杯まで', fr: 'De la ferme à la tasse' },
    'ab.farmH2':  { en: 'A connection across continents', nl: 'Een verbinding over continenten', ja: '大陸を越えたつながり', fr: 'Un lien entre les continents' },
    'ab.farmP1': {
      en: 'Our tea is more than a drink — it’s a moment to restore the mind and spirit. In the rush of everyday life, we offer a quiet pause, a gentle breath.',
      nl: 'Onze thee is meer dan een drankje — het is een moment om geest en ziel te herstellen. In de drukte van alledag bieden wij een stille pauze, een zachte ademhaling.',
      ja: '私たちのお茶は単なる飲み物ではなく、心と精神を整えるひととき。慌ただしい日常の中に、静かな間とやさしい呼吸を。',
      fr: 'Notre thé est plus qu’une boisson — c’est un moment pour restaurer l’esprit. Dans l’agitation du quotidien, nous offrons une pause paisible, une douce respiration.'
    },
    'ab.farmP2': {
      en: 'Our hope is to create meaningful connections between Japanese tea artisans and Europe: honouring the people and the place behind every harvest, and carrying their craft to a new table here in Amsterdam.',
      nl: 'Onze hoop is om betekenisvolle verbindingen te scheppen tussen Japanse thee-ambachtslieden en Europa: eer betuigen aan de mensen en de plek achter elke oogst, en hun vakmanschap naar een nieuwe tafel hier in Amsterdam brengen.',
      ja: '日本の茶職人とヨーロッパの間に意味あるつながりを。一つひとつの収穫の背景にある人と土地に敬意を払い、その手仕事をここアムステルダムの新しい食卓へ。',
      fr: 'Notre espoir est de créer des liens forts entre les artisans du thé japonais et l’Europe : honorer les gens et le lieu derrière chaque récolte, et porter leur savoir-faire à une nouvelle table ici à Amsterdam.'
    },
    'ab.v1Title': { en: 'Stillness', nl: 'Stilte', ja: '静寂', fr: 'Quiétude' },
    'ab.v1Desc':  { en: 'A quiet pause in the middle of a busy day — that is what a bowl of matcha offers.', nl: 'Een stille pauze midden in een drukke dag — dat is wat een kom matcha biedt.', ja: '忙しい一日の中の静かな間（ま）。それが一碗の抹茶がもたらすもの。', fr: 'Une pause paisible au milieu d’une journée chargée — voilà ce qu’offre un bol de matcha.' },
    'ab.v2Title': { en: 'Authenticity', nl: 'Authenticiteit', ja: '本物', fr: 'Authenticité' },
    'ab.v2Desc':  { en: 'Sourced directly from trusted Japanese farms — real leaves, real tradition.', nl: 'Rechtstreeks van vertrouwde Japanse boerderijen — echte bladeren, echte traditie.', ja: '信頼できる日本の農園から直接。本物の茶葉、本物の伝統。', fr: 'Sélectionné directement auprès de fermes japonaises de confiance — de vraies feuilles, une vraie tradition.' },
    'ab.v3Title': { en: 'Connection', nl: 'Verbinding', ja: 'つながり', fr: 'Connexion' },
    'ab.v3Desc':  { en: 'Bridging Japanese tea artisans and Europe, one cup at a time.', nl: 'Een brug tussen Japanse thee-ambachtslieden en Europa, kopje voor kopje.', ja: '日本の茶職人とヨーロッパを、一杯ずつ結びます。', fr: 'Reliant les artisans du thé japonais et l’Europe, une tasse à la fois.' },
    'ab.jEyebrow':{ en: 'Paris → Amsterdam', nl: 'Parijs → Amsterdam', ja: 'パリ → アムステルダム', fr: 'Paris → Amsterdam' },
    'ab.jH2':     { en: 'Now pouring on the Zeedijk', nl: 'Nu geschonken aan de Zeedijk', ja: 'ゼーダイクにて営業中', fr: 'Désormais servi sur le Zeedijk' },
    'ab.jP': {
      en: 'Born in Paris, Miyabi Matcha has found a new home in Amsterdam’s Chinatown. Step in from the Zeedijk for a freshly whisked bowl and a gentle moment of calm.',
      nl: 'Geboren in Parijs heeft Miyabi Matcha een nieuw thuis gevonden in de Chinatown van Amsterdam. Loop binnen vanaf de Zeedijk voor een versgeklopte kom en een rustig moment.',
      ja: 'パリで生まれた Miyabi Matcha は、アムステルダムのチャイナタウンに新たな拠点を構えました。ゼーダイクから一歩入り、点てたての一碗と穏やかなひとときを。',
      fr: 'Né à Paris, Miyabi Matcha a trouvé un nouveau foyer dans le quartier chinois d’Amsterdam. Entrez depuis le Zeedijk pour un bol fraîchement fouetté et un doux moment de calme.'
    },
    'ab.jCta':    { en: 'Come visit', nl: 'Kom langs', ja: 'ご来店ください', fr: 'Venez nous voir' }
  };

  /* ---------------- Engine ---------------- */
  function pick(key, lang) {
    const entry = T[key];
    if (!entry) return null;
    return entry[lang] != null ? entry[lang] : entry[DEFAULT];
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const v = pick(el.getAttribute('data-i18n'), lang);
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const v = pick(el.getAttribute('data-i18n-html'), lang);
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const v = pick(el.getAttribute('data-i18n-aria'), lang);
      if (v != null) el.setAttribute('aria-label', v);
    });
    // footer year (may have been re-rendered via innerHTML)
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
    // reflect current selection in the switcher UI
    document.querySelectorAll('[data-lang-current]').forEach((el) => {
      el.textContent = LANGS[lang] ? LANGS[lang].short : lang.toUpperCase();
    });
    document.querySelectorAll('[data-lang-option]').forEach((el) => {
      const on = el.getAttribute('data-lang-option') === lang;
      el.setAttribute('aria-pressed', on ? 'true' : 'false');
      el.classList.toggle('is-active', on);
    });
  }

  function getInitial() {
    let saved = null;
    try { saved = localStorage.getItem(STORE_KEY); } catch (e) {}
    if (saved && LANGS[saved]) return saved;
    return DEFAULT; // default English regardless of browser
  }

  function setLang(lang, persist) {
    if (!LANGS[lang]) lang = DEFAULT;
    if (persist !== false) { try { localStorage.setItem(STORE_KEY, lang); } catch (e) {} }
    apply(lang);
    window.MiyabiLang = lang;
  }

  // expose
  window.MiyabiI18N = { setLang: setLang, langs: LANGS, current: function () { return window.MiyabiLang || DEFAULT; } };

  // apply as early as possible
  setLang(getInitial(), false);
  document.addEventListener('DOMContentLoaded', function () {
    setLang(window.MiyabiLang || getInitial(), false);
    // delegate clicks on any language option button
    document.addEventListener('click', function (ev) {
      const btn = ev.target.closest('[data-lang-option]');
      if (!btn) return;
      ev.preventDefault();
      setLang(btn.getAttribute('data-lang-option'), true);
    });
  });
})();
