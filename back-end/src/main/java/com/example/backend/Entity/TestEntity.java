package com.example.backend.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.springframework.lang.NonNull;
@Entity
public class TestEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id ;
    String title ;
    String Description ;
    String Category;
    String Difficulty ;

    public TestEntity() {
    }

    public TestEntity(String title, String description, String category, String difficulty) {
        this.title = title;
        Description = description;
        Category = category;
        Difficulty = difficulty;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public String getCategory() {
        return Category;
    }

    public void setCategory(String category) {
        Category = category;
    }

    public String getDifficulty() {
        return Difficulty;
    }

    public void setDifficulty(String difficulty) {
        Difficulty = difficulty;
    }
}
