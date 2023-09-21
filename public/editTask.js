const taskIdDom = document.querySelector('.task-edit-id')
const taskNameDom = document.querySelector('.task-edit-name')
const taskCompletedDom = document.querySelector('.task-edit-completed')
const editFormDom = document.querySelector('.single-task-form')
const formAlertDom = document.querySelector('.form-alert')

const params = window.location.search
const id = new URLSearchParams(params).get('id')

console.log(id)

const showTask = async () => {
  try {
    const {data:task} = await axios.get(`/api/v1/tasks/${id}`);//taskに色々データが入っている中からdataだけを取ってくる
    console.log(task)//迷ったらみてみて
    const {_id,completed,name} = task;
    taskIdDom.textContent = _id;
    taskNameDom.value = name;
    if(completed) {
      taskCompletedDom.checked = true;
    }
  } catch(err) {
    console.log(err)
  }
}

showTask();

//タスクの編集
editFormDom.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const taskName = taskNameDom.value
    taskCompleted = taskCompletedDom.checked
    const {data:task} = await axios.patch(`/api/v1/tasks/${id}`,{
      name:taskName,
      completed:taskCompleted,
    })
    formAlertDom.style.display = "block";
    formAlertDom.textContent = "編集しました";
    formAlertDom.classList.add('text-success');
  } catch(err) {
    console.log(err)
  }
  setTimeout(() => {
    formAlertDom.style.display = "none";
  },3000)
})