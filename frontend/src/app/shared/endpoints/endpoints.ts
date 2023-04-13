import { environment } from "src/environments/environment";

const BASE_URL = environment.baseUrl + '/';

// -----------------------STORE------------------------------------------------

// --PRODUCTO--

// Trae todos los productos - GET - POST
export const PRODUCT_URL = BASE_URL + 'products';

// Trae un producto por ID - GET - DELETE - PATCH
export const PRODUCT_BY_ID_URL = PRODUCT_URL + '';

// --CATEGORIA--

// Trae todas las categorias - GET - POST
export const PRODUCT_CATEGORIES_URL = BASE_URL + 'categories';

// Trae un producto por categoria - GET - DELETE - PATCH
export const PRODUCT_BY_CATEGORIES_URL = PRODUCT_URL + '';

// -----------------------USER------------------------------------------------

// REGISTRARSE
export const REGISTER_URL = BASE_URL + 'auth/register';
// LOGIN
export const LOGIN_URL = BASE_URL + 'auth/login';


