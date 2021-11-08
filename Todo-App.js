(function () {
  function storage(name, value) {
    return (value) ? localStorage.setItem(name, JSON.stringify(value)) : JSON.parse(localStorage.getItem(name)) || [];
  }
  
  function index(element) {
    const array = Array.from(element.parentNode.children)
    const indeX = array.indexOf(element)
    return indeX
  }
  
  
  
  
  
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }
  
  
  
  
  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');
    
    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';
    button.classList.add('disabled')
    
    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper)
    
    return {
      form,
      input,
      button,
    };
  }
  
  
  
  
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }
  
  
  
  
  
  function createTodoApp(container, title = 'Список дел', defaultItems = [], sessionId = 'index.html') {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    let mainDeals = [];
    
    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);
    
    function createTodoItem(name, done) {
      let item = document.createElement('li');
      let buttonGroup = document.createElement('div');
      let doneButton = document.createElement('button');
      let deleteButton = document.createElement('button');
      
      item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
      item.textContent = name;
      buttonGroup.classList.add('btn-group', 'btn-group-sm');
      doneButton.classList.add('btn', 'btn-success');
      doneButton.textContent = 'Готово';
      doneButton.addEventListener('click', function success() {
        let done = item.classList.toggle('list-group-item-success');
        // storage setter: change item
        mainDeals[index(item)].done = done;
        storage(sessionId, mainDeals);
        // let timeOutID = setTimeout(() => {
          //     todoItem.item.remove()
          //   }, 3000);
          // todoItem.doneButton.removeEventListener('click', success)
          // todoItem.doneButton.addEventListener('click', function stopSuccess() {
            //   todoItem.item.classList.remove('list-group-item-success');
            //   // clearTimeout(timeOutID);
            //   mainDeals[index(todoItem.item)].done = false;
            //   storage(sessionId, mainDeals)
            //   todoItem.doneButton.removeEventListener('click', stopSuccess);
            //   todoItem.doneButton.addEventListener('click', success);
            // }) 
          })
          deleteButton.classList.add('btn','btn-danger');
          deleteButton.textContent = 'Удалить';
          deleteButton.addEventListener('click', function() {
            if (!confirm('Вы уверены?')) return;
            
            // storage setter: delete item
            mainDeals.splice(index(item), 1);
            storage(sessionId, mainDeals);
            
            item.remove();
          })
          
          buttonGroup.append(doneButton);
          buttonGroup.append(deleteButton);
          item.append(buttonGroup);
          todoList.append(item)
          
          mainDeals.push({ name, done });
          storage(sessionId, mainDeals);

          if (done) doneButton.click();

          return {
            item,
            doneButton,
            deleteButton,
          };
        }
    function checkInput() {
      if(!todoItemForm.input.value == '') {
        todoItemForm.button.classList.remove('disabled')
      } else {
        todoItemForm.button.classList.add('disabled')
      }
    }
    todoItemForm.input.addEventListener('keyup', checkInput);
    todoItemForm.form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let todoItem = createTodoItem(todoItemForm.input.value)

      console.log(todoItem)
      
      if(todoItemForm.input.value == '') {
        return
          };
          
          todoList.append(todoItem.item);
          todoItemForm.input.value = '';
        })
        // storage getter: return items
        let storageItems = storage(sessionId);
        
        // restore session
        let sessionItems = (storageItems.length == 0) ? defaultItems : storageItems;
        // console.log(sessionItems)
        for (let item of sessionItems) createTodoItem(item.name, item.done);
  }
      
      window.createTodoApp = createTodoApp;
    })();
    