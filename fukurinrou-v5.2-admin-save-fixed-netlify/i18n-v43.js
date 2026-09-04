(function(){
'use strict';
const EN={
    '中国料理':'Chinese Cuisine','福林楼':'Fukurinrou','お好きな料理を選んでご注文ください':'Choose your dishes and place your order.',
    '昼メニュー販売中':'Lunch menu available','夜メニュー販売中':'Dinner menu available','通常メニュー':'Regular menu',
    '昼限定':'Lunch only','夜限定':'Dinner only','店内写真':'Restaurant photo','イメージ':'Photo for reference','売り切れ':'Sold out',
    '辛さ・サイズなどを選べます':'Choose spice level, size, and more','選んで追加':'Choose & Add','選択中':'Selected',
    '注文内容を確認':'Review order','ご注文内容の確認':'Review your order','合計':'Total','この内容で注文する':'Place order','メニューに戻って直す':'Back to menu',
    '送信中…':'Sending…','送信できませんでした。通信状態をご確認ください。':'Could not send your order. Please check your connection.',
    'ご注文を承りました':'Order received','厨房に送信しました':'Sent to the kitchen','追加で注文する':'Order more',
    '基本価格':'Base price','選択後：':'After options:','その他のご要望（任意）':'Other requests (optional)','キャンセル':'Cancel','この内容で追加':'Add with these options',
    '辛さ':'Spice level','控えめ':'Mild','普通':'Regular','辛め':'Spicy','激辛':'Extra spicy','お召し上がり方':'Order type','単品':'A la carte','定食':'Set meal',
    '麺の量':'Noodle size','ご飯の量':'Rice size','チャーハンの量':'Fried rice size','漬物':'Pickles','大盛り':'Large','半チャーハン':'Half fried rice',
    '面食類':'Dim Sum & Dumplings','前菜類':'Appetizers','主菜①':'Main Dishes 1','主菜②':'Main Dishes 2','野菜':'Vegetables','スープ':'Soups','デザート':'Desserts',
    '昼・福林セット':'Lunch · Fukurin Set','昼・定食':'Lunch · Set Meals','昼・麺類':'Lunch · Noodles','昼・飯類':'Lunch · Rice',
    '夜・福林セット':'Dinner · Fukurin Set','夜・晩酌セット':'Dinner · Drink Sets','夜・定食':'Dinner · Set Meals','夜・麺類':'Dinner · Noodles','夜・飯類':'Dinner · Rice',
    '焼き餃子':'Pan-fried Gyoza','自家製小籠包':'Homemade Xiao Long Bao','水餃子':'Boiled Dumplings','自家製春巻き':'Homemade Spring Rolls','ニラ饅頭':'Chive Dumplings','蒸しセット':'Steamed Dim Sum Set','蒸し餃子':'Steamed Dumplings','自家製薄焼き餠':'Homemade Thin Pancake','エビ棒春巻き':'Shrimp Spring Roll',
    'クラゲの中華酢和え':'Jellyfish in Chinese Vinegar','ピータン':'Century Egg','ピータンと豆腐の和え物':'Century Egg with Tofu','自家製チャーシュー':'Homemade Char Siu','鴨のスモーク':'Smoked Duck','ザーサイ':'Pickled Mustard Stem','野菜サラダ':'Vegetable Salad','鶏軟骨唐揚げ':'Fried Chicken Cartilage','枝豆':'Edamame','ニンニク入り中華風たたききゅうり':'Chinese Smashed Cucumber with Garlic','フライドポテト':'French Fries','下足の醤油かけ サクサク揚げ':'Crispy Fried Squid Tentacles with Soy Sauce','自家製広州風味鶏肉チャーシュー':'Homemade Cantonese-style Chicken Char Siu','中華風ローストチキン':'Chinese-style Roast Chicken','棒棒鶏':'Bang Bang Chicken','甲イカお湯引きネギ油ソース':'Blanched Cuttlefish with Scallion Oil','塩味ニラ玉子焼き':'Salted Chive Omelet','口水鷄':'Sichuan Mouthwatering Chicken',
    'イカと野菜の豆板醤炒め':'Squid & Vegetables in Chili Bean Sauce','エビのチリソース炒め':'Shrimp in Chili Sauce','エビのチリソース炒め（小）':'Shrimp in Chili Sauce (Small)','回鍋肉':'Twice-cooked Pork','酢豚':'Sweet & Sour Pork','酢豚（小）':'Sweet & Sour Pork (Small)','海鮮八宝菜':'Seafood Chop Suey','ピーマンと豚肉の炒め':'Pork & Green Pepper Stir-fry','ピーマンと牛肉の炒め':'Beef & Green Pepper Stir-fry','油淋鶏':'Yurinchi Fried Chicken','油淋鶏（小）':'Yurinchi Fried Chicken (Small)','トマトと玉子炒め':'Tomato & Egg Stir-fry','トマトと玉子炒め（小）':'Tomato & Egg Stir-fry (Small)','若鶏の唐揚げ':'Fried Chicken','豚肉入りマーラー鍋':'Mala Hot Pot with Pork','マーボー豆腐':'Mapo Tofu','黒酢酢豚':'Black Vinegar Sweet & Sour Pork','五目と玉子炒め':'Mixed Stir-fry with Egg','エビの天ぷら':'Shrimp Tempura','エビの天ぷら（小）':'Shrimp Tempura (Small)','エビのマヨネーズ炒め':'Shrimp with Mayonnaise',
    '豚肉の辛味煮込み':'Spicy Braised Pork','生菜包':'Lettuce Wraps','揚げ手羽先':'Fried Chicken Wings','鶏肉と山椒のピリ辛炒め':'Spicy Chicken with Sichuan Pepper','若鶏とカシューナッツの炒め':'Chicken with Cashew Nuts','豚ヒレの天ぷら':'Pork Fillet Tempura','牛肉とオイスターソース炒め':'Beef in Oyster Sauce','ユウシャンロウス（魚香肉絲）':'Yu Xiang Pork','北海道産ホタテ炒め':'Hokkaido Scallop Stir-fry','フカヒレ玉のあんかけ':'Braised Shark Fin in Thick Sauce','フカヒレあんかけ':'Braised Shark Fin in Thick Sauce','四川風エビの野菜炒め':'Sichuan Shrimp & Vegetable Stir-fry','蒸しパン':'Steamed Bun','豚の角煮':'Braised Pork Belly','ニラと豚レバーの炒め':'Chive & Pork Liver Stir-fry','海鮮三種炒め':'Three-Seafood Stir-fry','海鮮おこげ':'Seafood Crispy Rice',
    'マーボーナス':'Mapo Eggplant','マーボー春雨':'Mapo Glass Noodles','チンゲン菜とクコシの炒め':'Bok Choy & Goji Berry Stir-fry','究極のもやしと豚肉強火炒め':'Wok-fried Bean Sprouts & Pork','レタスとオイスターソース炒め':'Lettuce in Oyster Sauce','千切じゃがいもの炒め':'Shredded Potato Stir-fry',
    'フカヒレスープ':'Shark Fin Soup','フカヒレスープ（小）':'Shark Fin Soup (Small)','スーラータン':'Hot & Sour Soup','スーラータン（小）':'Hot & Sour Soup (Small)','玉子スープ':'Egg Soup','玉子スープ（小）':'Egg Soup (Small)','春雨スープ':'Glass Noodle Soup','春雨スープ（小）':'Glass Noodle Soup (Small)','コンスープ':'Corn Soup','コンスープ（小）':'Corn Soup (Small)',
    '黒ごまアイス':'Black Sesame Ice Cream','大学もち':'Candied Mochi','大学いも':'Candied Sweet Potato','ごま団子':'Sesame Balls','マンゴープリン':'Mango Pudding',
    'ラーメンと炒飯セット':'Ramen & Fried Rice Set','担々麺と炒飯セット':'Dan Dan Noodles & Fried Rice Set','焼き餃子と炒飯セット':'Gyoza & Fried Rice Set','水餃子と炒飯セット':'Boiled Dumplings & Fried Rice Set','エビチリ定食':'Shrimp Chili Set Meal','回鍋肉定食':'Twice-cooked Pork Set Meal','酢豚定食':'Sweet & Sour Pork Set Meal','マーボー豆腐定食':'Mapo Tofu Set Meal','麻辣牛肉麺':'Mala Beef Noodles','麻婆麺':'Mapo Noodles','五目ラーメン':'Mixed Ramen','担々麺':'Dan Dan Noodles','酸辣麺':'Hot & Sour Noodles','チャンポン':'Champon','しょうゆラーメン':'Soy Sauce Ramen','柔らかい焼きそば':'Soft Yakisoba','パリパリ皿うどん':'Crispy Sara Udon','焼きビーフン':'Stir-fried Rice Noodles','チャーハン':'Fried Rice','エビ・レタスチャーハン':'Shrimp & Lettuce Fried Rice','エビとレタス炒飯':'Shrimp & Lettuce Fried Rice','豚肉辛チャーハン':'Spicy Pork Fried Rice','天津飯':'Tenshin Rice','中華丼':'Chinese-style Rice Bowl','マーボー丼':'Mapo Rice Bowl','白ご飯':'Steamed Rice','担々麺と焼き餃子セット':'Dan Dan Noodles & Gyoza Set','ラーメンと焼き餃子セット':'Ramen & Gyoza Set','マーボー豆腐セット':'Mapo Tofu Set','酢豚セット':'Sweet & Sour Pork Set','おつまみ':'Appetizer Set','揚げ3種':'Three Fried Items','エビチリセット':'Shrimp Chili Set','油淋鶏セット':'Yurinchi Chicken Set','五目と玉子の炒めセット':'Mixed Egg Stir-fry Set','油淋鶏定食':'Yurinchi Chicken Set Meal','八宝菜定食':'Chop Suey Set Meal','ラーメン':'Ramen',
    '通常サイズ':'Regular size','小サイズ':'Small size','8個':'8 pieces','6個':'6 pieces','5個':'5 pieces','3個':'3 pieces','1本':'1 piece','漬物付き':'Includes pickles','卵スープ・漬物付き':'Includes egg soup & pickles','豚の辛味噌炒め':'Spicy miso pork stir-fry','揚げ鶏肉のねぎ醤油かけ／通常サイズ':'Fried chicken with scallion soy sauce / regular size','店長おすすめ':'Chef’s recommendation','鶏肉のゴマダレ和え物':'Chicken with sesame sauce','薬味付豚肉炒め':'Seasoned pork stir-fry','1個・豚の角煮と一緒にどうぞ':'1 piece · Great with braised pork belly','旨辛牛肉ラーメン':'Spicy beef ramen','タンタンメン':'Dan Dan noodles','酢と胡椒入り辛ラーメン':'Spicy sour noodle soup with vinegar & pepper','エビ大玉丼':'Shrimp egg rice bowl','半チャーハン 400円も選べます':'Half fried rice (¥400) available'
  };
const KO={
    '中国料理':'중화요리','福林楼':'후쿠린로','お好きな料理を選んでご注文ください':'원하시는 메뉴를 선택해 주문해 주세요.',
    '昼メニュー販売中':'점심 메뉴 판매 중','夜メニュー販売中':'저녁 메뉴 판매 중','通常メニュー':'일반 메뉴','昼限定':'점심 한정','夜限定':'저녁 한정','店内写真':'매장 사진','イメージ':'참고 이미지','売り切れ':'품절',
    '辛さ・サイズなどを選べます':'맵기·사이즈 등을 선택할 수 있습니다','選んで追加':'선택해서 담기','選択中':'선택 중','注文内容を確認':'주문 내용 확인','ご注文内容の確認':'주문 내용 확인','合計':'합계','この内容で注文する':'이 내용으로 주문','メニューに戻って直す':'메뉴로 돌아가 수정','送信中…':'전송 중…','送信できませんでした。通信状態をご確認ください。':'주문을 전송하지 못했습니다. 네트워크 상태를 확인해 주세요.','ご注文を承りました':'주문이 접수되었습니다','厨房に送信しました':'주방으로 전송했습니다','追加で注文する':'추가 주문','基本価格':'기본 가격','選択後：':'선택 후:','その他のご要望（任意）':'기타 요청사항(선택)','キャンセル':'취소','この内容で追加':'이 내용으로 담기',
    '辛さ':'맵기','控えめ':'순한맛','普通':'보통','辛め':'매운맛','激辛':'아주 매운맛','お召し上がり方':'주문 형태','単品':'단품','定食':'정식','麺の量':'면 양','ご飯の量':'밥 양','チャーハンの量':'볶음밥 양','漬物':'절임','大盛り':'곱빼기','半チャーハン':'반 볶음밥',
    '面食類':'딤섬','前菜類':'전채','主菜①':'메인요리 1','主菜②':'메인요리 2','野菜':'채소요리','スープ':'스프,국물','デザート':'디저트','昼・福林セット':'점심 · 후쿠린 세트','昼・定食':'점심 · 정식','昼・麺類':'점심 · 면류','昼・飯類':'점심 · 밥류','夜・福林セット':'저녁 · 후쿠린 세트','夜・晩酌セット':'저녁 · 주류 세트','夜・定食':'저녁 · 정식','夜・麺類':'저녁 · 면류','夜・飯類':'저녁 · 밥류',
    '焼き餃子':'군만두','自家製小籠包':'수제 샤오롱바오','水餃子':'물만두','自家製春巻き':'수제 춘권','ニラ饅頭':'부추 만두','蒸しセット':'찜만두 세트','蒸し餃子':'찐만두','自家製薄焼き餠':'수제 중국식 얇은 전병','エビ棒春巻き':'새우 스틱 춘권',
    'クラゲの中華酢和え':'해파리 중화식 초무침','ピータン':'피단','ピータンと豆腐の和え物':'피단 두부무침','自家製チャーシュー':'수제 차슈','鴨のスモーク':'훈제 오리','ザーサイ':'자차이','野菜サラダ':'야채 샐러드','鶏軟骨唐揚げ':'닭연골 튀김','枝豆':'에다마메','ニンニク入り中華風たたききゅうり':'마늘 중화식 오이무침','フライドポテト':'감자튀김','下足の醤油かけ サクサク揚げ':'오징어 다리 바삭튀김 간장소스','自家製広州風味鶏肉チャーシュー':'수제 광둥식 닭 차슈','中華風ローストチキン':'중화식 로스트 치킨','棒棒鶏':'방방지','甲イカお湯引きネギ油ソース':'갑오징어 데침 파기름 소스','塩味ニラ玉子焼き':'부추 달걀부침','口水鷄':'커우수이지',
    'イカと野菜の豆板醤炒め':'오징어 야채 두반장 볶음','エビのチリソース炒め':'칠리새우','エビのチリソース炒め（小）':'칠리새우 (소)','回鍋肉':'회과육','酢豚':'탕수육','酢豚（小）':'탕수육 (소)','海鮮八宝菜':'해물 팔보채','ピーマンと豚肉の炒め':'피망 돼지고기 볶음','ピーマンと牛肉の炒め':'피망 소고기 볶음','油淋鶏':'유린기','油淋鶏（小）':'유린기 (소)','トマトと玉子炒め':'토마토 달걀 볶음','トマトと玉子炒め（小）':'토마토 달걀 볶음 (소)','若鶏の唐揚げ':'닭튀김','豚肉入りマーラー鍋':'돼지고기 마라 전골','マーボー豆腐':'마파두부','黒酢酢豚':'흑초 탕수육','五目と玉子炒め':'오목 달걀 볶음','エビの天ぷら':'새우튀김','エビの天ぷら（小）':'새우튀김 (소)','エビのマヨネーズ炒め':'새우 마요 볶음',
    '豚肉の辛味煮込み':'매운 돼지고기 조림','生菜包':'상추쌈','揚げ手羽先':'닭날개 튀김','鶏肉と山椒のピリ辛炒め':'산초 매콤 닭볶음','若鶏とカシューナッツの炒め':'닭고기 캐슈넛 볶음','豚ヒレの天ぷら':'돼지 안심 튀김','牛肉とオイスターソース炒め':'소고기 굴소스 볶음','ユウシャンロウス（魚香肉絲）':'어향육슬','北海道産ホタテ炒め':'홋카이도 가리비 볶음','フカヒレ玉のあんかけ':'샥스핀 걸쭉한 소스','フカヒレあんかけ':'샥스핀 걸쭉한 소스','四川風エビの野菜炒め':'사천식 새우 야채 볶음','蒸しパン':'찐빵','豚の角煮':'돼지고기 동파육','ニラと豚レバーの炒め':'부추 돼지간 볶음','海鮮三種炒め':'해산물 3종 볶음','海鮮おこげ':'해물 누룽지',
    'マーボーナス':'마파가지','マーボー春雨':'마파 당면','チンゲン菜とクコシの炒め':'청경채 구기자 볶음','究極のもやしと豚肉強火炒め':'숙주 돼지고기 센불 볶음','レタスとオイスターソース炒め':'상추 굴소스 볶음','千切じゃがいもの炒め':'채 썬 감자 볶음','フカヒレスープ':'샥스핀 스프','フカヒレスープ（小）':'샥스핀 스프 (소)','スーラータン':'산라탕','スーラータン（小）':'산라탕 (소)','玉子スープ':'계란국','玉子スープ（小）':'계란국 (소)','春雨スープ':'당면국','春雨スープ（小）':'당면국 (소)','コンスープ':'옥수수 스프','コンスープ（小）':'옥수수 스프 (소)','黒ごまアイス':'흑임자 아이스크림','大学もち':'달콤한 모치','大学いも':'맛탕','ごま団子':'참깨 경단','マンゴープリン':'망고 푸딩',
    'ラーメンと炒飯セット':'라멘+볶음밥 세트','担々麺と炒飯セット':'탄탄면+볶음밥 세트','焼き餃子と炒飯セット':'군만두+볶음밥 세트','水餃子と炒飯セット':'물만두+볶음밥 세트','エビチリ定食':'칠리새우 정식','回鍋肉定食':'회과육 정식','酢豚定食':'탕수육 정식','マーボー豆腐定食':'마파두부 정식','麻辣牛肉麺':'마라 우육면','麻婆麺':'마파면','五目ラーメン':'오목 라멘','担々麺':'탄탄면','酸辣麺':'산라면','チャンポン':'짬뽕','しょうゆラーメン':'간장 라멘','柔らかい焼きそば':'부드러운 야키소바','パリパリ皿うどん':'바삭 사라우동','焼きビーフン':'볶음 쌀국수','チャーハン':'볶음밥','エビ・レタスチャーハン':'새우 레터스 볶음밥','エビとレタス炒飯':'새우 레터스 볶음밥','豚肉辛チャーハン':'매운 되지고기 볶음밥','天津飯':'텐신항','中華丼':'중화덮밥','マーボー丼':'마파덮밥','白ご飯':'공기밥','担々麺と焼き餃子セット':'탄탄면+군만두 세트','ラーメンと焼き餃子セット':'라멘+군만두 세트','マーボー豆腐セット':'마파두부 세트','酢豚セット':'탕수육 세트','おつまみ':'안주 세트','揚げ3種':'튀김 3종','エビチリセット':'칠리새우 세트','油淋鶏セット':'유린기 세트','五目と玉子の炒めセット':'오목 달걀 볶음 세트','油淋鶏定食':'유린기 정식','八宝菜定食':'팔보채 정식','ラーメン':'라멘',
    '通常サイズ':'보통 사이즈','小サイズ':'소 사이즈','8個':'8개','6個':'6개','5個':'5개','3個':'3개','1本':'1개','漬物付き':'절임 포함','卵スープ・漬物付き':'계란국·절임 포함','豚の辛味噌炒め':'매운 된장 돼지고기 볶음','揚げ鶏肉のねぎ醤油かけ／通常サイズ':'튀긴 닭고기 파간장 / 보통 사이즈','店長おすすめ':'점장 추천','鶏肉のゴマダレ和え物':'닭고기 참깨소스 무침','薬味付豚肉炒め':'향신 돼지고기 볶음','1個・豚の角煮と一緒にどうぞ':'1개 · 동파육과 함께 드세요','旨辛牛肉ラーメン':'매콤한 우육 라멘','タンタンメン':'탄탄면','酢と胡椒入り辛ラーメン':'식초와 후추가 들어간 매콤한 라멘','エビ大玉丼':'새우 달걀 덮밥','半チャーハン 400円も選べます':'반 볶음밥(400엔) 선택 가능'
  };
Object.assign(EN,{"言語":"Language","日本語":"日本語","English":"English","한국어":"한국어","テーブル":"Table","注文開始":"Start Ordering","このテーブルで注文を開始します":"Start an order for this table.","注文を開始する":"Start Order","追加で注文する":"Order More","ご注文を承りました":"Order received","厨房に送信しました":"Sent to the kitchen","ご注文テーブル":"Your Table","通常":"Regular","セット":"Set","定食・単品":"Set meal / A la carte","辛さ調整":"Spice adjustable","麺類":"Noodles","飯類":"Rice","量":"Size","内容を選ぶ":"Choose options","定食・単品を選ぶ":"Choose set / a la carte","辛さを選ぶ":"Choose spice","辛さ・量を選ぶ":"Choose spice / size","定食・単品・辛さを選ぶ":"Choose type / spice","選択してください":"Please choose","定食・単品 / 辛さ / サイズなどを選べます":"Choose set/a la carte, spice level, size, and more","定食・単品、辛さ、大盛り、その他のご要望を分けて選べます。":"Choose set/a la carte, spice, large size, and other requests separately.","注文内容を確認":"Review Order","注文テーブル":"Table","注文しました":"Order sent","会計後はこの画面が自動でリセットされます":"This screen will reset automatically after checkout.","昼限定。焼き餃子は大きめのため、ご提供まで15分ほどかかる場合があります。":"Lunch only. Our gyoza are large and may take about 15 minutes to serve.","ご飯・スープ・一品・漬物付き。定食のご飯お替り無料。":"Includes rice, soup, a side dish, and pickles. Free rice refills with set meals.","「定食」を選ぶと、ご飯・スープ・一品・漬物付き。麺大盛り＋200円。":"Choose Set Meal to add rice, soup, a side dish, and pickles. Large noodles +¥200.","チャーハン大盛り＋250円／丼物大盛り＋150円。":"Large fried rice +¥250 / Large rice bowl +¥150.","夜限定。焼き餃子は大きめのため、ご提供まで15分ほどかかる場合があります。":"Dinner only. Our gyoza are large and may take about 15 minutes to serve.","生ビール（中）・ザーサイ・枝豆・棒棒鶏・一品料理のセット。":"Set with medium draft beer, zha cai, edamame, bang bang chicken, and one dish.","定食のご飯はお替りできません。ご飯大盛り＋100円。":"Rice refills are not available for this set meal. Large rice +¥100.","麺大盛り＋200円。":"Large noodles +¥200.","海老揚げ春巻き・唐揚げ":"Shrimp spring roll & fried chicken","ハッボウ菜":"Chop suey","チャーシュー入り鶏スープ":"Chicken broth with char siu","要望":"Request","例：ねぎ少なめ（対応できる範囲）":"e.g. less scallion (if possible)","選択後":"After options","点":"items"});
Object.assign(KO,{"言語":"언어","日本語":"日本語","English":"English","한국어":"한국어","テーブル":"테이블","注文開始":"주문 시작","このテーブルで注文を開始します":"이 테이블에서 주문을 시작합니다.","注文を開始する":"주문 시작하기","追加で注文する":"추가 주문","ご注文を承りました":"주문이 접수되었습니다","厨房に送信しました":"주방으로 전송했습니다","ご注文テーブル":"주문 테이블","通常":"일반","セット":"세트","定食・単品":"정식 / 단품","辛さ調整":"맵기 조절","麺類":"면류","飯類":"밥류","量":"양","内容を選ぶ":"옵션 선택","定食・単品を選ぶ":"정식 / 단품 선택","辛さを選ぶ":"맵기 선택","辛さ・量を選ぶ":"맵기 / 양 선택","定食・単品・辛さを選ぶ":"주문 형태 / 맵기 선택","選択してください":"선택해 주세요","定食・単品 / 辛さ / サイズなどを選べます":"정식/단품, 맵기, 사이즈 등을 선택할 수 있습니다","定食・単品、辛さ、大盛り、その他のご要望を分けて選べます。":"정식/단품, 맵기, 곱빼기, 기타 요청사항을 각각 선택할 수 있습니다.","注文内容を確認":"주문 내용 확인","注文テーブル":"테이블","注文しました":"주문 전송 완료","会計後はこの画面が自動でリセットされます":"결제 완료 후 이 화면은 자동으로 초기화됩니다.","昼限定。焼き餃子は大きめのため、ご提供まで15分ほどかかる場合があります。":"점심 한정. 군만두는 크기가 커서 제공까지 약 15분 정도 걸릴 수 있습니다.","ご飯・スープ・一品・漬物付き。定食のご飯お替り無料。":"밥, 국물, 반찬 1종, 절임 포함. 정식 밥은 무료 리필 가능합니다.","「定食」を選ぶと、ご飯・スープ・一品・漬物付き。麺大盛り＋200円。":"정식을 선택하면 밥, 국물, 반찬 1종, 절임이 포함됩니다. 면 곱빼기 +200엔.","チャーハン大盛り＋250円／丼物大盛り＋150円。":"볶음밥 곱빼기 +250엔 / 덮밥 곱빼기 +150엔.","夜限定。焼き餃子は大きめのため、ご提供まで15分ほどかかる場合があります。":"저녁 한정. 군만두는 크기가 커서 제공까지 약 15분 정도 걸릴 수 있습니다.","生ビール（中）・ザーサイ・枝豆・棒棒鶏・一品料理のセット。":"생맥주(중), 자차이, 에다마메, 방방지, 일품요리 1종 세트.","定食のご飯はお替りできません。ご飯大盛り＋100円。":"정식 밥은 리필할 수 없습니다. 밥 곱빼기 +100엔.","麺大盛り＋200円。":"면 곱빼기 +200엔.","海老揚げ春巻き・唐揚げ":"새우 춘권·닭튀김","ハッボウ菜":"팔보채","チャーシュー入り鶏スープ":"차슈가 들어간 닭 육수","要望":"요청","例：ねぎ少なめ（対応できる範囲）":"예: 파 적게 (가능한 범위에서)","選択後":"선택 후","点":"개"});
Object.assign(EN,{"料理":"Food","ドリンク・お酒":"Drinks & Alcohol","アルコール":"Alcohol","ノンアルコール":"Non-alcoholic Beer","ソフトドリンク・お茶":"Soft Drinks & Tea","ビール・ハイボール":"Beer & Highballs","焼酎":"Shochu","中国酒":"Chinese Liquor","果実酒・サワー":"Fruit Liquor & Sours","日本酒・ワイン":"Sake & Wine","コーラ":"Cola","オレンジ":"Orange Juice","カルピス":"Calpis","ウーロン茶":"Oolong Tea","普洱茶（プーアル茶）":"Pu-erh Tea","茉莉花茶（ジャスミン茶）":"Jasmine Tea","生ビール（アサヒ）":"Draft Beer (Asahi)","アサヒ瓶ビール":"Asahi Bottled Beer","キリン瓶ビール":"Kirin Bottled Beer","青島ビール":"Tsingtao Beer","角ハイボール":"Kaku Highball","濃め角ハイボール":"Strong Kaku Highball","コックハイ":"Cola Highball","角レモンハイ":"Kaku Lemon Highball","角ウーロンハイ":"Kaku Oolong Highball","角桃ハイ":"Kaku Peach Highball","角巨峰ハイ":"Kaku Grape Highball","黒霧島（芋）":"Kuro Kirishima (Sweet Potato)","島美人（芋）":"Shima Bijin (Sweet Potato)","雲海（そば）":"Unkai (Buckwheat)","かのか（麦）":"Kanoka (Barley)","二階堂（麦）":"Nikaido (Barley)","しろ（米）":"Shiro (Rice)","紹興酒（関帝5年）":"Shaoxing Wine (Kantei 5 Years)","紹興酒（関帝10年）":"Shaoxing Wine (Kantei 10 Years)","中国白酒（42度）":"Chinese Baijiu (42%)","中国白酒（56度）":"Chinese Baijiu (56%)","梅酒":"Plum Wine","桂花陳酒（ケイカチン酒）":"Osmanthus Wine","杏露酒（シンル酒）":"Apricot Liqueur","荔枝酒（ライチ酒）":"Lychee Liqueur","林檎酒（リンゴ酒）":"Apple Liqueur","もも酒":"Peach Liqueur","パイナ酒":"Pineapple Liqueur","レモンサワー":"Lemon Sour","カルピスサワー":"Calpis Sour","巨峰サワー":"Grape Sour","ももサワー":"Peach Sour","コーラサワー":"Cola Sour","パイナサワー":"Pineapple Sour","赤ワイン":"Red Wine","冷酒（瓶300ml）":"Chilled Sake (300 ml bottle)","日本酒（150ml）":"Sake (150 ml)","日本酒（250ml）":"Sake (250 ml)","注文方法":"Order type","グラス":"Glass","キープ":"Bottle keep","割り方":"Serving style","ロック":"On the rocks","水割":"With water","湯割":"With hot water","ソーダ割":"With soda","提供温度":"Temperature","冷":"Cold","温":"Warm","キープ 2,380円":"Bottle keep ¥2,380","キープ 2,580円":"Bottle keep ¥2,580","キープ 4,580円":"Bottle keep ¥4,580","キープ 2,680円":"Bottle keep ¥2,680","お湯のお替りできます。":"Hot water refills available.","ロック・水割・湯割・ソーダ割が可能です。":"Available on the rocks, with water, hot water, or soda.","紹興酒は冷・温どちらもできます。":"Shaoxing wine can be served cold or warm.","アルコールをご注文の際は年齢・運転予定の確認があります。":"Age and driving status will be checked for alcohol orders.","アルコール注文の確認":"Alcohol Order Check","未成年の飲酒、飲酒運転は法律で禁じられています。自転車も運転に含みます。":"Underage drinking and drinking and driving are prohibited by law. Bicycles are included.","20歳以上ですか？":"Are you 20 or older?","本日、車・バイク・自転車を運転する予定がありますか？":"Will you drive a car, motorcycle, or bicycle today?","はい":"Yes","いいえ":"No","はい、運転します":"Yes, I will drive","いいえ、運転しません":"No, I will not drive","アルコールは注文できません。":"Alcohol cannot be ordered.","確認して進む":"Confirm & Continue"});
Object.assign(KO,{"料理":"요리","ドリンク・お酒":"음료·주류","アルコール":"주류","ノンアルコール":"무알코올 맥주","ソフトドリンク・お茶":"음료·차","ビール・ハイボール":"맥주·하이볼","焼酎":"쇼추","中国酒":"중국주","果実酒・サワー":"과실주·사와","日本酒・ワイン":"사케·와인","コーラ":"콜라","オレンジ":"오렌지 주스","カルピス":"칼피스","ウーロン茶":"우롱차","普洱茶（プーアル茶）":"보이차","茉莉花茶（ジャスミン茶）":"자스민차","生ビール（アサヒ）":"생맥주(아사히)","アサヒ瓶ビール":"아사히 병맥주","キリン瓶ビール":"기린 병맥주","青島ビール":"칭다오 맥주","角ハイボール":"카쿠 하이볼","濃め角ハイボール":"진한 카쿠 하이볼","コックハイ":"콜라 하이볼","角レモンハイ":"카쿠 레몬 하이볼","角ウーロンハイ":"카쿠 우롱 하이볼","角桃ハイ":"카쿠 복숭아 하이볼","角巨峰ハイ":"카쿠 포도 하이볼","黒霧島（芋）":"쿠로키리시마(고구마)","島美人（芋）":"시마비진(고구마)","雲海（そば）":"운카이(메밀)","かのか（麦）":"카노카(보리)","二階堂（麦）":"니카이도(보리)","しろ（米）":"시로(쌀)","紹興酒（関帝5年）":"소흥주(관제 5년)","紹興酒（関帝10年）":"소흥주(관제 10년)","中国白酒（42度）":"중국 바이주(42도)","中国白酒（56度）":"중국 바이주(56도)","梅酒":"매실주","桂花陳酒（ケイカチン酒）":"계화진주","杏露酒（シンル酒）":"살구주","荔枝酒（ライチ酒）":"리치주","林檎酒（リンゴ酒）":"사과주","もも酒":"복숭아주","パイナ酒":"파인애플주","レモンサワー":"레몬 사와","カルピスサワー":"칼피스 사와","巨峰サワー":"포도 사와","ももサワー":"복숭아 사와","コーラサワー":"콜라 사와","パイナサワー":"파인애플 사와","赤ワイン":"레드 와인","冷酒（瓶300ml）":"냉사케(300ml 병)","日本酒（150ml）":"사케(150ml)","日本酒（250ml）":"사케(250ml)","注文方法":"주문 방식","グラス":"잔","キープ":"보틀 킵","割り方":"마시는 방법","ロック":"온더록","水割":"물 타서","湯割":"뜨거운 물 타서","ソーダ割":"소다 타서","提供温度":"온도","冷":"차갑게","温":"따뜻하게","キープ 2,380円":"보틀 킵 2,380엔","キープ 2,580円":"보틀 킵 2,580엔","キープ 4,580円":"보틀 킵 4,580엔","キープ 2,680円":"보틀 킵 2,680엔","お湯のお替りできます。":"뜨거운 물 리필 가능합니다.","ロック・水割・湯割・ソーダ割が可能です。":"온더록·물·뜨거운 물·소다로 주문 가능합니다.","紹興酒は冷・温どちらもできます。":"소흥주는 차갑게 또는 따뜻하게 가능합니다.","アルコールをご注文の際は年齢・運転予定の確認があります。":"주류 주문 시 나이와 운전 여부를 확인합니다.","アルコール注文の確認":"주류 주문 확인","未成年の飲酒、飲酒運転は法律で禁じられています。自転車も運転に含みます。":"미성년자 음주와 음주운전은 법으로 금지되어 있습니다. 자전거도 운전에 포함됩니다.","20歳以上ですか？":"만 20세 이상입니까?","本日、車・バイク・自転車を運転する予定がありますか？":"오늘 자동차·오토바이·자전거를 운전할 예정입니까?","はい":"예","いいえ":"아니요","はい、運転します":"예, 운전합니다","いいえ、運転しません":"아니요, 운전하지 않습니다","アルコールは注文できません。":"주류를 주문할 수 없습니다.","確認して進む":"확인하고 계속"});
Object.assign(EN,{"ソフトドリンク":"Soft drink","飲み方などを選べます":"Choose serving style and other options"});
Object.assign(KO,{"ソフトドリンク":"음료","飲み方などを選べます":"마시는 방법 등 옵션을 선택할 수 있습니다"});

// v4.6: spice scale and explanatory Yurinchi set-meal translations
Object.assign(EN,{"半分辛さ":"Half spice","2倍":"2× spicy","3倍":"3× spicy","油淋鶏定食":"Yurinchi Set Meal — crispy fried chicken with scallion soy sauce"});
Object.assign(KO,{"半分辛さ":"맵기 반","2倍":"2배 맵게","3倍":"3배 맵게","油淋鶏定食":"유린기 정식 — 바삭하게 튀긴 닭고기에 파간장 소스를 곁들인 요리"});

const KEY='fukurinrou_lang_v43';
let lang=localStorage.getItem(KEY)||'ja';
if(!['ja','en','ko'].includes(lang)) lang='ja';
function dict(){return lang==='en'?EN:lang==='ko'?KO:null}
function patterns(s){
  if(lang==='en'){
    let m=s.match(/^(\d{1,2}:\d{2})〜(\d{1,2}:\d{2})は昼限定メニューを表示しています。$/); if(m)return `Lunch-only menu is shown from ${m[1]} to ${m[2]}.`;
    m=s.match(/^(\d{1,2}:\d{2})以降は夜限定メニューを表示しています。$/); if(m)return `Dinner-only menu is shown after ${m[1]}.`;
    m=s.match(/^昼限定は(.+)、夜限定は(.+)〜です。$/); if(m)return `Lunch-only: ${m[1]}; Dinner-only: from ${m[2]}.`;
  } else if(lang==='ko'){
    let m=s.match(/^(\d{1,2}:\d{2})〜(\d{1,2}:\d{2})は昼限定メニューを表示しています。$/); if(m)return `점심 한정 메뉴는 ${m[1]}~${m[2]}에 표시됩니다.`;
    m=s.match(/^(\d{1,2}:\d{2})以降は夜限定メニューを表示しています。$/); if(m)return `저녁 한정 메뉴는 ${m[1]} 이후에 표시됩니다.`;
    m=s.match(/^昼限定は(.+)、夜限定は(.+)〜です。$/); if(m)return `점심 한정: ${m[1]}, 저녁 한정: ${m[2]}부터.`;
  }
  return s;
}
function t(s){s=String(s??'');const d=dict();return d?(d[s]||patterns(s)):s}
function setLang(v){if(!['ja','en','ko'].includes(v))return;lang=v;localStorage.setItem(KEY,v);document.documentElement.lang=v==='ko'?'ko':v==='en'?'en':'ja';window.dispatchEvent(new CustomEvent('fuku-lang-change',{detail:{lang:v}}));}
window.FUKU_I18N={t,setLang,get lang(){return lang},getLang:()=>lang};
document.documentElement.lang=lang==='ko'?'ko':lang==='en'?'en':'ja';

Object.assign(EN,{
  "ゆでた豚肉と野菜を炒めた四川風の豚肉炒め":"Sichuan-style stir-fried pork and vegetables made with boiled pork.",
  "肉・海鮮・野菜のあんかけをご飯にかけた丼":"Rice bowl topped with meat, seafood and vegetables in a savory thick sauce.",
  "中国のからし菜の茎を漬けた、コリコリ食感の漬物":"Crunchy pickled mustard stem, a classic Chinese side dish.",
  "塩ゆでした枝豆":"Lightly salted boiled green soybeans."
});
Object.assign(KO,{
  "ゆでた豚肉と野菜を炒めた四川風の豚肉炒め":"삶은 돼지고기와 채소를 볶아 만든 사천풍 제육볶음이다（回锅肉）",
  "肉・海鮮・野菜のあんかけをご飯にかけた丼":"고기·해산물·채소를 걸쭉한 소스에 볶아 밥 위에 얹은 덮밥",
  "中国のからし菜の茎を漬けた、コリコリ食感の漬物":"중국식 갓줄기 절임으로 아삭한 식감의 짭짤한 반찬",
  "塩ゆでした枝豆":"소금에 살짝 삶은 풋콩"
});

// v4.9: menu-group UI and requested Korean/English description corrections.
Object.assign(EN,{
  "揚げ鶏肉のねぎ醤油かけ":"Crispy fried chicken with scallion soy sauce.",
  "エビとレタスを炒めたチャーハン":"Fried rice stir-fried with shrimp and crisp lettuce.",
  "鶏肉の四川風和え物":"Sichuan-style chicken dressed in a spicy sauce.",
  "蒸し餃子・焼売・小籠包／6個":"Steamed dumplings, shumai & xiao long bao / 6 pieces",
  "蒸し餃子・焼売・小籠包 6個":"Steamed dumplings, shumai & xiao long bao / 6 pieces",
  "餃子":"Dumplings","焼売":"Shumai","小籠包":"Xiao Long Bao",
  "お酒が含まれているため、注文確定時に年齢と運転予定を確認します。":"Your order contains alcohol. Age and driving status will be checked when you place the order."
});
Object.assign(KO,{
  "面食類":"만두",
  "油淋鶏定食":"유린기 정식",
  "揚げ鶏肉のねぎ醤油かけ":"바삭하게 튀긴 닭고기에 파간장 소스를 곁들인 요리",
  "エビとレタスを炒めたチャーハン":"새우와 아삭한 양상추를 함께 볶은 볶음밥",
  "鶏肉の四川風和え物":"삶은 닭고기에 매콤한 사천식 소스를 곁들인 냉채 요리",
  "蒸し餃子・焼売・小籠包／6個":"찐만두·샤오마이·샤오롱바오 / 6개",
  "蒸し餃子・焼売・小籠包 6個":"찐만두·샤오마이·샤오롱바오 / 6개",
  "餃子":"만두","焼売":"샤오마이","小籠包":"샤오롱바오",
  "お酒が含まれているため、注文確定時に年齢と運転予定を確認します。":"주류가 포함되어 있어 주문 확정 시 나이와 운전 여부를 확인합니다."
});
// v5.0: new/recommended menus
Object.assign(EN,{
  "新商品・おすすめ":"New & Recommended","おすすめドリンク":"Recommended Drinks",
  "期間限定・新商品・おすすめメニューです。":"Limited-time, new and recommended dishes.","数量限定のおすすめドリンクです。":"Limited-quantity recommended drink.",
  "蓮根の豚肉はさみ揚げ":"Fried Lotus Root with Pork Filling","3個入り・期間限定。お酒にも合う中華のおかず。":"3 pieces · Limited time. A savory Chinese dish that pairs well with drinks.",
  "麻辣湯":"Mala Tang","花椒の香り、唐辛子の刺激、野菜・海鮮・湯葉などを楽しめる本格マーラータン。":"Authentic mala soup with Sichuan pepper, chili, vegetables, seafood and tofu skin.",
  "麺追加":"Add noodles","なし":"None","インスタントラーメン":"Instant noodles","ビーフン（米粉）":"Rice noodles","春雨":"Glass noodles","ちゃんぽん":"Champon noodles","ラーメン":"Ramen",
  "冷やし中華":"Chilled Chinese Noodles","汁なし担々麺":"Soupless Dan Dan Noodles","夏季限定メニュー":"Summer limited menu",
  "空心菜のにんにく炒め":"Garlic Stir-fried Water Spinach","小松菜のにんにく炒め":"Garlic Stir-fried Komatsuna",
  "鶏肉のチリソース炒め":"Chicken in Chili Sauce","鶏肉の黒酢炒め":"Chicken in Black Vinegar Sauce","鶏肉のマヨネーズ炒め":"Chicken with Mayonnaise",
  "国産豚スペアリブの特製煮込み":"Special Braised Japanese Pork Spare Ribs","おすすめ新メニュー":"Recommended new menu",
  "ガリガリくんアイスサワー":"Garigari-kun Ice Sour","さっぱり甘くておいしい！・数量限定":"Refreshing, sweet and delicious · Limited quantity"
});
Object.assign(KO,{
  "新商品・おすすめ":"신상품·추천","おすすめドリンク":"추천 음료",
  "期間限定・新商品・おすすめメニューです。":"기간 한정·신상품·추천 메뉴입니다.","数量限定のおすすめドリンクです。":"수량 한정 추천 음료입니다.",
  "蓮根の豚肉はさみ揚げ":"연근 돼지고기 샌드 튀김","3個入り・期間限定。お酒にも合う中華のおかず。":"3개 · 기간 한정. 술안주로도 잘 어울리는 중화요리.",
  "麻辣湯":"마라탕","花椒の香り、唐辛子の刺激、野菜・海鮮・湯葉などを楽しめる本格マーラータン。":"화자오 향과 고추의 매운맛, 채소·해산물·푸주 등을 즐길 수 있는 정통 마라탕.",
  "麺追加":"면 추가","なし":"추가 안 함","インスタントラーメン":"인스턴트 라면","ビーフン（米粉）":"쌀국수","春雨":"당면","ちゃんぽん":"짬뽕면","ラーメン":"라멘",
  "冷やし中華":"히야시추카","汁なし担々麺":"비빔 탄탄면","夏季限定メニュー":"여름 한정 메뉴",
  "空心菜のにんにく炒め":"공심채 마늘볶음","小松菜のにんにく炒め":"고마츠나 마늘볶음",
  "鶏肉のチリソース炒め":"닭고기 칠리소스 볶음","鶏肉の黒酢炒め":"닭고기 흑초 볶음","鶏肉のマヨネーズ炒め":"닭고기 마요네즈 볶음",
  "国産豚スペアリブの特製煮込み":"일본산 돼지 스페어립 특제 조림","おすすめ新メニュー":"추천 신메뉴",
  "ガリガリくんアイスサワー":"가리가리군 아이스 사와","さっぱり甘くておいしい！・数量限定":"상큼하고 달콤한 맛 · 수량 한정"
});

// v5.1: size option for unified soup sizes
Object.assign(EN,{"サイズ":"Size","小":"Small"});
Object.assign(KO,{"サイズ":"크기","小":"소"});

})();
