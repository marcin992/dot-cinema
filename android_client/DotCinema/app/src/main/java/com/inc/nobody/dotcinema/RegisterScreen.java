package com.inc.nobody.dotcinema;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;



public class RegisterScreen extends ActionBarActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register_screen);

        setupUI(this.findViewById(R.id.registerView));
    }

    public static void hideSoftKeyboard(Activity activity) {
        InputMethodManager inputMethodManager = (InputMethodManager)  activity.getSystemService(Activity.INPUT_METHOD_SERVICE);
        inputMethodManager.hideSoftInputFromWindow(activity.getCurrentFocus().getWindowToken(), 0);
    }

    public void setupUI(View view) {

        //Set up touch listener for non-text box views to hide keyboard.
        if(!(view instanceof EditText)) {

            view.setOnTouchListener(new View.OnTouchListener() {

                public boolean onTouch(View v, MotionEvent event) {
                    hideSoftKeyboard((Activity) v.getContext());
                    return false;
                }

            });
        }

        //If a layout container, iterate over children and seed recursion.
        if (view instanceof ViewGroup) {

            for (int i = 0; i < ((ViewGroup) view).getChildCount(); i++) {

                View innerView = ((ViewGroup) view).getChildAt(i);

                setupUI(innerView);
            }
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_register_screen, menu);
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

    public void registerNewUser(View view)
    {
        String nick =((EditText)findViewById(R.id.nickInput)).getText().toString();
        String email =((EditText)findViewById(R.id.emailInput)).getText().toString();
        String password =((EditText)findViewById(R.id.passwordInput)).getText().toString();

        if(register(nick,email,password))
        {
            goToMainScreen();
        }
        else
            ShowDialog(view.getContext());
    }
    private void ShowDialog(Context context)
    {
        DialogUtil.getInstance().showInfoDialog(context,context.getString(R.string.user_exist));
    }
    private boolean register(String nick,String email, String password)
    {
        return fakeSaveToPreferences(nick,email,password);
    }
    private boolean fakeSaveToPreferences(String nick, String email, String password) {
        SharedPreferences sharedPref = getPreferences(Context.MODE_PRIVATE);

        String checkFromPrefsEmail = sharedPref.getString(email, null);
        String checkFromPrefsNick = sharedPref.getString(nick, null);
        if (checkFromPrefsEmail == null|| checkFromPrefsNick == null) {
            SharedPreferences.Editor editor = sharedPref.edit();
            editor.putString(email, password);
            editor.putString(nick, password);

            System.out.println("register: " + email + " " + password + " " + nick);

            editor.commit();
            return true;
        }

        return false;

    }

    public void goToMainScreen()
    {
        Intent intent = new Intent(this,MainProfileScreen.class);
        startActivity(intent);
    }

}
