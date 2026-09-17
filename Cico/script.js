function setTanggalHariIni() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    document.getElementById('tanggal').value = `${year}-${month}-${day}`;
}

setTanggalHariIni();

// Mengisi dropdown unit dari 01 sampai 23 untuk Rusun Blok, Rusun Tower, & Perumahan
function populateUnitDropdowns() {
    const unitSelects = ['rusunBlokUnit', 'rusunTowerUnit', 'perumahanUnitSelect'];
    unitSelects.forEach(id => {
        const selectEl = document.getElementById(id);
        if (selectEl && selectEl.options.length <= 1) {
            selectEl.innerHTML = '<option value="" disabled selected hidden>-- Pilih Unit --</option>';
            for (let i = 1; i <= 23; i++) {
                const valStr = i < 10 ? '0' + i : String(i);
                const el = document.createElement('option');
                el.value = valStr;
                el.textContent = valStr;
                selectEl.appendChild(el);
            }
        }
    });
}
populateUnitDropdowns();

const allInputs = document.querySelectorAll('input, select');
allInputs.forEach(item => item.addEventListener('input', updateViewAndPreview));
document.getElementById('project').addEventListener('change', updateViewAndPreview);
document.getElementById('katLokasi').addEventListener('change', updateViewAndPreview);
document.getElementById('rusunBlokNama').addEventListener('change', updateBlokDropdown);
document.getElementById('rusunTowerNama').addEventListener('change', updateViewAndPreview);
document.getElementById('perumahanNamaSelect').addEventListener('change', updateViewAndPreview);
document.getElementById('jenisLaporan').addEventListener('change', updateViewAndPreview);
document.getElementById('jenisKendala').addEventListener('change', updateViewAndPreview);
document.getElementById('statusActivity').addEventListener('change', updateViewAndPreview);

function updateBlokDropdown() {
    const rusunNama = document.getElementById('rusunBlokNama').value;
    const blokSelect = document.getElementById('rusunBlokKodeSelect');
    
    blokSelect.innerHTML = '<option value="" disabled selected hidden>-- Pilih Blok --</option>';
    
    let options = [];
    if (rusunNama === 'Rusun Pinus') {
        options = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'];
    } else if (rusunNama === 'Rusun Pulogebang Blok' || rusunNama === 'Rusun Cakung Barat') {
        options = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    } else if (rusunNama === 'Rusun KM2') {
        options = ['A', 'B'];
    } else if (rusunNama === 'Rusun Tipar Cakung') {
        options = ['Akasia', 'Angsana', 'Mahoni', 'Cendana', 'Meranti', 'Puspa indah', 'Jatisari', 'Rasamala', 'Kamperwangi', 'Kruing'];
    }

    options.forEach(opt => {
        const el = document.createElement('option');
        el.value = opt;
        el.textContent = opt;
        blokSelect.appendChild(el);
    });
}

