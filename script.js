// Tab Navigation
const tabButtons = document.querySelectorAll('.tab-btn');
const tabSections = document.querySelectorAll('.tab-section');
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabSections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(btn.dataset.target).classList.add('active');
  });
});

/* ====================== To-Do List ====================== */
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addBtn = document.getElementById('addBtn');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => addTaskToDOM(task));

addBtn.addEventListener('click', () => {
  const task = taskInput.value.trim();
  if(task){
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    addTaskToDOM(task);
    taskInput.value = '';
  }
});

function addTaskToDOM(task){
  const li = document.createElement('li');
  li.textContent = task;
  li.addEventListener('click', () => {
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    li.remove();
  });
  taskList.appendChild(li);
}

/* ====================== Product Listing ====================== */
const products = [
  {name:"Laptop", category:"electronics", price:50000},
  {name:"T-Shirt", category:"clothing", price:500},
  {name:"Headphones", category:"electronics", price:2000},
  {name:"Jeans", category:"clothing", price:1200}
];

const productContainer = document.getElementById('productContainer');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');

function displayProducts(items){
  productContainer.innerHTML = '';
  items.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `<h3>${p.name}</h3><p>Category: ${p.category}</p><p>Price: ₹${p.price}</p>`;
    productContainer.appendChild(div);
  });
}

function filterAndSort(){
  let filtered = categoryFilter.value === 'all' ? products : products.filter(p => p.category === categoryFilter.value);
  if(sortFilter.value === 'priceLow') filtered.sort((a,b)=>a.price-b.price);
  if(sortFilter.value === 'priceHigh') filtered.sort((a,b)=>b.price-a.price);
  displayProducts(filtered);
}

categoryFilter.addEventListener('change', filterAndSort);
sortFilter.addEventListener('change', filterAndSort);
displayProducts(products);
