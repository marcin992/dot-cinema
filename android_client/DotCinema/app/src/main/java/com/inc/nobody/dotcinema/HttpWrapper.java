package com.inc.nobody.dotcinema;

import android.util.Pair;

import org.apache.http.HttpResponse;
import org.apache.http.HttpVersion;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ClientConnectionManager;
import org.apache.http.conn.scheme.PlainSocketFactory;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.AbstractHttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.DefaultHttpRequestRetryHandler;
import org.apache.http.impl.conn.tsccm.ThreadSafeClientConnManager;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpParams;
import org.apache.http.params.HttpProtocolParams;
import org.apache.http.protocol.HTTP;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.security.KeyStore;

/**
 * Created by maciej on 06/12/15.
 */
public class HttpWrapper {
    final String mainUrl = "https://91.196.50.18:443";
    final String loginUrl = "/auth/local";
    final String registerUrl = "/api/users";
    final String reservationsUrl = "/api/reservations";


    public String getLoginUrl()
    {
        return mainUrl + loginUrl;
    }
    public String getRegisterUrl()
    {
        return mainUrl + registerUrl;
    }
    public String getReservationsUrl()
    {
        return mainUrl + reservationsUrl;
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
        JSONObject response = MakePost(getLoginUrl(),parameters);
        return FindMessageOrToken(response);
    }

    public String MakePostRegistration(String email, String password,String nick)
    {
        Pair<String,Object>[] parameters = new Pair[]{
                new Pair("email",email),
                new Pair("password",password),
                new Pair("nick",nick)
        };
        JSONObject response = MakePost(getRegisterUrl(),parameters);
        return FindMessageOrToken(response);
    }

    public String MakeGetReservations()
    {
        JSONArray response = MakeGet(getReservationsUrl());
        System.out.println(response.toString());
        return response.toString();
    }


    public String FindMessageOrToken(JSONObject response)
    {
      while(response.keys().hasNext())
      {
          try {

              String key = response.keys().next();
                  if(key.equals("message"))
                      return "error: " + response.getString(key);
                  else if(key.equals("token"))
                      return "token: " + response.getString(key);
          } catch (JSONException e) {
              e.printStackTrace();
          }
      }
        return  "error: unknown";
    }

    public JSONObject MakePost(String url,Pair<String,Object> ... params) {

        HttpClient httpClient = getHttpClient(); //Deprecated

        try {
            HttpPost request = new HttpPost(url);
            StringEntity jsonParams =new StringEntity(createJsonString(params).toString());
            request.addHeader("Content-Type", "application/json");
            request.setEntity(jsonParams);
            HttpResponse response = httpClient.execute(request);

            // handle response here...
            JSONObject message = GetJSON(PrintHttpResponse(response));
            return  message;
        }
        catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return createErrorJson("UnsupportedEncodingException");
        }
        catch (ClientProtocolException e) {
            e.printStackTrace();
            return createErrorJson("ClientProtocolException");
        }
        catch (IOException e) {
            e.printStackTrace();
            return createErrorJson("IOException");
        }
        catch (JSONException e) {
            e.printStackTrace();
            return createErrorJson("JSONException");
        }
        finally {
            httpClient.getConnectionManager().shutdown(); //Deprecated
        }
    }

    public JSONArray MakeGet(String url) {

        HttpClient httpClient = getHttpClient(); //Deprecated

        try {
            HttpGet request = new HttpGet(url);
            request.addHeader("Authorization", "Bearer " + IdentityHolder.getInstance().getToken());
            HttpResponse response = httpClient.execute(request);

            // handle response here...
            JSONArray message = GetJSONArray(PrintHttpResponse(response));
            return  message;
        }
        catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return null;
        }
        catch (ClientProtocolException e) {
            e.printStackTrace();
            return null;
        }
        catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        catch (JSONException e) {
            e.printStackTrace();
            return null;
        }
        finally {
            httpClient.getConnectionManager().shutdown(); //Deprecated
        }
    }


    private JSONObject createErrorJson(String message)
    {
        JSONObject toReturn = new JSONObject();
        try {
            toReturn.put("message", message);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return toReturn;
    }

    public HttpClient getHttpClient() {
        try {
            KeyStore trustStore = KeyStore.getInstance(KeyStore.getDefaultType());
            trustStore.load(null, null);

            SSLSocketFactory sf = new MySSLSocketFactory(trustStore);
            sf.setHostnameVerifier(SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);

            HttpParams params = new BasicHttpParams();
            HttpProtocolParams.setVersion(params, HttpVersion.HTTP_1_1);
            HttpProtocolParams.setContentCharset(params, HTTP.UTF_8);

            SchemeRegistry registry = new SchemeRegistry();
            registry.register(new Scheme("http", PlainSocketFactory.getSocketFactory(), 80));
            registry.register(new Scheme("https", sf, 443));

            ClientConnectionManager ccm = new ThreadSafeClientConnManager(params, registry);

            return new DefaultHttpClient(ccm, params);
        } catch (Exception e) {
            return new DefaultHttpClient();
        }
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

    private JSONArray GetJSONArray(String information) throws JSONException {
        return new JSONArray(information);
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
