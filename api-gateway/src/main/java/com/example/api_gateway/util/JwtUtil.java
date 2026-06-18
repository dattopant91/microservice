package com.example.api_gateway.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import java.security.Key;

@Component
public class JwtUtil {
    

    private static final String SECRET = "MySuperSecretKeyForMyMicroserviceProject2026";
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public void validateToken(final String token) {
        Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
    }
}
