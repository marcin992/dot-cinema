package com.inc.nobody.dotcinema;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * Created by maciej on 06/12/15.
 */
public class HttpWrapper {

    private static HttpWrapper instance;

    private HttpWrapper() {

    }

    public static HttpWrapper getInstance()
    {
        if(instance==null)
            instance = new HttpWrapper();
        return instance;
    }
    public String MakePostLogin(String email, String password) {

        HttpClient httpClient = new DefaultHttpClient(); //Deprecated

        try {
            HttpPost request = new HttpPost("http://91.196.50.18:8088/auth/local");

            StringBuilder json = new StringBuilder();
            json.append("{\"email\":\"");
            json.append(email);
            json.append("\",\"password\":\"");
            json.append(password);
            json.append("\"}");

            StringEntity jsonParams =new StringEntity(json.toString());
            request.addHeader("Content-Type", "application/json");
            request.setEntity(jsonParams);
            HttpResponse response = httpClient.execute(request);

            // handle response here...
            JSONObject message = GetJSON(PrintHttpResponse(response));
            return message.getString("message");
        }catch (Exception ex) {
            return ex.toString();

        } finally {
            httpClient.getConnectionManager().shutdown(); //Deprecated
        }
    }

    public String MakePostRegistration(String email, String password,String nick) {

        HttpClient httpClient = new DefaultHttpClient(); //Deprecated

        try {
            HttpPost request = new HttpPost("http://91.196.50.18:8088/api/users");

            StringBuilder json = new StringBuilder();
            json.append("{\"email\":\"");
            json.append(email);
            json.append("\",\"password\":\"");
            json.append(password);
            json.append("\",\"nick\":\"");
            json.append(nick);
            json.append("\"}");
            System.out.println(json.toString());

            StringEntity jsonParams =new StringEntity(json.toString());
            request.addHeader("Content-Type", "application/json");
            request.setEntity(jsonParams);
            HttpResponse response = httpClient.execute(request);

            // handle response here...
            JSONObject message = GetJSON(PrintHttpResponse(response));
            return message.getString("message");
        }catch (Exception ex) {
            return ex.toString();

        } finally {
            httpClient.getConnectionManager().shutdown(); //Deprecated
        }
    }


    public JSONObject GetJSON(String information) throws JSONException {
        return new JSONObject(information);
    }
    public String PrintHttpResponse(HttpResponse response) throws IOException {
        BufferedReader r = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));

        StringBuilder total = new StringBuilder();
        String line = null;
        while ((line = r.readLine()) != null) {
            total.append(line);
        }
        return total.toString();
    }
}
