document.addEventListener('DOMContentLoaded', () => {
  const qs=(s,r=document)=>r.querySelector(s), qsa=(s,r=document)=>[...r.querySelectorAll(s)];
  const toast=(msg)=>{let e=qs('[data-site-toast]');if(!e){e=document.createElement('div');e.className='site-toast';document.body.appendChild(e);}e.textContent=msg;e.classList.add('is-visible');clearTimeout(window.__toast);window.__toast=setTimeout(()=>e.classList.remove('is-visible'),2200);};

  /* Header / mega menu */
  const header=qs('[data-header]');
  if(header){
    const mobileToggle=header.querySelector('[data-mobile-menu-toggle]'), mobileNav=header.querySelector('[data-mobile-nav]'), mobileClose=header.querySelector('[data-mobile-menu-close]'), overlay=header.querySelector('[data-header-overlay]'), megaItems=qsa('[data-mega-item]',header);
    const closeMega=()=>megaItems.forEach(item=>{item.classList.remove('is-open');item.querySelector('[data-mega-trigger]')?.setAttribute('aria-expanded','false');});
    const closeMobile=()=>{mobileNav?.classList.remove('is-open');mobileToggle?.setAttribute('aria-expanded','false');document.body.classList.remove('menu-is-open');};
    const openMobile=()=>{closeMega();mobileNav?.classList.add('is-open');mobileToggle?.setAttribute('aria-expanded','true');document.body.classList.add('menu-is-open');};
    mobileToggle?.addEventListener('click',()=>mobileNav?.classList.contains('is-open')?closeMobile():openMobile());
    mobileClose?.addEventListener('click',closeMobile);overlay?.addEventListener('click',()=>{closeMega();closeMobile();});
    megaItems.forEach(item=>{const trig=item.querySelector('[data-mega-trigger]');trig?.addEventListener('click',e=>{e.preventDefault();const open=!item.classList.contains('is-open');closeMega();if(open){item.classList.add('is-open');trig.setAttribute('aria-expanded','true');}});item.addEventListener('mouseenter',()=>{if(innerWidth>990){closeMega();item.classList.add('is-open');trig?.setAttribute('aria-expanded','true');}});});
    document.addEventListener('click',e=>{if(!e.target.closest('[data-mega-item]')&&!e.target.closest('.desktop-nav'))closeMega();});
    window.addEventListener('resize',()=>{if(innerWidth>990)closeMobile();});
  }

  /* Cart drawer */
  const drawer=()=>qs('[data-cart-drawer]');
  const openCart=()=>{const d=drawer();if(!d)return;d.classList.add('is-open');d.setAttribute('aria-hidden','false');document.body.classList.add('cart-is-open');};
  const closeCart=()=>{const d=drawer();if(!d)return;d.classList.remove('is-open');d.setAttribute('aria-hidden','true');document.body.classList.remove('cart-is-open');};
  async function refreshCart(){
    try{
      const data=await fetch('/cart.js').then(r=>r.json());
      qsa('[data-cart-count]').forEach(e=>e.textContent=data.item_count);
      qsa('[data-cart-drawer-count]').forEach(e=>e.textContent=data.item_count);
      const res=await fetch('/cart?sections=cart-drawer',{headers:{Accept:'application/json'}}).then(r=>r.json());
      if(res['cart-drawer']){const d=drawer();if(d)d.outerHTML=res['cart-drawer'];}
      return data;
    }catch(e){return null;}
  }
  document.addEventListener('click',e=>{if(e.target.closest('[data-cart-open]'))openCart();if(e.target.closest('[data-cart-close]'))closeCart();});

  /* Quick add */
  qsa('.quick-add-form').forEach(form=>form.addEventListener('submit',async e=>{e.preventDefault();const btn=qs('button',form);if(btn){btn.disabled=true;btn.textContent='Adding…';}try{const res=await fetch(form.action,{method:'POST',headers:{Accept:'application/json','Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},body:new URLSearchParams(new FormData(form)).toString()});if(!res.ok)throw new Error('add');await refreshCart();openCart();toast('Added to bag.');}catch(err){toast('Unable to add this item.');}if(btn){btn.disabled=false;btn.textContent='Add to bag';}}));

  /* Main product add */
  qsa('.olx-product-form').forEach(form=>form.addEventListener('submit',async e=>{e.preventDefault();const btn=qs('button[type="submit"]',form);if(btn){btn.disabled=true;btn.textContent='Adding…';}try{const res=await fetch('/cart/add.js',{method:'POST',headers:{Accept:'application/json'},body:new FormData(form)});if(!res.ok)throw new Error('add');await refreshCart();openCart();toast('Added to bag.');}catch(err){toast('Please choose an available option.');}if(btn){btn.disabled=false;btn.textContent='Add to bag';}}));

  /* Drawer line quantity controls: read current cart then change line */
  document.addEventListener('click',async e=>{
    const btn=e.target.closest('[data-drawer-line-plus],[data-drawer-line-minus],[data-drawer-line-remove]');if(!btn)return;
    const line=Number(btn.dataset.drawerLine);const cart=await fetch('/cart.js').then(r=>r.json());const item=cart.items[line-1];if(!item)return;let qty=item.quantity;if(btn.dataset.drawerLineRemove)qty=0;else qty=Math.max(0,qty+(btn.dataset.drawerLinePlus?1:-1));await fetch('/cart/change.js',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({line,quantity:qty})});await refreshCart();openCart();
  });

  /* Product gallery */
  qsa('[data-media-thumb]').forEach(btn=>btn.addEventListener('click',()=>{const id=btn.dataset.mediaThumb;qsa('[data-media-thumb]').forEach(x=>x.classList.toggle('is-active',x===btn));qsa('[data-media-panel]').forEach(p=>p.classList.toggle('is-active',p.dataset.mediaPanel===id));}));

  /* Product quantity */
  qsa('.olx-product').forEach(scope=>{scope.addEventListener('click',e=>{const plus=e.target.closest('[data-plus]'),minus=e.target.closest('[data-minus]');if(!plus&&!minus)return;const box=(plus||minus).closest('.quantity');const input=qs('input',box);if(input)input.value=Math.max(1,Number(input.value||1)+(plus?1:-1));});
    const form=qs('.olx-product-form',scope), variantsEl=qs('[data-product-variants]',form);if(!form||!variantsEl)return;
    let variants=[];try{variants=JSON.parse(variantsEl.textContent||'[]');}catch(e){return;}
    const sync=()=>{const chosen=qsa('.olx-options input[type="radio"]:checked',form).map(i=>i.value);if(!chosen.length)return;const match=variants.find(v=>v.options.every((opt,i)=>opt===chosen[i]));if(!match)return;const id=qs('input[name="id"]',form);if(id)id.value=match.id;const button=qs('button[type="submit"]',form);if(button){button.disabled=!match.available;button.textContent=match.available?'Add to bag':'Sold out';}const price=qs('.olx-product-price',scope);if(price){price.innerHTML=(window.Shopify?.formatMoney?Shopify.formatMoney(match.price):new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR'}).format(match.price/100))+(match.compare_at_price&&match.compare_at_price>match.price?` <del>${Shopify?.formatMoney?Shopify.formatMoney(match.compare_at_price):''}</del>`:'');}};
    qsa('.olx-options input[type="radio"]',form).forEach(i=>i.addEventListener('change',sync));sync();
  });


  /* Collection filter drawer on mobile */
  document.addEventListener('click',e=>{if(e.target.closest('[data-filter-open]')){qs('[data-filter-panel]')?.classList.add('is-open');document.body.classList.add('filter-is-open');}if(e.target.closest('[data-filter-close]')){qs('[data-filter-panel]')?.classList.remove('is-open');document.body.classList.remove('filter-is-open');}});

  /* Full cart page quantity */
  document.addEventListener('click',async e=>{
    const plus=e.target.closest('[data-cart-plus]'), minus=e.target.closest('[data-cart-minus]');
    if(!plus&&!minus)return;
    const line=Number((plus||minus).dataset.cartPlus||(plus||minus).dataset.cartMinus); if(!line)return;
    const input=(plus||minus).closest('.olx-cart-line')?.querySelector('input[name="updates[]"]'); if(!input)return;
    input.value=Math.max(0,Number(input.value||1)+(plus?1:-1));
    await fetch('/cart/change.js',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({line,quantity:Number(input.value)})});
    window.location.reload();
  });

  /* Keyboard */
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeCart();header?.querySelector('[data-mobile-menu-close]')?.click();header?.querySelector('[data-header-overlay]')?.click();}});
});
