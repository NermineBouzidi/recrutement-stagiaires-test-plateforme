package com.example.backend.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MultipleChoiceQuestion extends Quiz {
    @OneToMany(mappedBy = "multipleChoiceQuestion", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER)
    @JsonIgnoreProperties("multipleChoiceQuestion") // Prevent infinite recursion
    private List<Choice> choices = new ArrayList<>();


}
