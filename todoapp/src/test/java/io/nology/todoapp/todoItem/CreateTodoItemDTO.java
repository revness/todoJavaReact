package io.nology.todoapp.todoItem;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;

public class CreateTodoItemDTO {
    @NotBlank
    @Length(min = 5)
    private String title;

    @NotBlank
    private String content;

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

}
