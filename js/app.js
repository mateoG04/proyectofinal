const shopcontent = document.getElementById("shopcontent");
const vercarrito = document.getElementById("vercarrito");
const modalcontainer = document.getElementById("modal-container");
const cantidadcarrito = document.getElementById("cantidadcarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
productos.forEach((producto) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
<img src="${producto.img}">
<h5>${producto.nombre}</h5>
<p class="price">${producto.precio} $</p>
`;

    shopcontent.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click", () => {

        const repeat = carrito.some((repeatproducto) => repeatproducto.id == producto.id);

        if (repeat) {
            carrito.map((prod) => {
                if (prod.id === producto.id) {
                    prod.cantidad++;
                }
            });
        }
        else {
            carrito.push({
                id: producto.id,
                img: producto.img,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: producto.cantidad,
            });
        }

        console.log(carrito);
        console.log(carrito.length);
        carritocounter();
        savelocal();
    });
});

const savelocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};


vercarrito.addEventListener("click", () => {

});