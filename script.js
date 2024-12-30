document.addEventListener('DOMContentLoaded', () => {
    const customerForm = document.getElementById('customerForm');
    const customerTable = document.getElementById('customerTable');
    const popup = document.getElementById('popup');
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    const cancelDeleteBtn = document.getElementById('cancelDelete');

    let customers = JSON.parse(localStorage.getItem('customers')) || [];
    let customerToDelete = null;

    const renderTable = () => {
        customerTable.innerHTML = '';
        customers.forEach((customer, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
        <td>${customer.name}</td>
        <td>
          <input class="input" type="number" step="0.01" value="${customer.balance}" id="balance-${index}">
        </td>
        <td class="gap">
          <button class="save" onclick="saveCustomer(${index})">حفظ</button>
          <button class="delete" onclick="showPopup(${index})">مسح</button>
        </td>
      `;
            customerTable.appendChild(row);
        });
    };

    const saveToLocalStorage = () => {
        localStorage.setItem('customers', JSON.stringify(customers));
    };

    customerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const balance = parseFloat(document.getElementById('balance').value);
        customers.push({ name, balance });
        saveToLocalStorage();
        renderTable();
        customerForm.reset();
    });

    window.saveCustomer = (index) => {
        const newBalance = parseFloat(document.getElementById(`balance-${index}`).value);
        if (!isNaN(newBalance)) {
            customers[index].balance = newBalance;
            saveToLocalStorage();
            renderTable();
        } else {
            alert('برجاء إدخال قيمة صحيحة!');
        }
    };

    window.showPopup = (index) => {
        customerToDelete = index;
        popup.classList.remove('hidden');
    };

    confirmDeleteBtn.addEventListener('click', () => {
        if (customerToDelete !== null) {
            customers.splice(customerToDelete, 1);
            saveToLocalStorage();
            renderTable();
            customerToDelete = null;
            popup.classList.add('hidden');
        }
    });

    cancelDeleteBtn.addEventListener('click', () => {
        customerToDelete = null;
        popup.classList.add('hidden');
    });

    renderTable();
});
