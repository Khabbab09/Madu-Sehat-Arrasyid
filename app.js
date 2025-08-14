
// --- Data Produk --- //
const PRODUCTS = [
  {
    id:'pahit', name:'Madu Pahit', sizes:[{label:'650gr', price:64000},{label:'1kg', price:89000}],
    stock:27, sold:143, category:'Kesehatan', images:['madu-pahit.jpg','madu-pahit-2.jpg','madu-pahit-3.jpg'],
    desc:'Madu gelap rasa pahit, baik untuk antiinfeksi dan penyembuhan luka.',
    features:['Antiinfeksi','Mendukung penyembuhan luka','Kaya antioksidan'],
    shipping:'Rp10.000 - Rp25.000 (1-3 hari kerja, tergantung lokasi)',
    payments:['Kartu Kredit/Debit','Transfer Bank','VA','e-Wallet']
  },
  {
    id:'mint', name:'Madu Mint', sizes:[{label:'650gr', price:63000},{label:'1kg', price:88000}],
    stock:29, sold:151, category:'Pernafasan', images:['madu-mint.jpg','madu-mint-2.jpg','madu-mint-3.jpg'],
    desc:'Madu dengan ekstrak mint, melegakan tenggorokan dan pencernaan.',
    features:['Menenangkan tenggorokan','Segar','Mendukung pencernaan'],
    shipping:'Rp10.000 - Rp25.000 (1-3 hari kerja)',
    payments:['Kartu Kredit/Debit','Transfer Bank','VA','e-Wallet']
  },
  {
    id:'temulawak', name:'Madu Temulawak', sizes:[{label:'650gr', price:64000},{label:'1kg', price:88000}],
    stock:30, sold:70, category:'Stamina', images:['madu-temulawak.jpg','madu-temulawak-2.jpg','madu-temulawak-3.jpg'],
    desc:'Madu plus temulawak, mendukung anti-inflamasi, hati, dan energi.',
    features:['Anti-inflamasi','Dukungan fungsi hati','Energi harian'],
    shipping:'Rp10.000 - Rp25.000 (1-3 hari kerja)',
    payments:['Kartu Kredit/Debit','Transfer Bank','VA','e-Wallet']
  },
  {
    id:'randu', name:'Madu Randu', sizes:[{label:'650gr', price:61000},{label:'1kg', price:86000}],
    stock:29, sold:41, category:'Ibu & Anak', images:['madu-randu.png','madu-randu-2.jpg','madu-randu-3.jpg'],
    desc:'Madu bunga randu, bermanfaat untuk kulit, imunitas, dan nutrisi ibu hamil.',
    features:['Ramah kulit','Dukungan imun','Nutrisi bumil'],
    shipping:'Rp10.000 - Rp25.000 (1-3 hari kerja)',
    payments:['Kartu Kredit/Debit','Transfer Bank','VA','e-Wallet']
  },
  {
    id:'hutan', name:'Madu Hutan Hitam', sizes:[{label:'650gr', price:63000},{label:'1kg', price:88000}],
    stock:0, sold:61, category:'Kekebalan', images:['madu-hutan-hitam.jpg','madu-hutan-2.jpg','madu-hutan-3.jpg'],
    desc:'Madu hutan gelap, kaya antioksidan, meningkatkan daya tahan tubuh.',
    features:['Antioksidan tinggi','Imunitas','Rasa kuat'],
    shipping:'Rp10.000 - Rp25.000 (1-3 hari kerja)',
    payments:['Kartu Kredit/Debit','Transfer Bank','VA','e-Wallet']
  },
  {
    id:'super', name:'Madu Super', sizes:[{label:'350gr', price:55000}],
    stock:35, sold:25, category:'Premium', images:['madu-super.jpeg','madu-super-2.jpg','madu-super-3.jpg'],
    desc:'Madu dengan royal jelly & pollen, meningkatkan energi, daya tahan, dan kesehatan jantung.',
    features:['Royal Jelly','Bee Pollen','Boost energi'],
    shipping:'Rp10.000 - Rp25.000 (1-3 hari kerja)',
    payments:['Kartu Kredit/Debit','Transfer Bank','VA','e-Wallet']
  }
];

// --- Utilitas --- //
const $ = (sel, ctx=document)=>ctx.querySelector(sel);
const $$ = (sel, ctx=document)=>Array.from(ctx.querySelectorAll(sel));

function fmtIDR(n){ return n.toLocaleString('id-ID', {style:'currency', currency:'IDR'}); }

