const tasksDom = document.querySelector(".tasks");
const formDom = document.querySelector(".task-form")
const taskInputDom = document.querySelector(".task-input")
const formAlertDom = document.querySelector(".form-alert")

//  /api/v1/tasksからタスクを読み込む
const showTasks = async () => {
  try {
    //自作のAPIを叩く
    const {data:tasks} = await axios.get("/api/v1/tasks");

    //タスクが一つもない時
    console.log(tasks.length)
    if(tasks.length < 1) {
      tasksDom.innerHTML = `<h5 class="empty-list">タスクがありません</h5>`
      return;
    }

    //タスクを出力
    const allTasks = tasks.map((task) => {
      const { completed, _id, name } = task;  //分割代入の記法
      //completedがtrueならば"task-completed"を付加するという意味
      return `<div class="single-task ${completed && "task-completed"}">
      <h5>
          <i class="far fa-check-square"></i><span></span>${name}
      </h5>
      <div class="task-links">
        <!-- 編集リンク -->
        <a href="./edit.html?id=${_id}" class="edit-link">
          <i class="fas fa-edit"></i>
        </a>
        <!-- ゴミ箱 -->
        <button type="button" class="delete-btn" data-id="${_id}">
          <i class="fas fa-minus-square"></i>
        </button>
      </div>
    </div>`
  }).join("")  //配列の要素を区切るカンマを取り除く方法
  tasksDom.innerHTML = allTasks;
  } catch (err) {
    console.log(err)
  }
}

showTasks();


//タスクを新規作成する
formDom.addEventListener("submit", async (event) => {
  /*今回は送信ボタンを押した時に、リロードさせたくないため、
  eventという引数を取り、eventにpreventDefault関数を実行することでリロードを防ぐことができる*/
  event.preventDefault();
  const name = taskInputDom.value;

  try {
    await axios.post('/api/v1/tasks', {name: name});//ここでの前側のnameはmodels/Task.jsの中のnameという名前から来ている。
    showTasks();
    taskInputDom.value = "";
    formAlertDom.style.display = "block"
    formAlertDom.textContent = "タスクを追加しました。"
    formAlertDom.classList.add("text-success")
  } catch (err) {
    console.log(err);
    formAlertDom.style.display = "block"
    formAlertDom.innerHTML = `字数を確認してもう一度やり直してください。`
  }
  setTimeout(() => {
    formAlertDom.style.display = "none";
    formAlertDom.classList.remove("text-success")
  },3000)
})

//タスクを削除する
tasksDom.addEventListener('click', async (event) =>{
  const element = event.target;
  console.log(element.parentElement);
  if(element.parentElement.classList.contains('delete-btn')){
    const id  = element.parentElement.dataset.id;
    console.log(id)
    try {
      await axios.delete(`/api/v1/tasks/${id}`)
      showTasks();
      formAlertDom.style.display = "block"
      formAlertDom.innerHTML = `タスクを削除しました。`
    } catch(err) {
      console.log(err)
    }
    setTimeout(() => {
      formAlertDom.style.display = "none";
    },3000)
  }
})