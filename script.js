import AOS from 'aos';
import 'aos/dist/aos.css';

document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 2000,
        once: false,
        mirror: true,
    });
  
    
    // Initialize material list
    const materials = [
        { name: 'Cement', id: 'cement', price: 8.5 },
        { name: 'Bricks', id: 'bricks', price: 0.65 },
        { name: 'Timber', id: 'timber', price: 12.0 },
        { name: 'Steel', id: 'steel', price: 45.0 },
        { name: 'Sand', id: 'sand', price: 15.0 },
    ];

    const materialList = document.getElementById('materialList');
    materials.forEach(material => {
        const div = document.createElement('div');
        div.className = 'flex items-center justify-between bg-white p-3 rounded';
        div.innerHTML = `
            <span>${material.name}</span>
            <div class="flex items-center gap-4">
                <input type="number" min="1" value="1" class="w-20 p-1 border rounded quantity">
                <button onclick="addMaterial('${material.id}')" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                    Add
                </button>
            </div>
        `;
        materialList.appendChild(div);
    });
});

let selectedMaterials = [];

function addMaterial(materialId) {
    const material = materials.find(m => m.id === materialId);
    const quantity = event.target.closest('div').querySelector('.quantity').value;
    
    const existing = selectedMaterials.find(m => m.id === materialId);
    if (existing) {
        existing.quantity += parseInt(quantity);
    } else {
        selectedMaterials.push({
            ...material,
            quantity: parseInt(quantity)
        });
    }
    
    updateSelectedMaterials();
}

function updateSelectedMaterials() {
    const container = document.getElementById('selectedMaterials');
    container.innerHTML = '';
    
    selectedMaterials.forEach(material => {
        const div = document.createElement('div');
        div.className = 'bg-white p-3 rounded flex justify-between items-center';
        div.innerHTML = `
            <span>${material.name} (${material.quantity})</span>
            <span>$${(material.price * material.quantity).toFixed(2)}</span>
        `;
        container.appendChild(div);
    });
}

function addToOrder() {
    // Logic to add new material fields
    const newMaterialDiv = document.createElement('div');
    newMaterialDiv.className = 'material-group flex gap-4 mb-4';
    newMaterialDiv.innerHTML = `
        <select class="p-2 border rounded flex-1">
            ${materials.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
        </select>
        <input type="number" min="1" value="1" class="p-2 border rounded w-20">
    `;
    document.getElementById('materialList').appendChild(newMaterialDiv);
}

document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your order submission logic here
    alert('Order submitted successfully! We will contact you shortly.');
    selectedMaterials = [];
    updateSelectedMaterials();
    this.reset();
});