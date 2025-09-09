const urlParams = new URLSearchParams(window.location.search);
const index = urlParams.get("index");

let data = JSON.parse(localStorage.getItem("dataDiri")) || [];
const form = document.getElementById("edit-form");

if (index === null || !data[index]) {
  Swal.fire("Error", "Data tidak ditemukan!", "error").then(() => {
    window.location.href = "index.html";
  });
} else {
  document.getElementById("nama").value = data[index].nama;
  document.getElementById("umur").value = data[index].umur;
  document.getElementById("alamat").value = data[index].alamat;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const umur = document.getElementById("umur").value.trim();
  const alamat = document.getElementById("alamat").value.trim();

  if (!nama || !umur || !alamat) {
    Swal.fire("Error", "Semua field wajib diisi!", "error");
    return;
  }

  data[index] = { nama, umur, alamat };
  localStorage.setItem("dataDiri", JSON.stringify(data));

  Swal.fire({
    icon: "success",
    title: "Tersimpan!",
    text: "Data berhasil diperbarui.",
    confirmButtonColor: "#2575fc",
  }).then(() => {
    window.location.href = "index.html";
  });
});