function updateViewAndPreview() {
    const projVal = document.getElementById('project').value;
    const katLokSelect = document.getElementById('katLokasi');
    const rusunTowerNamaSelect = document.getElementById('rusunTowerNama');
    const groupRusunTowerNama = document.getElementById('groupRusunTowerNama');

    const currentKatVal = katLokSelect.value;
    const currentTowerVal = rusunTowerNamaSelect.value;

    if (!projVal) {
        katLokSelect.innerHTML = '<option value="" disabled selected hidden>-- Pilih ISP Terlebih Dahulu --</option>';
        rusunTowerNamaSelect.innerHTML = '<option value="" disabled selected hidden>-- Pilih Kategori Lokasi Dulu --</option>';
    } else {
        if (projVal === 'FTTH ISP JAKINET') {
            katLokSelect.innerHTML = `
                <option value="" disabled selected hidden>-- Pilih Kategori Lokasi --</option>
                <option value="RUSUN_BLOK">Rusun Blok</option>
                <option value="RUSUN_TOWER">Rusun Tower</option>
                <option value="CUSTOM">Lainnya (Custom)</option>
            `;
            rusunTowerNamaSelect.innerHTML = `
                <option value="" disabled selected hidden>-- Pilih Rusun Tower --</option>
                <option value="Rusun Pulogebang Tower">Rusun Pulogebang Tower</option>
            `;
        } 
        else if (projVal === 'FTTH ISP JELANTIK') {
            katLokSelect.innerHTML = `
                <option value="" disabled selected hidden>-- Pilih Kategori Lokasi --</option>
                <option value="RUSUN_TOWER">Rusun Tower</option>
                <option value="PERUMAHAN">Perumahan</option>
                <option value="CUSTOM">Lainnya (Custom)</option>
            `;
            rusunTowerNamaSelect.innerHTML = `
                <option value="" disabled selected hidden>-- Pilih Rusun Tower --</option>
                <option value="Rusun Nagrak">Rusun Nagrak</option>
            `;
        } 
        else {
            katLokSelect.innerHTML = `
                <option value="" disabled selected hidden>-- Pilih Kategori Lokasi --</option>
                <option value="RUSUN_BLOK">Rusun Blok</option>
                <option value="RUSUN_TOWER">Rusun Tower</option>
                <option value="PERUMAHAN">Perumahan</option>
                <option value="CUSTOM">Lainnya (Custom)</option>
            `;
            rusunTowerNamaSelect.innerHTML = `
                <option value="" disabled selected hidden>-- Pilih Rusun Tower --</option>
                <option value="Rusun Pulogebang Tower">Rusun Pulogebang Tower</option>
                <option value="Rusun Nagrak">Rusun Nagrak</option>
            `;
        }

        if ([...katLokSelect.options].some(o => o.value === currentKatVal)) {
            katLokSelect.value = currentKatVal;
        }
        if ([...rusunTowerNamaSelect.options].some(o => o.value === currentTowerVal)) {
            rusunTowerNamaSelect.value = currentTowerVal;
        }
    }

    const katLok = katLokSelect.value;

    if (projVal && katLok === 'RUSUN_TOWER') {
        groupRusunTowerNama.classList.remove('hidden');
    } else {
        groupRusunTowerNama.classList.add('hidden');
        rusunTowerNamaSelect.value = '';
    }

    const rusunTowerNama = rusunTowerNamaSelect.value;
    const groupTowerKode = document.getElementById('groupTowerKode');
    const towerSelect = document.getElementById('rusunTowerKodeSelect');

    if (rusunTowerNama === 'Rusun Pulogebang Tower') {
        groupTowerKode.classList.add('hidden');
    } else if (rusunTowerNama === 'Rusun Nagrak') {
        groupTowerKode.classList.remove('hidden');
        if (towerSelect.options.length <= 1) {
            towerSelect.innerHTML = '<option value="" disabled selected hidden>-- Pilih Tower --</option>';
            for (let i = 1; i <= 5; i++) {
                const el = document.createElement('option');
                el.value = i;
                el.textContent = i;
                towerSelect.appendChild(el);
            }
        }
    } else {
        groupTowerKode.classList.add('hidden');
    }

    const jenisLapVal = document.getElementById('jenisLaporan').value;
    const isJenisCustom = (jenisLapVal === 'LAINNYA');
    document.getElementById('jenisLaporanCustom').classList.toggle('hidden', !isJenisCustom);

    const activityInput = document.getElementById('activity');
    if (isJenisCustom) {
        const customAct = document.getElementById('jenisLaporanCustomInput').value.trim();
        activityInput.value = customAct.toUpperCase();
    } else if (jenisLapVal) {
        activityInput.value = jenisLapVal.replace('KEGIATAN ', '');
    } else {
        activityInput.value = '';
    }

    document.getElementById('projectCustom').classList.toggle('hidden', projVal !== 'CUSTOM');

    const statusVal = document.getElementById('statusActivity').value;
    document.getElementById('statusCustom').classList.toggle('hidden', statusVal !== 'CUSTOM');

    const leaderSelect = document.getElementById('leaderSelect').value;
    document.getElementById('leaderCustom').classList.toggle('hidden', leaderSelect !== 'CUSTOM');

    const perumahanSelectVal = document.getElementById('perumahanNamaSelect').value;
    document.getElementById('perumahanCustom').classList.toggle('hidden', perumahanSelectVal !== 'CUSTOM');

    document.getElementById('boxRusunBlok').classList.toggle('hidden', katLok !== 'RUSUN_BLOK');
    document.getElementById('boxRusunTower').classList.toggle('hidden', katLok !== 'RUSUN_TOWER');
    document.getElementById('boxPerumahan').classList.toggle('hidden', katLok !== 'PERUMAHAN');
    document.getElementById('boxCustom').classList.toggle('hidden', katLok !== 'CUSTOM');

    const boxMtn = document.getElementById('boxJenisMaintenance');
    if (jenisLapVal === 'KEGIATAN MAINTENANCE') {
        boxMtn.classList.remove('hidden');
    } else {
        boxMtn.classList.add('hidden');
    }

    const jenisKendala = document.getElementById('jenisKendala').value;
    const isTukarModem = (jenisLapVal === 'KEGIATAN MAINTENANCE' && jenisKendala === 'TUKAR_MODEM');
    const isKabelPutus = (jenisLapVal === 'KEGIATAN MAINTENANCE' && jenisKendala === 'KABEL_PUTUS');

    if (isTukarModem) {
        document.getElementById('groupSnOnu').classList.add('hidden');
        document.getElementById('groupSnTukarModem').classList.remove('hidden');
        document.getElementById('groupOdpPort').classList.add('hidden');
    } else if (isKabelPutus) {
        document.getElementById('groupSnOnu').classList.add('hidden');
        document.getElementById('groupSnTukarModem').classList.add('hidden');
        document.getElementById('groupOdpPort').classList.add('hidden');
        document.getElementById('groupInterfaceOnu').classList.add('hidden');
    } else {
        document.getElementById('groupSnOnu').classList.remove('hidden');
        document.getElementById('groupSnTukarModem').classList.add('hidden');
        document.getElementById('groupOdpPort').classList.remove('hidden');
        document.getElementById('groupInterfaceOnu').classList.remove('hidden');
    }

    generatePreview();
}

