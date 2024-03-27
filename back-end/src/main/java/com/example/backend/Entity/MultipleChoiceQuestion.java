package com.example.backend.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MultipleChoiceQuestion extends Quiz {
    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true) // Cascade and orphanRemoval for proper relationship management
    private List<Choice> choices;

}
