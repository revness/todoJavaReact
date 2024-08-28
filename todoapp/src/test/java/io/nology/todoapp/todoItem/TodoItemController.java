package io.nology.todoapp.todoItem;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("todos")
public class TodoItemController {

    @Autowired
    private TodoItemService todoItemService;

    @PostMapping
    public ResponseEntity<TodoItem> createTodoItem(@RequestBody CreateTodoItemDTO data) throws Exception {
        TodoItem createdTodoItem = this.todoItemService.createTodoItem(data);
        return new ResponseEntity<TodoItem>(createdTodoItem, HttpStatus.CREATED);
    }

}
