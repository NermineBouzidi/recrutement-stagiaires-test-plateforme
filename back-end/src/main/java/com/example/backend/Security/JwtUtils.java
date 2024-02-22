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
        String fullName = user.getFirstname() + " " + user.getLastName();
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("name", fullName)  // Add the "name" claim with the full name
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expireInMs))
                .signWith(key)
                .compact();
    }

    public boolean isValid(String token , UserDetails user){
       return getUsername(token).equals(user.getUsername()) ;
    }


    public String getUsername(String token) {
        Claims claims = getClaims(token);
        return claims.getSubject();
    }

    public boolean isExpired(String token) {
        Claims claims = getClaims(token);
        return claims.getExpiration().after(new Date(System.currentTimeMillis()));
    }

    public Claims getClaims(String token) {

        return Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

}
