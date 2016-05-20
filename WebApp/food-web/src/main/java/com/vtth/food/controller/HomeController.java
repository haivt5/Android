/**
 * 
 */
package com.vtth.food.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author SONY
 *
 */
@Controller
public class HomeController {
        
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView homePage(){
        return new ModelAndView("index");
    }
    
}
