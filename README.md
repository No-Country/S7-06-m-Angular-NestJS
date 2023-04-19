# MimuStore

_WebApp E-Commerce de una tienda de libretas personalizadas y productos varios._

## Descripción general

MimuStore permite a un usuario visualizar los productos que están a la venta y poder gestionar compras de uno o más productos, pudiendo efectuar la compra mediante Paypal, Mercado Pago o transferencia bancaria.

Posee un inicio de sesión implementando JWT, que distingue roles de administrador, visitante y usuario.

El visitante (usuario No logueado) solo puede ver los productos disponibles en la página e interactuar en dicha página.

El Rol Usuario (Usuario logueado) permite gestionar una o mas compras, resguardando los datos sensibles.

El Rol Administrador, permite dar de alta nuevos productos, editar los existentes o eliminar aquellos que ya no estén disponibles para la venta. Tambien permite llevar registros de compras y usuarios, y modificar el contenido de la página.

## Deploy

Deploy del frontend: [Mimu Store](https://mimustore.vercel.app/)

Deploy del backend: [Mimu Store-Backend](https://mimu-api.onrender.com/api)

## Tecnologías utilizadas

#### Frontend: ANGULAR

* Lenguaje -> [TypeScript](https://www.typescriptlang.org/)
* Framework utilizado -> [Angular 13](https://angular.io/)
* Bootstrap 5 -> [Bootstrap](https://getbootstrap.com/)
* Angular Material 13 -> [Angular material](https://v13.material.angular.io/)
* Libreria de alertas -> [SweetAlerts2](https://sweetalert2.github.io/)
* Librería Swipper (Carrousel) -> [Swipper](https://swiperjs.com/element)
* Implementación de pagos con Paypal
* Implementación de de pagos con Mercado Pago

#### Backend: NEST.JS - PostgreSQL - TypeORM - Docker

* Lenguaje -> [TypeScript](https://www.typescriptlang.org/)
* Framework utilizado -> [Nest.JS](https://nestjs.com/) 
* Documentación -> [Swagger](https://swagger.io/docs/)
* Base de Datos -> [PostgreSQL](https://www.postgresql.org/)
* Manejo de datos -> [TypeORM](https://typeorm.io/)
* Containers -> [Docker](https://www.docker.com/)

#### Diseño UI-UX:

* Diseño de interfaz de usuario y prototipado -> [Figma](https://www.figma.com/)

#### DevOps:

* Deploy Backend -->  [Render](https://render.com/)  
* Deploy Frontend -->  [Vercel](https://vercel.com/)

## Equipo de desarrollo

|   Nombre  |    Rol   |      Contacto      |
| :-------- | :------- | :------------------------- |
| Federico Di Cillo | Desarrollador Frontend Angular | [LinkedIn] |
| Sharon Ormachea | Desarrolladora Frontend Angular | [LinkedIn] |
| Santiago Castellani | Desarrollador Frontend Angular | [LinkedIn] |
| Josue Ordonez| Desarrollador Backend NestJS | [LinkedIn](https://www.linkedin.com/in/josueordonezm/) |
| Bryan Davis Sanabria | Desarrollador Backend NestJS | [LinkedIn] |
| Dayana Zeledon | Diseñadora UI-UX | [Linkedin] |
| Natalia Pedraza | QA | [LinkedIn] |
| Rivers Emanuel | Project Manager | [Linkedin] |

## Agradecimientos 🎁

#### A todo el equipo S7-06-m-Angular-NestJS por haber participado

#### Muchas Gracias.

---
