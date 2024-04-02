
// show task modal
$('#add-task-btn').click(()=> {
    $('#task-modal').modal('show');
})

// adding task card to list
$('#task-form').submit((ev)=> {
    ev.preventDefault();

    // hidding modal
    $('#task-modal').modal('hide');

    //get task data
    let tasTitle = capFirst($('#task-title').val());
    let taskDescription = capFirst($('#task-description').val());
    let taskDate = $('#task-due-date').val();

    const str = `
        <div class="card bg-light mb-3 cur-move" style="max-width: 18rem;">
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
$('#task-todo-col').mousemove((ev) => {
    if(ev.buttons !== 1) return; // return ifleft mouse button is not pressed
    
    const card = ev.target.closest('.card');
    $(card).draggable({ 
        helper: ()=>{
            // making clode the same width as the card
            return $(card).clone().width($(card).outerWidth());
        },
        stop: (ev2) => {
            const pointerPos = { x: ev2.pageX, y: ev2.pageY };

            //getting target card
            const targetColumn = $('.task-column').get().reverse().find(el => {
                const elPos = $(el).offset();
                if(elPos.top < pointerPos.y && elPos.left < pointerPos.x) {
                    return el
                }
            })

            //appending card to target card
            if(targetColumn){
                $(targetColumn).append(card);
            }
        }
    });
});



// capFirstLetter
function capFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

