package com.inc.nobody.dotcinema;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;

/**
 * Created by maciej on 07/11/15.
 */
public class DialogUtil {
    private static DialogUtil instance;

    private DialogUtil() {

    }

    public static DialogUtil getInstance()
    {
        if(instance==null)
            instance = new DialogUtil();
        return instance;
    }

    public void showInfoDialog(Context context, String message)
    {
        AlertDialog.Builder builder1 = new AlertDialog.Builder(context);
        builder1.setMessage(message);
        builder1.setCancelable(false);
        builder1.setNeutralButton(context.getString(R.string.ok),new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                dialog.cancel();
            }});

        AlertDialog alert11 = builder1.create();
        alert11.show();
    }
}
