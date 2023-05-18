const pintarcarrito = () => {
    modalcontainer.innerHTML = "";
    modalcontainer.style.display = "flex";
    const modalheader = document.createElement("div");
    modalheader.className = "modal- header"
    modalheader.innerHTML = `
    <h1 class="modal-header-title">carrito. </h1>
    `;
    modalcontainer.append(modalheader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
        modalcontainer.style.display = "none";
    });

    modalheader.append(modalbutton);

    carrito.forEach((producto) => {
        let carritocontent = document.createElement("div");
        carritocontent.className = "modal-content";
        carritocontent.innerHTML = `
        <img src="${producto.img}">
        <h5>${producto.nombre}</h5>
        <p>${producto.precio} $</p>
        <span class="restar"> - </span>
        <p>cantidad: ${producto.cantidad}</p>
        <span class="sumar"> + </span>
        <p>total: ${producto.cantidad * producto.precio}</p>
        <span class="delete-producto"> ❌ </span>
        <span class="finalizar"> finalizar </span>
        `;

        modalcontainer.append(carritocontent);

        let restar = carritocontent.querySelector(".restar")

        restar.addEventListener("click", () => {
            if (producto.cantidad !== 1) {
                producto.cantidad--;
            }
            savelocal();
            pintarcarrito();
        });

        let sumar = carritocontent.querySelector(".sumar")
        sumar.addEventListener("click", () => {
            producto.cantidad++;
            savelocal();
            pintarcarrito();
        });

        let eliminar = carritocontent.querySelector(".delete-producto");
        eliminar.addEventListener("click", () =>{
            eliminarproducto(producto.id); 
        });

        let finalizar = carritocontent.querySelector(".finalizar")

       finalizar.addEventListener("click", () => {
            if (producto.finalizar) {
                producto.finalizar;
            }
            savelocal();
            pintarcarrito();
        });

        //console.log(carrito.length);

        //let eliminar = document.createElement("span");
        //eliminar.innerText = "❌";
        //eliminar.classList = "delete-producto";
       // carritocontent.append(eliminar);

        //eliminar.addEventListener("click", eliminarproducto);
    });



    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalbuying = document.createElement("div");
    totalbuying.className = "total-content";
    totalbuying.innerHTML = `total a pagar: ${total} $`;
    modalcontainer.append(totalbuying);
};

vercarrito.addEventListener("click", pintarcarrito);

const eliminarproducto = (id) => {
    const foundId = carrito.find((Element) => Element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    carritocounter();
    savelocal();
    pintarcarrito();
};

const carritocounter = () => {
    cantidadcarrito.style.display = "block";

    const carritolength = carrito.length;
    localStorage.setItem("carritolength", JSON.stringify(carritolength))

    cantidadcarrito.innerText = JSON.parse(localStorage.getItem("carritolength"));
};

carritocounter();