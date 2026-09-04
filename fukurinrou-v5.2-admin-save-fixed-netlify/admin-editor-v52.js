(function(){
'use strict';
console.info('福林楼 管理画面エディタ v5.2');
if(!/staff\.html(?:$|\?)/.test(location.pathname)) return;

const STYLE=`
.v51-editor{display:grid;grid-template-columns:260px minmax(0,1fr);gap:16px;align-items:start}
.v51-sidebar{position:sticky;top:12px;background:#fffdf8;border:1px solid #dcd0b6;border-radius:10px;padding:12px;max-height:calc(100vh - 110px);overflow:auto}
.v51-side-title{font-weight:900;font-size:16px;margin:2px 4px 10px;color:#7c271f}
.v51-cat-list{display:flex;flex-direction:column;gap:6px}.v51-cat-btn{display:grid;grid-template-columns:28px 1fr auto;align-items:center;gap:5px;width:100%;border:1px solid #dcd0b6;background:#fff;padding:8px;border-radius:7px;text-align:left;color:#2b241d}.v51-cat-btn.active{background:#a8362b;color:#fff;border-color:#a8362b}.v51-cat-btn.dragging{opacity:.4}.v51-drag{font-size:19px;cursor:grab;text-align:center;touch-action:none}.v51-cat-label{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:12.5px;font-weight:700}.v51-cat-count{font-size:10px;opacity:.75}.v51-cat-arrows{display:flex;gap:2px}.v51-mini{border:1px solid currentColor;border-radius:4px;padding:2px 5px;font-size:10px;line-height:1.2}.v51-add-cat{width:100%;margin-top:10px;border:1px dashed #a8362b;background:#fff7f4;color:#7c271f;padding:10px;border-radius:7px;font-weight:700}
.v51-main{min-width:0}.v51-category-card{background:#fffdf8;border:1px solid #dcd0b6;border-radius:10px;padding:16px}.v51-cat-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:14px}.v51-cat-head h2{margin:0;font-family:'Noto Serif JP',serif;font-size:21px}.v51-cat-actions{display:flex;gap:7px;flex-wrap:wrap}.v51-danger{border:1px solid #b94b40;color:#9a3329;background:#fff;padding:8px 10px;border-radius:5px;font-size:12px}.v51-meta{display:grid;grid-template-columns:2fr 1fr 1fr;gap:9px;padding:12px;background:#faf3e7;border-radius:8px;margin-bottom:15px}.v51-field label{display:block;font-size:11px;color:#6b6053;margin-bottom:4px}.v51-field input,.v51-field select,.v51-field textarea{width:100%;border:1px solid #dcd0b6;border-radius:5px;padding:9px;font-size:13px;background:#fff}.v51-field textarea{resize:vertical;min-height:66px}.v51-items{display:flex;flex-direction:column;gap:8px}.v51-item{border:1px solid #dfd3ba;background:#fff;border-radius:9px;overflow:hidden}.v51-item.dragging{opacity:.4}.v51-item input,.v51-item textarea,.v51-item select{-webkit-user-select:text;user-select:text;touch-action:auto}.v51-drag{-webkit-user-select:none;user-select:none}.v51-item-summary{display:grid;grid-template-columns:34px minmax(0,1fr) auto auto auto;gap:8px;align-items:center;padding:10px}.v51-item-name{font-weight:800;font-size:14px}.v51-item-sub{font-size:11px;color:#6b6053;margin-top:2px}.v51-item-price{font-family:'DM Mono',monospace;font-weight:700}.v51-item-actions{display:flex;gap:4px}.v51-edit-btn{border:1px solid #a8362b;color:#8d3025;background:#fff7f4;border-radius:5px;padding:7px 9px;font-size:11px;font-weight:700}.v51-sold{font-size:10px;color:#a8362b;border:1px solid #a8362b;border-radius:999px;padding:2px 7px}.v51-detail{display:none;border-top:1px dashed #dcd0b6;padding:13px;background:#fffdf9}.v51-item.expanded .v51-detail{display:block}.v51-detail-grid{display:grid;grid-template-columns:120px minmax(0,1fr);gap:13px}.v51-photo img{width:120px;height:90px;object-fit:cover;border:1px solid #dcd0b6;border-radius:7px;background:#f1e7d3}.v51-photo-empty{width:120px;height:90px;display:grid;place-items:center;border:1px dashed #dcd0b6;border-radius:7px;font-size:11px;color:#6b6053}.v51-photo-actions{display:grid;gap:5px;margin-top:7px}.v51-file{font-size:11px;background:#f1e7d3;border-radius:5px;padding:7px;text-align:center;cursor:pointer}.v51-file input{display:none}.v51-photo-del{font-size:11px;border:1px solid #cdaea9;color:#8d3025;background:#fff;padding:6px;border-radius:5px}.v51-fields{display:grid;grid-template-columns:2fr 1fr;gap:8px}.v51-full{grid-column:1/-1}.v51-check{display:flex;align-items:center;gap:6px;font-size:12px;padding-top:22px}.v51-options{margin-top:14px;border-top:1px dashed #dcd0b6;padding-top:12px}.v51-options-head{display:flex;justify-content:space-between;gap:8px;align-items:center;margin-bottom:8px}.v51-options-title{font-weight:900;color:#7c271f}.v51-add-option{display:flex;gap:6px}.v51-add-option select{border:1px solid #dcd0b6;border-radius:5px;padding:7px;background:#fff}.v51-add-option button{background:#4b6350;color:#fff;border-radius:5px;padding:7px 10px;font-size:11px;font-weight:700}.v51-op{border:1px solid #e1d6c0;border-radius:7px;padding:10px;margin-top:8px;background:#faf7f0}.v51-op-head{display:grid;grid-template-columns:minmax(120px,1fr) auto;gap:8px;align-items:center}.v51-op-head input{border:1px solid #dcd0b6;border-radius:5px;padding:7px;font-weight:700}.v51-op-del{color:#a8362b;text-decoration:underline;font-size:11px}.v51-choice{display:grid;grid-template-columns:32px 1fr 120px auto;gap:7px;align-items:center;margin-top:7px}.v51-choice input[type=text],.v51-choice input[type=number]{width:100%;border:1px solid #dcd0b6;border-radius:5px;padding:7px}.v51-choice small{font-size:10px;color:#6b6053}.v51-choice-del{font-size:11px;color:#a8362b}.v51-add-choice{margin-top:7px;border:1px dashed #4b6350;color:#4b6350;padding:6px 9px;border-radius:5px;font-size:11px}.v51-item-delete{margin-top:12px;color:#a8362b;text-decoration:underline;font-size:12px}.v51-add-item{width:100%;margin-top:12px;border:2px dashed #c9972b;background:#fffaf0;color:#7b5610;padding:13px;border-radius:8px;font-weight:900}.v51-savebar{position:sticky;bottom:0;z-index:12;display:flex;align-items:center;gap:10px;background:#faf3e7;border-top:1px solid #dcd0b6;padding:12px 0 4px;margin-top:14px}.v51-save{background:#a8362b;color:#fff;padding:13px 20px;border-radius:6px;font-weight:900}.v51-reload{border:1px solid #dcd0b6;background:#fff;padding:12px;border-radius:6px}.v51-status{font-size:12px;color:#4b6350;font-weight:700;line-height:1.5}.v51-status.error{color:#a8362b}.v51-save-note{font-size:11px;color:#6b6053;margin-left:auto}.v51-tip{font-size:11px;color:#6b6053;line-height:1.6;margin:8px 0}.v51-mobile-cat{display:none;margin-bottom:10px}.v51-mobile-cat select{width:100%;padding:11px;border:1px solid #dcd0b6;border-radius:7px;background:#fff;font-weight:700}
@media(max-width:900px){.v51-editor{grid-template-columns:1fr}.v51-sidebar{display:none}.v51-mobile-cat{display:block}.v51-meta{grid-template-columns:1fr}.v51-detail-grid{grid-template-columns:1fr}.v51-photo img,.v51-photo-empty{width:100%;height:190px}.v51-fields{grid-template-columns:1fr}.v51-item-summary{grid-template-columns:30px minmax(0,1fr) auto}.v51-item-price{grid-column:2}.v51-item-actions{grid-column:3;grid-row:1/3}.v51-choice{grid-template-columns:30px 1fr}.v51-choice .v51-delta{grid-column:2}.v51-choice-del{grid-column:2;justify-self:end}}
`;
const style=document.createElement('style');style.textContent=STYLE;document.head.appendChild(style);

const SPICE_IDS=new Set(['zensai_koushuiji','main1_ikatoubanjan','main1_hoikoro','main1_malanabe','main1_mapotofu','main2_porkspicy','main2_sanshochicken','main2_yuxiangrousi','main2_sichuanebi','veg_maponasu','veg_mapoharusame','soup_suuratan']);
const PRESETS={
 '辛さ':()=>({name:'辛さ',choices:['半分辛さ','普通','2倍','3倍'],default:'普通'}),
 'サイズ':()=>({name:'サイズ',choices:[{label:'小',delta:0},{label:'普通',delta:0}],default:'普通'}),
 '麺の量':()=>({name:'麺の量',choices:[{label:'普通',delta:0},{label:'大盛り',delta:200}],default:'普通'}),
 'ご飯の量':()=>({name:'ご飯の量',choices:[{label:'普通',delta:0},{label:'大盛り',delta:100}],default:'普通'}),
 'チャーハンの量':()=>({name:'チャーハンの量',choices:[{label:'半チャーハン',delta:-350},{label:'普通',delta:0},{label:'大盛り',delta:250}],default:'普通'}),
 '定食・単品':()=>({name:'お召し上がり方',choices:[{label:'単品',delta:0},{label:'定食',delta:120}],default:'単品'}),
 '飲み方':()=>({name:'飲み方',choices:['ロック','水割り','湯割り','ソーダ割り'],default:'ロック'}),
 'カスタム':()=>({name:'選択項目',choices:['選択肢1','選択肢2'],default:'選択肢1'})
};
let draft=[],active=0,expanded='',mounted=false,dirty=false;
const clone=v=>JSON.parse(JSON.stringify(v));
const esc=s=>String(s??'').replace(/[&<>\"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':'&quot;'}[m]));
const uid=()=>`it${Date.now().toString(36)}${Math.random().toString(36).slice(2,6)}`;

function normalizeSpice(op){if(!op||op.name!=='辛さ')return op;return {name:'辛さ',choices:['半分辛さ','普通','2倍','3倍'],default:'普通'}}
function materialize(menu){
 menu.forEach(sec=>(sec.items||[]).forEach(it=>{
   it.options=(it.options||[]).map(normalizeSpice);
   if(SPICE_IDS.has(it.id)&&!it.options.some(op=>op.name==='辛さ'))it.options.push(PRESETS['辛さ']());
 }));
 return menu;
}
function normalizeSoups(menu){
 const soup=menu.find(s=>s.cat==='スープ'); if(!soup)return menu;
 const pairs=[['soup_fukahire','soup_fukahire_small',700],['soup_suuratan','soup_suuratan_small',200],['soup_tamago','soup_tamago_small',200],['soup_harusame','soup_harusame_small',200],['soup_corn','soup_corn_small',200]];
 pairs.forEach(([nid,sid,fallback])=>{
   const n=soup.items.find(i=>i.id===nid),sm=soup.items.find(i=>i.id===sid); if(!n)return;
   if(sm){const diff=Math.max(0,Number(n.price||0)-Number(sm.price||0))||fallback;n.options=(n.options||[]).filter(o=>o.name!=='サイズ');n.options.unshift({name:'サイズ',choices:[{label:'小',delta:-diff},{label:'普通',delta:0}],default:'普通'});n.desc=(n.desc==='通常サイズ'?'':n.desc||'');soup.items=soup.items.filter(i=>i.id!==sid)}
   else if(!(n.options||[]).some(o=>o.name==='サイズ'))n.options=[{name:'サイズ',choices:[{label:'小',delta:-fallback},{label:'普通',delta:0}],default:'普通'},...(n.options||[])];
 });
 return menu;
}
function mergeSpecial(base){
 const menu=clone(base||[]), v=window.FUKURIN_MENU_V3||{}, specials=v.specialSections||[];
 specials.forEach(src=>{
   let target=menu.find(s=>(s.sectionId&&s.sectionId===src.sectionId)||s.cat===src.cat);
   if(!target){target=clone(src);target.sectionId=src.sectionId||`special:${src.cat}`;menu.push(target)}
   else{if(!target.sectionId)target.sectionId=src.sectionId||`special:${src.cat}`;if(!target.availability)target.availability=src.availability;if(!target.note)target.note=src.note;if(!target.menuGroup)target.menuGroup=src.menuGroup;const ids=new Set((target.items||[]).map(i=>i.id));(src.items||[]).forEach(i=>{if(!ids.has(i.id))target.items.push(clone(i))})}
 });
 return materialize(normalizeSoups(menu));
}
async function loadDraft(){
 const snap=await firebase.database().ref('menu').once('value');
 draft=mergeSpecial(snap.exists()?snap.val():[]);
 active=Math.min(active,Math.max(0,draft.length-1));dirty=false;
}
function mark(){dirty=true;const st=document.querySelector('.v51-status');if(st)st.textContent='未保存の変更があります'}
function bindModelInput(el,fn){el.addEventListener('input',()=>{fn(el.value);mark()});el.addEventListener('change',()=>{fn(el.value);mark()})}
function optionChoiceObj(ch){return typeof ch==='string'?{label:ch,delta:0}:{label:String(ch?.label??''),delta:Number(ch?.delta||0)}}
function move(arr,from,to){if(to<0||to>=arr.length||from===to)return;const [v]=arr.splice(from,1);arr.splice(to,0,v);mark()}
function imageFromFile(file,cb){
 if(!file)return;
 if(file.size>12*1024*1024){alert('写真ファイルが大きすぎます。12MB以下の写真を選んでください。');return}
 const img=new Image(),r=new FileReader();
 r.onerror=()=>alert('写真を読み込めませんでした。別の写真を選んでください。');
 r.onload=()=>{img.onload=()=>{try{const max=720,scale=Math.min(1,max/Math.max(img.width,img.height)),c=document.createElement('canvas');c.width=Math.max(1,Math.round(img.width*scale));c.height=Math.max(1,Math.round(img.height*scale));c.getContext('2d').drawImage(img,0,0,c.width,c.height);let data=c.toDataURL('image/jpeg',.70);if(data.length>900000)data=c.toDataURL('image/jpeg',.52);if(data.length>1200000){alert('写真の保存サイズが大きすぎます。別の写真を選んでください。');return}cb(data)}catch(e){console.error(e);alert('写真の変換に失敗しました。')}};img.onerror=()=>alert('この写真形式は読み込めません。JPEGまたはPNGをお試しください。');img.src=String(r.result)};r.readAsDataURL(file)
}
function render(){
 const old=document.querySelector('.v51-editor-wrap'); if(old)old.remove();
 const tabs=document.querySelector('.cashier-tabs'); if(!tabs||!tabs.querySelector('[data-tab="menu"].active'))return;
 [...tabs.parentElement.children].forEach(ch=>{if(ch!==tabs)ch.remove()});
 const wrap=document.createElement('div');wrap.className='v51-editor-wrap';
 const sec=draft[active];
 if(!sec){wrap.innerHTML='<div class="empty-col">カテゴリがありません</div>';tabs.insertAdjacentElement('afterend',wrap);return}
 wrap.innerHTML=`<div class="v51-mobile-cat"><select>${draft.map((s,i)=>`<option value="${i}" ${i===active?'selected':''}>${esc(s.cat)}</option>`).join('')}</select></div><div class="v51-editor"><aside class="v51-sidebar"><div class="v51-side-title">カテゴリ</div><div class="v51-cat-list"></div><button class="v51-add-cat">＋ カテゴリを追加</button><div class="v51-tip">☰をドラッグして並び替えできます。↑↓でも移動できます。</div></aside><main class="v51-main"><section class="v51-category-card"><div class="v51-cat-head"><h2>${esc(sec.cat)}</h2><div class="v51-cat-actions"><button class="v51-danger v51-del-cat">カテゴリ削除</button></div></div><div class="v51-meta"><div class="v51-field"><label>カテゴリ名</label><input class="v51-cat-name" value="${esc(sec.cat)}"></div><div class="v51-field"><label>表示時間</label><select class="v51-availability"><option value="" ${!sec.availability?'selected':''}>常時表示</option><option value="lunch" ${sec.availability==='lunch'?'selected':''}>昼限定</option><option value="dinner" ${sec.availability==='dinner'?'selected':''}>夜限定</option></select></div><div class="v51-field"><label>種類</label><select class="v51-group"><option value="food" ${(sec.menuGroup||'food')!=='drink'?'selected':''}>料理</option><option value="drink" ${sec.menuGroup==='drink'?'selected':''}>ドリンク・お酒</option></select></div><div class="v51-field v51-full"><label>カテゴリ説明</label><input class="v51-note" value="${esc(sec.note||'')}" placeholder="例：夜限定・おすすめなど"></div></div><div class="v51-items"></div><button class="v51-add-item">＋ このカテゴリにメニューを追加</button></section></main></div><div class="v51-savebar"><button class="v51-save">変更を保存</button><button class="v51-reload">変更を破棄して再読込</button><span class="v51-status">${dirty?'未保存の変更があります':''}</span><span class="v51-save-note">文字・価格・写真・選択項目をまとめて保存</span></div>`;
 tabs.insertAdjacentElement('afterend',wrap);
 renderCatList(wrap.querySelector('.v51-cat-list'));
 renderItems(wrap.querySelector('.v51-items'),sec);
 const mobile=wrap.querySelector('.v51-mobile-cat select');mobile.onchange=()=>{active=Number(mobile.value);expanded='';render()};
 bindModelInput(wrap.querySelector('.v51-cat-name'),v=>{sec.cat=v||sec.cat;wrap.querySelector('.v51-cat-head h2').textContent=sec.cat});
 wrap.querySelector('.v51-availability').onchange=e=>{sec.availability=e.target.value||undefined;mark()};
 wrap.querySelector('.v51-group').onchange=e=>{sec.menuGroup=e.target.value==='drink'?'drink':undefined;mark()};
 bindModelInput(wrap.querySelector('.v51-note'),v=>sec.note=v);
 wrap.querySelector('.v51-del-cat').onclick=()=>{if(confirm(`「${sec.cat}」を削除しますか？`)){draft.splice(active,1);active=Math.max(0,Math.min(active,draft.length-1));expanded='';mark();render()}};
 wrap.querySelector('.v51-add-item').onclick=()=>{const it={id:uid(),name:'新しいメニュー',price:0,desc:'',soldOut:false,options:[]};sec.items.push(it);expanded=it.id;mark();render()};
 wrap.querySelector('.v51-add-cat').onclick=()=>{draft.push({cat:'新しいカテゴリ',items:[]});active=draft.length-1;expanded='';mark();render()};
 wrap.querySelector('.v51-save').onclick=save;
 wrap.querySelector('.v51-reload').onclick=async()=>{if(dirty&&!confirm('未保存の変更を破棄しますか？'))return;await loadDraft();render()};
}
function renderCatList(list){
 list.innerHTML='';draft.forEach((sec,i)=>{const b=document.createElement('button');b.className=`v51-cat-btn ${i===active?'active':''}`;b.draggable=false;b.dataset.i=i;b.innerHTML=`<span class="v51-drag" draggable="true" title="ドラッグして移動">☰</span><span><span class="v51-cat-label">${esc(sec.cat)}</span><span class="v51-cat-count"> ${(sec.items||[]).length}品</span></span><span class="v51-cat-arrows"><span class="v51-mini" data-up>↑</span><span class="v51-mini" data-down>↓</span></span>`;b.onclick=e=>{if(e.target.closest('[data-up]')){e.preventDefault();move(draft,i,i-1);active=Math.max(0,i-1);render();return}if(e.target.closest('[data-down]')){e.preventDefault();move(draft,i,i+1);active=Math.min(draft.length-1,i+1);render();return}active=i;expanded='';render()};const handle=b.querySelector('.v51-drag');handle.ondragstart=e=>{b.classList.add('dragging');e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',String(i))};handle.ondragend=()=>b.classList.remove('dragging');b.ondragover=e=>e.preventDefault();b.ondrop=e=>{e.preventDefault();const from=Number(e.dataTransfer.getData('text/plain')),to=i;move(draft,from,to);active=to;render()};list.appendChild(b)})
}
function renderItems(box,sec){
 box.innerHTML='';(sec.items||[]).forEach((it,ii)=>{
   const row=document.createElement('div');row.className=`v51-item ${expanded===it.id?'expanded':''}`;row.draggable=false;row.dataset.ii=ii;
   row.innerHTML=`<div class="v51-item-summary"><span class="v51-drag">☰</span><div><div class="v51-item-name">${esc(it.name)}</div><div class="v51-item-sub">${(it.options||[]).length}個の選択項目 ${it.soldOut?'・売り切れ':''}</div></div><div class="v51-item-price">¥${Number(it.price||0).toLocaleString()}</div><div class="v51-item-actions"><button class="v51-mini" data-up>↑</button><button class="v51-mini" data-down>↓</button></div><button class="v51-edit-btn">${expanded===it.id?'閉じる':'編集'}</button></div><div class="v51-detail"></div>`;
   const summary=row.querySelector('.v51-item-summary');
   row.querySelector('.v51-edit-btn').onclick=e=>{e.stopPropagation();expanded=expanded===it.id?'':it.id;render()};
   row.querySelector('[data-up]').onclick=e=>{e.stopPropagation();move(sec.items,ii,ii-1);render()};row.querySelector('[data-down]').onclick=e=>{e.stopPropagation();move(sec.items,ii,ii+1);render()};
   const dragHandle=row.querySelector('.v51-drag');dragHandle.draggable=true;dragHandle.ondragstart=e=>{row.classList.add('dragging');e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',String(ii))};dragHandle.ondragend=()=>row.classList.remove('dragging');row.ondragover=e=>e.preventDefault();row.ondrop=e=>{e.preventDefault();const from=Number(e.dataTransfer.getData('text/plain'));move(sec.items,from,ii);render()};
   if(expanded===it.id)renderDetail(row.querySelector('.v51-detail'),sec,it,ii);
   box.appendChild(row)
 })
}
function renderDetail(d,sec,it,ii){
 const hasImg=!!it.image&&!it.noImage;
 d.innerHTML=`<div class="v51-detail-grid"><div class="v51-photo">${hasImg?`<img src="${esc(it.image)}" onerror="this.style.display='none'">`:'<div class="v51-photo-empty">写真なし</div>'}<div class="v51-photo-actions"><label class="v51-file">写真を選択<input type="file" accept="image/*"></label><button class="v51-photo-del">写真を削除</button></div></div><div class="v51-fields"><div class="v51-field"><label>料理名</label><input class="f-name" value="${esc(it.name)}"></div><div class="v51-field"><label>価格（基本価格）</label><input class="f-price" type="number" min="0" value="${Number(it.price||0)}"></div><div class="v51-field v51-full"><label>説明</label><textarea class="f-desc">${esc(it.desc||'')}</textarea></div><div class="v51-field v51-full"><label>画像URL（必要な場合）</label><input class="f-image" value="${esc(hasImg?it.image:'')}" placeholder="写真選択なら自動で入ります"></div><label class="v51-check"><input class="f-sold" type="checkbox" ${it.soldOut?'checked':''}> 売り切れ</label><label class="v51-check"><input class="f-alcohol" type="checkbox" ${it.alcohol?'checked':''}> アルコール商品</label></div></div><div class="v51-options"><div class="v51-options-head"><div><div class="v51-options-title">選択項目</div><div class="v51-tip">辛さ・サイズ・定食/単品・大盛りなどを、ここでボタン式に設定できます。</div></div><div class="v51-add-option"><select>${Object.keys(PRESETS).map(k=>`<option>${k}</option>`).join('')}</select><button>＋追加</button></div></div><div class="v51-op-list"></div></div><button class="v51-item-delete">このメニューを削除</button>`;
 bindModelInput(d.querySelector('.f-name'),v=>it.name=v||'新しいメニュー');bindModelInput(d.querySelector('.f-price'),v=>it.price=Math.max(0,parseInt(v||'0',10)||0));bindModelInput(d.querySelector('.f-desc'),v=>it.desc=v);bindModelInput(d.querySelector('.f-image'),v=>{it.image=v.trim();it.noImage=!it.image;it.imageExact=!!it.image});d.querySelector('.f-sold').onchange=e=>{it.soldOut=e.target.checked;mark()};d.querySelector('.f-alcohol').onchange=e=>{it.alcohol=e.target.checked;mark()};
 d.querySelector('input[type=file]').onchange=e=>{const f=e.target.files?.[0];if(!f)return;imageFromFile(f,data=>{it.image=data;it.noImage=false;it.imageExact=true;mark();render()})};d.querySelector('.v51-photo-del').onclick=()=>{it.image='';it.noImage=true;it.imageExact=false;mark();render()};
 d.querySelector('.v51-item-delete').onclick=()=>{if(confirm(`「${it.name}」を削除しますか？`)){sec.items.splice(ii,1);expanded='';mark();render()}};
 const sel=d.querySelector('.v51-add-option select');d.querySelector('.v51-add-option button').onclick=()=>{const op=PRESETS[sel.value]();if((it.options||[]).some(x=>x.name===op.name)&&sel.value!=='カスタム'){alert('同じ選択項目がすでにあります');return}it.options=it.options||[];it.options.push(op);mark();render()};
 renderOptions(d.querySelector('.v51-op-list'),it)
}
function renderOptions(list,it){
 list.innerHTML='';(it.options||[]).forEach((op,oi)=>{const el=document.createElement('div');el.className='v51-op';const choices=(op.choices||[]).map(optionChoiceObj);el.innerHTML=`<div class="v51-op-head"><input class="op-name" value="${esc(op.name||'選択項目')}"><button class="v51-op-del">選択項目を削除</button></div><div class="choices"></div><button class="v51-add-choice">＋ 選択肢を追加</button>`;bindModelInput(el.querySelector('.op-name'),v=>op.name=v||'選択項目');const cbox=el.querySelector('.choices');choices.forEach((ch,ci)=>{const c=document.createElement('div');c.className='v51-choice';c.innerHTML=`<input type="radio" name="def-${it.id}-${oi}" ${String(op.default||'')===ch.label?'checked':''} title="初期選択"><input type="text" value="${esc(ch.label)}" placeholder="選択肢"><div class="v51-delta"><input type="number" value="${Number(ch.delta||0)}" placeholder="追加料金"><small>追加料金（値引きはマイナス）</small></div><button class="v51-choice-del">削除</button>`;const radio=c.querySelector('input[type=radio]'),label=c.querySelector('input[type=text]'),delta=c.querySelector('input[type=number]');radio.onchange=()=>{if(radio.checked){op.default=label.value;mark()}};bindModelInput(label,v=>{const wasDefault=op.default===ch.label;ch.label=v;op.choices[ci]=ch.delta?{label:ch.label,delta:ch.delta}:ch.label;if(wasDefault)op.default=v});bindModelInput(delta,v=>{ch.delta=Number(v||0);op.choices[ci]=ch.delta?{label:ch.label,delta:ch.delta}:ch.label});c.querySelector('.v51-choice-del').onclick=()=>{op.choices.splice(ci,1);if(op.default===ch.label)op.default=(op.choices[0]&&optionChoiceObj(op.choices[0]).label)||'';mark();render()};cbox.appendChild(c)});el.querySelector('.v51-op-del').onclick=()=>{it.options.splice(oi,1);mark();render()};el.querySelector('.v51-add-choice').onclick=()=>{op.choices=op.choices||[];op.choices.push('新しい選択肢');if(!op.default)op.default='新しい選択肢';mark();render()};list.appendChild(el)})
}
function cleanForFirebase(value){
 if(value===undefined||typeof value==='function'||typeof value==='symbol')return undefined;
 if(value===null||typeof value==='string'||typeof value==='boolean')return value;
 if(typeof value==='number')return Number.isFinite(value)?value:0;
 if(Array.isArray(value))return value.map(v=>{const c=cleanForFirebase(v);return c===undefined?null:c});
 if(typeof value==='object'){const out={};Object.keys(value).forEach(k=>{const c=cleanForFirebase(value[k]);if(c!==undefined)out[k]=c});return out}
 return String(value)
}
function humanSaveError(e){
 const code=String(e?.code||''); const msg=String(e?.message||'');
 if(/PERMISSION_DENIED|permission-denied/i.test(code+' '+msg))return '保存できません：Firebaseの権限で拒否されました。付属の firebase_rules_v52.json をRealtime Databaseのルールに反映してください。';
 if(/network|offline|disconnected/i.test(code+' '+msg))return '保存できません：通信状態を確認してください。';
 if(/too large|payload|maximum|size/i.test(code+' '+msg))return '保存できません：データが大きすぎます。大きな写真を削除するか、小さい写真にしてください。';
 return `保存に失敗しました：${msg||code||'不明なエラー'}`
}
async function save(){
 const btn=document.querySelector('.v51-save'),st=document.querySelector('.v51-status');
 if(btn)btn.disabled=true;if(st){st.classList.remove('error');st.textContent='保存中…'};
 try{
   const user=firebase.auth().currentUser;
   if(!user)throw {code:'AUTH_REQUIRED',message:'スタッフのログイン状態が切れています。いったんログアウトして、もう一度ログインしてください。'};
   if(user.uid!=='kFSCzY1oNPaSJRuI1N8DSDQOpdq1')throw {code:'PERMISSION_DENIED',message:'スタッフ権限ではないアカウントでログインしています。'};
   normalizeSoups(draft);
   const payload=cleanForFirebase(draft);
   const bytes=new Blob([JSON.stringify(payload)]).size;
   if(bytes>12*1024*1024)throw {code:'DATA_TOO_LARGE',message:`メニューデータが大きすぎます（約${(bytes/1024/1024).toFixed(1)}MB）。写真サイズを減らしてください。`};
   await firebase.database().ref('menu').set(payload);
   const check=await firebase.database().ref('menu').once('value');
   if(!check.exists())throw {code:'VERIFY_FAILED',message:'保存後の確認ができませんでした。'};
   draft=mergeSpecial(check.val());
   dirty=false;
   if(st)st.textContent='保存しました ✓';
   setTimeout(()=>{if(btn)btn.disabled=false},500)
 }catch(e){
   console.error('menu save failed',e);
   if(st){st.classList.add('error');st.textContent=humanSaveError(e)};
   if(btn)btn.disabled=false
 }
}
async function mount(){
 if(mounted)return;mounted=true;
 try{await loadDraft();render()}catch(e){console.error(e);mounted=false}
}
const mo=new MutationObserver(()=>{
 const tab=document.querySelector('.cashier-tab[data-tab="menu"].active');
 if(tab){if(!document.querySelector('.v51-editor-wrap')){mounted=false;mount()}}
 else mounted=false;
});
mo.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
})();
