document.addEventListener('DOMContentLoaded', () => {
    const customerForm = document.getElementById('customerForm');
    const customerTable = document.getElementById('customerTable');
    let customers = JSON.parse(localStorage.getItem('customers')) || [];

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
                    <button class="delete" onclick="deleteCustomer(${index})">مسح</button>
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

    window.deleteCustomer = (index) => {
        customers.splice(index, 1);
        saveToLocalStorage();
        renderTable();
    };

    renderTable();
});
