# 👗👕 💍 Caro Martinez
### Clothing & Jewelery

------------

## Entrega final para el Curso de React en Coderhouse

### Se realizó un E-Commerce utilizando **React.js**

### Liberías utilizadas:
- react-router: Librería para el ruteo de la SPA.
- firebase: WebService de Google que proporciona un Backend en la nube, con una fuente de datos NoSQL.
- react-bootstrap: Biblioteca de componentes de interfaz de usuario (UI) que combina la popularidad y flexibilidad de Bootstrap con la potencia y eficiencia de React.
- react-hook-form: Para generar formularios de manera no controlada, independizando todo cambio que pueda producirse en cada uno de los elementos del formulario, evitando con ello renders innecesarios, haciendo uso de hooks.

## Resumen del proyecto
### PreEntrega n°1:
##### Crea una carpeta dentro de src llamada components que contenga la implementación del componente NavBar dentro del archivo NavBar.js. Su funcionalidad es la de renderizar una barra de menú (Navbar).
- Crea un componente CartWidget con un ícono y una notificación mostrando un número hardcodeado (fijo).
- Ubica este componente (CartWidget) dentrode Navbar.
- Agrega algunos estilos con bootstrap/materialize u otro.
- Crea un componente contenedor ItemListContainer.js con una prop greeting, y muestra el mensaje dentro del contenedor con el styling integrado.

### PreEntrega n°2:
##### Configura en App.js el routing usando un BrowserRouter de tu aplicación con react-router-dom.

#### Componentes:
- Navbar con Cart
- Catálogo
- Detalle de producto

#### Links y Rutas a configurar:
- Clickear en el brand debe navegar a ‘/’
- Clickear un Item.js debe navegar a /item/:id****
- Clickear en una categoría del navbar debe navegar a /category/:categoryId

## Entrega Final:
#### Se debe generar una versión funcional del e-commerce que permita la navegabilidad por el sitio, agregar productos al Cart y poder realizar un Checkout para confirmar la operación.
#### Este Checkout se realizará luego de solicitar al comprador los siguientes datos:
- Nombre Completo
- Teléfono
- E-mail

> Todos estos datos serán mandatorios

#### Una vez confirmada la compra, se visualizará por pantalla el código de órden generado para la operación.

### Aspectos a tener en cuenta:
Los datos de los artículos y categorías, se obtienen de las respectivas colecciones **products** y **categories**, de la base de datos de Firebase.
A su vez, las ordenes confirmadas se almacenarán en la colección **orders**.
Previo a confirmar la órden, se realiza una verificación de Stock, y de haber alguna incongruencia, **no se genera la compra y se informa por pantalla al usuario sobre este problema**.

### Oportunidades de mejora para una próxima versión:
Intentar agregar la opción de talles (con sus respectivos Stocks) para cada uno de los productos.
Emprolijar e intentar simplificar el código, aplicando Sugar Sintax donde sea posible.
En caso de que hubiera error por falta de Stock, mostrar un listado de los productos que  tienen este inconveniente.
Ocultar el archivo **.env** 
>Para facilitar la corrección, no se incluyó el .env a .gitignore. De todos modos, a continuación se proporciona la API_KEY: **AIzaSyDdTDy7k62eagmqDMVLdw0XS4jR1GEDx3k**