function formatHariTanggal(dateString) {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if(parts.length !== 3) return '';
    
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options).toUpperCase();
}

function getSelectedJenisLaporan() {
    const val = document.getElementById('jenisLaporan').value;
    if (val === 'LAINNYA') {
        const customText = document.getElementById('jenisLaporanCustomInput').value.trim().toUpperCase();
        return customText ? `KEGIATAN ${customText}` : 'KEGIATAN ...';
    }
    return val;
}

function getSelectedProject() {
    const val = document.getElementById('project').value;
    if (val === 'CUSTOM') {
        return document.getElementById('projectCustom').value.trim().toUpperCase();
    }
    return val;
}

function getSelectedStatus() {
    const val = document.getElementById('statusActivity').value;
    if (val === 'CUSTOM') {
        return document.getElementById('statusCustom').value.trim().toUpperCase();
    }
    return val;
}

function getSelectedLeader() {
    const sel = document.getElementById('leaderSelect').value;
    if (sel === 'CUSTOM') {
        return document.getElementById('leaderCustom').value.trim() || '';
    }
    return sel;
}

function getSelectedPIC() {
    let picArr = [];
    document.querySelectorAll('.pic-check:checked').forEach(cb => picArr.push(cb.value));
    
    const customPic = document.getElementById('picCustom').value.trim();
    if (customPic) picArr.push(customPic);
    
    return picArr.length > 0 ? picArr.join('-') : '';
}

function getFormattedLokasi() {
    const kat = document.getElementById('katLokasi').value;
    if (kat === 'RUSUN_BLOK') {
        const nama = document.getElementById('rusunBlokNama').value;
        const kode = document.getElementById('rusunBlokKodeSelect').value || '';
        const lt = document.getElementById('rusunBlokLantai').value || '';
        const unit = document.getElementById('rusunBlokUnit').value || '';
        
        const combinedUnit = (lt || unit) ? `UNIT ${lt}${unit}` : '';
        return `${nama.toUpperCase()} BLOK ${kode.toUpperCase()} ${combinedUnit}`.trim();

    } else if (kat === 'RUSUN_TOWER') {
        const nama = document.getElementById('rusunTowerNama').value;
        let kode = '';
        if (nama === 'Rusun Nagrak') {
            kode = document.getElementById('rusunTowerKodeSelect').value || '';
        }

        const lt = document.getElementById('rusunTowerLantai').value || '';
        const unit = document.getElementById('rusunTowerUnit').value || '';
        
        const combinedUnit = (lt || unit) ? `UNIT ${lt}${unit}` : '';
        
        if (nama === 'Rusun Pulogebang Tower') {
            return `${nama.toUpperCase()} ${combinedUnit}`.trim();
        } else if (nama === 'Rusun Nagrak') {
            return `${nama.toUpperCase()} TOWER ${kode} ${combinedUnit}`.trim();
        }
        return `${nama.toUpperCase()} ${combinedUnit}`.trim();

    } else if (kat === 'PERUMAHAN') {
        let namaPerumahan = document.getElementById('perumahanNamaSelect').value;
        if (namaPerumahan === 'CUSTOM') {
            namaPerumahan = document.getElementById('perumahanCustom').value.trim().toUpperCase();
        }
        const blok = document.getElementById('perumahanBlok').value.trim();
        const unit = document.getElementById('perumahanUnitSelect').value;
        const detailUnit = unit ? `NO. ${unit}` : '';
        return `PERUMAHAN ${namaPerumahan.toUpperCase()} ${blok.toUpperCase()} ${detailUnit}`.trim();
    } else if (kat === 'CUSTOM') {
        return document.getElementById('alamatCustom').value.toUpperCase();
    }
    return '';
}

