const { input_sewa, input_kembali, registrasi_pelanggan, registrasi_karyawan, registrasi_mobil, getInfo_karyawan, getInfo_kembali, getInfo_mobil, getInfo_pelanggan, getInfo_sewa, edit_karyawan, edit_mobil, edit_pelanggan, update_sewa, update_kembali, delete_karyawan, delete_mobil, delete_pelanggan, hapus_penyewaan } = require("./main/function")
const { port } = require("./main/main")

delete_mobil("/mobil/:id_mobil")

port()