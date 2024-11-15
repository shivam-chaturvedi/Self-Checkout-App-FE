import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { BACKEND_SERVER_URL } from '../utils/config';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', category: '', quantity: '' });

  // Fetch products from the backend
  useEffect(() => {
    fetch(`${BACKEND_SERVER_URL}/product/get-all`)
      .then((res) => res.json())
      .then((data) => {setProducts(data);console.log(data)})
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  // Add or edit product
  const handleSaveProduct = () => {
    const method = editingProduct ? 'PUT' : 'POST';
    const url = editingProduct ? `${BACKEND_SERVER_URL}/admin/update/product/${editingProduct.id}` : `${BACKEND_SERVER_URL}/admin/add/product`;

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newProduct, price: parseFloat(newProduct.price) }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (editingProduct) {
            // data.success contain updated or added product
          setProducts(products.map((p) => (p.id === editingProduct.id ? data.success : p)));
        } else {
          setProducts([...products, data.success]);
        }
        setIsOpen(false);
      })
      .catch((err) => console.error('Error saving product:', err));
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    fetch(`/admin/product/delete/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setProducts(products.filter((product) => product.id !== id));
        }
      })
      .catch((err) => console.error('Error deleting product:', err));
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setNewProduct({ name: '', price: '', description: '', category: '', quantity: '', isAvailable: true });
    setIsOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({ ...product, price: product.price.toString() });
    setIsOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Product Inventory</h2>
        <button
          onClick={handleAddProduct}
          className="bg-blue-600 text-white py-2 px-4 rounded flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">Id</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Available</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="py-2 px-4">{product.id}</td>
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4">${product.price.toFixed(2)}</td>
                <td className="py-2 px-4">{product.category}</td>
                <td className="py-2 px-4">{product.quantity}</td>
                <td className="py-2 px-4">{product.isAvailable ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded flex items-center"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-600 text-white py-1 px-3 rounded flex items-center"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-bold mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={newProduct.quantity}
                onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleSaveProduct}
                className="bg-blue-600 text-white py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
