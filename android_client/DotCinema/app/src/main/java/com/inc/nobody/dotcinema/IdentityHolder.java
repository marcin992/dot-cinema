package com.inc.nobody.dotcinema;

/**
 * Created by maciej on 11/12/15.
 */
public class IdentityHolder {
    private static IdentityHolder _instance;
    public static IdentityHolder getInstance()
    {
        if(_instance == null)
        {
            _instance = new IdentityHolder();
        }
        return _instance;
    }
    private IdentityHolder()
    {

    }

    private String token;
    private String email;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
