package com.inc.nobody.dotcinema;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
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

    public int getId()  {return id;}

    public void setId(int id) {
        this.id = id;
    }

    private int id;
    private Date movieDateDate;
    private String movieTitle;
    private ArrayList<String> seats;
    private float evaluatedPrice;

    public Reservation()
    {

    }
    public Reservation(Date date,String title, ArrayList<String> seat, float price)
    {
        movieDateDate = date;
        movieTitle = title;
        seats = seat == null?new ArrayList(): new ArrayList(seat);
        evaluatedPrice = price;
    }
    public String getAdditionalData()
    {
        DateFormat df = new SimpleDateFormat("MM/dd HH:mm:ss");
        return df.format(movieDateDate);
    }
    public static Reservation createFakeReservation()
    {
        Reservation fake = new Reservation();
        fake.setId(Utils.randInt(34, 3453457));
        fake.setMovieTitle(randomMovieTitles[Utils.randInt(0, randomMovieTitles.length-1)]);
        Calendar a = Calendar.getInstance();
        fake.setMovieDateDate(new Date(a.getTimeInMillis() + Utils.randInt(34, 3453457)));
        ArrayList<String> steats = new ArrayList<>();
        for(int i =0;i<Utils.randInt(1,4);i++)
        {
            steats.add(Utils.randInt(1, 16) + Utils.randChar() + "");
        }
        fake.setSeats(steats);
        fake.setEvaluatedPrice(steats.size()*16);
        return fake;
    }

    final static String[] randomMovieTitles = new String[]{
            "Code Name: K.O.Z.",
            "Daniel the Wizard",
            "Saving Christmas",
            "Pledge This!",
            "Turks in Space",
            "Birdemic: Shock and Terror"};

}
