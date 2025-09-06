package com.example.demo.Configuration;

import org.springframework.stereotype.Component;

import com.example.demo.Entity.Privilege;
import com.example.demo.Entity.Role;
import com.example.demo.Repository.PrivilegeRepository;
import com.example.demo.Repository.RoleRepository;

import jakarta.annotation.PostConstruct;

@Component
public class DataInitializer {

    private final RoleRepository roleRepository;
    private final PrivilegeRepository privilegeRepository;

    public DataInitializer(RoleRepository roleRepository, PrivilegeRepository privilegeRepository) {
        this.roleRepository = roleRepository;
        this.privilegeRepository = privilegeRepository;
    }

    @PostConstruct
    public void init() {
        Privilege read = privilegeRepository.findByPrivilegeName("READ_PRIVILEGE")
                .orElseGet(() -> {
                    Privilege p = Privilege.builder().privilegeName("READ_PRIVILEGE").build();
                    return privilegeRepository.save(p);
                });

        Privilege write = privilegeRepository.findByPrivilegeName("WRITE_PRIVILEGE")
                .orElseGet(() -> {
                    Privilege p = Privilege.builder().privilegeName("WRITE_PRIVILEGE").build();
                    return privilegeRepository.save(p);
                });

        // USER role có READ
        Role userRole = roleRepository.findByRoleName("USER")
                .orElseGet(() -> {
                    Role r = Role.builder().roleName("USER").build();
                    return roleRepository.save(r);
                });
        userRole.getPrivileges().add(read);
        roleRepository.save(userRole);

        // ADMIN role có cả READ và WRITE
        Role adminRole = roleRepository.findByRoleName("ADMIN")
                .orElseGet(() -> {
                    Role r = Role.builder().roleName("ADMIN").build();
                    return roleRepository.save(r);
                });
        adminRole.getPrivileges().add(read);
        adminRole.getPrivileges().add(write);
        roleRepository.save(adminRole);
    }
}