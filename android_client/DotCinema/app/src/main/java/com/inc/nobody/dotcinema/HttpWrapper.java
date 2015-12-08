package com.inc.nobody.dotcinema;

import android.util.Pair;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.AbstractHttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.DefaultHttpRequestRetryHandler;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

/**
 * Created by maciej on 06/12/15.
 */
public class HttpWrapper {
    final String mainUrl = "http://91.196.50.18:8088";
    final String loginUrl = "/auth/local";
    final String registerUrl = "/api/users";

    public String getLoginUrl()
    {
        return mainUrl + loginUrl;
    }
    public String getRegisterUrl()
    {
        return mainUrl + registerUrl;
    }

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

        Pair<String,Object>[] parameters = new Pair[]{
                new Pair("email",email),
                new Pair("password",password),
        };
        String response = MakePost(getLoginUrl(),parameters);
        System.out.println(response);
        return response;
    }

    public String MakePostRegistration(String email, String password,String nick)
    {
        Pair<String,Object>[] parameters = new Pair[]{
                new Pair("email",email),
                new Pair("password",password),
                new Pair("nick",nick)
        };
        String response = MakePost(getRegisterUrl(),parameters);
        System.out.println(response);
        return response;
    }

    public String MakePost(String url,Pair<String,Object> ... params) {

        HttpClient httpClient = getHttpClient(); //Deprecated

        try {
            HttpPost request = new HttpPost(url);
            StringEntity jsonParams =new StringEntity(createJsonString(params).toString());
            request.addHeader("Content-Type", "application/json");
            request.setEntity(jsonParams);
            HttpResponse response = httpClient.execute(request);

            // handle response here...
            JSONObject message = GetJSON(PrintHttpResponse(response));
            return  message.toString();
        }
        catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return "UnsupportedEncodingException";
        }
        catch (ClientProtocolException e) {
            e.printStackTrace();
            return "ClientProtocolException";
        }
        catch (IOException e) {
            e.printStackTrace();
            return "IOException";
        }
        catch (JSONException e) {
            e.printStackTrace();
            return "JSONException";
        }
        finally {
            httpClient.getConnectionManager().shutdown(); //Deprecated
        }
    }

    private HttpClient getHttpClient()
    {
        HttpClient httpClient = new DefaultHttpClient();
        ((AbstractHttpClient) httpClient).setHttpRequestRetryHandler(new DefaultHttpRequestRetryHandler(0, false));
        return httpClient;
    }
    private String createJsonString(Pair<String,Object> ... params) throws JSONException {
        JSONObject toReturn = new JSONObject();

        for(Pair<String,Object> pair : params)
        {
            toReturn.put(pair.first, pair.second);
        }
        return toReturn.toString();
    }

    private JSONObject GetJSON(String information) throws JSONException {
        return new JSONObject(information);
    }
    private String PrintHttpResponse(HttpResponse response) throws IOException {
        BufferedReader r = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));

        StringBuilder total = new StringBuilder();
        String line = null;
        while ((line = r.readLine()) != null) {
            total.append(line);
        }
        return total.toString();
    }
}
