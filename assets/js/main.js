
// show task modal
$('#add-task-btn').click(()=> {
    $('#task-modal').modal('show');
})

// submit task modal
$('#task-form').submit((ev)=> {
    ev.preventDefault();

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


// capFirstLetter
function capFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

