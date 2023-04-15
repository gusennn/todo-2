(() => {

    let todoArray = [];
    let listName = ''

    let createTodoTitle = (title = 'Секретные дела') => {
        let listTitle = document.createElement ('h2');
        listTitle.innerHTML = title;
        return listTitle;
    };

    let createTodoItemForm = () => {

        let cForm = document.createElement ('form');
        let cInput = document.createElement ('input');
        let cButtonWrapper = document.createElement ('div');
        let cButton = document.createElement ('button');

        cInput.placeholder = 'Не забыть выпить чай ...';
        cButton.textContent = 'Добавить';
        cButton.disabled = true;
        cButton.style.opacity = '0.5';
        cButtonWrapper.classList.add('formWrapper')

        cInput.addEventListener ('input', () => {
            cButton.disabled == true ? cButton.style.opacity = '.5' : cButton.style.opacity = '1';
            if (cInput.value !== '') {
                cButton.disabled = false;
                cButton.style.opacity = '1';
            } else {
                cButton.disabled = true;
                cButton.style.opacity = '.5';
            }
        })


        cButtonWrapper.append (cInput, cButton);
        cForm.append (cButtonWrapper);

        return {
            cForm,
            cInput,
            cButton,
        };
    };

    let createTodoList = () => {

        let todoList = document.createElement ('ul');
        todoList.classList = 'todoList';
        return todoList;
    };

    let createTodoItem = (obj) => {

        let item = document.createElement ('li');
        item.textContent = obj.name;
        item.classList = 'item';

        let doneBtn = document.createElement ('button');
        doneBtn.textContent = 'Готово';
        doneBtn.classList = 'doneBtn';

        let deleteBtn = document.createElement ('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.classList = 'deleteBtn';

        let btnWrapper = document.createElement ('div');

        if ( obj.done == true ) item.classList.add('doneItem')

        doneBtn.addEventListener ('click', () => {
            item.classList.toggle('doneItem')
            for ( const listItem of todoArray) {
                if (listItem.id == obj.id) listItem.done = !listItem.done;
            }

            saveList(todoArray, listName)
        });

        deleteBtn.addEventListener ('click', () => {
            if (confirm ('Удалить ?')) {
                item.remove ();
                console.log (todoArray)
                for (let i = 0; i < todoArray.length; i++) {
                    if (todoArray[i].id == obj.id) { 
                        todoArray.splice (i, 1)
                    }
                }
            };

            saveList(todoArray, listName)
        });

        btnWrapper.append (doneBtn, deleteBtn);
        item.append (btnWrapper);

        return {
            item,
            doneBtn,
            deleteBtn
        };

    };

    let getId =(arr)=> {
        let max = 0;
        for ( const item of arr) {
            if ( item.id > max ) max = item.id;
        }
        return max + 1;
    }

    let saveList =(arr, keyName)=> {
        localStorage.setItem(keyName, JSON.stringify(arr))
    }

    let createTodoApp = (container, appTitle, keyName) => {

        let listTitleRender = createTodoTitle (appTitle);
        let formRender = createTodoItemForm ();
        let listRender = createTodoList ();

        listName = keyName;

        container.append (listTitleRender);
        container.append (formRender.cForm);
        container.append (listRender);

        let localData = localStorage.getItem(listName);

        if ( localData !== null && localData !=='' ) todoArray = JSON.parse(localData)

        for ( let todoArrayItem of todoArray) {
            let itemRender = createTodoItem (todoArrayItem);
            listRender.append (itemRender.item);
        }

        formRender.cForm.addEventListener ('submit', (e) => {

            e.preventDefault ();

            if (!formRender.cInput.value) {
                return;
            };

            let newArray = {
                id: getId(todoArray),
                name: formRender.cInput.value,
                done: false
            }

            let itemRender = createTodoItem (newArray);
            listRender.append (itemRender.item);

            todoArray.push (newArray);

            formRender.cInput.value = '';
            formRender.cButton.disabled = true;
            if (formRender.cButton.disabled) formRender.cButton.style.opacity = '0.5';

            saveList(todoArray, listName)
        });
    };
    window.createTodoApp = createTodoApp;
}) ();

