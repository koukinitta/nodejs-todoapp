const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  //ここにデータの構造を定義していく
  name: {
    type: String,
    // trueにするとこの項目を絶対に書かないといけない。書いてないとエラーが吐かれる
    required: [true,"タスク名を入れてください"],
    //空白を削除してくれる
    trim: true,
    //文字数の制限
    maxlength: [40, "タスク名は40文字以内で入力してください"],
  },
  completed: {
    type: Boolean,
    //初期値がfalse
    default: false,
  }
})

module.exports = mongoose.model("Task", TaskSchema);