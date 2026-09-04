福林楼 v5.2 2スタッフ＋読み上げ修正版

含まれるファイル
- staff.html : 2人のスタッフUIDに対応。読み上げ修正版と組み合わせる前提。
- v4-enhance.js : 新規注文通知の読み上げ修正版。
- firebase_rules_2staff.json : 2人のスタッフUIDを許可するRealtime Database Rules。

反映手順
1. 現在のv5.2フォルダの staff.html と v4-enhance.js を、このZIP内の同名ファイルで上書き。
2. Firebase Console > Realtime Database > Rules で firebase_rules_2staff.json の内容に置き換えて公開。
3. フォルダ全体をZIPにして、現在のNetlify fukurinrou-order の Production deploys にアップロード。
4. 2人目のアカウントで staff.html にログインし、注文表示・調理完了・会計・履歴・メニュー保存を確認。
5. キッチン端末では通知音・中国語読み上げを一度ONにする。

注意
- パスワードはこのファイルには保存していません。
- 共有済みのパスワードは安全のため変更を推奨します。UIDは変更されません。
