package com.backend.service;

import com.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<UsuarioPublicoDTO> obtenerVistaPublica() {
        return usuarioRepository.findAll().stream()
                .map(u -> new UsuarioPublicoDTO(u.getNombre(), u.getImagenUrl()))
                .collect(Collectors.toList());
    }

    public UsuarioDetalleDTO verPerfil(Long id, String correoSolicitante) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!usuario.getCorreo().equals(correoSolicitante) && usuario.getRol() != Rol.ADMIN) {
            throw new AccessDeniedException("No autorizado");
        }

        return new UsuarioDetalleDTO(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getCorreo(),
                usuario.getImagenUrl(),
                usuario.getRol()
        );
    }

    public UsuarioDetalleDTO editarPerfil(Long id, UsuarioDetalleDTO datos, String correoSolicitante) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!usuario.getCorreo().equals(correoSolicitante) && usuario.getRol() != Rol.ADMIN) {
            throw new AccessDeniedException("No autorizado");
        }

        usuario.setNombre(datos.getNombre());
        usuario.setImagenUrl(datos.getImagenUrl());
        usuarioRepository.save(usuario);

        return new UsuarioDetalleDTO(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getCorreo(),
                usuario.getImagenUrl(),
                usuario.getRol()
        );
    }

    public List<UsuarioDetalleDTO> obtenerTodos() {
        return usuarioRepository.findAll().stream()
                .map(u -> new UsuarioDetalleDTO(u.getId(), u.getNombre(), u.getCorreo(), u.getImagenUrl(), u.getRol()))
                .collect(Collectors.toList());
    }

}
