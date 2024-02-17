package com.example.backend.Entity;

import jakarta.persistence.*;
import org.springframework.lang.NonNull;
@Entity
public class TestEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id ;
    String title ;
    @Enumerated(EnumType.STRING)
    TestCategory Category;

    public TestEntity() {
    }

    public TestEntity(String title, TestCategory category) {
        this.title = title;
        Category = category;
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

    public TestCategory getCategory() {
        return Category;
    }

    public void setCategory(TestCategory category) {
        Category = category;
    }
}
