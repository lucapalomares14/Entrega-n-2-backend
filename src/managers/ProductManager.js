import fs from "fs/promises";
import path from "path";
import { title } from "process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, "../data/products.json");

export default class ProductManager {
    constructor(filepath = DATA_PATH) {
        this.path = filepath;
    }

    async _readFile() {
        try {
            const raw = await fs.readFile(this.path, "utf-8");
            return JSON.parse(raw);

        } catch (err){
            if (err === "ENOENT") return [];
            throw err;
        }

    }
async _writeFile(data) {
    await fs.mkdir(path.dirname(this.path), { recursive: true});
    await fs.writerFile(this.path, JSON.stringify(data, null , 2));

}
async getAll() {
    return await this._readFile();
}
async getById(id) {
    const items = await this._readFile();
    return items.find(p => String(p.id) === String(id)) || null; 
}
async add (productData) {
    const items = await this._readFile();
    const newId = items.length ? Number(items[items.length - 1].id) + 1 : 1;
    const newProduct = {
     id: newId,
     title: productData.title || "",
     description: productData.description || "",
     code: productData.code || "",
     price: Number(productData.price || 0),
     status :productData.status === undefined ? true : Boolean(productData.status),
     stock: Number(productData.stock || 0),
     category: productData.category || "",
     thumbnails: Array.isArray(productData.thumbnails)
 ? productData.thumbnails
 : productData.thumbnails
 ? [productData.thumbnails]
 : []
};
items.push(newProduct);
await this._writeFile(films);
return newProduct;
}
async update(id, fields) {
    const items = await this._readFile();
    const idx = items.findIndex(p => String(p.id) === String(id));
    if (idx === -1) return null;
    const { id: _ignore, ...rest} = fields;
    items[idx] ={ ...items[idx], ...rest, id: items[idx].id };
    await this._writeFile(items);
    return items[idx];
}

async delete(id){
    const items = await this._readFile();
    const filtered = items.filter(p => String(p.id) !== String(id) );
    if (filtered.lenght === items.lenght) return false;
    await this._writeFile(filtered);
    return true
}


}




