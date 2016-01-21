package com.inc.nobody.dotcinema;

import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.RectF;
import android.graphics.Typeface;
import android.graphics.drawable.BitmapDrawable;

import com.onbarcode.barcode.android.AndroidColor;
import com.onbarcode.barcode.android.AndroidFont;
import com.onbarcode.barcode.android.Code128;
import com.onbarcode.barcode.android.IBarcode;

/**
 * Created by maciej on 21/01/16.
 */
public class BarCodeToBitMap {
    public static Bitmap createBarcodeBitmap(Resources res,String code)
    {
        Bitmap tempBitmap = Bitmap.createBitmap(256, 256, Bitmap.Config.RGB_565);
        Canvas tempCanvas = new Canvas(tempBitmap);
        Code128 barcode = new Code128 ();

        barcode.setData(code);


        barcode.setProcessTilde(false);

        barcode.setUom(IBarcode.UOM_PIXEL);

        barcode.setX(1.75f);
        barcode.setY(100f);

        barcode.setLeftMargin(0f);
        barcode.setRightMargin(0f);
        barcode.setTopMargin(0f);
        barcode.setBottomMargin(0f);

        barcode.setResolution(72);
        barcode.setShowText(true);
        barcode.setTextFont(new AndroidFont("Arial", Typeface.NORMAL, 10));
        barcode.setTextMargin(6);
        barcode.setTextColor(AndroidColor.black);

        barcode.setForeColor(AndroidColor.black);
        barcode.setBackColor(AndroidColor.white);
        RectF bounds = new RectF(0,0, 0, 0);
        try {
            barcode.drawBarcode(tempCanvas, bounds);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new BitmapDrawable(res, tempBitmap).getBitmap();
    }
}
