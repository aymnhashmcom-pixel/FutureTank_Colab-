// ====== Utility ======
const $ = id => document.getElementById(id);
const fmt = v => Number(v||0).toLocaleString('ar-EG', {minimumFractionDigits:2, maximumFractionDigits:2});

// ====== Elements ======
const itemsTbody = document.querySelector("#itemsTable tbody");
const qDesc = $('qDesc'), qPrice = $('qPrice'), qQty = $('qQty'), qDisc = $('qDisc');
const subtotalEl = $('subtotal'), totalDiscEl = $('totalDisc'), grandEl = $('grandTotal');

const saveBtn = $('saveBtn'), loadBtn = $('loadBtn'), newBtn = $('newBtn'), pdfBtn = $('pdfBtn'), shareBtn = $('shareBtn'), printBtn = $('printBtn');
const invNumber = $('invNumber'), invDate = $('invDate'), custName = $('custName'), custAddr = $('custAddr'), notes = $('notes');

// init
document.addEventListener('DOMContentLoaded', ()=>{
  // default invoice number and date
  if(!invNumber.value) invNumber.value = 'INV' + String(Date.now()).slice(-6);
  if(!invDate.value) invDate.value = new Date().toISOString().slice(0,10);
  // load last saved automatically (optionally)
  const last = localStorage.getItem('FutureTankInvoice');
  if(last) loadInvoice();
});

// add item via quick add
$('qAdd').addEventListener('click', ()=>{
  if(!qDesc.value) return alert('اكتب وصف البند');
  addRow(qDesc.value, qPrice.value || 0, qQty.value || 1, qDisc.value || 0);
  qDesc.value=''; qPrice.value=''; qQty.value=1; qDisc.value=0;
  calcTotals();
});

// addRow function
function addRow(desc='', price=0, qty=1, disc=0){
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input class="desc" value="${desc}"></td>
    <td><input class="price" type="number" value="${price}"></td>
    <td><input class="qty" type="number" value="${qty}"></td>
    <td><input class="disc" type="number" value="${disc}"></td>
    <td class="lineTotal">${fmt(0)}</td>
    <td class="no-print"><button class="del">حذف</button></td>
  `;
  itemsTbody.appendChild(tr);

  tr.querySelectorAll('input').forEach(i=>i.addEventListener('input', calcTotals));
  tr.querySelector('.del').addEventListener('click', ()=>{ tr.remove(); calcTotals(); });
  calcTotals();
}

// calc totals
function calcTotals(){
  let subtotal=0, totalDisc=0;
  document.querySelectorAll('#itemsTable tbody tr').forEach(tr=>{
    const price = Number(tr.querySelector('.price').value || 0);
    const qty = Number(tr.querySelector('.qty').value || 0);
    const disc = Number(tr.querySelector('.disc').value || 0);
    const line = price * qty;
    const discVal = line * disc/100;
    const lineTotal = line - discVal;
    tr.querySelector('.lineTotal').innerText = fmt(lineTotal);
    subtotal += line;
    totalDisc += discVal;
  });
  subtotalEl.innerText = fmt(subtotal);
  totalDiscEl.innerText = fmt(totalDisc);
  grandEl.innerText = fmt(subtotal - totalDisc);
}

// save / load / new
function collectInvoice(){
  const items = [];
  document.querySelectorAll('#itemsTable tbody tr').forEach(tr=>{
    items.push({
      desc: tr.querySelector('.desc').value,
      price: Number(tr.querySelector('.price').value||0),
      qty: Number(tr.querySelector('.qty').value||0),
      disc: Number(tr.querySelector('.disc').value||0)
    });
  });
  return {
    meta: { invNumber: invNumber.value, invDate: invDate.value, custName: custName.value, custAddr: custAddr.value, notes: notes.value },
    items,
    totals: { subtotal: subtotalEl.innerText, totalDisc: totalDiscEl.innerText, grand: grandEl.innerText }
  };
}

saveBtn.addEventListener('click', ()=>{
  const data = collectInvoice();
  localStorage.setItem('FutureTankInvoice', JSON.stringify(data));
  alert('✓ تم حفظ الفاتورة محلياً');
});

loadBtn.addEventListener('click', loadInvoice);

function loadInvoice(){
  const data = JSON.parse(localStorage.getItem('FutureTankInvoice') || 'null');
  if(!data) return alert('لا توجد فاتورة محفوظة');
  invNumber.value = data.meta.invNumber || invNumber.value;
  invDate.value = data.meta.invDate || invDate.value;
  custName.value = data.meta.custName || '';
  custAddr.value = data.meta.custAddr || '';
  notes.value = data.meta.notes || '';
  // clear items
  document.querySelectorAll('#itemsTable tbody tr').forEach((r,i)=> r.remove());
  data.items.forEach(it => addRow(it.desc, it.price, it.qty, it.disc));
  calcTotals();
}

newBtn.addEventListener('click', ()=>{
  if(!confirm('هل تود إنشاء فاتورة جديدة؟ سيتم مسح الحقول الحالية')) return;
  localStorage.removeItem('FutureTankInvoice');
  location.reload();
});

// PDF generation using html2pdf
pdfBtn.addEventListener('click', async ()=>{
  // prepare print area markup
  const data = collectInvoice();
  const printArea = document.getElementById('printArea');
  printArea.innerHTML = buildPrintMarkup(data);
  // show temporarily for html2pdf (print styles applied)
  printArea.style.display = 'block';
  const opt = {
    margin:       10,
    filename:     `${data.meta.invNumber || 'invoice'}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  try{
    await html2pdf().set(opt).from(printArea).save();
  }catch(e){
    alert('حدث خطأ أثناء توليد PDF. جرب تحديث الصفحة ثم أعد المحاولة.');
    console.error(e);
  } finally {
    printArea.style.display = 'none';
  }
});

