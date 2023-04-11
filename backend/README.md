# Ejecutar en desarrollo

1. Descargar Docker

2. Clonar el repositorio

3. Clonar el archivo `.env.template` y renombrar la copia a `.env`

4. Ejecutar el siguiente comando:

```
docker-compose -f docker-compose.dev.yml up -d
```

6. Bajar el contenedor:

```
docker-compose down --remove-orphans
```

## Stack usado

- PostgreSQL
- TypeORM
- Nestjs
