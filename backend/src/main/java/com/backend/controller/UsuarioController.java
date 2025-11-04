package com.backend.controller;
import com.backend.service.UsuarioDetalleDTO;
import com.backend.service.UsuarioPublicoDTO;
import com.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/publico")
    public List<UsuarioPublicoDTO> vistaPublica() {
        return usuarioService.obtenerVistaPublica();
    }

    @GetMapping("/{id}")
    public UsuarioDetalleDTO verPerfil(@PathVariable Long id, Principal principal) {
        return usuarioService.verPerfil(id, principal.getName());
    }

    @PutMapping("/{id}")
    public UsuarioDetalleDTO editarPerfil(@PathVariable Long id, @RequestBody UsuarioDetalleDTO datos, Principal principal) {
        return usuarioService.editarPerfil(id, datos, principal.getName());
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public List<UsuarioDetalleDTO> vistaAdmin() {
        return usuarioService.obtenerTodos();
    }
}