function padLabel(label, width = 13) {
    return label.padEnd(width, ' ');
}

function generatePreview() {
    const jenisLapVal = document.getElementById('jenisLaporan').value;
    const jenisLap = getSelectedJenisLaporan();
    const tglVal = document.getElementById('tanggal').value;
    const hariTgl = formatHariTanggal(tglVal);
    const project = getSelectedProject();
    const lokasi = getFormattedLokasi();
    const clockIn = document.getElementById('clockIn').value;
    const clockOut = document.getElementById('clockOut').value;
    const activity = document.getElementById('activity').value;
    const status = getSelectedStatus();
    const pic = getSelectedPIC();
    const leader = getSelectedLeader();

    const problem = document.getElementById('problemText').value;
    const action = document.getElementById('actionText').value;

    const rawPower = document.getElementById('power').value;
    let power = rawPower ? `-${rawPower} dBm` : '';

    const onu = document.getElementById('interfaceOnu').value;
    const odp = document.getElementById('odpPort').value;
    const snNormal = document.getElementById('snOnu').value;
    const snLama = document.getElementById('snOntLama').value;
    const snBaru = document.getElementById('snOntBaru').value;
    const catatan = document.getElementById('catatan').value;

    const jenisKendala = document.getElementById('jenisKendala').value;
    const isTukarModem = (jenisLapVal === 'KEGIATAN MAINTENANCE' && jenisKendala === 'TUKAR_MODEM');
    const isKabelPutus = (jenisLapVal === 'KEGIATAN MAINTENANCE' && jenisKendala === 'KABEL_PUTUS');

    // Garis pemisah disesuaikan agar pas di kotak WhatsApp
    const divider = `────────────────────────`;

    let textOut = `*⚡ CHECK IN & CHECK OUT ⚡*\n`;
    textOut += `${divider}\n`;
    textOut += `📅 *${hariTgl}*\n\n`;
    textOut += `*JENIS LAPORAN : ${jenisLap}*\n`;
    textOut += `${padLabel('Project')} : ${project}\n`;
    textOut += `${padLabel('Pic On Site')} : ${pic}\n`;
    textOut += `${padLabel('Leader')} : ${leader}\n`;
    textOut += `${padLabel('Lokasi')} : ${lokasi}\n`;
    textOut += `${padLabel('Clock In')} : ${clockIn}\n`;
    textOut += `${padLabel('Clock Out')} : ${clockOut}\n`;
    textOut += `${padLabel('Activity')} : ${activity}\n`;
    textOut += `${padLabel('Status Act.')} : ${status}\n`;

    if (jenisLapVal === 'KEGIATAN MAINTENANCE') {
        if (problem) textOut += `${padLabel('Problem')} : ${problem}\n`;
        if (action)  textOut += `${padLabel('Action')} : ${action}\n`;
    }

    textOut += `\n*🛠️ DATA TEKNIS*\n`;
    if (power) textOut += `${padLabel('POWER')} : ${power}\n`;
    if (!isKabelPutus && onu) textOut += `${padLabel('INTERFACE ONU')} : ${onu}\n`;
    if (!isTukarModem && !isKabelPutus && odp) textOut += `${padLabel('ODP PORT')} : ${odp}\n`;

    if (isTukarModem) {
        textOut += `${padLabel('SN ONT LAMA')} : ${snLama}\n`;
        textOut += `${padLabel('SN ONT BARU')} : ${snBaru}\n`;
    } else if (!isKabelPutus) {
        if (snNormal) textOut += `${padLabel('SN')} : ${snNormal}\n`;
    }

    if (catatan) textOut += `\n${padLabel('CATATAN')} : ${catatan}\n`;

    textOut += `\n${divider}\n`;
    textOut += `👥 Cc: @\n\n`;
    textOut += `*👷‍♂️ The work has been completed safely. Thank you*`;

    document.getElementById('previewText').value = textOut;
}

function copyText() {
    const copyText = document.getElementById("previewText");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    alert("Format Laporan berhasil disalin!");
}

function resetForm() {
    document.getElementById("reportForm").reset();
    document.querySelectorAll('.pic-check').forEach(cb => cb.checked = false);
    document.getElementById('leaderSelect').value = 'Yohan';
    setTanggalHariIni();
    updateViewAndPreview();
}

updateViewAndPreview();
