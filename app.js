const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzpgRQx7ivhQN0plm0W2NIhXVOCuhMHV45DbYszATM5Ceswrse4wK1iv3JNhFkgslHL/exec";

// Atur tanggal default ke hari ini saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('tglPenjualan').value = today;
    document.getElementById('tglPembelian').value = today;
});

// Hitung Otomatis Total Penjualan
const qtyPenjualan = document.getElementById('qtyPenjualan');
const hargaPenjualan = document.getElementById('hargaPenjualan');
const totalPenjualan = document.getElementById('totalPenjualan');

function hitungTotalPenjualan() {
    const q = Number(qtyPenjualan.value) || 0;
    const h = Number(hargaPenjualan.value) || 0;
    totalPenjualan.value = q * h;
}
qtyPenjualan.addEventListener('input', hitungTotalPenjualan);
hargaPenjualan.addEventListener('input', hitungTotalPenjualan);
qtyPenjualan.addEventListener('change', hitungTotalPenjualan);
hargaPenjualan.addEventListener('change', hitungTotalPenjualan);

// Hitung Otomatis Total Pembelian
const qtyPembelian = document.getElementById('qtyPembelian');
const hargaPembelian = document.getElementById('hargaPembelian');
const totalPembelian = document.getElementById('totalPembelian');

function hitungTotalPembelian() {
    const q = Number(qtyPembelian.value) || 0;
    const h = Number(hargaPembelian.value) || 0;
    totalPembelian.value = q * h;
}
qtyPembelian.addEventListener('input', hitungTotalPembelian);
hargaPembelian.addEventListener('input', hitungTotalPembelian);
qtyPembelian.addEventListener('change', hitungTotalPembelian);
hargaPembelian.addEventListener('change', hitungTotalPembelian);

// Submit Form Penjualan
document.getElementById('formPenjualan').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerText = "Menyimpan...";

    const data = {
        tipe: "Penjualan",
        tgl: document.getElementById('tglPenjualan').value,
        item: document.getElementById('produkPenjualan').value,
        qty: Number(qtyPenjualan.value),
        harga: Number(hargaPenjualan.value),
        catatan: document.getElementById('catatanPenjualan').value
    };

    kirimKeGoogleSheets(data, 'formPenjualan', submitBtn, "Simpan Penjualan");
});

// Submit Form Pembelian
document.getElementById('formPembelian').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerText = "Menyimpan...";

    const data = {
        tipe: "Pembelian",
        tgl: document.getElementById('tglPembelian').value,
        item: document.getElementById('bahanPembelian').value,
        qty: Number(qtyPembelian.value),
        harga: Number(hargaPembelian.value),
        vendor: document.getElementById('vendorPembelian').value
    };

    kirimKeGoogleSheets(data, 'formPembelian', submitBtn, "Simpan Pembelian");
});

// Fungsi Kirim Data ke Google Sheets
function kirimKeGoogleSheets(payload, formId, submitBtn, originalBtnText) {
    fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(() => {
        alert("✅ Data " + payload.tipe + " berhasil dicatat ke Google Sheets!");
        document.getElementById(formId).reset();
        
        // Reset tanggal kembali ke hari ini & total ke kosong
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('tglPenjualan').value = today;
        document.getElementById('tglPembelian').value = today;
        totalPenjualan.value = "";
        totalPembelian.value = "";
    })
    .catch(error => {
        console.error('Error:', error);
        alert("❌ Gagal menyimpan data, periksa koneksi internet Anda.");
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
    });
}