function getCart(){
  try{ return JSON.parse(localStorage.getItem('cart')||'[]'); }catch(e){ return []; }
}
function setCart(items){
  localStorage.setItem('cart', JSON.stringify(items));
  updateCartCount();
}
function addToCart(productId, sizeLabel, qty=1){
  const cart = getCart();
  const key = `${productId}@${sizeLabel}`;
  const exist = cart.find(i=>i.key===key);
  if(exist){ exist.qty += qty; } else {
    const p = PRODUCTS.find(p=>p.id===productId);
    const sz = p.sizes.find(s=>s.label===sizeLabel);
    cart.push({key, id:productId, name:p.name, size:sizeLabel, price:sz.price, qty});
  }
  setCart(cart);
  window.location.href = 'cart.html'; // Redirect ke halaman keranjang
}
function removeFromCart(key){
  const cart = getCart().filter(i=>i.key!==key);
  setCart(cart);
  renderCart && renderCart();
}
function updateQty(key, qty){
  const cart = getCart();
  const it = cart.find(i=>i.key===key);
  if(it){ it.qty = Math.max(1, qty); setCart(cart); renderCart && renderCart(); }
}
function cartSubtotal(){
  return getCart().reduce((s,i)=>s+(i.price*i.qty),0);
}
function updateCartCount(){
  const count = getCart().reduce((s,i)=>s+i.qty,0);
  const el = $('#cart-count'); if(el) el.textContent = count;
}
document.addEventListener('DOMContentLoaded', updateCartCount);

// --- Banner / Home --- //
function startBanner(){
  const slides = [
    {img:'lebah-madu.jpeg', title:'Diskon Spesial Agustus', sub:'Hingga 25% untuk produk pilihan', link:'products.html'},
    {img:'madu2.jpeg', title:'Paket Keluarga Hemat', sub:'Bundling lebih murah!', link:'products.html#bundles'},
    {img:'madu3.jpeg', title:'Gratis Ongkir*', sub:'S&K berlaku untuk wilayah tertentu', link:'products.html#shipping'}
  ];
  let i=0;
  const banner = $('#banner');
  function render(){
    const s = slides[i];
    banner.style.backgroundImage = `url('${s.img}')`;
    $('.banner .title', banner).textContent = s.title;
    $('.banner .sub', banner).textContent = s.sub;
    $('.banner .cta', banner).setAttribute('href', s.link);
    i = (i+1)%slides.length;
  }
  render();
  setInterval(render, 4000);
}

// --- Render Produk di Home --- //
function renderRekomendasi(){
  const wrap = $('#rekomendasi');
  if(!wrap) return;
  wrap.innerHTML = PRODUCTS.map(p=>`
    <div class="card">
      <img src="${p.images[0]}" alt="${p.name}">
      <div class="body">
        <strong>${p.name}</strong>
        <div style="display:flex; gap:8px; margin-top:8px">
          <a class="btn" href="products.html#${p.id}">Lihat Detail</a>
        </div>
      </div>
    </div>
  `).join('');
}

// --- Halaman Produk --- //
function renderProductsPage(){
  const list = $('#products-list'); if(!list) return;
  list.innerHTML = PRODUCTS.map(p=>`
    <article id="${p.id}" class="card" style="padding:12px">
      <div class="product-page">
        <!-- ...gallery, info, dll... -->
        <div class="product-info">
          <!-- ...nama, fitur, deskripsi, harga, varian... -->
          <div class="row" style="display:flex; gap:10px">
            <button class="btn" ${p.stock?'' :'disabled'}
              onclick="addToCart('${p.id}', document.getElementById('size-${p.id}').value, 1)">
              ${p.stock?'Tambahkan ke Keranjang':'Stok Habis'}
            </button>
            <a class="btn secondary" href="cart.html">Lihat Keranjang</a>
          </div>
          <!-- ...ulasan, info tambahan... -->
        </div>
      </div>
    </article>
  `).join('');
}

// --- Keranjang --- //
function renderCart(){
  const tbody = $('#cart-body'); if(!tbody) return;
  const items = getCart();
  tbody.innerHTML = items.length? items.map(it=>`
    <tr>
      <td>${it.name} <div class="muted">${it.size}</div></td>
      <td>${fmtIDR(it.price)}</td>
      <td>
        <input type="number" min="1" value="${it.qty}" style="width:70px" onchange="updateQty('${it.key}', parseInt(this.value||'1'))">
      </td>
      <td>${fmtIDR(it.price*it.qty)}</td>
      <td><button class="btn ghost" onclick="removeFromCart('${it.key}')">Hapus</button></td>
    </tr>
  `).join('') : `<tr><td colspan="5">Keranjang kosong. <a href="products.html">Belanja sekarang</a>.</td></tr>`;
  $('#subtotal').textContent = fmtIDR(cartSubtotal());
}

// --- Login --- //
function handleLogin(e){
  e.preventDefault();
  const email = $('#email').value.trim();
  const pass = $('#password').value.trim();
  const error = $('#login-error');
  error.textContent='';
  if(!email || !pass){ error.textContent='Email dan kata sandi wajib diisi.'; return; }
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ error.textContent='Format email tidak valid.'; return; }
  // Demo only:
  if(pass.length < 6){ error.textContent='Kata sandi minimal 6 karakter.'; return; }
  localStorage.setItem('loggedIn','true');
  alert('Login berhasil (demo).');
  window.location.href = 'index.html';
}

// --- Init per halaman --- //
document.addEventListener('DOMContentLoaded', ()=>{
  if($('#banner')){ startBanner(); renderRekomendasi(); }
  if($('#products-list')){ renderProductsPage(); }
  if($('#cart-body')){ renderCart(); }
});
