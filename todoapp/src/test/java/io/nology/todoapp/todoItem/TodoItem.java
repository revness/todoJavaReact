package io.nology.todoapp.todoItem;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.Table;

@Entity
@Table(name = "todo_items")
public class TodoItem {
    public TodoItem() {

    }

    @Column
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

}
