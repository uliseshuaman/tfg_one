package com.backend.service;

import com.backend.utilis.Rol;

public class UsuarioDetalleDTO {
    private Long id;
    private String nombre;
    private String correo;
    private String imageUrl;
    private Rol rol;

    public UsuarioDetalleDTO(String nombre, String correo, String imageUrl, Rol rol) {
        this.nombre = nombre;
        this.correo = correo;
        this.imageUrl = imageUrl;
        this.rol = rol;
    }

    public UsuarioDetalleDTO() {
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }
}
