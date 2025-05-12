package com.bookstore.backend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ForwardController {
    @RequestMapping(value = "/{path:[^\\.]*}")  //Maps all requests where the path has no dot (.) eg /books; /users— this skips static files like .css, .js, .png eg /main.js to index.html

    public String forward() {
        return "forward:/index.html";
    }
}

