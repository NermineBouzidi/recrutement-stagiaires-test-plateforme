package com.example.backend.Security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Component
public class JwtSecurityFilter extends OncePerRequestFilter {
    private JwtUtils jwtUtils;
    CustomDetailService customDetailService;

    public JwtSecurityFilter(JwtUtils jwtUtils, CustomDetailService customDetailService) {
        this.jwtUtils = jwtUtils;
        this.customDetailService = customDetailService;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
      /*    if (authHeader != null && authHeader.startsWith("Bearer")){
              filterChain.doFilter(request,response);
          }
              String token = authHeader.substring(7);
              String userEmail = jwtUtils.getUsername(token);
          if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() ==null) {
              UserDetails user = customDetailService.loadUserByUsername(userEmail);
              if(jwtUtils.isValid(token,user)){
                  UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                          user , null);
                  authToken.setDetails(
                          new WebAuthenticationDetailsSource().buildDetails(request)
                  );
                  SecurityContextHolder.getContext().setAuthentication(authToken);
              }

          }
          filterChain.doFilter(request,response);*/
        if (authHeader == null) {
            filterChain.doFilter(request, response);
            return;  // Exit the filter chain if "Authorization" header is not present
        }

        String token = authHeader.substring(7);
        String userEmail = jwtUtils.getUsername(token);

        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails user = customDetailService.loadUserByUsername(userEmail);
            if (jwtUtils.isValid(token, user)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        user, null,user.getAuthorities());
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Continue with the filter chain
        filterChain.doFilter(request, response);
    }
}
