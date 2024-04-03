
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

    console.log(currentDate, formattedTaskDate, color)

    const str = `
        <div class="card bg-${color} mb-3 cur-move" style="max-width: 18rem;">
            <div class="card-header p-1 fw-bold">${tasTitle}</div>
            <div class="card-body p-2">
                <p class="card-text">${taskDescription}</p>
                <p class="card-date">${taskDate}</p>
                <button class="delete-btn btn btn-secondary p-1 px-3">Delete</button>
            </div>
        </div>
    `
    $('#task-todo-col').append(str);
})

// showing draggable card
$('#task-todo-col').mousedown((ev) => {
    if(ev.buttons !== 1) return; // return ifleft mouse button is not pressed
    
    const card = ev.target.closest('.card');
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
                $(targetColumn).append(card);
                $(card).css('opacity', '1')
            }
        }
    });
});

// deleting card
$('#task-todo-col').click((ev) => {
    if(ev.target.classList.contains('delete-btn')) {
        $(ev.target.closest('.card')).remove();
    }
})

// capFirstLetter
function capFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

