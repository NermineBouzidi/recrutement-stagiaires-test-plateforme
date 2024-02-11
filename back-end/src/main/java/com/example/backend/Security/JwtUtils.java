package com.example.backend.Security;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;

import java.security.Key;
import java.util.Date;

@Service
public class JwtUtils {
    private static final int expireInMs = 60*300 * 1000;

    private final static Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String generate(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("role",user.getRole())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expireInMs))
                .signWith(key)
                .compact();
    }
    public boolean validate(String token ,User user) {
        if (getUsername(token) != null && isExpired(token)) {
            return true;
        }
        return false;
    }
    public boolean isValid(String token , UserDetails user){
        if(getUsername(token).equals(user.getUsername())){
            return true;
        }else{
            return false ;
        }
    }

    public String getUsername(String token) {
        Claims claims = getClaims(token);
        return claims.getSubject();
    }

    public boolean isExpired(String token) {
        Claims claims = getClaims(token);
        return claims.getExpiration().after(new Date(System.currentTimeMillis()));
    }

    private Claims getClaims(String token) {
        return Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();
    }
}
