# Talento Tech Frontend

## Descripción

Opportunity Match  es una aplicación web desarrollada con Angular que permite a los usuarios y administradores gestionar oportunidades de negocio, notificaciones y detalles de usuarios. La aplicación incluye autenticación y autorización para proteger el acceso a determinadas rutas y funcionalidades.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Uso](#uso)
- [Rutas y Autenticación](#rutas-y-autenticación)
- [Servicios](#servicios)
- [Interceptors](#interceptors)
- [Guardas de Ruta](#guardas-de-ruta)
- [Componentes](#componentes)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Jonathanvg97/ProyectoTalentoTechFrontend
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd talento-tech-frontend
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Ejecuta la aplicación en modo desarrollo:

   ```bash
   npm start
   ```

   La aplicación estará disponible en `http://localhost:4200`.

   ## Estructura del Proyecto

```plaintext
talento-tech-frontend/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   ├── components/
│   │   ├── core/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   └── app.routes.ts
│   ├── assets/
│   ├── environments/
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
└── README.md
```

## Componentes

Algunos componentes principales incluyen:

```bash
LoginComponent: Componente para la página de inicio de sesión.
```
```bash
LandingHomeComponent: Componente para la página principal de aterrizaje.
```
```bash
HomeOpportunityComponent: Componente para mostrar las oportunidades de negocio.
```
```bash
FormCreateUserComponent: Componente para el formulario de creación de usuarios.
```
```bash
FormCreateBussinessComponent: Componente para el formulario de creación de negocios.
```
```bash
CardBusinessComponent: Componente para mostrar la lista de negocios.
```
```bash
CardDetailBusinessComponent: Componente para mostrar los detalles de un negocio.
```
```bash
CardDetailMatchesComponent: Componente para mostrar los matches de negocios.
```
```bash
CardDetailUserComponent: Componente para mostrar los detalles de un usuario.
```
```bash
FormEditUserComponent: Componente para el formulario de edición de usuarios.
```
```bash
NotificationsByUserComponent: Componente para mostrar las notificaciones de los usuarios.
```

## Contribución

```bash
Haz un fork del repositorio.
```
```bash
Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
```
```bash
Realiza tus cambios y haz commit (git commit -am 'Añadir nueva funcionalidad').
```
```bash
Haz push a la rama (git push origin feature/nueva-funcionalidad).
```
```bash
Abre un Pull Request.
```

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para obtener más detalles.


