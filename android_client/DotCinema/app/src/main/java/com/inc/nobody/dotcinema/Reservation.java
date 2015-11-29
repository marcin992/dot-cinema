package com.inc.nobody.dotcinema;

import java.util.ArrayList;
import java.util.Date;

/**
 * Created by maciej on 28/11/15.
 */
public class Reservation {
    public Date getMovieDateDate() {
        return movieDateDate;
    }

    public void setMovieDateDate(Date movieDateDate) {
        this.movieDateDate = movieDateDate;
    }

    public String getMovieTitle() {
        return movieTitle;
    }

    public void setMovieTitle(String movieTitle) {
        this.movieTitle = movieTitle;
    }

    public ArrayList<String> getSeats() {
        return seats;
    }

    public void setSeats(ArrayList<String> seats) {
        this.seats = seats;
    }

    public float getEvaluatedPrice() {
        return evaluatedPrice;
    }

    public void setEvaluatedPrice(float evaluatedPrice) {
        this.evaluatedPrice = evaluatedPrice;
    }

    private Date movieDateDate;
    private String movieTitle;
    private ArrayList<String> seats;
    private float evaluatedPrice;

    public Reservation(Date date,String title, ArrayList<String> seat, float price)
    {
        movieDateDate = date;
        movieTitle = title;
        seats = new ArrayList<>(seat);
        evaluatedPrice = price;
    }

}
