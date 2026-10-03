const order = [];
const orderList = document.querySelector('#order-list');
const orderTotal = document.querySelector('#order-total');
const orderStatus = document.querySelector('#order-status');
const clearOrderButton = document.querySelector('#clear-order');
const printOrderButton = document.querySelector('#print-order');

function renderOrder() {
  orderList.innerHTML = '';
  if (order.length === 0) {
    orderList.innerHTML = '<li class="empty-order">No items yet — choose something from the menu above.</li>';
  } else {
    order.forEach((item, index) => {
      const row = document.createElement('li');
      row.className = 'order-item';
      row.innerHTML = `<span>${item.name}</span><strong>$${item.price.toFixed(2)}</strong><button type="button" aria-label="Remove ${item.name}" data-remove="${index}">×</button>`;
      orderList.appendChild(row);
    });
  }

  const total = order.reduce((sum, item) => sum + item.price, 0);
  orderTotal.textContent = `$${total.toFixed(2)}`;
}

document.querySelectorAll('.buy-button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = {name: button.dataset.item, price: Number(button.dataset.price)};
    order.push(item);
    renderOrder();
    orderStatus.textContent = `${item.name} added to your order.`;
    document.querySelector('#order').scrollIntoView({behavior: 'smooth', block: 'center'});
  });
});

orderList.addEventListener('click', (event) => {
  const removeButton = event.target.closest('[data-remove]');
  if (!removeButton) return;
  const removed = order.splice(Number(removeButton.dataset.remove), 1)[0];
  renderOrder();
  orderStatus.textContent = `${removed.name} removed from your order.`;
});

clearOrderButton.addEventListener('click', () => {
  order.length = 0;
  renderOrder();
  orderStatus.textContent = 'Your order has been cleared.';
});

printOrderButton.addEventListener('click', () => {
  if (order.length === 0) {
    orderStatus.textContent = 'Add an item before printing your order.';
    return;
  }
  window.print();
});

renderOrder();
