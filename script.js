const products = [
  { id:1, type:'abaya', name:'The Nura Abaya', price:'PKR 12,500', badge:'Bestseller', image:'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85' },
  { id:2, type:'hijab', name:'Silk Modal — Sand', price:'PKR 2,200', badge:'New', image:'https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=900&q=85' },
  { id:3, type:'abaya', name:'The Everyday Abaya', price:'PKR 9,800', old:'PKR 11,500', badge:'Sale', image:'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=900&q=85' },
  { id:4, type:'hijab', name:'Lustre Satin Hijab', price:'PKR 2,750', badge:'New', image:'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=900&q=85' },
  { id:5, type:'abaya', name:'The Atelier Abaya', price:'PKR 15,500', badge:'Limited', image:'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=900&q=85' },
  { id:6, type:'hijab', name:'Cloud Chiffon — Ivory', price:'PKR 1,950', image:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85' }
];

const grid = document.querySelector('#productGrid');
let filter = 'all';
let shown = 4;
let cart = 0;
let wishes = 0;

function render() {
  const visible = products.filter(p => filter === 'all' || p.type === filter).slice(0, shown);

  grid.innerHTML = visible.map(p => `
    <article class="product-card">
      <div class="product-image">
        <img loading="lazy" src="${p.image}" alt="${p.name}">
        <span class="product-badge">${p.badge || 'New'}</span>
        <button class="wish" aria-label="Add ${p.name} to wishlist" data-wish="${p.id}">♡</button>
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.type === 'abaya' ? 'Fluid crepe · 3 colours' : 'Premium finish · 5 colours'}</p>
        <p class="price">${p.price}${p.old ? `<span class="old">${p.old}</span>` : ''}</p>
      </div>
    </article>
  `).join('');

  const totalVisible = products.filter(p => filter === 'all' || p.type === filter).length;
  document.querySelector('#loadMore').style.display = visible.length < totalVisible ? 'inline-flex' : 'none';

  document.querySelectorAll('[data-wish]').forEach(btn => {
    btn.onclick = () => {
      wishes++;
      document.querySelector('#wishCount').textContent = wishes;
      btn.textContent = '♥';
      showToast('Added to your wishlist');
    };
  });
}

document.querySelectorAll('[data-filter]').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('[data-filter]').forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    filter = btn.dataset.filter;
    shown = 4;
    render();
  };
});

document.querySelector('#loadMore').onclick = () => {
  shown = products.length;
  render();
};

document.querySelector('#cartToggle').onclick = () => {
  cart++;
  document.querySelector('#cartCount').textContent = cart;
  showToast('Your bag is ready for something beautiful');
};

document.querySelector('#menuToggle').onclick = () => {
  document.querySelector('#mobileNav').classList.toggle('open');
};

document.querySelector('#dismissAnnouncement').onclick = () => {
  document.querySelector('#announcement').remove();
};

document.querySelector('#newsletterForm').onsubmit = e => {
  e.preventDefault();
  const msg = document.querySelector('#newsletterMessage');
  msg.textContent = 'Thank you — welcome to the inner circle.';
  e.target.reset();
};

function showToast(text) {
  const toast = document.querySelector('#toast');
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

render();
