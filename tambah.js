const form = document.getElementById("tambah-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const umur = document.getElementById("umur").value.trim();
  const alamat = document.getElementById("alamat").value.trim();

  if (!nama || !umur || !alamat) {
    Swal.fire("Error", "Semua field wajib diisi!", "error");
    return;
  }

  let data = JSON.parse(localStorage.getItem("dataDiri")) || [];
  data.push({ nama, umur, alamat });
  localStorage.setItem("dataDiri", JSON.stringify(data));

  Swal.fire({
    icon: "success",
    title: "Berhasil",
    text: "Data berhasil ditambahkan!",
    confirmButtonColor: "#2575fc",
  }).then(() => {
    window.location.href = "index.html";
  });
});