// build markup for print
function buildPrintMarkup(data){
  const header = `
  <div class="print-template">
    <div class="print-header">
      <div>
        <div class="company">FutureTank</div>
        <div>السجل التجاري: 40893 — الضريبة: 055-356-369</div>
      </div>
      <div>
        <div>رقم الفاتورة: <strong>${data.meta.invNumber}</strong></div>
        <div>التاريخ: <strong>${data.meta.invDate}</strong></div>
      </div>
    </div>
    <hr>
    <div style="margin-top:8px"><strong>إلى:</strong> ${data.meta.custName || '—'} — ${data.meta.custAddr || '—'}</div>
    <table class="print-table">
      <thead><tr><th>الوصف</th><th>سعر الوحدة</th><th>الكمية</th><th>خصم %</th><th>المجموع</th></tr></thead>
      <tbody>
      ${data.items.map(it => `<tr>
        <td>${it.desc}</td>
        <td>${Number(it.price).toLocaleString('ar-EG',{minimumFractionDigits:2})} ج.م</td>
        <td>${it.qty}</td>
        <td>${it.disc}</td>
        <td>${((it.price*it.qty) - (it.price*it.qty)*(it.disc/100)).toLocaleString('ar-EG',{minimumFractionDigits:2})} ج.م</td>
      </tr>`).join('')}
      </tbody>
    </table>
    <div style="margin-top:10px;text-align:right">
      <div>الإجمالي: ${data.totals.subtotal}</div>
      <div>إجمالي الخصم: ${data.totals.totalDisc}</div>
      <div style="font-weight:800;margin-top:6px">المبلغ المستحق: ${data.totals.grand}</div>
    </div>
    <div style="margin-top:14px"><strong>ملاحظات:</strong> ${data.meta.notes || '—'}</div>
    <div style="margin-top:20px;text-align:center">
      <img src="https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=CR:40893" alt="QR">
      <div>QR السجل التجاري</div>
    </div>
  </div>
  `;
  return header;
}

// Sharing via WhatsApp (prefer share PDF if supported)
shareBtn.addEventListener('click', async ()=>{
  const data = collectInvoice();
  // try to generate blob and share
  try{
    const printArea = document.getElementById('printArea');
    printArea.innerHTML = buildPrintMarkup(data);
    printArea.style.display = 'block';
    // generate blob
    const blob = await html2pdf().set({margin:10, filename: `${data.meta.invNumber}.pdf`, image:{type:'jpeg',quality:0.98}, html2canvas:{scale:2, useCORS:true}, jsPDF:{unit:'mm',format:'a4'}}).from(printArea).outputPdf('blob');
    const file = new File([blob], `${data.meta.invNumber}.pdf`, { type: 'application/pdf' });
    // try navigator.share
    if(navigator.canShare && navigator.canShare({ files: [file] })){
      await navigator.share({ files: [file], title: `فاتورة ${data.meta.invNumber}`, text: `فاتورة من FutureTank — ${data.meta.invNumber}` });
      printArea.style.display = 'none';
      return;
    }
  }catch(e){
    console.warn('share file not available', e);
  } finally {
    document.getElementById('printArea').style.display = 'none';
  }

  // fallback to open WhatsApp with text
  const txtLines = [];
  txtLines.push(`فاتورة من FutureTank`);
  txtLines.push(`رقم: ${data.meta.invNumber}`);
  txtLines.push(`تاريخ: ${data.meta.invDate}`);
  txtLines.push(`العميل: ${data.meta.custName || '—'}`);
  txtLines.push(`المبلغ المستحق: ${data.totals.grand}`);
  txtLines.push('');
  data.items.forEach(it => txtLines.push(`${it.desc} — ${it.qty} × ${Number(it.price).toLocaleString('ar-EG')} = ${((it.price*it.qty)-(it.price*it.qty)*(it.disc/100)).toLocaleString('ar-EG')} ج.م`));
  txtLines.push('');
  txtLines.push(`ملاحظات: ${data.meta.notes || '—'}`);
  const waUrl = `https://wa.me/?text=${encodeURIComponent(txtLines.join('\\n'))}`;
  window.open(waUrl, '_blank');
});