const state={items:[],discountPercent:0,applyTax:false,receiptId:null};
const el={
  itemForm:document.getElementById("itemForm"),
  itemName:document.getElementById("itemName"),
  itemPrice:document.getElementById("itemPrice"),
  itemQty:document.getElementById("itemQty"),
  cartBody:document.getElementById("cartBody"),
  discountPercent:document.getElementById("discountPercent"),
  applyTax:document.getElementById("applyTax"),
  grossTotal:document.getElementById("grossTotal"),
  discountAmount:document.getElementById("discountAmount"),
  taxAmount:document.getElementById("taxAmount"),
  netTotal:document.getElementById("netTotal"),
  saveBtn:document.getElementById("saveTransaction"),
  loadLast:document.getElementById("loadLast"),
  newTransaction:document.getElementById("newTransaction"),
  toggleTheme:document.getElementById("toggleTheme"),
  printReceipt:document.getElementById("printReceipt"),
  resetTotal:document.getElementById("resetTotal"),
  receiptDate:document.getElementById("receiptDate"),
  receiptId:document.getElementById("receiptId"),
  receiptBody:document.getElementById("receiptBody"),
  rNet:document.getElementById("rNet")
};
function formatIDR(n){return "Rp "+Number(n||0).toLocaleString("id-ID");}
function makeId(){return "TRX-"+Date.now();}
function render(){
  el.cartBody.innerHTML="";
  let gross=0;
  state.items.forEach((it,i)=>{
    const sub=it.price*it.qty; gross+=sub;
    el.cartBody.innerHTML+=`<tr><td>${i+1}</td><td>${it.name}</td><td>${formatIDR(it.price)}</td><td>${it.qty}</td><td>${formatIDR(sub)}</td><td><button class="btn btn-danger btn-sm" data-id="${it.id}">Hapus</button></td></tr>`;
  });
  const discAmt=gross*state.discountPercent/100;
  const base=gross-discAmt;
  const tax=state.applyTax?base*0.11:0;
  const net=base+tax;
  el.grossTotal.textContent=formatIDR(gross);
  el.discountAmount.textContent=formatIDR(discAmt);
  el.taxAmount.textContent=formatIDR(tax);
  el.netTotal.textContent=formatIDR(net);
  // struk
  el.receiptBody.innerHTML="";
  state.items.forEach(it=>{
    el.receiptBody.innerHTML+=`<tr><td>${it.name}</td><td>${it.qty}</td><td>${formatIDR(it.price)}</td><td>${formatIDR(it.price*it.qty)}</td></tr>`;
  });
  el.receiptDate.textContent=new Date().toLocaleString("id-ID");
  el.receiptId.textContent