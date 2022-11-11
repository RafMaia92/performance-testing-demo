package com.rafmaia.appDemo.rest;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rafmaia.appDemo.model.BlogPost;

import reactor.core.publisher.Mono;
import org.springframework.web.bind.annotation.PostMapping;

@RequestMapping("/hello")
@RestController
public class DemoController {

    private List<BlogPost> listToServe = List.of(new BlogPost(1, "Testing with K6", "bla bla bla bla"),
            new BlogPost(2, "Testing with Jmeter", "bla bla bla bla"),
            new BlogPost(3, "Testing with your own hands", "bla bla bla bla"));

    @GetMapping("/{id}")
    public Mono<BlogPost> getById(@PathVariable Integer id) {
        return Mono.justOrEmpty(listToServe.stream()
                .filter(o -> o.id() == id)
                .findFirst());
    }

    @GetMapping
    public Mono<List<BlogPost>> getAll() {
        return Mono.just(listToServe);
    }

    @PostMapping
    public Mono<BlogPost> justASlowMethod() throws InterruptedException {
        Thread.sleep(3000);
        return Mono.justOrEmpty(listToServe.stream()
                .filter(o -> o.id() == 1)
                .findFirst());
    }

}
