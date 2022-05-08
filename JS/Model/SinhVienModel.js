function SinhVien (_ma,_ten,_email,_toan,_ly,_hoa){
    this.maSV = _ma;
    this.tenSV = _ten;
    this.emailSV = _email;
    this.diemToan = _toan;
    this.diemLy = _ly;
    this.diemHoa = _hoa;
    this.tinhDiemTrungBinh = function(){
        return Math.floor((this.diemToan + this.diemLy + this.diemHoa)/3)
    }
}