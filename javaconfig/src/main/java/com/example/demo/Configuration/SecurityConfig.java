    package com.example.demo.Configuration;

    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.http.HttpMethod;
    import org.springframework.security.config.annotation.web.builders.HttpSecurity;
    import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.security.web.SecurityFilterChain;

    @Configuration
    public class SecurityConfig {

        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http
                    .csrf(csrf -> csrf.disable())
                    .authorizeHttpRequests(auth -> auth
                            .requestMatchers("/api/auth/register", "/api/auth/login").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/demo").hasAuthority("READ_PRIVILEGE")
                            .requestMatchers(HttpMethod.POST, "/api/demo").hasAuthority("WRITE_PRIVILEGE")
                            .anyRequest().authenticated())
                    .formLogin(form -> form.disable())
                    .httpBasic(basic -> basic.disable());

            return http.build();
        }
    }