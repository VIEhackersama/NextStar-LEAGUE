package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "account_roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountRole {
    @EmbeddedId
    private AccountRoleId id;

    @ManyToOne
    @MapsId("accountId")
    @JoinColumn(name = "account_id")
    private Account account;

    @ManyToOne
    @MapsId("roleId")
    @JoinColumn(name = "role_id")
    private Role role;
    
    public AccountRole(Account account, Role role) {
        this.account = account;
        this.role = role;
        this.id = new AccountRoleId(account.getAccountId(), role.getRoleId());
    }

}