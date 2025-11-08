#  Guía de Despliegue - Backend .NET 8

##  Descripción

Este documento explica cómo **desplegar el backend** del sistema de **Producción y Ventas (prueba técnica de Indigo)** desarrollado con **.NET 8** y **SQL Server**, utilizando **JWT** para autenticación y arquitectura limpia.

---

### 1 Requisitos Previos

Antes de desplegar, asegúrate de tener instalado:

| Herramienta | Descripción |
|--------------|-------------|
| [.NET SDK 8.0+](https://dotnet.microsoft.com/en-us/download) | Framework necesario para compilar y ejecutar |
| [SQL Server o Azure SQL](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) | Base de datos |
| [Git](https://git-scm.com/downloads) | Control de versiones |


---


### 2 Configurar el archivo `appsettings.json`
Edita la cadena de conexión a tu base de datos SQL Server:

```json
"ConnectionStrings": {
  "Default": "Server=localhost;Database=ShopSuite;User Id=sa;Password=TuPassword123;TrustServerCertificate=True;"
}
```

Si usas Azure SQL:
```json
"ConnectionStrings": {
  "Default": "Server=tcp:mi-servidor.database.windows.net,1433;Initial Catalog=ShopSuite;User ID=usuario;Password=ClaveSegura;"
}
```

### 3️ Configurar variables JWT (opcional)
```json
"Jwt": {
  "Key": "TuClaveSecretaSuperSeguraDeAlMenos32Caracteres",
  "Issuer": "IndigoBackend",
  "Audience": "IndigoFrontend"
}
```

##  Migraciones y Base de Datos

1. Crea la base de datos si no existe:
   ```bash
   dotnet ef database update
   ```

2. (Opcional) Crear migración inicial:
   ```bash
   dotnet ef migrations add InitialCreate
   ```

---

##  Desplegar Localmente

Para ejecutar el backend en tu entorno local:
```bash
dotnet run --project Api
```

