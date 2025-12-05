const socket = io();

socket.on("productAdded", (product) =>{
    appendProduct(product);
});

socket.on("producDeleted", (id) =>{
    const el = document.getElementById("prod-" + id);
    if (el) el.remove();
});

socket.on("productUpdated", (product) =>{
    const el = document.getElementById("prod-" + product.id);
    if (el) {
        el.innerHTML = `<strong>${product.title}</strong> _}- $${product.price} <button class="del-btn" data-id="${product.id}">Eliminar</button>`;
    }
});

function appendProduct(product) {
    const list = document.getElementById ("productsList");
        if (!list) return;
        const li = document.createElemnet("li");
        li.id = "prod-" + product.id;
        li.innerHTML = `<strong>${product.title}</strong> - $${product.price} <button class="del-btn data-id=${product.id}> Eliminar </button>`;
        list.appendChild(li); 

    }
    const form = document.getElementById("addForm");
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(form));
            if (data.price) data.price = Number(data.price);
            if (data.stock) data.stock = Number(data.stock);

            const res = await fetch("/api/products",{
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(data)  
            });
            if (res.ok) form.reset();
            else{
                const err = await res.json();
                alert("Error" + (err.error || JSON.stringify(err)));
            }
        });
    }
    document.addEventListener("click", async (e) =>{
        if (e.target.matches(".del-btn")) {
            const id = e.target.dataset.id;
            if (!confirm("Seguro queres eliminar?")) return;
            const res = await fetch (`/api/products/${id}`, { method: "DELETE" });
                if (!res.ok) {
                    const err = await res.json();
                    alert ("Error:" + (err.error || JSON.stringify(err)));
                }
        }
    });
 