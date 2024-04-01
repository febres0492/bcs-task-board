
// show task modal
$('#add-task-btn').click(()=> {
    $('#task-modal').modal('show');
})

// submit task modal
$('#task-form').submit((ev)=> {
    ev.preventDefault();

    $('#task-modal').modal('hide');

    //get task data
    let tasTitle = $('#task-title').val();
    let taskDescription = $('#task-description').val();
    let taskDate = $('#task-due-date').val();

    
    console.log('test',tasTitle, taskDescription, taskDate);
})

