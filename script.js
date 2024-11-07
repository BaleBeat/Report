document.getElementById('ketLapangan').addEventListener('change', function() {
    const ketLapanganManual = document.getElementById('ketLapanganManual');
    if (this.value === 'Manual') {
        ketLapanganManual.disabled = false;
    } else {
        ketLapanganManual.disabled = true;
    }
});

// Menambahkan event listener untuk input ODP REAL, QR, dan SN ONT agar otomatis menjadi kapital
document.getElementById('odpReal').addEventListener('input', function() {
    this.value = this.value.toUpperCase();
});

document.getElementById('qr').addEventListener('input', function() {
    this.value = this.value.toUpperCase();
});

document.getElementById('snOnt').addEventListener('input', function() {
    this.value = this.value.toUpperCase();
});

async function generateReport() {
    const woInput = document.getElementById('woInput').value.trim();
    const odpReal = document.getElementById('odpReal').value.trim();
    const port = document.getElementById('port').value.trim();
    const qr = document.getElementById('qr').value.trim();
    const idValins = document.getElementById('idValins').value.trim();
    const snOnt = document.getElementById('snOnt').value.trim();
    const stbId = document.getElementById('stbId').value.trim();
    const dc = document.getElementById('dc').value.trim();
    const ketLapangan = document.getElementById('ketLapangan').value.trim();
    const ketLapanganManual = document.getElementById('ketLapanganManual').value.trim();
    const tikorRumah = document.getElementById('tikorRumah').value.trim();
    const tikorOdp = document.getElementById('tikorOdp').value.trim();

    // Input koordinat yang perlu dibersihkan
    const koordinatRumah = tikorRumah.replace(/[\(\)\s]/g, '');
    const koordinatOdp = tikorOdp.replace(/[\(\)\s]/g, '');

    // Untuk mengekstrak detail order, dimulai dengan "NEW SALES"
    const startNewSalesIndex = woInput.indexOf("NEW SALES");
    const detailOrder = woInput.substring(startNewSalesIndex).trim();

    // Menangani jika tidak ada bagian "NEW SALES"
    if (startNewSalesIndex === -1) {
        alert('Detail Order tidak ditemukan, pastikan dimulai dengan NEW SALES');
        return;
    }

    // Mengatur KET LAPANGAN yang diisi manual jika diperlukan
    const ketLapanganFinal = ketLapangan === 'Manual' && ketLapanganManual !== '' ? ketLapanganManual : ketLapangan;

    // Menampilkan laporan lengkap dengan format yang sesuai
    const laporan = `
/ID_WO: ${woInput.match(/WO\d+/)[0]}
ODP REAL: ODP-PBL-${odpReal.toUpperCase()}
PORT: ${port}
QR: ${qr.toUpperCase()}
ID VALINS: ${idValins}
SN ONT: ${snOnt.toUpperCase()}
STB ID: ${stbId}
DC: ${dc}
KET LAPANGAN: ${ketLapanganFinal}
TIKOR RUMAH: ${koordinatRumah}
TIKOR ODP: ${koordinatOdp}

DETAIL ORDER: ${detailOrder}
    `;

    // Tampilkan hasil laporan
    document.getElementById('laporanOutput').textContent = laporan;

    // Menyalin laporan secara otomatis menggunakan Clipboard API
    try {
        await navigator.clipboard.writeText(laporan);
        alert('Laporan telah disalin ke clipboard secara otomatis!');
    } catch (err) {
        alert('Gagal menyalin laporan: ' + err);
    }
}
