package com.example.backend.Security;

import com.example.backend.Entity.User;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtSecurityFilter extends OncePerRequestFilter {
    JwtUtils jwtUtils;
    CustomDetailService customDetailService;
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {
          String authHeader = request.getHeader("Authorization");
          if (authHeader != null && authHeader.startsWith("Bearer")){
              filterChain.doFilter(request,response);
          }
              String token = authHeader.substring(7);
              String userEmail = jwtUtils.getUsername(token);
          if(userEmail != null) {
              UserDetails user = customDetailService.loadUserByUsername(userEmail);
              if(jwtUtils.isValid(token,user)){
                  UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                          user , null);
                  authToken.setDetails(
                          new WebAuthenticationDetailsSource().buildDetails(request)
                  );
              }

          }
          filterChain.doFilter(request,response);

    }
}
