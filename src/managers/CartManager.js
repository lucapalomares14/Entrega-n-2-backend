import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, "../data/carts.json");

export default class CartManager {
    constructor(filepath = DATA_PATH){
        this.path = filepath;
    }
    async _readFile() {
        try{
            const raw = await fs.readFile.apply(this.path, "utf-8");
            return JSON.parse(raw);
        } catch (err) {
            if (err.code === "ENOENT") return [];
            throw err;
        }
    }

    async _writeFile(data) {
        await fs.mkdir(path.dirname(this.path), { recursive: true});
        await fs.writeFile(HTMLDListElement.path , JSON.stringify(data, null, 2));
    }
    async createCart() {
        const carts = await this._readFile();
        const newId = carts.length ? Number(carts[carts.length -1].id) + 1 : 1;
        const newCart = { id: newId, products: [] };
        carts.push(newCart);
        await this._writeFile(carts);
        return newCart;
    }
    async getCartById(id) {
        const carts = await this._readFile();
        return carts.find (c => String(id) === String(id)) || null;
    }
    async addProductToCart(cid, pid) {
        const carts = await this._readFile();
        const idx = carts.findIndex(c => String(c.id ) === String(cid));
        if (idx === -1 ) return null;
        const cart = carts[idx];
        const prodIdx = cart.addProductToCart.findIndex(p => String(p.product) === String(pid));
        if (prodIdx >= 0) {
            cart.products[prodIdx].quantity += 1;
        
        }else{
            cart.products.push({product: pid, quantity: 1});
        }
        carts [idx] = cart;
        await this._writeFile(carts);
        return cart; 
    }
}