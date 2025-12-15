/* ===============================
   FutureTank System Core
   Contracts + Scheduling Engine
   =============================== */

const FT_STORAGE_KEY = "ft_contracts";

/* ===== Helpers ===== */
function ftLoadContracts() {
  return JSON.parse(localStorage.getItem(FT_STORAGE_KEY) || "[]");
}

function ftSaveContracts(data) {
  localStorage.setItem(FT_STORAGE_KEY, JSON.stringify(data));
}

function ftAddDays(dateStr, days) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  d.setDate(d.getDate() + Number(days));
  return d.toISOString().split("T")[0];
}

/* ===== Calculate Next Visit ===== */
function ftCalcNextVisit(lastVisit, cycle) {
  if (!lastVisit) return "";
  if (cycle === "30") return ftAddDays(lastVisit, 30);
  if (cycle === "60") return ftAddDays(lastVisit, 60);
  return "";
}

/* ===== Add Contract ===== */
function ftAddContract(contract) {
  const contracts = ftLoadContracts();

  contract.id = Date.now();
  contract.nextVisit = ftCalcNextVisit(
    contract.lastVisit,
    contract.cycle
  );

  contracts.push(contract);
  ftSaveContracts(contracts);
}

/* ===== Delete Contract ===== */
function ftDeleteContract(id) {
  let contracts = ftLoadContracts();
  contracts = contracts.filter(c => c.id !== id);
  ftSaveContracts(contracts);
}

/* ===== Get Due Contracts ===== */
function ftGetDueContracts(daysAhead = 5) {
  const contracts = ftLoadContracts();
  const today = new Date();

  return contracts.filter(c => {
    if (!c.nextVisit) return false;
    const visitDate = new Date(c.nextVisit);
    const diff = (visitDate - today) / (1000 * 60 * 60 * 24);
    return diff <= daysAhead && diff >= 0;
  });
}

/* ===== WhatsApp Message Generator ===== */
function ftGenerateWhatsApp(contract) {
  const msg = `
السلام عليكم
نود إفادتكم بموعد زيارة

الخدمة: ${contract.service}
العميل: ${contract.client}

📅 الموعد: ${contract.nextVisit}
💰 تكلفة الزيارة: ${contract.cost} جنيه

🔔 يتم الدفع عقب انتهاء الأعمال مباشرة
عبر اتصالات كاش:
01150402031

فريق FutureTank
  `.trim();

  return "https://wa.me/2" + contract.phone + "?text=" + encodeURIComponent(msg);
    }
