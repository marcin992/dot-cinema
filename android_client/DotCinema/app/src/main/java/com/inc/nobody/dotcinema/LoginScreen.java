package com.inc.nobody.dotcinema;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;


public class LoginScreen extends ActionBarActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login_screen);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_login_screen, menu);
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

    public void startRegistration(View view) {
        Intent intent = new Intent(this, RegisterScreen.class);
        startActivity(intent);

    }
    public void startLogin(View view) {

        String text = ((EditText)findViewById(R.id.nickInput)).getText().toString().trim();
        String password = ((EditText)findViewById(R.id.passpowrdInput)).getText().toString().trim();
        SharedPreferences sharedPref = getPreferences(Context.MODE_PRIVATE);
        String checkFromPrefsNick = sharedPref.getString(text, null);
        String checkFromPrefsEmail = sharedPref.getString(text, null);
        System.out.println("haslo"+" " +checkFromPrefsEmail + " "  + checkFromPrefsNick + " " + password);
        if(checkFromPrefsEmail == password || checkFromPrefsNick == password)
        {
            Intent intent = new Intent(this, MainProfileScreen.class);
            startActivity(intent);
        }
        else {
            DialogUtil.getInstance().showInfoDialog(view.getContext(), view.getContext().getString(R.string.bad_pass));
        }



    }
}
