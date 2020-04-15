$(document).ready(function () {
    add_oaddedited()
    $('#btnedit').hide();
    let edit = false;
    console.log('jquery is working');
    $('#task-result').hide();
    fetchTasks();
    editar();
    $('#search').keyup(function (e) {
        if ($('#search').val()) {
            let search = $('#search').val();
            $.ajax({
                url: 'task-search.php',
                type: 'POST',
                data: { search: search },
                success: function (response) {
                    let tasks = JSON.parse(response);
                    let template = ''
                    tasks.forEach(task => {
                        template += `<li>
                    ${task.name}
                   </li>`

                    });
                    $('#container').html(template);
                    $('#task-result').show();
                }
            })
        }
    });
    /**esta funcion envia los datoa task-add ara agregar o a task-edit ara editar 
        deendiendo del valor de la variable edit
     */
    function add_oaddedited(){
        $('#task-form').on('click','#btnsave' ,function (e) {
            /*guarda valores en un objeto*/
            if(edit==false){
                const postData = {
                    name: $('#name').val(),
                    description: $('#description').val(),
                    id: $('#taskId').val()
                };
                let url = edit === false ? 'task-add.php' : 'task-edit.php';
                console.log(url);
                /*escucha respuesta del servidor */
                $.post(url, postData, function (response) {
                    console.log(response);
                    fetchTasks();
                    /*resetear el formulari 'ponerlos en blanco'*/
                    $('#task-form').trigger('reset');
                });
                e.preventDefault();
            }else{
                
                console.log('verdaderooooooo');  const postData = {
                    name: $('#name').val(),
                    description: $('#description').val(),
                    id: $('#taskId').val()
                };
                let url = edit === false ? 'task-add.php' : 'task-edit.php';
                console.log(url);
                /*escucha respuesta del servidor */
                $.post(url, postData, function (response) {
                    console.log(response);
                    fetchTasks();
                    /*resetear el formulari 'ponerlos en blanco'*/
                    $('#task-form').trigger('reset');
                });
                e.preventDefault();
                edit=false;
            }
          
    
        });
    }
    
    function fetchTasks() {
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: function (response) {
                let tasks = JSON.parse(response);
                let template = '';
                tasks.forEach(task => {
                    template += `
                    <tr taskId="${task.id}">
                        <td>${task.id}</td>
                        <td>
                        <a href="#" class="task-item">${task.name}</a>
                        </td>     
                        <td>${task.description}</td>  
                        <td><button class ="btn btn-danger task-delete">eliminar</button></td>                  
                    
                    </tr>`

                });
                $('#tasks').html(template);

            }
        });
    }
    /*seleccionar para eliminar*/
    $(document).on('click', '.task-delete', function () {
        if (confirm('estas seguro de elimar')) {
            let element = $(this)[0].parentElement.parentElement;/*localiza la fila del dato a eliminar */
            let id = $(element).attr('taskId')/*localiza el id en esa fila */;
            $.post('task-delete.php', { id }, function (response) {
                fetchTasks();
            })
        }
    });
  
    function editar(){
        
        $(document).on('click', '.task-item', function () {
          //  $('#btnsave').hide();
           // $('#btnedit').show();
            
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('taskId');
            $.post('task-single.php', { id }, function (response) {
                const task = JSON.parse(response);
                $('#name').val(task.name);
                $('#description').val(task.description);
                $('#taskId').val(task.id);
                edit = true;
                

    
            });
    
        });
    }
    
}); 