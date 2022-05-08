function layThongTinTuForm() {
  var maSV = document.getElementById("txtMaSV").value;
  var tenSV = document.getElementById("txtTenSV").value;
  var emailSV = document.getElementById("txtEmail").value;
  var diemToan = document.getElementById("txtDiemToan").value*1;
  var diemLy = document.getElementById("txtDiemLy").value*1;
  var diemHoa = document.getElementById("txtDiemHoa").value*1;

  var sinhVien = new SinhVien(maSV, tenSV, emailSV, diemToan, diemLy, diemHoa);

  return sinhVien;
}

function xuatThongTinVaoBang(arrayDSSV) {
  var contentHTML = "";
  for (let i = 0; i < arrayDSSV.length; i++) {
    var sinhVien = arrayDSSV[i];
    var contentTrTag = /* html */ `
    <tr>
    <td>${sinhVien.maSV}</td>
    <td>${sinhVien.tenSV}</td>
    <td>${sinhVien.emailSV}</td>
    <td>${sinhVien.tinhDiemTrungBinh()}</td>
    <td>
    <button type="button" class="btn btn-success" onclick="suaSinhVien(${sinhVien.maSV})">Sửa</button>
    <button type="button" class="btn btn-danger" onclick="xoaSinhVien(${sinhVien.maSV})">Xóa</button>
    </td>
  </tr>
    `;
    contentHTML += contentTrTag;
  }
  document.getElementById("tbodySinhVien").innerHTML = contentHTML;
}

function xuatThongTinLenForm(sv) {
  document.getElementById("txtMaSV").value = sv.maSV;
  document.getElementById("txtTenSV").value = sv.tenSV;
  document.getElementById("txtEmail").value = sv.emailSV;
  document.getElementById("txtDiemToan").value = sv.diemToan;
  document.getElementById("txtDiemLy").value = sv.diemLy;
  document.getElementById("txtDiemHoa").value = sv.diemHoa;
}
