
// show task modal
$('#add-task-btn').click(()=> {
    $('#task-modal').modal('show');
})

// adding task card to list
$('#task-form').submit((ev)=> {
    ev.preventDefault();

    // hidding modal
    $('#task-modal').modal('hide');

    //geting task data
    let tasTitle = capFirst($('#task-title').val());
    let taskDescription = capFirst($('#task-description').val());
    let taskDate = $('#task-due-date').val()

    // formating task date to compare to current date
    let formattedTaskDate = parseInt(taskDate.split('-').join(''))

    // getting current date and formating it to compare to task date
    const t = new Date();
    const year = t.getFullYear().toString();
    const month = (t.getMonth() + 1).toString().padStart(2, '0');
    const date = t.getDate().toString().padStart(2, '0');
    const currentDate = parseInt([year, month, date].join(''));

    //default color
    let color = 'light';

    // Checking if the task date is in the past
    if (formattedTaskDate < currentDate) {
        color = 'danger';
    } 

    // Checking if the task date is in the future
    if (formattedTaskDate == currentDate) {
        color = 'warning';
    }

    // getting tasks from local storage
    let data = JSON.parse(localStorage.getItem('bcs-tasks')) || [];

    // creating task object
    const obj = {
        idx: data.length,
        title: tasTitle,
        description: taskDescription,
        date: taskDate,
        color: color,
        column: 'task-todo-col',
    }

    // appending task card to column
    $('#task-todo-col').append(htmlString(obj));

     // saving the object to local storage
     data.push(obj);
     localStorage.setItem('bcs-tasks', JSON.stringify(data));
})

$('body').on('mousemove', '.card', (ev)=> {
    
    // returning if ev.button is not 0
    if(ev.button !== 0) return

    // showing draggable card
    const card = ev.target.closest('.card');
    if(card){
        $(card).draggable({ 
            helper: ()=>{
                
                // making clode the same width as the card
                const cloneCard = $(card).clone().width($(card).outerWidth());
                cloneCard.css('z-index', '20');
                return cloneCard;
            },
            start: () => {
                // changing card opacity
                $(card).css('opacity', '0.5')
            },
            stop: (ev2) => {
                const pointerPos = { x: ev2.pageX, y: ev2.pageY };
    
                //getting target car d
                const targetColumn = $('.task-column').get().reverse().find(el => {
                    const elPos = $(el).offset();
                    if(elPos.top < pointerPos.y && elPos.left < pointerPos.x) {
                        return el
                    }
                })
    
                //appending card to target card
                if(targetColumn){
                    movingCard(card, targetColumn.id)
                    $(card).css('opacity', '1')
                }
            }
        });
    }
});

// hiding dropdown menu on outside click
$('body').on('click', (ev)=> {
    if(ev.target.classList.contains('dropdown-label')) return
    $('.dropdown-menu').hide()
})

// toggling dropdown
$('body').on('click', '.dropdown-toggle', (ev)=> {
    ev.stopPropagation()
    $('.dropdown-menu').hide()
    $(ev.target.nextElementSibling).toggle();
})
// moving task card
$('body').on('click', '.dropdown-item', (ev)=> {
    movingCard(ev.target.closest('.card'), ev.target.value)
})

//deleting single task
$('body').on('click', '.delete-btn', (ev)=> {
    const card = $(ev.target.closest('.card'))
    const idx = card.attr('data-idx');
    const tasks = JSON.parse(localStorage.getItem('bcs-tasks'))
    tasks.splice(idx, 1)
    localStorage.setItem('bcs-tasks', JSON.stringify(tasks));
    card.remove();
})

// deleting all tasks
$('#delete-all-btn').click(()=> {
    localStorage.removeItem('bcs-tasks');
    $('.card').remove();
})

//loading task cards fromlocal storage
$(()=>{
    const tasks = JSON.parse(localStorage.getItem('bcs-tasks')) || [];
    tasks.forEach(task => {
        $(`#${task.column}`).append(htmlString(task));
    })
})

function htmlString(obj){
    const str = `
        <div class="card bg-${obj.color} mb-3 cur-move" style="max-width: 18rem;" data-idx="${obj.idx}">
            <div class="card-header p-1 fw-bold">${obj.title}</div>
            <div class="card-body p-2">
                <p class="card-text">${obj.description}</p>
                <p class="card-date">${obj.date}</p>
                <button class="delete-btn btn btn-sm btn-secondary">Delete</button>
                <div class="dropdown">
                    <button class="btn btn-sm btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <p class="dropdown-label">Mark as:</p>
                        <button class="dropdown-item" value="task-todo-col">To Do</button>
                        <button class="dropdown-item" value="task-inProgress-col">In Progress</button>
                        <button class="dropdown-item" value="task-done-col">Done</button>
                    </div>
                </div>
            </div>
        </div>
    `
    return str
}

function capFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function movingCard(card, columnId) {
    $(`#${columnId}`).append(card);

    // updating local storage
    const idx = card.getAttribute('data-idx');
    const tasks = JSON.parse(localStorage.getItem('bcs-tasks')) || [];
    tasks[idx].column = columnId;
    localStorage.setItem('bcs-tasks', JSON.stringify(tasks));

}

function preventMultipleEvents (el, event = 'clickEvent'){
    if(el.getAttribute(`data-${event}`)){return true}
    el.setAttribute(`data-${event}`, true) 
    return false
}