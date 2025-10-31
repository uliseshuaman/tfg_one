package com.backend.controller;

import com.backend.model.Usuario;
import com.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/publico")
    public List<Usuario> vistaPublica() {
        return usuarioService.obtenerVistaPublica();
    }

    @GetMapping("/{id}")
    public Usuario verPerfil(@PathVariable Long id, Principal principal) {
        return usuarioService.verPerfil(id, principal.getName());
    }

    @PutMapping("/{id}")
    public Usuario editarPerfil(@PathVariable Long id, @RequestBody Usuario datos, Principal principal) {
        return usuarioService.editarPerfil(id, datos, principal.getName());
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Usuario> vistaAdmin() {
        return usuarioService.obtenerTodos();
    }


}
