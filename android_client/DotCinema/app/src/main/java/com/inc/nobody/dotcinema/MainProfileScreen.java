package com.inc.nobody.dotcinema;

import android.content.Context;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

import java.util.*;


public class MainProfileScreen extends ActionBarActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_profile_screen);
        TextView textView = (TextView) findViewById(R.id.textView);
        TextView textView2 = (TextView) findViewById(R.id.textView2);

        textView.setText(IdentityHolder.getInstance().getEmail());
        textView2.setText(IdentityHolder.getInstance().getToken());
        final ListView listview = (ListView) findViewById(R.id.listView);


        HttpWrapper.getInstance().MakeGetReservations();

        final Reservation[] list = new Reservation[6];
        for (int i = 0; i < 6; ++i)
        {
            list[i] =  Reservation.createFakeReservation();
        }
        final ReservationArrayAdapter adapter = new ReservationArrayAdapter(this, R.layout.list_item, list);
        listview.setAdapter(adapter);

        listview.setOnItemClickListener(new AdapterView.OnItemClickListener() {

            @Override
            public void onItemClick(AdapterView<?> parent, final View view, int position, long id) {
                final String item = Utils.MD5(Integer.toString(((Reservation) parent.getItemAtPosition(position)).getId()));
                DialogUtil.getInstance().showInfoDialog(view.getContext(),item);
            }

        });
    }

    private class ReservationArrayAdapter extends ArrayAdapter<Reservation> {
        private final Context context;
        private final Reservation[] values;
        HashMap<Reservation, Integer> mIdMap = new HashMap<Reservation, Integer>();

        public ReservationArrayAdapter(Context context, int textViewResourceId, Reservation[] objects) {
            super(context, textViewResourceId, objects);
            for (int i = 0; i < objects.length; ++i) {
                mIdMap.put(objects[i], i);
            }
            this.context = context;
            this.values = objects;
        }

        @Override
        public long getItemId(int position) {
            Reservation item = getItem(position);
            return mIdMap.get(item);
        }

        @Override
        public boolean hasStableIds() {
            return true;
        }


        @Override
        public View getView(int position, View convertView, ViewGroup parent) {
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            View rowView = inflater.inflate(R.layout.list_item, parent, false);
            TextView titleLabel = (TextView) rowView.findViewById(R.id.firstLine);
            TextView descriptionLabel = (TextView) rowView.findViewById(R.id.secondLine);
            titleLabel.setText(values[position].getMovieTitle());
            descriptionLabel.setText(values[position].getAdditionalData());
            // Change the icon for Windows and iPhone
            String s = values[position].getMovieTitle();

            return rowView;
        }
    }




    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main_profile_screen, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
