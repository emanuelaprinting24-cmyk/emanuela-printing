const SCRIPT_URL = "PASANG_URL_WEB_APP_GOOGLE_SCRIPT_ANDA_DI_SINI";

  function kirimKeGoogleSheets(payload) {
    fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }

  function simpanPenjualan() {
    const tgl = document.getElementById('tglPenjualan').value;
    const item = document.getElementById('itemPenjualan').value;
    const qty = parseInt(document.getElementById('qtyPenjualan').value) || 0;
    const harga = parseInt(document.getElementById('hargaPenjualan').value) || 0;
    const total = qty * harga;
    const status = document.getElementById('statusPesanan').value;
    const wa = document.getElementById('waPembeli').value;
    const catatan = document.getElementById('catatanPenjualan') ? document.getElementById('catatanPenjualan').value : '';

    if(total <= 0) return alert('Masukkan jumlah dan harga yang valid!');

    const payload = {
      jenis: 'Penjualan',
      tanggal: tgl,
      item: item,
      qty: qty,
      harga: harga,
      total: total,
      catatan: catatan,
      wa: wa,
      status: status
    };

    dataPenjualan.push({ id: Date.now(), ...payload });
    simpanKeStorage();
    updateUI();
    kirimKeGoogleSheets(payload);

    document.getElementById('penjualanForm').reset();
    document.getElementById('tglPenjualan').valueAsDate = new Date();
  }

  function simpanPembelian() {
    const tgl = document.getElementById('tglPembelian').value;
    const item = document.getElementById('itemPembelian').value;
    const qty = parseInt(document.getElementById('qtyPembelian').value) || 0;
    const harga = parseInt(document.getElementById('hargaPembelian').value) || 0;
    const total = qty * harga;
    const supplier = document.getElementById('supplier') ? document.getElementById('supplier').value : '';

    if(total <= 0) return alert('Masukkan jumlah dan harga yang valid!');

    const payload = {
      jenis: 'Pembelian',
      tanggal: tgl,
      item: item,
      qty: qty,
      harga: harga,
      total: total,
      vendor: supplier,
      status: 'Selesai'
    };

    dataPembelian.push({ id: Date.now(), ...payload });
    simpanKeStorage();
    updateUI();
    kirimKeGoogleSheets(payload);

    document.getElementById('pembelianForm').reset();
    document.getElementById('tglPembelian').valueAsDate = new Date();
  }