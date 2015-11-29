package com.inc.nobody.dotcinema;


/**
 * Created by maciej on 29/11/15.
 */
public class Utils {
    public static int randInt(int min, int max) {
        return min + (int)(Math.random() * ((max - min) + 1));
    }

    public static int randChar() {
        String alphabet = "ABCDEFGHIJK";
        return alphabet.charAt(randInt(0,alphabet.length()-1));
    }

}
