// 2026-09-05 23:46 変更済み
(function(){
  const IS_STAFF=/staff\.html(?:$|\?)/.test(location.pathname) || /管理画面/.test(document.title);
  const CUSTOMER_STYLE=`
  .cat-tabs{gap:8px !important;touch-action:pan-x;scroll-snap-type:x proximity}
  .cat-tab{border-radius:999px !important;padding:8px 14px !important;transition:background .2s,border-color .2s,color .2s,transform .12s,box-shadow .2s;box-shadow:0 1px 4px rgba(43,36,29,.04);scroll-snap-align:start}
  .cat-tab:active{transform:scale(.98)}
  .cat-tab[data-zone="lunch"]{border-color:#e8b55c !important;color:#8e5a00 !important;background:#fffaf1 !important}
  .cat-tab[data-zone="dinner"]{border-color:#d9a29d !important;color:#8b2d22 !important;background:#fff7f6 !important}
  .cat-tab[data-zone="regular"]{border-color:#d8c6a8 !important;color:#594c3e !important;background:#fffdf8 !important}
  .cat-tab.active[data-zone="lunch"]{background:#be7c14 !important;color:#fff !important;border-color:#be7c14 !important;box-shadow:0 5px 14px rgba(190,124,20,.18)}
  .cat-tab.active[data-zone="dinner"]{background:#a8362b !important;color:#fff !important;border-color:#a8362b !important;box-shadow:0 5px 14px rgba(168,54,43,.18)}
  .cat-tab.active[data-zone="regular"]{background:#2B241D !important;color:#fff !important;border-color:#2B241D !important;box-shadow:0 5px 14px rgba(43,36,29,.16)}
  .item-badges{display:flex;gap:6px;flex-wrap:wrap;margin:2px 0 7px}
  .item-badge{display:inline-flex;align-items:center;padding:2px 8px;border-radius:999px;font-size:10.5px;font-weight:700;line-height:1.4;background:#fff8e8;border:1px solid #ead1a0;color:#865400}
  .item-badge.alt{background:#fff4f1;border-color:#e6b7af;color:#8d3025}
  .item-badge.soft{background:#f6f1e6;border-color:#ddd1ba;color:#6b5e4f}
  .add-option-btn{display:flex !important;flex-direction:column;align-items:center;justify-content:center;gap:2px}
  .option-button-label{font-size:12px;line-height:1.2}
  .option-guide{font-size:12px;line-height:1.6;color:#6B6053;background:#FAF3E7;border:1px dashed #DCD0B6;padding:10px 12px;border-radius:8px;margin-bottom:14px}
  .option-strong-sep{margin-top:2px;font-size:11px;color:#A8362B}
  `;
  const STAFF_STYLE=`
  .x-cat-meta{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:8px 0 10px}
  .x-cat-meta label,.x-extra-panel label{display:block;font-size:11px;color:#6B6053;margin-bottom:4px}
  .x-cat-meta select,.x-extra-panel input[type=text],.x-extra-panel textarea{width:100%;border:1px solid #DCD0B6;border-radius:4px;padding:8px;font-size:13px;background:#FFFDF8}
  .x-extra-panel{grid-column:1 / -1;border:1px dashed #DCD0B6;background:#fffdf8;padding:10px;border-radius:6px;margin-top:8px}
  .x-extra-grid{display:grid;grid-template-columns:110px 1fr;gap:12px;align-items:start}
  .x-preview{width:110px;height:82px;object-fit:cover;border-radius:6px;border:1px solid #DCD0B6;background:#FAF3E7}
  .x-upload-btn{display:block;margin-top:8px;font-size:12px;background:#F1E7D3;padding:8px 10px;border-radius:4px;text-align:center;cursor:pointer}
  .x-upload-btn input{display:none}.x-delete-photo{width:100%;margin-top:6px;border:1px solid #d6a29c;background:#fff5f3;color:#8b2d22;padding:7px 8px;border-radius:4px;font-size:12px;font-weight:700}
  .x-extra-fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
  .x-full{grid-column:1 / -1}
  .x-help{font-size:11px;color:#6B6053;line-height:1.5;margin-top:4px}
  @media(max-width:760px){.x-cat-meta,.x-extra-fields{grid-template-columns:1fr}.x-extra-grid{grid-template-columns:1fr}.x-preview{width:100%;height:180px}}
  `;

  function injectStyle(css,id){
    if(document.getElementById(id)) return;
    const s=document.createElement('style');
    s.id=id; s.textContent=css; document.head.appendChild(s);
  }

  function ready(fn){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fn,{once:true}); else fn(); }

  ready(()=>{
    if(IS_STAFF){ injectStyle(STAFF_STYLE,'v4-staff-style'); initStaffEnhancer(); }
    else { injectStyle(CUSTOMER_STYLE,'v4-customer-style'); }
  });

  // ================= CUSTOMER =================
  function initCustomerEnhancer(){
    let observerSet=false;
    const mo=new MutationObserver(()=>{ enhanceCustomer(); if(!observerSet){ setupSectionObserver(); observerSet=true; } });
    mo.observe(document.body,{childList:true,subtree:true});
    enhanceCustomer();
    setTimeout(setupSectionObserver,900);
  }

  function zoneFromText(text){
    if(/^昼・/.test(text) || /昼限定/.test(text)) return 'lunch';
    if(/^夜・/.test(text) || /夜限定/.test(text)) return 'dinner';
    return 'regular';
  }
  function sectionType(text){
    if(/セット/.test(text)) return 'セット';
    if(/定食/.test(text)) return '定食';
    if(/麺/.test(text)) return '麺類';
    if(/飯|丼|炒飯/.test(text)) return '飯類';
    return '';
  }
  function hasSpiceText(text){ return /辛|麻辣|麻婆|担々|担担|酸辣|四川|チリ|回鍋/.test(text); }
  function makeOptionLabel(sectionText,nameText){
    const labels=[];
    if(/麺類/.test(sectionText)) labels.push('定食・単品');
    if(hasSpiceText(sectionText + ' ' + nameText)) labels.push('辛さ');
    if(/定食|麺類|飯類|セット/.test(sectionText)) labels.push('量');
    return labels.length ? labels.slice(0,2).join('・') + 'を選ぶ' : '内容を選ぶ';
  }
  function addBadgeBox(info,badges){
    if(!info || !badges.length) return;
    let box=info.querySelector('.item-badges');
    if(!box){ box=document.createElement('div'); box.className='item-badges'; info.insertBefore(box, info.firstChild); }
    if(box.dataset.done==='1') return;
    box.innerHTML='';
    badges.forEach(b=>{ const span=document.createElement('span'); span.className='item-badge' + (b.kind?(' '+b.kind):''); span.textContent=b.text; box.appendChild(span); });
    box.dataset.done='1';
  }
  function enhanceCustomer(){
    document.querySelectorAll('.cat-tab').forEach(tab=>{
      if(!tab.dataset.zone) tab.dataset.zone=zoneFromText(tab.textContent.trim());
      if(!tab.dataset.bound){
        tab.dataset.bound='1';
        tab.addEventListener('click',()=>{ setTimeout(()=>activateTab(tab.dataset.cat || tab.textContent.trim()), 50); });
      }
    });
    document.querySelectorAll('.menu-section > div[id^="sec-"]').forEach(section=>{
      const title=section.querySelector('.section-head h3');
      const sectionText=(title?.childNodes?.[0]?.nodeValue || title?.textContent || '').trim();
      const zone=zoneFromText(sectionText);
      section.querySelectorAll('.menu-row').forEach(row=>{
        const info=row.querySelector('.info');
        const name=info?.querySelector('.name')?.textContent?.trim() || '';
        const badges=[];
        badges.push({text: zone==='lunch'?'昼限定':zone==='dinner'?'夜限定':'通常', kind: zone==='regular'?'soft':'alt'});
        const type=sectionType(sectionText); if(type) badges.push({text:type, kind:'soft'});
        if(hasSpiceText(sectionText + ' ' + name)) badges.push({text:'辛さ調整', kind:'alt'});
        if(/麺類/.test(sectionText)) badges.push({text:'定食・単品', kind:'soft'});
        addBadgeBox(info,badges.slice(0,4));
        const hint=info?.querySelector('.option-hint');
        const btn=row.querySelector('.add-option-btn');
        if(hint && !hint.dataset.v4){ hint.textContent='定食・単品 / 辛さ / サイズなどを選べます'; hint.dataset.v4='1'; }
        if(btn && !btn.dataset.v4){
          const count=(btn.querySelector('.mini-count')?.textContent || '').trim();
          const label=makeOptionLabel(sectionText,name);
          btn.innerHTML=`<span class="option-button-label">${escapeHtml(label)}</span><span class="mini-count">${escapeHtml(count || '選択してください')}</span>`;
          btn.dataset.v4='1';
        }
      });
    });
    document.querySelectorAll('.option-card').forEach(card=>{
      if(card.dataset.v4) return;
      const h2=card.querySelector('h2');
      const guide=document.createElement('div');
      guide.className='option-guide';
      guide.innerHTML=`<strong>${escapeHtml(makeOptionLabel('', h2?.textContent?.trim() || ''))}</strong><div class="option-strong-sep">定食・単品、辛さ、大盛り、その他のご要望を分けて選べます。</div>`;
      const price=card.querySelector('.op-price');
      if(price) price.insertAdjacentElement('afterend', guide);
      card.dataset.v4='1';
    });
  }
  function activateTab(cat){
    document.querySelectorAll('.cat-tab').forEach(tab=>tab.classList.toggle('active',(tab.dataset.cat||tab.textContent.trim())===cat));
  }
  function setupSectionObserver(){
    const sections=[...document.querySelectorAll('.menu-section > div[id^="sec-"]')];
    if(!sections.length || window.__fukuSectionObserver) return;
    const io=new IntersectionObserver(entries=>{
      const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(!visible) return;
      const cat=visible.target.id.replace(/^sec-/,'');
      activateTab(cat);
    },{root:null,rootMargin:'-120px 0px -60% 0px',threshold:[0.1,0.3,0.6]});
    sections.forEach(sec=>io.observe(sec));
    window.__fukuSectionObserver=io;
  }

  // ================= STAFF =================
  function initStaffEnhancer(){
    let menuCache=[];
    let saveHooked=false;
    let notifyEnabled=false;
    let audioCtx=null;
    let knownIds=new Set();
    let ordersReady=false;
    let subscribed=false;

    const mo=new MutationObserver(()=>{
      if(window.firebase && firebase.apps && firebase.apps.length){
        enhanceStaffUI();
        hookSaveButton();
        // v5.3: staff.html がキッチン通知を直接制御する。旧版だけ従来フックを使う。
        if(!window.FUKURIN_V53_STAFF_DRIVES_VOICE){
          hookSoundButton();
          if(!subscribed) subscribeOrders();
        }
      }
    });
    mo.observe(document.body,{childList:true,subtree:true});

    function db(){ return firebase.database(); }
    function auth(){ return firebase.auth(); }
    function ensureAudio(){
      const A=window.AudioContext||window.webkitAudioContext;
      if(!A) return null;
      if(!audioCtx) audioCtx=new A();
      return audioCtx;
    }
    function tone(freq,time,dur,type,gain){
      if(!notifyEnabled || !audioCtx) return;
      const o=audioCtx.createOscillator(),g=audioCtx.createGain();
      o.type=type||'triangle';
      o.frequency.setValueAtTime(freq,time);
      g.gain.setValueAtTime(0.0001,time);
      g.gain.exponentialRampToValueAtTime(gain||0.12,time+0.015);
      g.gain.exponentialRampToValueAtTime(0.0001,time+dur);
      o.connect(g); g.connect(audioCtx.destination); o.start(time); o.stop(time+dur+0.03);
    }
    function happySound(){
      if(!notifyEnabled) return;
      ensureAudio(); if(!audioCtx) return;
      const t=audioCtx.currentTime+0.03;
      tone(1046,t,0.11,'triangle',0.12); tone(1318,t+0.12,0.13,'triangle',0.12); tone(1568,t+0.28,0.17,'triangle',0.14); tone(2093,t+0.46,0.20,'sine',0.10);
    }
    const ZH_DISH={
      '焼き餃子':'煎饺','自家製小籠包':'自制小笼包','水餃子':'水饺','自家製春巻き':'自制春卷','ニラ饅頭':'韭菜饼','蒸しセット':'蒸饺套餐','蒸し餃子':'蒸饺','自家製薄焼き餠':'薄饼','エビ棒春巻き':'虾春卷',
      'クラゲの中華酢和え':'凉拌海蜇','ピータン':'皮蛋','ピータンと豆腐の和え物':'皮蛋豆腐','自家製チャーシュー':'自制叉烧','鴨のスモーク':'熏鸭','ザーサイ':'榨菜','野菜サラダ':'蔬菜沙拉','鶏軟骨唐揚げ':'炸鸡软骨','枝豆':'毛豆','ニンニク入り中華風たたききゅうり':'蒜蓉拍黄瓜','フライドポテト':'炸薯条','下足の醤油かけ サクサク揚げ':'脆炸鱿鱼须','自家製広州風味鶏肉チャーシュー':'广式鸡叉烧','中華風ローストチキン':'中式烧鸡','棒棒鶏':'棒棒鸡','甲イカお湯引きネギ油ソース':'葱油墨鱼','塩味ニラ玉子焼き':'韭菜煎蛋','口水鷄':'口水鸡',
      'イカと野菜の豆板醤炒め':'豆瓣酱炒鱿鱼蔬菜','エビのチリソース炒め':'辣酱虾仁','エビのチリソース炒め（小）':'小份辣酱虾仁','回鍋肉':'回锅肉','酢豚':'糖醋里脊','酢豚（小）':'小份糖醋里脊','海鮮八宝菜':'海鲜八宝菜','ピーマンと豚肉の炒め':'青椒肉丝','ピーマンと牛肉の炒め':'青椒牛肉','油淋鶏':'油淋鸡','油淋鶏（小）':'小份油淋鸡','トマトと玉子炒め':'番茄炒蛋','トマトと玉子炒め（小）':'小份番茄炒蛋','若鶏の唐揚げ':'炸鸡块','豚肉入りマーラー鍋':'猪肉麻辣锅','マーボー豆腐':'麻婆豆腐','黒酢酢豚':'黑醋糖醋肉','五目と玉子炒め':'什锦炒蛋','エビの天ぷら':'炸虾','エビの天ぷら（小）':'小份炸虾','エビのマヨネーズ炒め':'蛋黄酱虾仁',
      '豚肉の辛味煮込み':'水煮肉片','生菜包':'生菜包','揚げ手羽先':'炸鸡翅','鶏肉と山椒のピリ辛炒め':'花椒辣炒鸡','若鶏とカシューナッツの炒め':'腰果鸡丁','豚ヒレの天ぷら':'炸猪里脊','牛肉とオイスターソース炒め':'蚝油牛肉','ユウシャンロウス（魚香肉絲）':'鱼香肉丝','北海道産ホタテ炒め':'北海道扇贝炒','フカヒレあんかけ':'鱼翅烩','フカヒレ玉のあんかけ':'鱼翅烩','四川風エビの野菜炒め':'川味虾仁炒蔬菜','蒸しパン':'馒头','豚の角煮':'红烧肉','ニラと豚レバーの炒め':'韭菜炒猪肝','海鮮三種炒め':'炒海鲜三鲜','海鮮おこげ':'海鲜锅巴',
      'マーボーナス':'麻婆茄子','マーボー春雨':'麻婆粉丝','チンゲン菜とクコシの炒め':'青菜枸杞炒','究極のもやしと豚肉強火炒め':'豆芽炒猪肉','レタスとオイスターソース炒め':'蚝油生菜','千切じゃがいもの炒め':'炒土豆丝','フカヒレスープ':'鱼翅汤','フカヒレスープ（小）':'小份鱼翅汤','スーラータン':'酸辣汤','スーラータン（小）':'小份酸辣汤','玉子スープ':'鸡蛋汤','玉子スープ（小）':'小份鸡蛋汤','春雨スープ':'粉丝汤','春雨スープ（小）':'小份粉丝汤','コンスープ':'玉米汤','コンスープ（小）':'小份玉米汤',
      '黒ごまアイス':'黑芝麻冰淇淋','大学もち':'拔丝年糕','大学いも':'拔丝地瓜','ごま団子':'芝麻球','マンゴープリン':'芒果布丁',
      '中華風 蓮根の豚肉はさみ揚げ':'中式莲藕夹肉炸','9月限定 中華風 蓮根の豚肉はさみ揚げ':'中式莲藕夹肉炸','麻辣湯':'麻辣烫','冷やし中華':'中华凉面','汁なし担々麺':'干拌担担面','ガリガリくんアイスサワー':'嘎哩嘎哩君冰棒沙瓦','空心菜にんにく炒め':'蒜蓉空心菜','小松菜にんにく炒め':'蒜蓉小松菜','鶏肉チリソース':'辣酱鸡肉','鶏肉黒酢':'黑醋鸡肉','国産豚スペアリブ特製煮込み':'特制红烧国产猪排骨','鶏肉マヨネーズ':'蛋黄酱鸡肉',
      'ラーメンと炒飯セット':'拉面炒饭套餐','担々麺と炒飯セット':'担担面炒饭套餐','焼き餃子と炒飯セット':'煎饺炒饭套餐','水餃子と炒飯セット':'水饺炒饭套餐','エビチリ定食':'辣酱虾仁定食','回鍋肉定食':'回锅肉定食','酢豚定食':'糖醋里脊定食','マーボー豆腐定食':'麻婆豆腐定食','麻辣牛肉麺':'麻辣牛肉面','麻婆麺':'麻婆面','五目ラーメン':'什锦拉面','担々麺':'担担面','酸辣麺':'酸辣面','チャンポン':'什锦汤面','しょうゆラーメン':'酱油拉面','ラーメン':'拉面','柔らかい焼きそば':'软炒面','パリパリ皿うどん':'脆面','焼きビーフン':'炒米粉','チャーハン':'炒饭','エビ・レタスチャーハン':'虾仁生菜炒饭','エビとレタス炒飯':'虾仁生菜炒饭','豚肉辛チャーハン':'辣猪肉炒饭','豚肉辛炒飯':'辣猪肉炒饭','天津飯':'天津饭','中華丼':'中华盖饭','マーボー丼':'麻婆盖饭','白ご飯':'米饭','担々麺と焼き餃子セット':'担担面煎饺套餐','ラーメンと焼き餃子セット':'拉面煎饺套餐','マーボー豆腐セット':'麻婆豆腐套餐','酢豚セット':'糖醋里脊套餐','おつまみ':'下酒菜套餐','揚げ3種':'三种炸物','エビチリセット':'辣酱虾仁套餐','油淋鶏セット':'油淋鸡套餐','五目と玉子の炒めセット':'什锦炒蛋套餐','油淋鶏定食':'油淋鸡定食','八宝菜定食':'八宝菜定食',
      'コーラ':'可乐','オレンジ':'橙汁','カルピス':'可尔必思','ウーロン茶':'乌龙茶','普洱茶（プーアル茶）':'普洱茶','茉莉花茶（ジャスミン茶）':'茉莉花茶','ノンアルコール':'无酒精啤酒','生ビール（アサヒ）':'朝日生啤','アサヒ瓶ビール':'朝日瓶啤','キリン瓶ビール':'麒麟瓶啤','青島ビール':'青岛啤酒','角ハイボール':'角嗨棒','濃め角ハイボール':'浓角嗨棒','コックハイ':'可乐嗨棒','角レモンハイ':'角柠檬嗨棒','角ウーロンハイ':'角乌龙嗨棒','角桃ハイ':'角桃子嗨棒','角巨峰ハイ':'角葡萄嗨棒','黒霧島（芋）':'黑雾岛','島美人（芋）':'岛美人','雲海（そば）':'云海','かのか（麦）':'佳之香','二階堂（麦）':'二阶堂','しろ（米）':'白','紹興酒（関帝5年）':'关帝五年绍兴酒','紹興酒（関帝10年）':'关帝十年绍兴酒','中国白酒（42度）':'四十二度白酒','中国白酒（56度）':'五十六度白酒','梅酒':'梅酒','桂花陳酒（ケイカチン酒）':'桂花陈酒','杏露酒（シンル酒）':'杏露酒','荔枝酒（ライチ酒）':'荔枝酒','林檎酒（リンゴ酒）':'苹果酒','もも酒':'桃子酒','パイナ酒':'菠萝酒','レモンサワー':'柠檬沙瓦','カルピスサワー':'可尔必思沙瓦','巨峰サワー':'葡萄沙瓦','ももサワー':'桃子沙瓦','コーラサワー':'可乐沙瓦','パイナサワー':'菠萝沙瓦','赤ワイン':'红葡萄酒','冷酒（瓶300ml）':'冷清酒三百毫升','日本酒（150ml）':'清酒一百五十毫升','日本酒（250ml）':'清酒二百五十毫升'
    };
    function chineseDishName(it){
      const name=String(it?.name||'').trim();
      return ZH_DISH[name]||name;
    }
    function chineseOrderText(order){
      const parts=(order?.items||[]).map(it=>`${chineseDishName(it)}，${Math.max(1,Number(it.qty||1))}份`);
      return parts.join('，')||'新订单';
    }
    function isKitchenScreen(){
      const role=localStorage.getItem('fukurinrou_staff_role') || '';
      const label=document.querySelector('.device-label')?.textContent || '';
      return role==='kitchen' || document.body.classList.contains('kitchen-big-mode') || /キッチン/.test(label);
    }
    let activeUtterance=null;
    let chineseVoice=null;
    function refreshChineseVoice(){
      if(!('speechSynthesis' in window)) return null;
      const voices=window.speechSynthesis.getVoices ? window.speechSynthesis.getVoices() : [];
      chineseVoice=voices.find(v=>/^zh-CN$/i.test(v.lang||'')) ||
        voices.find(v=>/^zh(?:-|$)/i.test(v.lang||'')) ||
        voices.find(v=>/Xiaoxiao|Xiaoyi|Ting-Ting|Huihui|Chinese|Mandarin|普通话|国语|中文/i.test(`${v.lang||''} ${v.name||''}`)) || null;
      return chineseVoice;
    }
    if('speechSynthesis' in window){
      refreshChineseVoice();
      try{window.speechSynthesis.addEventListener('voiceschanged',refreshChineseVoice)}catch(e){}
    }
    function buildUtterance(text){
      const u=new SpeechSynthesisUtterance(`${text}。${text}。`);
      u.lang='zh-CN';
      u.rate=1.32;
      u.pitch=1.03;
      u.volume=1;
      const voice=refreshChineseVoice();
      if(voice)u.voice=voice;
      return u;
    }
    function speakChineseTwice(text){
      if(!notifyEnabled || !isKitchenScreen() || !('speechSynthesis' in window)) return false;
      try{
        const synth=window.speechSynthesis;
        if(synth.paused) synth.resume();
        if(synth.speaking || synth.pending) synth.cancel();
        const u=buildUtterance(text);
        activeUtterance=u;
        let started=false;
        u.onstart=()=>{started=true};
        u.onend=()=>{if(activeUtterance===u)activeUtterance=null};
        u.onerror=(e)=>{
          console.error('中国語読み上げエラー',e);
          if(activeUtterance===u)activeUtterance=null;
        };
        synth.speak(u);
        // 一部ブラウザで最初の speak が落ちる場合だけ、1回だけ再試行する。
        setTimeout(()=>{
          if(started || activeUtterance!==u || synth.speaking || synth.pending) return;
          try{
            const retry=buildUtterance(text);
            activeUtterance=retry;
            retry.onend=()=>{if(activeUtterance===retry)activeUtterance=null};
            retry.onerror=e=>console.error('中国語読み上げ再試行エラー',e);
            synth.speak(retry);
          }catch(e){console.error(e)}
        },650);
        return true;
      }catch(e){
        console.error('中国語読み上げエラー',e);
        return false;
      }
    }
    function enableKitchenVoiceAndTest(){
      if(!isKitchenScreen()) return false;
      notifyEnabled=true;
      localStorage.setItem('fukurinrou_notify_sound','1');
      ensureAudio();
      if(audioCtx && audioCtx.state==='suspended'){
        try{audioCtx.resume()}catch(e){}
      }
      // ユーザー操作のクリック中に直接 speak() する。これがモバイルで最も確実。
      return speakChineseTwice('语音测试');
    }
    function notifyKitchenOrders(orders){
      if(!notifyEnabled || !isKitchenScreen() || !Array.isArray(orders) || !orders.length) return false;
      const dishText=orders
        .slice()
        .sort((a,b)=>(a.createdAt||0)-(b.createdAt||0))
        .map(order=>chineseOrderText(order))
        .filter(Boolean)
        .join('，');
      if(!dishText) return false;
      happySound();
      // チャイムと読み上げを重ねず、チャイムのあとに中国語を流す。
      setTimeout(()=>speakChineseTwice(dishText),780);
      return true;
    }
    window.FUKURIN_V53_VOICE={
      enableAndTest:enableKitchenVoiceAndTest,
      notifyOrders:notifyKitchenOrders,
      isEnabled:()=>notifyEnabled,
      hasChineseVoice:()=>!!refreshChineseVoice()
    };
    function hookSoundButton(){
      const btn=document.querySelector('.notify-sound-btn');
      if(!btn) return;

      // 会計端末では中国語読み上げ機能を乗っ取らない。
      // staff.html 標準の「通知音」だけをそのまま利用できる。
      if(!isKitchenScreen()) return;

      if(btn.dataset.v4hook) return;
      btn.dataset.v4hook='1';

      if(notifyEnabled){
        btn.classList.add('on');
        btn.textContent='🔔 キッチン通知・中文読み上げ ON';
      }else{
        btn.classList.remove('on');
        btn.textContent='🔕 キッチン通知と中国語読み上げを有効にする';
      }

      btn.addEventListener('click', async (e)=>{
        // キッチンだけ v4-enhance.js 側で通知を担当する。
        e.preventDefault();
        e.stopImmediatePropagation();

        ensureAudio();
        if(audioCtx && audioCtx.state==='suspended'){
          try{ await audioCtx.resume(); }catch(err){ console.warn(err); }
        }

        notifyEnabled=true;
        btn.classList.add('on');
        btn.textContent='🔔 キッチン通知・中文読み上げ ON';

        // ボタンを押したその場で中国語音声をテストする。
        speakChineseTwice('语音测试');
      }, true);
    }
    function subscribeOrders(){
      if(!window.firebase || !firebase.apps || !firebase.apps.length) return;

      auth().onAuthStateChanged(user=>{
        if(!user) return;
        if(subscribed) return;
        subscribed=true;

        db().ref('orders').on('value', snap=>{
          const list=snap.val() ? Object.values(snap.val()) : [];
          const ids=new Set(list.map(o=>o.id));

          // 最初の読み込みでは、すでに存在する注文は読み上げない
          if(!ordersReady){
            knownIds=ids;
            ordersReady=true;
            return;
          }

          // 前回には無かった「新規」注文だけ通知する
          const newOrders=list.filter(
            o=>o.status==='new' && !knownIds.has(o.id)
          );

          if(newOrders.length && notifyEnabled && isKitchenScreen()){
            const dishText=newOrders
              .sort((a,b)=>(a.createdAt||0)-(b.createdAt||0))
              .map(order=>chineseOrderText(order))
              .filter(Boolean)
              .join('，');
            if(dishText){
              happySound();
              setTimeout(()=>speakChineseTwice(dishText),780);
            }
          }

          knownIds=ids;
        });
      });
    }
    function optionsToText(options){
      if(!options || !options.length) return '';
      return options.map(op=>{
        const choices=(op.choices||[]).map(ch=>{
          if(typeof ch==='string') return ch;
          const delta=Number(ch.delta||0);
          return `${ch.label||''},${delta}`;
        }).join('|');
        return `${op.name||''}=${choices}`;
      }).join('\n');
    }
    function parseOptions(text){
      return String(text||'').split(/\n+/).map(v=>v.trim()).filter(Boolean).map(line=>{
        const eq=line.indexOf('=');
        if(eq<=0) return null;
        const name=line.slice(0,eq).trim();
        const raw=line.slice(eq+1).trim();
        if(!name || !raw) return null;
        const choices=raw.split('|').map(part=>part.trim()).filter(Boolean).map(part=>{
          const segs=part.split(',').map(s=>s.trim());
          const last=segs[segs.length-1];
          if(segs.length>=2 && /^-?\d+$/.test(last)){
            segs.pop();
            return {label:segs.join(','), delta:Number(last)};
          }
          return part;
        });
        const first=choices[0];
        return {name, choices, default: typeof first==='string' ? first : (first?.label || '')};
      }).filter(Boolean);
    }
    function inferAvailability(catName){ if(/^昼・/.test(catName)) return 'lunch'; if(/^夜・/.test(catName)) return 'dinner'; return ''; }
    async function loadMenuCache(){
      if(!window.firebase || !firebase.apps || !firebase.apps.length) return;
      const snap=await db().ref('menu').once('value');
      menuCache=snap.val() || [];
    }
    function ensureRowId(row){ if(!row.dataset.itemId) row.dataset.itemId='it'+Date.now().toString(36)+Math.random().toString(36).slice(2,6); return row.dataset.itemId; }
    async function enhanceStaffUI(){
      if(!window.firebase || !firebase.apps || !firebase.apps.length) return;
      if(!menuCache.length){ try{ await loadMenuCache(); }catch(e){} }
      document.querySelectorAll('.menu-edit-cat').forEach((cat,ci)=>{
        if(!cat.querySelector('.x-cat-meta')){
          const catName=cat.querySelector('.cat-name-input')?.value?.trim() || '';
          const current=(menuCache[ci] && menuCache[ci].availability) || inferAvailability(catName);
          const meta=document.createElement('div');
          meta.className='x-cat-meta';
          meta.innerHTML=`<div><label>表示時間</label><select class="x-availability"><option value="" ${!current?'selected':''}>常時表示</option><option value="lunch" ${current==='lunch'?'selected':''}>昼限定</option><option value="dinner" ${current==='dinner'?'selected':''}>夜限定</option></select></div><div><label>説明</label><input type="text" class="x-note" placeholder="例：ご飯・スープ付き" value="${escapeAttr((menuCache[ci] && menuCache[ci].note) || '')}"></div>`;
          const title=cat.querySelector('.cat-title-row'); if(title) title.insertAdjacentElement('afterend', meta);
        }
        const rows=[...cat.querySelectorAll('.menu-edit-row')];
        rows.forEach((row,ii)=>{
          ensureRowId(row);
          if(row.querySelector('.x-extra-panel')) return;
          const item=(menuCache[ci] && menuCache[ci].items && menuCache[ci].items[ii]) || null;
          if(item && item.id) row.dataset.itemId=item.id;
          const image=item?.image || '';
          const optionsText=optionsToText(item?.options || []);
          const labels=(item?.labels || []).join(', ');
          const panel=document.createElement('div');
          panel.className='x-extra-panel';
          panel.innerHTML=`<div class="x-extra-grid"><div><img class="x-preview" src="${escapeAttr(image || 'assets/chinese_placeholder.webp')}" onerror="this.onerror=null;this.src='assets/chinese_placeholder.webp'" alt="preview"><label class="x-upload-btn">写真を選択<input type="file" class="x-file" accept="image/*"></label><button type="button" class="x-delete-photo">写真を削除</button></div><div class="x-extra-fields"><div class="x-full"><label>画像URL または画像データ</label><input type="text" class="x-image" placeholder="https://... または写真選択で自動入力" value="${escapeAttr(image)}"></div><div class="x-full"><label>表示タグ（カンマ区切り）</label><input type="text" class="x-labels" placeholder="例：定食, 単品, 辛さ調整" value="${escapeAttr(labels)}"></div><div class="x-full"><label>選択項目（1行に1項目）</label><textarea class="x-options" rows="4" placeholder="例：辛さ=控えめ|普通|辛め|激辛\nお召し上がり方=単品,0|定食,120\nご飯の量=普通,0|大盛り,100">${escapeHtml(optionsText)}</textarea><div class="x-help">書き方：項目名=選択肢1|選択肢2。追加料金がある場合は「名前,金額」。</div></div></div></div>`;
          row.appendChild(panel);
          const imgInput=panel.querySelector('.x-image');
          const preview=panel.querySelector('.x-preview');
          imgInput.addEventListener('input',()=>{ preview.src=imgInput.value.trim() || 'assets/chinese_placeholder.webp'; });
          panel.querySelector('.x-file').addEventListener('change',e=>{
            const file=e.target.files && e.target.files[0]; if(!file) return;
            const reader=new FileReader();
            reader.onload=()=>{ imgInput.value=String(reader.result||''); preview.src=String(reader.result||''); };
            reader.readAsDataURL(file);
          });
          panel.querySelector('.x-delete-photo')?.addEventListener('click',()=>{imgInput.value='';preview.src='assets/chinese_placeholder.webp';});
        });
      });
    }
    function buildMenuFromDom(){
      const menu=[];
      document.querySelectorAll('.menu-edit-cat').forEach((cat)=>{
        const sec={
          cat:(cat.querySelector('.cat-name-input')?.value || 'カテゴリ').trim(),
          items:[]
        };
        const availability=cat.querySelector('.x-availability')?.value || '';
        const note=(cat.querySelector('.x-note')?.value || '').trim();
        if(availability) sec.availability=availability;
        if(note) sec.note=note;
        cat.querySelectorAll('.menu-edit-row').forEach((row)=>{
          const item={
            id:ensureRowId(row),
            name:(row.querySelector('.mi-name')?.value || '新しい料理').trim(),
            price:parseInt(row.querySelector('.mi-price')?.value || '0',10) || 0,
            desc:(row.querySelector('.mi-desc')?.value || '').trim(),
            soldOut:!!row.querySelector('.mi-soldout')?.checked
          };
          const image=(row.querySelector('.x-image')?.value || '').trim();
          if(image){ item.image=image; item.imageExact=true; }
          const labels=(row.querySelector('.x-labels')?.value || '').split(/[、,，]/).map(v=>v.trim()).filter(Boolean);
          if(labels.length) item.labels=labels;
          const options=parseOptions(row.querySelector('.x-options')?.value || '');
          if(options.length) item.options=options;
          sec.items.push(item);
        });
        menu.push(sec);
      });
      return menu;
    }
    function hookSaveButton(){
      const save=document.getElementById('save');
      if(!save || save.dataset.v4save) return;
      save.dataset.v4save='1';
      save.addEventListener('click', async (e)=>{
        e.preventDefault(); e.stopImmediatePropagation();
        const st=document.getElementById('st');
        if(st) st.textContent='保存中…';
        try{
          const menu=buildMenuFromDom();
          await db().ref('menu').set(menu);
          menuCache=menu;
          if(st) st.textContent='保存しました';
        }catch(err){
          console.error(err);
          if(st) st.textContent='保存に失敗しました';
        }
      }, true);
      const discard=document.getElementById('discard');
      if(discard && !discard.dataset.v4discard){ discard.dataset.v4discard='1'; discard.addEventListener('click',()=>{ setTimeout(()=>{ menuCache=[]; enhanceStaffUI(); }, 80); }, true); }
    }
  }

  function escapeHtml(s){ return String(s==null?'':s).replace(/[&<>]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[m])); }
  function escapeAttr(s){ return String(s==null?'':s).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[m])); }
})();
